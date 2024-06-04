import { ReleaseNote } from '@/lib/release-notes/get-release-notes';
import { TagIcon } from 'lucide-react';

function Tags({ version, content = '' }: ReleaseNote) {
  return (
    <div className='w-1/3 p-8 text-right flex flex-col gap-2'>
      <h5 className='text-white'>{content.match(/`(.*)`/)?.pop()}</h5>
      <div className='flex justify-end items-center'>
        <TagIcon className='size-4 mr-1' />
        <span className='text-sm'>{version}</span>
      </div>
    </div>
  );
}

export default Tags;
