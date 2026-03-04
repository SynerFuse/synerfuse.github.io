import { Card, CardContent } from "@/components/ui/card";

export default function Architecture() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="space-y-4">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-primary">
          Architecture
        </h1>
        <p className="text-xl text-muted-foreground leading-relaxed">
          Understand the core components and design of SynerFuse.
        </p>
      </div>

      <div className="space-y-8">
        <section className="space-y-4">
          <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight">
            System Overview
          </h2>
          <p className="text-lg leading-7">
            SynerFuse is designed to break the "resource wall" in heterogeneous computing environments. The architecture consists of several key components that work together to enable efficient distributed training across different types of GPUs.
          </p>
          
          {/* Architecture Diagram */}
          <div className="my-8">
            <div className="rounded-lg border bg-card text-card-foreground shadow-sm overflow-hidden">
              <div className="p-6 flex flex-col items-center space-y-4">
                {/* 
                  TODO: Replace the src below with your actual image path.
                  Example: src="/images/architecture-diagram.png" 
                */}
                <img 
                  src="/images/architecture-diagram.png" 
                  alt="SynerFuse Architecture Diagram" 
                  className="w-full max-w-5xl rounded-md shadow-sm"
                />
                <p className="text-sm text-muted-foreground italic">
                  Figure 1: High-level architecture of SynerFuse framework
                </p>
              </div>
            </div>
          </div>

          <p className="text-lg leading-7">
            The system leverages the <strong>Inhomogeneous Task Distribution (ITD)</strong> algorithm to dynamically allocate training tasks based on the computational capabilities of each device in the cluster.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight">
            Key Components
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold text-xl mb-2">Task Scheduler</h3>
                <p className="text-muted-foreground">
                  Responsible for analyzing the cluster topology and distributing micro-batches to workers.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold text-xl mb-2">Communication Layer</h3>
                <p className="text-muted-foreground">
                  Handles efficient data transfer between heterogeneous devices using optimized collectives.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </div>
  );
}
