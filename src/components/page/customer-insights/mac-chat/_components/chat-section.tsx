'use client';

import UserContext from '@/contexts/user/user-context';
import useConversation from '@/hooks/use-conversation';
import useCustomerInsightsApiClient from '@/hooks/use-customer-insights-api-client';
import useHistory from '@/hooks/use-history';
import { Session } from '@/lib/customer-insights/types';
import { cn } from '@/lib/utils';
import { useContext, useEffect, useRef, useState } from 'react';
import { ChatBox } from './chat-box';
import { ChatHistory } from './chat-history';

type ChatSectionProps = {
  sessionId: string;
};

export function ChatSection({ sessionId }: ChatSectionProps) {
  const { apiReady } = useCustomerInsightsApiClient();
  const chatHistoryController = useRef<AbortController | null>(null);
  const { setSession } = useConversation();
  const {
    chatHistory,
    chatSession,
    setChatSession,
    addUserPrompt,
    addBotReply,
    addSystemMessage,
    addErrorMessage,
    resetHistory,
  } = useHistory({
    historyModified: () => {
      forceRerender();
      scrollToBottom();
    },
  });

  const { apiClient } = useCustomerInsightsApiClient();
  const [, setTick] = useState(0);
  const decoder = new TextDecoder('utf-8');
  const userContext = useContext(UserContext);
  const [abortController, setAbortController] =
    useState<AbortController | null>(null);

  const forceRerender = () => {
    setTick((tick) => tick + 1);
  };

  const scrollToBottom = () => {
    const node = document.getElementById('chat_history');
    if (node !== null) {
      node.scrollTop = node.scrollHeight;
    }
  };

  const generateChatSession = async (message: string) => {
    try {
      const response: Session = await apiClient.createChatSession(message);

      return response;
    } catch (error) {
      console.error('Failed to create chat session');
      throw error;
    }
  };

  const sendPrompt = async (prompt: string) => {
    if (!prompt) return;
    let newSession;
    let _sessionId = chatSession;
    if (!_sessionId) {
      try {
        newSession = await generateChatSession(prompt);
        _sessionId = newSession.session_id;
        setChatSession(newSession.session_id);
      } catch (err) {
        console.error(err);
        return;
      }
    }

    // If there is an ongoing request, cancel it
    if (abortController) {
      abortController.abort('New request sent.');
      addSystemMessage('Last prompt was aborted.');
    }

    // Add the prompt to history
    addUserPrompt(prompt);
    addBotReply('...', false);
    const newAbortController = new AbortController();
    setAbortController(newAbortController);

    // Send prompt to API and process response
    try {
      const reader = await apiClient.sendChatMessageV2(
        prompt,
        _sessionId,
        newAbortController.signal
      );

      if (!reader) return;

      let done = false;
      let response = '';

      // Read the stream
      while (!done) {
        const { value, done: doneReading } = await reader.read();
        done = doneReading;
        if (value) {
          const chunk = decoder.decode(value, { stream: true });
          response += chunk.replaceAll('data: ', '');

          addBotReply(response, true);
        }
      }
      if (newSession) {
        setSession(newSession);
      }
    } catch (error) {
      addErrorMessage(
        'Sorry, unable to process your request at this time. Please try again later.'
      );
      console.error('Error reading from stream:', error);
    } finally {
      setAbortController(null);
    }
  };

  const fetchChatHistory = async (sessionId: string) => {
    try {
      if (chatHistoryController.current) {
        chatHistoryController.current?.abort(
          'Abort: The previous API call was aborted due to a new API call.'
        );
      }

      chatHistoryController.current = new AbortController();
      const response = await apiClient.getUserChatHistory(
        sessionId,
        chatHistoryController.current.signal
      );

      const history = response.objects;
      const sortedHistory = history.sort((a, b) => {
        const dateA = new Date(a.created).getTime();
        const dateB = new Date(b.created).getTime();
        return dateA - dateB;
      });

      sortedHistory.map((conversation) => {
        if (conversation.sender === 'bot') {
          addBotReply(conversation.message, false);
        } else {
          addUserPrompt(conversation.message);
        }
      });

      // 2. Set loading to false
    } catch (error) {
      console.error('Error fetching use chat history: ', error);
    }
  };

  useEffect(() => {
    if (chatHistory.length > 0) {
      scrollToBottom();
    }
  }, [chatHistory]);

  useEffect(() => {
    if (!sessionId && chatSession !== sessionId) {
      resetHistory();
    }
  }, []);

  useEffect(() => {
    // TODO:
    // 1. Clear previous chat history
    // 2. Add loading state when loading chat history
    if (!apiReady) {
      return;
    }
    if (chatSession !== sessionId && sessionId) {
      resetHistory();
      void fetchChatHistory(sessionId);
    }
    setChatSession(sessionId);
  }, [apiReady, sessionId]);

  useEffect(() => {
    return () => {
      chatHistoryController.current?.abort(
        'Abort: Component unmounted due to the component being removed from the DOM.'
      );
    };
  }, []);

  return (
    <div
      className={cn(
        'space-y-4 flex flex-col w-full',
        userContext?.getBasePath() === ''
          ? 'h-[calc(100vh-65px)]'
          : 'h-dvh max-h-dvh'
      )}
    >
      <section
        id='chat_history'
        className={cn('flex-grow flex-col overflow-y-scroll')}
      >
        <div className='flex-grow px-4 pt-4 h-full'>
          <ChatHistory history={chatHistory} sessionId={sessionId} />
        </div>
      </section>
      <section className='pb-4'>
        <div className='px-4'>
          <ChatBox
            processing={abortController !== null}
            sendMessage={async (value) => {
              await sendPrompt(value);
            }}
            abort={() => {
              abortController?.abort();
            }}
          />
        </div>
      </section>
    </div>
  );
}
