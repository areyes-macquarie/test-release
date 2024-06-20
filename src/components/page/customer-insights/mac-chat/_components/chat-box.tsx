'use client';

import { VoiceCommand } from '@/components/shared/voice-command';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import hasValue from '@/services/shared/helpers/has-value';
import isEmpty from '@/services/shared/helpers/is-empty';
import { ArrowUpIcon, CircleStopIcon } from 'lucide-react';
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
    if (!searchInputRef.current) {
      return;
    }

    if (props.processing) {
      props.abort?.();
      return;
    }

    if (hasValue(searchInputRef.current.value.trim())) {
      props.sendMessage?.(searchInputRef.current.value);
    }

    searchInputRef.current.value = '';
    searchInputRef.current.focus();
  };

  return (
    <div className='bg-stone-200 dark:bg-stone-700 rounded-3xl flex gap-2 h-fit py-1'>
      <div className='mt-auto ml-1 mb-1'>
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
        autoFocus
        placeholder={props.processing ? `Please wait...` : 'Message MacChat'}
        onKeyDown={handleKeyDown}
        onInput={(e) => {
          if (!searchInputRef.current) {
            return;
          }

          const textArea = searchInputRef.current;
          textArea.style.height = '';
          textArea.style.height = textArea.scrollHeight + 'px';
        }}
        ref={searchInputRef}
        className='mx-0 px-0 h-[40px] min-h-[40px] max-h-[140px] resize-none bg-transparent border-none active:ring-0 focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0'
      />
      <div className='mt-auto mr-1 mb-1'>
        <Button
          onClick={handleSubmit}
          type='button'
          variant={props.processing ? 'ghost' : 'secondary'}
          className='rounded-full size-8 aspect-square'
        >
          {props.processing ? (
            <CircleStopIcon className='size-6 min-w-6' />
          ) : (
            <ArrowUpIcon className='size-4 min-w-6' />
          )}
        </Button>
      </div>
    </div>
  );
}
