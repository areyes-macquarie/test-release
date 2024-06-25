import { BotMessageSquareIcon } from 'lucide-react';
import { ReactNode } from 'react';

type Props = {
  history: ReactNode[];
};

export function ChatHistory({ ...props }: Props) {
  console.log('PROPS: ', props.history);
  return (
    <div className='w-full h-auto justify-end'>
      {props.history.length > 0 ? (
        <div className='space-y-4 text-sm'>
          {props.history.map((value) => value)}
        </div>
      ) : (
        <div className='h-full m-auto flex flex-col py-24 gap-2'>
          <BotMessageSquareIcon className='text-blue-600 size-48 mx-auto my-auto' />
          <span className='text-muted-foreground font-extrabold text-xl font-mono mx-auto'>
            Hello, How may I help you today?
          </span>
        </div>
      )}
    </div>
  );
}
