import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { SquarePenIcon } from 'lucide-react';
import SessionButton from './session-button';

function NewChat() {
  return (
    <TooltipProvider delayDuration={0}>
      <Tooltip>
        <TooltipTrigger asChild>
          <div>
            <SessionButton path={''} variant='ghost' size='icon'>
              <SquarePenIcon className='size-5' />
            </SessionButton>
          </div>
        </TooltipTrigger>
        <TooltipContent side='bottom'>
          <p>New Chat</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

export default NewChat;
