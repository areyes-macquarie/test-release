'use client';

import { Metadata } from 'next';
import { useContext, useEffect, useMemo, useState } from 'react';
import { getAllReleaseNotes } from './actions';
import { ReleaseNote } from '@/lib/release-notes/get-release-notes';
import UserContext from '@/contexts/user/user-context';
import { markdownToHtml } from '@/lib/release-notes/markdown-to-html';
import Tags from './_components/tags';
import Notes from './_components/notes';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

export const metadata: Metadata = {
  title: 'Release - MTG',
  description: 'Macquarie Technology Group.',
};

export interface ReleaseNoteWithHtml extends ReleaseNote {
  contentHtml: string;
}

type Props = {
  webpage?: boolean;
};

function ReleasePage({ webpage = false }: Props) {
  const userContext = useContext(UserContext);
  const [releaseNotes, setReleaseNotes] = useState<ReleaseNoteWithHtml[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    getAllReleaseNotes()
      .then((res) => {
        convertToNotesWithHtml(res)
          .then((result) => {
            setLoading(false);
            setReleaseNotes(result);
          })
          .catch((err) => {
            throw err;
          });
      })
      .catch(() => {
        toast.error(
          'Something unexpected occured while retrieving followed release notes.'
        );
      });
  }, []);

  async function convertToNotesWithHtml(notes: ReleaseNote[]) {
    const notesWithHtml = await Promise.all(
      notes.map(async (note) => {
        const contentHtml = await markdownToHtml(note.content, {
          urlBasePath: userContext?.getBasePath(),
        });
        return {
          ...note,
          contentHtml,
        };
      })
    );

    return notesWithHtml;
  }

  const versions = useMemo(() => {
    return releaseNotes.map(({ version }) => version);
  }, [releaseNotes]);

  return (
    <div className='grid lg:grid-cols-6 flex-grow'>
      <ScrollArea
        className={cn('w-full', webpage ? 'h-[calc(100vh-65px)]' : 'h-screen')}
      >
        <Tags
          className='hidden lg:flex'
          versions={versions}
          loading={loading}
        />
      </ScrollArea>
      <div className='col-span-4 lg:col-span-5 lg:border-l overflow-x-auto'>
        <ScrollArea
          className={cn(
            'w-full',
            webpage ? 'h-[calc(100vh-65px)]' : 'h-screen'
          )}
        >
          <Notes notes={releaseNotes} loading={loading} />
        </ScrollArea>
      </div>
    </div>
  );
}

ReleasePage.displayName = 'ReleaseNotes';

export default ReleasePage;
