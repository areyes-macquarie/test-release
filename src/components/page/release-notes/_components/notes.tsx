import { ReleaseNoteWithHtml } from '..';
import Note from './note';
import NotesLoader from './notes-loader';

type Props = {
  notes: ReleaseNoteWithHtml[];
  loading?: boolean;
};

function Notes({ notes, loading }: Props) {
  return (
    <div className='flex flex-col items-center p-6 gap-7'>
      {loading && <NotesLoader />}
      {notes.map(({ version, contentHtml }) => (
        <Note key={version} version={version} contentHtml={contentHtml} />
      ))}
    </div>
  );
}

Notes.displayName = 'ReleaseNotes.Notes';

export default Notes;
