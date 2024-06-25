'use client';

import UserContext from '@/contexts/user/user-context';
import useChatHistory from '@/hooks/use-chat-history';
import useCustomerInsightsApiClient from '@/hooks/use-customer-insights-api-client';
import useSessions from '@/hooks/use-sessions';
import { Session } from '@/lib/customer-insights/types';
import { cn } from '@/lib/utils';
import { useContext, useEffect, useRef, useState } from 'react';
import { ChatBox } from './chat-box';
import { ChatHistory } from './chat-history';

type ChatSectionProps = {
  sessionId: string;
};

export function ChatSection({ sessionId }: ChatSectionProps) {
  const chatHistoryController = useRef<AbortController | null>(null);
  const { setSessions } = useSessions();
  const {
    chatHistory,
    addUserPrompt,
    addBotReply,
    addSystemMessage,
    addErrorMessage,
  } = useChatHistory({
    historyModified: () => {
      forceRerender();
      scrollToBottom();
    },
  });

  console.log('chatHistory:', chatHistory);
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
    }
  };

  const sendPrompt = async (prompt: string) => {
    if (!prompt) return;
    let _sessionId = sessionId;
    if (!_sessionId) {
      const newSession = (await generateChatSession(prompt)) as Session;
      _sessionId = newSession.session_id;
      setSessions(newSession);
    }

    // If there is an ongoing request, cancel it
    if (abortController) {
      abortController.abort('New request sent.');
      addSystemMessage('Last prompt was aborted.');
    }

    // Add the prompt to history
    addUserPrompt(prompt);
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
      let isUpdate = false;

      // Read the stream
      while (!done) {
        const { value, done: doneReading } = await reader.read();
        done = doneReading;
        if (value) {
          const chunk = decoder.decode(value, { stream: true });
          response += chunk.replaceAll('data: ', '');

          addBotReply(response, isUpdate);
          isUpdate = true;
        }
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
      const { objects } = await apiClient.getUserChatHistory(
        sessionId,
        chatHistoryController.current.signal
      );

      // TODO:
      // 1. Handle response
      objects.map((conversation: any) => {
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
    // TODO:
    // 1. Clear previous chat history
    // 2. Add loading state when loading chat history

    if (sessionId) {
      void fetchChatHistory(sessionId);
    }
  }, [sessionId]);

  console.log('History: ', chatHistory);

  useEffect(() => {
    return () => {
      chatHistoryController.current?.abort(
        'Abort: Component unmounted due to the component being removed from the DOM.'
      );
    };
  });

  return (
    <div
      className={cn(
        'space-y-4 flex flex-col w-full',
        userContext?.getBasePath() === ''
          ? 'h-full max-h-[91vh]'
          : 'h-dvh max-h-dvh'
      )}
    >
      <section
        id='chat_history'
        className={cn('flex-grow flex-col overflow-y-scroll')}
      >
        <div className='flex-grow px-4 pt-4 h-full'>
          <ChatHistory history={chatHistory} />
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
