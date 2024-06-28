'use client';

import CopyButton from '@/components/shared/copy-button';
import Image from 'next/image';
import { ReactNode, useState } from 'react';

type Params = {
  historyModified?: () => void;
};

function useChatHistory({ historyModified }: Params) {
  const id = Date.now();
  const [chatHistory, setChatHistory] = useState<ReactNode[]>([]);

  const addUserPrompt = (prompt: string) => {
    setChatHistory((prevHistory) => [
      ...prevHistory,
      <div
        className='bg-stone-200 dark:bg-stone-700 max-w-[90%] lg:max-w-[70%] px-4 py-2 w-fit rounded-2xl ml-auto'
        key={prevHistory.length}
      >
        {prompt}
      </div>,
    ]);
  };

  const addBotReply = (reply: string, isUpdate: boolean) => {
    if (isUpdate) {
      setTimeout(() => {
        updateRecentHistoryItem(
          <div className='space-y-3'>
            <div key={id} className='flex gap-2'>
              <div className='rounded-full size-8 aspect-square overflow-hidden'>
                <Image
                  src='/chat-ai-logo.jpeg'
                  alt='mac chat'
                  width={200}
                  height={200}
                />
              </div>
              <div className='bg-blue-600 text-white max-w-[90%] lg:max-w-[70%] px-4 py-2 w-fit rounded-2xl mr-auto'>
                {reply}
              </div>
            </div>
            <div className='flex gap-3 pl-10'>
              <CopyButton key={id} message={reply} />
            </div>
          </div>
        );

        historyModified?.();
      }, 5);
    } else {
      setChatHistory((prevHistory) => [
        ...prevHistory,
        <div key={id} className='flex gap-2'>
          <div className='rounded-full size-8 aspect-square overflow-hidden'>
            <Image
              src='/chat-ai-logo.jpeg'
              alt='mac chat'
              width={200}
              height={200}
            />
          </div>
          <div className='bg-blue-600 text-white max-w-[90%] lg:max-w-[70%] px-4 py-2 w-fit rounded-2xl mr-auto'>
            {reply}
          </div>
        </div>,
      ]);
    }
  };

  const updateRecentHistoryItem = (value: ReactNode) => {
    setChatHistory((prevHistory) => {
      const newHistory = prevHistory;
      newHistory[prevHistory.length - 1] = value;
      return newHistory;
    });
  };

  const addSystemMessage = (message: string) => {
    setChatHistory((prevHistory) => [
      ...prevHistory,
      <div
        className='text-xs text-muted-foreground rounded-2xl ml-auto w-fit'
        key={prevHistory.length}
      >
        <span>{message}</span>
      </div>,
    ]);
  };

  const addErrorMessage = (message: string) => {
    setChatHistory((prevHistory) => [
      ...prevHistory,
      <div key={id} className='flex gap-2'>
        <div className='rounded-full size-8 aspect-square overflow-hidden'>
          <Image
            src='/chat-ai-logo.jpeg'
            alt='mac chat'
            width={200}
            height={200}
          />
        </div>
        <div className='bg-destructive text-white max-w-[90%] lg:max-w-[70%] px-4 py-2 w-fit rounded-2xl mr-auto'>
          {message}
        </div>
      </div>,
    ]);
  };

  const resetHistory = () => {
    setChatHistory([]);
  };

  return {
    chatHistory,
    addUserPrompt,
    addBotReply,
    addSystemMessage,
    addErrorMessage,
    resetHistory,
  };
}

export default useChatHistory;
