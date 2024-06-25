import CopyButton from '@/components/shared/copy-button';
import ChatHistoryContext from '@/contexts/mac-chat/history/history-context';
import { ChatHistory } from '@/lib/customer-insights/types';
import Image from 'next/image';
import { ReactNode, useContext, useId } from 'react';

type Params = {
  historyModified?: () => void;
};

function useHistory({ historyModified }: Params) {
  const id = useId();
  const context = useContext(ChatHistoryContext);

  if (!context) {
    throw new Error('useHistory() mush be called within ChatHistoryProvider');
  }

  const addUserPrompt = (prompt: string) => {
    context.setChatHistory((prevHistory) => [
      ...prevHistory,
      <div
        className='bg-stone-200 dark:bg-stone-700 max-w-[90%] lg:max-w-[70%] px-4 py-2 w-fit rounded-2xl ml-auto'
        key={prevHistory?.length}
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
      context.setChatHistory((prevHistory) => [
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
    context.setChatHistory((prevHistory) => {
      const newHistory = prevHistory;
      newHistory[prevHistory.length - 1] = value;
      return newHistory;
    });
  };

  const addSystemMessage = (message: string) => {
    context.setChatHistory((prevHistory) => [
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
    context.setChatHistory((prevHistory) => [
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
    context.setChatHistory([]);
  };

  const storeHistory = (chatHistory: ChatHistory[]) => {
    resetHistory();
    console.log(chatHistory);
    chatHistory.map((conversation) => {
      console.log(conversation);
      //   if (conversation.sender === 'bot') {
      //     addBotReply(conversation.message, true);
      //   } else {
      addUserPrompt(conversation.message);
      historyModified?.();
      //   }
    });
  };

  return {
    ...context,
    addUserPrompt,
    addBotReply,
    addErrorMessage,
    addSystemMessage,
    storeHistory,
  };
}

export default useHistory;
