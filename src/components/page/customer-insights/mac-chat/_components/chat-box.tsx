'use client';

import { VoiceCommand } from '@/components/shared/voice-command';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { isEmpty } from '@/services/shared/helpers';
import { CircleStopIcon, SendIcon } from 'lucide-react';
import { KeyboardEvent, useRef } from 'react';

type Props = {
  sendMessage?: (_value: string) => void;
  abort?: () => void;
  processing?: boolean;
};

export function ChatBox({ ...props }: Props) {
  const searchInputRef = useRef<HTMLTextAreaElement>(null);

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    if (!searchInputRef.current || isEmpty(searchInputRef.current.value)) {
      return;
    }

    props.sendMessage?.(searchInputRef.current.value);
    searchInputRef.current.value = '';
    searchInputRef.current.focus();
  };

  return (
    <div className='bg-stone-200 dark:bg-stone-700 rounded-full flex gap-2'>
      <div className='my-auto ml-1'>
        <VoiceCommand
          commandUpdated={(value) => {
            if (!searchInputRef.current || isEmpty(value)) {
              return;
            }

            searchInputRef.current.value = value;
            searchInputRef.current.focus();
          }}
        />
      </div>
      <Textarea
        disabled={props.processing}
        placeholder={
          props.processing
            ? `I'm thinking, please wait...`
            : 'What do you want to know?'
        }
        onKeyDown={handleKeyDown}
        ref={searchInputRef}
        className='mx-0 px-0 min-h-[40px] h-[40px] resize-none bg-transparent border-none active:ring-0 focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0'
      />
      <div className='my-auto mr-1'>
        <Button
          onClick={() => {
            if (props.processing) {
              props.abort?.();
              return;
            }
            if (!searchInputRef.current) return;

            if (isEmpty(searchInputRef.current.value.trim())) {
              searchInputRef.current.value = '';
              searchInputRef.current.focus();
              return;
            }

            props.sendMessage?.(searchInputRef.current.value);
            searchInputRef.current.value = '';
            searchInputRef.current.focus();
          }}
          type='button'
          variant='ghost'
          className='rounded-full size-8 aspect-square'
        >
          {props.processing ? (
            <CircleStopIcon className='size-6 min-w-6' />
          ) : (
            <SendIcon className='size-4 min-w-5' />
          )}
        </Button>
      </div>
    </div>
  );
}
