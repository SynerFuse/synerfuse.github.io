import { DocsLayout } from "@/components/DocsLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Cpu, GitBranch, Layers, Zap } from "lucide-react";
import { Link } from "wouter";

export default function Home() {
  return (
    <DocsLayout>
      <div className="space-y-10">
        {/* Hero Section */}
        <section className="space-y-6">
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl text-foreground">
            Heterogeneous Distributed Training Framework
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl">
            The industry's first cross-architecture unified heterogeneous training framework. 
            Train Large Language Models across different GPU types with high efficiency.
          </p>
          <div className="flex flex-wrap gap-4 pt-2">
            <Link href="/technology/hdt">
              <Button size="lg" className="gap-2">
                Get Started <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/facts">
              <Button variant="outline" size="lg">
                Project Facts
              </Button>
            </Link>
          </div>
        </section>

        {/* Key Features Grid */}
        <section className="grid md:grid-cols-2 gap-6 pt-8">
          <Card>
            <CardHeader>
              <Cpu className="h-10 w-10 text-primary mb-2" />
              <CardTitle>Cross-Architecture</CardTitle>
              <CardDescription>
                Unified training across Nvidia and other GPU types
              </CardDescription>
            </CardHeader>
            <CardContent>
              Break the "resource wall" between different GPUs. Build one heterogeneous resource pool for Large-scale models training.
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <Zap className="h-10 w-10 text-primary mb-2" />
              <CardTitle>High Performance</CardTitle>
              <CardDescription>
                95% acceleration ratio on LLaMA2 models
              </CardDescription>
            </CardHeader>
            <CardContent>
              Verified capability on LLaMA2 7B & 13B models. Loss converges to 1.8 and PPL curve converges normally.
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Layers className="h-10 w-10 text-primary mb-2" />
              <CardTitle>ITD Algorithm</CardTitle>
              <CardDescription>
                Inhomogeneous Task Distribution
              </CardDescription>
            </CardHeader>
            <CardContent>
              Adaptive adjustment of microbatches size, quantity, and parallelism. Supports heterogeneous data and pipeline parallelism.
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <GitBranch className="h-10 w-10 text-primary mb-2" />
              <CardTitle>Open Source</CardTitle>
              <CardDescription>
                Community driven development
              </CardDescription>
            </CardHeader>
            <CardContent>
              Join the community to contribute to the future of heterogeneous distributed training technology.
            </CardContent>
          </Card>
        </section>

        {/* Introduction Content */}
        <section className="prose prose-slate dark:prose-invert max-w-none pt-8">
          <h2>Introduction</h2>
          <p>
            Currently, the "resource wall" between different GPUs makes it difficult to build one heterogeneous resource pool for Large-scale models training. Heterogeneous distributed training becomes a pressing challenge for the industry to solve. We brought up the key technologies named <strong>Heterogeneous Distributed Training Technology (HDT)</strong>.
          </p>
          <p>
            With the goal of generalization, this technology realizes the industry's first cross-architecture unified heterogeneous training framework. The training framework enables multiple LLMs deployed and trained on multiple types of GPUs.
          </p>
          <p>
            The <strong>Inhomogeneous Task Distribution (ITD)</strong> algorithm for heterogeneous training task splitting is innovatively proposed, which supports heterogeneous data parallelism and heterogeneous pipeline parallelism, and realizes the adaptive adjustment of parameters such as microbatches size, quantity, and parallelism of DP on heterogeneous GPUs.
          </p>
        </section>
      </div>
    </DocsLayout>
  );
}
