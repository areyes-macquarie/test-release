'use client';

import { Metadata } from 'next';
import { useContext, useEffect, useState } from 'react';
import { getAllReleaseNotes } from './actions';
import { ReleaseNote } from '@/lib/release-notes/get-release-notes';
import UserContext from '@/contexts/user/user-context';
import { markdownToHtml } from '@/lib/release-notes/markdown-to-html';
import Tags from './_components/tags';
import Notes from './_components/notes';

export const metadata: Metadata = {
  title: 'Release - MTG',
  description: 'Macquarie Technology Group.',
};

interface ReleaseNoteWithHtml extends ReleaseNote {
  contentHtml: string;
}

function ReleasePage() {
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
    <div className='min-h-full px-4 py-6 lg:px-8'>
      {releaseNotes.map((notes) => (
        <div key={notes.version} className='flex flex-row justify-center mb-8'>
          <Tags {...notes} />
          <Notes contentHtml={notes.contentHtml} />
        </div>
      ))}
    </div>
  );
}

export default ReleasePage;
