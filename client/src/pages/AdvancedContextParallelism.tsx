
export default function AdvancedContextParallelism() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="space-y-4">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-primary">
          Heterogeneous Context Parallelism
        </h1>
        <p className="text-xl text-muted-foreground leading-relaxed">
          Optimize context parallelism across heterogeneous GPU clusters with configuration: 1 2 1 2 1  1 4 1 2 1
        </p>
      </div>

      <hr className="my-8 border-border" />

      <section className="space-y-4">
        <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight">Overview</h2>
        <p className="text-lg leading-7">
          Heterogeneous context parallelism enables efficient context handling across heterogeneous GPU clusters.
          Context can be distributed and processed based on device capability and memory availability.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight">Configuration</h2>
        <p className="text-lg leading-7">
          Example configuration for heterogeneous context parallelism:
        </p>
        <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
          <code>{`--enable-hetero true
--hetero-process-meshes 1 2 1 2 1  1 4 1 2 1
--hetero-device-types GPU GPU
--hetero-current-device-type GPU`}</code>
        </pre>
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight">Parameters</h2>
        <ul className="space-y-2 list-disc list-inside">
          <li><strong>--hetero-process-meshes</strong>: 1 2 1 2 1  1 4 1 2 1 (tp dp cp pp ep configuration)</li>
          <li><strong>--enable-hetero</strong>: Enable heterogeneous training</li>
          <li><strong>--hetero-device-types</strong>: Device types for heterogeneous training</li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight">Best Practices</h2>
        <ul className="space-y-2 list-disc list-inside">
          <li>Profile context operations on each device type</li>
          <li>Distribute context based on device memory capacity</li>
          <li>Monitor context communication overhead</li>
          <li>Adjust context parallelism degree based on performance metrics</li>
        </ul>
      </section>
    </div>
  );
}
