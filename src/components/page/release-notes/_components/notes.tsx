import { Card, CardDescription, CardHeader } from "@/components/ui/card";

function Tags({ contentHtml }: { contentHtml: string }) {
  return (
    <div className="w-2/3">
      <Card className="w-2/3">
        <CardHeader>
          <CardDescription>
            <div dangerouslySetInnerHTML={{ __html: contentHtml }}></div>
          </CardDescription>
        </CardHeader>
      </Card>
    </div>
  );
}

export default Tags;
