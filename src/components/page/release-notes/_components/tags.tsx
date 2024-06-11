'use client';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { TagIcon } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import TagsLoader from './tags-loader';
import useEnvVars from '@/hooks/use-env-vars';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  versions: string[];
  loading?: boolean;
}

function Tags({ className, versions, loading }: Props) {
  const { appVersion } = useEnvVars();

  const scrollIntoView = (version: string) => {
    document.getElementById(`#${version}`)?.scrollIntoView({
      behavior: 'smooth',
    });
  };

  return (
    <div
      className={cn('pb-6 min-h-[calc(100dvh-65px)] flex flex-col', className)}
    >
      <div className='space-y-4 py-4'>
        <div className='px-3 py-2'>
          <h2 className='mb-2 px-4 text-lg font-semibold tracking-tight'>
            Tags
          </h2>
          <div className='space-y-1'>
            {loading && <TagsLoader />}

            {versions.map((version) => (
              <Button
                key={`tag-${version}`}
                onClick={() => scrollIntoView(version)}
                variant={'ghost'}
                className='w-full justify-start'
              >
                <TagIcon className='size-4 mr-2.5' />
                {version}

                {version === `v${appVersion}` && (
                  <Badge variant='outline' className='ml-2 bg-green-600'>
                    Latest
                  </Badge>
                )}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

Tags.displayName = 'ReleaseNotes.Tags';

export default Tags;
