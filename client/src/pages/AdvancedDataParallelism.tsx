
export default function AdvancedDataParallelism() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="space-y-4">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-primary">
          Heterogeneous Data Parallelism
        </h1>
        <p className="text-xl text-muted-foreground leading-relaxed">
          Optimize data parallelism across heterogeneous GPU clusters with different batch sizes per device.
        </p>
      </div>

      <hr className="my-8 border-border" />

      <section className="space-y-4">
        <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight">Overview</h2>
        <p className="text-lg leading-7">
          Heterogeneous data parallelism allows different batch sizes on different devices based on their compute capability.
          This enables efficient training on mixed GPU clusters without being limited by the slowest GPU.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight">Configuration</h2>
        <p className="text-lg leading-7">
          Configure batch sizes proportionally to GPU compute capability:
        </p>
        <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
          <code>{`--global-batch-size 256
--micro-batch-size 8
--hetero-device-batch-sizes 8 16 8 16`}</code>
        </pre>
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight">Best Practices</h2>
        <ul className="space-y-2 list-disc list-inside">
          <li>Profile GPU memory and compute capability</li>
          <li>Assign batch sizes proportionally to GPU performance</li>
          <li>Monitor gradient synchronization overhead</li>
          <li>Adjust batch sizes based on convergence behavior</li>
        </ul>
      </section>
    </div>
  );
}
