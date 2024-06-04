import { Card, CardDescription, CardHeader } from '@/components/ui/card';

type Props = {
  contentHtml: string;
  version: string;
};

function Notes({ contentHtml, version }: Props) {
  return (
    <div id={`#${version}`} className='w-2/3 p-5'>
      <Card className='w-full'>
        <CardHeader>
          <CardDescription>
            <div dangerouslySetInnerHTML={{ __html: contentHtml }}></div>
          </CardDescription>
        </CardHeader>
      </Card>
    </div>
  );
}

Notes.displayName = 'ReleaseNotes.Notes';

export default Notes;
