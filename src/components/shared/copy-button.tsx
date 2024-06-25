import copyToClipboard from '@/services/shared/helpers/copy-to-clipboard';
import { CheckIcon, CopyIcon } from 'lucide-react';
import { useState } from 'react';
import { Button } from '../ui/button';

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

export default CopyButton;
