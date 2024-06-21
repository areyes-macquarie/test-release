'use client';

import UserContext from '@/contexts/user/user-context';
import useChatHistory from '@/hooks/use-chat-history';
import useCustomerInsightsApiClient from '@/hooks/use-customer-insights-api-client';
import { cn } from '@/lib/utils';
import { useContext, useEffect, useState } from 'react';
import { ChatBox } from './chat-box';
import { ChatHistory } from './chat-history';

export function ChatSection() {
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

  const sendPrompt = async (prompt: string) => {
    if (!prompt) return;

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
      const reader = await apiClient.sendChatMessage(
        prompt,
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

  useEffect(() => {
    if (chatHistory.length > 0) {
      scrollToBottom();
    }
  }, [chatHistory]);

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
