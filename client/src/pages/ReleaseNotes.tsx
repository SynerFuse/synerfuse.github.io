import { DocsLayout } from "@/components/DocsLayout";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ReleaseNotes() {
  return (
    <DocsLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-4">Release Planning & Notes</h1>
          <p className="text-lg text-muted-foreground">
            Roadmap and release information for the Heterogeneous Distributed Training Framework.
          </p>
        </div>

        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <h2 className="text-2xl font-semibold">2025 Roadmap</h2>
            <Badge variant="secondary">Current</Badge>
          </div>

          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>1. Heterogeneous Distributed Training Technology Solution</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Comprehensive introduction of HDT technology solution, including:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>User Guide</li>
                  <li>Architecture Description</li>
                  <li>Software Components</li>
                  <li>Integration Guides</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>2. Future Developments</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Additional features and improvements (To Be Determined).
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="prose prose-slate dark:prose-invert max-w-none pt-8">
            <h3>Current Status</h3>
            <p>
              We have verified our capability on LLaMA2 7B & 13B model composed of Nvidia and other 4 types GPUs. 
              The acceleration ratio reached 95%, loss converges to 1.8 and PPL curve converged normally.
            </p>
          </div>
        </div>
      </div>
    </DocsLayout>
  );
}
