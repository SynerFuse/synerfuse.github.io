import { Card, CardContent } from "@/components/ui/card";

export default function Introduction() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="space-y-4">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-primary">
          SynerFuse
        </h1>
        <p className="text-xl text-muted-foreground leading-relaxed">
          A cross-architecture unified heterogeneous training framework for Large Language Models.
        </p>
        <div className="flex gap-2">
          <img src="https://bestpractices.coreinfrastructure.org/projects/9748/badge" alt="OpenSSF Best Practices" />
        </div>
      </div>

      <div className="space-y-8">
        <section className="space-y-4">
          <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
            Latest News
          </h2>
          <ul className="list-disc list-inside space-y-2 text-lg leading-7">
            <li>
              <strong>[2025/6]</strong> SynerFuse publishes framework of Release 1.0, which can provide heterogeneous pipeline parallelism and heterogeneous data parallelism capabilities.
            </li>
            <li>
              <strong>[2025/5]</strong> China Mobile has established the repository for SynerFuse and obtained the OpenSSF certification badge.
            </li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight">
            SynerFuse Overview
          </h2>
          <p className="text-lg leading-7">
            Currently, the "resource wall" between different GPUs makes it difficult to build one heterogeneous resource pool for Large-scale models training. Heterogeneous distributed training becomes a pressing challenge for the industry to solve. We brought up a cross-architecture unified heterogeneous training framework <strong>SynerFuse</strong> to deal with the problem.
          </p>
          <p className="text-lg leading-7">
            SynerFuse enables multiple LLMs deployed and trained on multiple types of GPUs. The <strong>Inhomogeneous Task Distribution (ITD)</strong> algorithm for heterogeneous training task splitting is innovatively proposed, which supports heterogeneous data parallelism (DP) and heterogeneous pipeline parallelism (PP), and realizes the adaptive adjustment of parameters such as size and number of micro batches in DP, stages and layers in PP on heterogeneous GPUs.
          </p>
          
          <Card className="my-6 bg-muted/50 border-none">
            <CardContent className="pt-6">
              <p className="font-medium mb-2 text-lg">Performance Verification</p>
              <p className="text-base text-muted-foreground">
                We've verified our capability on Nvidia and other 4 types of GPUs. The acceleration ratio reached 95%, loss converges to 1.8 and PPL curve converged normally.
              </p>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
}
