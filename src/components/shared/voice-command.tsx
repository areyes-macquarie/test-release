'use client';

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import useSpeechRecognition from '@/hooks/use-speech-recognition';
import { cn } from '@/lib/utils';
import { MicIcon, MicOffIcon } from 'lucide-react';
import { useEffect } from 'react';
import { Button } from '../ui/button';

type Props = {
  commandUpdated?: (_value: string) => void;
};

export function VoiceCommand({ ...props }: Props) {
  const {
    text,
    isListening,
    startListening,
    stopListening,
    hasRecognitionSupport,
  } = useSpeechRecognition();

  useEffect(() => {
    props.commandUpdated?.(text);
  }, [text]);

  return hasRecognitionSupport ? (
    <>
      <Button
        onClick={() => (isListening ? stopListening() : startListening())}
        className={cn('rounded-full aspect-square p-0 size-8')}
        variant='secondary'
      >
        <MicIcon className={cn('size-4', isListening ? 'text-red-500' : '')} />
      </Button>
    </>
  ) : (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            className={cn('rounded-full aspect-square p-0 size-8')}
            variant='secondary'
          >
            <MicOffIcon className='size-4 text-muted-foreground' />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p className='text-xs'>{`Speech recognition not supported in this browser.`}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
