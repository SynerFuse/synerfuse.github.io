
export default function AdvancedExpertParallelism() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="space-y-4">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-primary">
          Heterogeneous Expert Parallelism
        </h1>
        <p className="text-xl text-muted-foreground leading-relaxed">
          Optimize expert parallelism for MoE models across heterogeneous GPU clusters with configuration: 2 1 2 4 1  2 1 4 4 1
        </p>
      </div>

      <hr className="my-8 border-border" />

      <section className="space-y-4">
        <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight">Overview</h2>
        <p className="text-lg leading-7">
          Heterogeneous expert parallelism enables efficient training of Mixture-of-Experts (MoE) models on heterogeneous GPU clusters.
          Expert placement and routing can be optimized based on device capability.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight">Configuration</h2>
        <p className="text-lg leading-7">
          Example configuration for heterogeneous expert parallelism:
        </p>
        <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
          <code>{`--enable-hetero true
--hetero-process-meshes 2 1 2 4 1  2 1 4 4 1
--hetero-device-types GPU GPU
--hetero-current-device-type GPU`}</code>
        </pre>
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight">Parameters</h2>
        <ul className="space-y-2 list-disc list-inside">
          <li><strong>--hetero-process-meshes</strong>: 2 1 2 4 1  2 1 4 4 1 (tp dp ep cp pp configuration)</li>
          <li><strong>--enable-hetero</strong>: Enable heterogeneous training</li>
          <li><strong>--hetero-device-types</strong>: Device types for heterogeneous training</li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight">Best Practices</h2>
        <ul className="space-y-2 list-disc list-inside">
          <li>Profile expert computation on each device type</li>
          <li>Balance expert placement across heterogeneous devices</li>
          <li>Monitor expert load distribution and routing efficiency</li>
          <li>Adjust expert parallelism degree based on device performance</li>
        </ul>
      </section>
    </div>
  );
}
