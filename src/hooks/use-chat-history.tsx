'use client';

import { Button } from '@/components/ui/button';
import copyToClipboard from '@/services/shared/helpers/copy-to-clipboard';
import { CheckIcon, CopyIcon } from 'lucide-react';
import Image from 'next/image';
import { Fragment, ReactNode, useId, useState } from 'react';

type Params = {
  historyModified?: () => void;
};

function useChatHistory({ historyModified }: Params) {
  const id = useId();
  const [chatHistory, setChatHistory] = useState<ReactNode[]>([]);

  const addUserPrompt = (prompt: string) => {
    setChatHistory((prevHistory) => [
      ...prevHistory,
      <div
        className='bg-stone-200 dark:bg-stone-700 max-w-[90%] lg:max-w-[70%] px-4 py-2 w-fit rounded-2xl ml-auto'
        key={prevHistory.length}
      >
        {prompt.split('\n').map((line, index) => (
          <Fragment key={index}>
            {line}
            <br />
          </Fragment>
        ))}
      </div>,
    ]);
  };

  const addBotReply = (reply: string, isUpdate: boolean) => {
    setTimeout(() => {
      if (isUpdate) {
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
              {reply.split('\n').map((line, index) => (
                <Fragment key={index}>
                  {line}
                  <br />
                </Fragment>
              ))}
            </div>
          </div>,
        ]);
      }
    }, 5);
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

  return {
    chatHistory,
    addUserPrompt,
    addBotReply,
    addSystemMessage,
    addErrorMessage,
  };
}

const CopyButton = ({ message }: { message: string }) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopyClick = () => {
    copyToClipboard(message)
      .then(() => {
        setIsCopied(true);

        setTimeout(() => {
          setIsCopied(false);
        }, 1000); // Reset after 2 seconds
      })
      .catch(() => {});
  };

  return (
    <Button
      variant='ghost'
      className='rounded-full aspect-square size-8 text-muted-foreground hover:text-foreground'
      onClick={handleCopyClick}
    >
      {isCopied ? (
        <CheckIcon className='size-3.5 min-w-3.5' />
      ) : (
        <CopyIcon className='size-3.5 min-w-3.5' />
      )}
    </Button>
  );
};

export default useChatHistory;
