import { DocsLayout } from "@/components/DocsLayout";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Info } from "lucide-react";

export default function Docs() {
  return (
    <DocsLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-4">Documentation</h1>
          <p className="text-lg text-muted-foreground">
            Technical documentation and guides for HDT Framework.
          </p>
        </div>

        <Alert>
          <Info className="h-4 w-4" />
          <AlertTitle>Under Construction</AlertTitle>
          <AlertDescription>
            Detailed technical documentation is currently being prepared. Please check back later or refer to the Project Facts page for contact information.
          </AlertDescription>
        </Alert>

        <div className="prose prose-slate dark:prose-invert max-w-none">
          <h3>Coming Soon</h3>
          <ul>
            <li>Installation Guide</li>
            <li>Configuration Reference</li>
            <li>API Documentation</li>
            <li>Training Tutorials</li>
          </ul>
        </div>
      </div>
    </DocsLayout>
  );
}
