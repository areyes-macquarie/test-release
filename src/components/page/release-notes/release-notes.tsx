'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import UserContext from '@/contexts/user/user-context';
import { ReleaseNote } from '@/lib/release-notes/get-release-notes';
import { markdownToHtml } from '@/lib/release-notes/markdown-to-html';
import { ReactNode, useContext, useEffect, useState } from 'react';
import { getAllReleaseNotes } from './actions';

interface ReleaseNoteWithHtml extends ReleaseNote {
  contentHtml: string;
}

type Props = {
  children?: ReactNode;
};

export function ReleaseNotesDialog({ ...props }: Props) {
  const userContext = useContext(UserContext);
  const [releaseNotes, setReleaseNotes] = useState<ReleaseNoteWithHtml[]>([]);

  useEffect(() => {
    getAllReleaseNotes()
      .then((res) => {
        convertToNotesWithHtml(res)
          .then((result) => {
            setReleaseNotes(result);
          })
          .catch(() => {});
      })
      .catch(() => {});
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

  return (
    <Dialog>
      <DialogTrigger asChild>{props.children}</DialogTrigger>
      <DialogContent className='max-w-3xl w-fit max-h-[80%] flex flex-col'>
        <DialogHeader>
          <DialogTitle>Release Notes</DialogTitle>
          <DialogDescription>Here are the latest changes.</DialogDescription>
        </DialogHeader>
        <div className='flex items-center space-x-2'>
          <div className='flex-grow overflow-y-auto max-h-96 min-w-96'>
            {releaseNotes.map((notes) => (
              <div
                key={notes.version}
                dangerouslySetInnerHTML={{ __html: notes?.contentHtml }}
              ></div>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
