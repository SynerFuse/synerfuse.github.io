import { DocsLayout } from "@/components/DocsLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Calendar, Mail, Users } from "lucide-react";

export default function Facts() {
  return (
    <DocsLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-4">Project Facts</h1>
          <p className="text-lg text-muted-foreground">
            Key information about the Heterogeneous Distributed Training Framework project.
          </p>
        </div>

        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-primary" />
                Project Timeline
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <div className="text-sm font-medium text-muted-foreground">Creation Date</div>
                  <div className="text-lg font-semibold">March 20th, 2025</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                Team & Contributors
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="font-semibold mb-2">Project Lead</h3>
                <div className="flex items-center gap-2">
                  <span>Lei Huang</span>
                  <span className="text-muted-foreground text-sm">&lt;huangleiyjy@chinamobile.com&gt;</span>
                </div>
              </div>
              
              <Separator />
              
              <div>
                <h3 className="font-semibold mb-2">Primary Contacts</h3>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <span>Lei Huang</span>
                    <span className="text-muted-foreground text-sm">&lt;huangleiyjy@chinamobile.com&gt;</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span>Zhengwei Chen</span>
                    <span className="text-muted-foreground text-sm">&lt;chenzhengwei@sd.chinamobile.com&gt;</span>
                  </li>
                </ul>
              </div>

              <Separator />

              <div>
                <h3 className="font-semibold mb-2">Committers</h3>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <span>Zhengwei Chen</span>
                    <span className="text-muted-foreground text-sm">&lt;chenzhengwei@sd.chinamobile.com&gt;</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span>Yutong Tian</span>
                    <span className="text-muted-foreground text-sm">&lt;tianyutongcxy@sd.chinamobile.com&gt;</span>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5 text-primary" />
                Communication
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="text-sm font-medium text-muted-foreground mb-1">Mailing List</div>
                <a href="mailto:computing-force-network@lists.opendev.org" className="text-primary hover:underline">
                  computing-force-network@lists.opendev.org
                </a>
              </div>
              
              <div>
                <div className="text-sm font-medium text-muted-foreground mb-1">Meetings</div>
                <p>No sub-group meeting time. Use bi-weekly meeting of CFN WG.</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DocsLayout>
  );
}
