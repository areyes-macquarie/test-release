'use client';

import UserContext from '@/contexts/user/user-context';
import useCustomerInsightsApiClient from '@/hooks/use-customer-insights-api-client';
import { cn } from '@/lib/utils';
import { ReactNode, useContext, useEffect, useState } from 'react';
import { ChatBox } from './chat-box';
import { ChatHistory } from './chat-history';

export function ChatSection() {
  const { apiClient } = useCustomerInsightsApiClient();
  const [_currentResponse, setCurrentResponse] = useState<string>('');
  const [chatHistory, setChatHistory] = useState<ReactNode[]>([]);
  const decoder = new TextDecoder('utf-8');
  const userContext = useContext(UserContext);
  const [abortController, setAbortController] =
    useState<AbortController | null>(null);

  const sendPrompt = async (prompt: string) => {
    if (!prompt) return;

    // Cancel any ongoing request
    if (abortController) {
      abortController.abort('New request sent.');
      setChatHistory((prevHistory) => [
        ...prevHistory,
        <div
          className='text-xs text-muted-foreground rounded-2xl ml-auto w-fit'
          key={prevHistory.length}
        >
          <span>Previous prompt was aborted.</span>
        </div>,
      ]);
    }

    // Add the prompt to history
    setChatHistory((prevHistory) => [
      ...prevHistory,
      <div
        className='bg-stone-200 dark:bg-stone-700 max-w-[90%] lg:max-w-[70%] px-4 py-2 w-fit rounded-2xl ml-auto'
        key={prevHistory.length}
      >
        {prompt}
      </div>,
    ]);

    const newAbortController = new AbortController();
    setAbortController(newAbortController);

    try {
      const reader = await apiClient.sendChatMessage(
        prompt,
        newAbortController.signal
      );

      if (!reader) return;

      let done = false;
      let response = '';

      // This will act as a separator
      setChatHistory((prevHistory) => [...prevHistory, <div></div>]);

      // Read the stream
      while (!done) {
        const { value, done: doneReading } = await reader.read();
        done = doneReading;
        if (value) {
          const chunk = decoder.decode(value, { stream: true });
          response += chunk.replaceAll('data: ', '');

          setTimeout(() => {
            updateRecentHistoryItem(
              <div className='bg-blue-600 text-white max-w-[90%] lg:max-w-[70%] px-4 py-2 w-fit rounded-2xl mr-auto'>
                {response}
              </div>
            );

            setCurrentResponse(
              (prevState) => prevState + chunk.replaceAll('data: ', '')
            );

            scrollToBottom();
          }, 5);
        }
      }
    } catch (error) {
      console.error('Error reading from stream:', error);
      // setChatHistory((prevHistory) => [
      //   ...prevHistory,
      //   <div
      //     className='text-xs text-red-500 max-w-[70%] p-4 w-fit rounded-2xl mx-auto'
      //     key={prevHistory.length}
      //   >
      //     Sorry, unable to process your request at this moment.
      //   </div>,
      // ]);
    } finally {
      setAbortController(null);
    }
  };

  const updateRecentHistoryItem = (value: ReactNode) => {
    setChatHistory((prevHistory) => {
      const newHistory = prevHistory;
      newHistory[prevHistory.length - 1] = value;
      return newHistory;
    });
  };

  const scrollToBottom = () => {
    const node = document.getElementById('chat_history');
    if (node !== null) {
      node.scrollTop = node.scrollHeight;
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
        'space-y-4 flex flex-col',
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
