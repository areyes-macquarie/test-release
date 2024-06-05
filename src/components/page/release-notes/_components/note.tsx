type Props = {
  contentHtml: string;
  version: string;
};

function Note({ contentHtml, version }: Props) {
  return (
    <div
      id={`#${version}`}
      className='w-full px-5 pt-0 pb-8 border-muted border-b last:border-0'
    >
      <div dangerouslySetInnerHTML={{ __html: contentHtml }}></div>
    </div>
  );
}

Note.displayName = 'ReleaseNotes.Note';

export default Note;
