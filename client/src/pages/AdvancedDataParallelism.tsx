import { DocsLayout } from "@/components/DocsLayout";

export default function AdvancedDataParallelism() {
  return (
    <DocsLayout>
      <div className="space-y-8 animate-in fade-in duration-500">
        <div className="text-sm text-muted-foreground mb-4">
          Docs <span className="mx-2">/</span> Advanced Features <span className="mx-2">/</span> Heterogeneous Data Parallelism
        </div>

        <div className="space-y-4">
          <h1 className="text-4xl font-bold tracking-tight text-primary">
            Heterogeneous Data Parallelism
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Configure different micro-batch sizes and numbers for different data parallelism groups to optimize training on heterogeneous GPUs.
          </p>
        </div>

        <div className="prose prose-slate dark:prose-invert max-w-none">
          <hr className="my-8 border-border" />

          <h2>Overview</h2>
          <p>
            Heterogeneous data parallelism allows different devices in a data parallelism group to process different batch sizes and numbers of micro-batches. 
            This is particularly useful when training on heterogeneous GPU clusters where devices have different computational capabilities.
          </p>

          <h2>Configuration Parameters</h2>
          <p>
            Configure heterogeneous DP using three parameters:
          </p>

          <ul>
            <li><code>--use-tp-pp-dp-mapping</code>: Changes communication group order to enable heterogeneous DP</li>
            <li><code>--micro-batch-size-per-dp</code>: Sets micro-batch size for different DP groups</li>
            <li><code>--num-micro-batches-per-dp</code>: Sets number of micro-batches for different DP groups</li>
          </ul>

          <h2>Format for --micro-batch-size-per-dp</h2>
          <p>
            <code>n0 mbs0 n1 mbs1 ...</code>
          </p>

          <h3>Parameter Description</h3>
          <ul>
            <li><strong>n0, n1, ...</strong>: Number of consecutive devices within a DP group</li>
            <li><strong>mbs0, mbs1, ...</strong>: Micro-batch size for the corresponding device group</li>
          </ul>

          <h2>Format for --num-micro-batches-per-dp</h2>
          <p>
            <code>n0 nmb0 n1 nmb1 ...</code>
          </p>

          <h3>Parameter Description</h3>
          <ul>
            <li><strong>n0, n1, ...</strong>: Number of consecutive devices within a DP group</li>
            <li><strong>nmb0, nmb1, ...</strong>: Number of micro-batches for the corresponding device group</li>
          </ul>

          <h2>Constraints</h2>
          <p>
            The following constraints must be satisfied:
          </p>
          <ul>
            <li>∑ i n i = data-parallel-size</li>
            <li>global-batch-size = ∑ i n i × mbs i × num-mbs i</li>
          </ul>

          <h2>Example</h2>
          <p>For data-parallel-size=2 and global-batch-size=32:</p>

          <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
            <code>{`--global-batch-size 32
--use-tp-pp-dp-mapping 
--micro-batch-size-per-dp 1 6 1 2
--num-micro-batches-per-dp 1 4 1 4`}</code>
          </pre>

          <p>This configuration creates two DP groups:</p>
          <ul>
            <li>Group 0: 1 device with micro-batch size 6 and 4 micro-batches (6×4=24)</li>
            <li>Group 1: 1 device with micro-batch size 2 and 4 micro-batches (2×4=8)</li>
            <li>Total: 24 + 8 = 32 (matches global-batch-size)</li>
          </ul>

          <h2>Use Cases</h2>
          <ul>
            <li><strong>Mixed GPU Clusters</strong>: Assign larger batch sizes to high-performance GPUs and smaller to lower-performance ones</li>
            <li><strong>Memory Optimization</strong>: Adjust batch sizes based on GPU memory constraints</li>
            <li><strong>Load Balancing</strong>: Ensure all devices finish processing at approximately the same time</li>
            <li><strong>Cost Efficiency</strong>: Maximize utilization of heterogeneous hardware resources</li>
          </ul>

          <h2>Best Practices</h2>
          <ul>
            <li>Profile your GPUs to understand their memory and compute capabilities</li>
            <li>Assign batch sizes proportionally to GPU memory and compute capability</li>
            <li>Ensure the total batch size (∑ n i × mbs i × num-mbs i) matches your training requirements</li>
            <li>Monitor training throughput and adjust batch sizes based on performance metrics</li>
            <li>Use gradient accumulation if needed to maintain effective batch sizes</li>
          </ul>

          <h2>Relationship with Other Parallelism Strategies</h2>
          <p>
            Heterogeneous data parallelism can be combined with:
          </p>
          <ul>
            <li><strong>Tensor Parallelism</strong>: Splits model tensors across devices</li>
            <li><strong>Pipeline Parallelism</strong>: Splits model layers across devices</li>
            <li><strong>Sequence Parallelism</strong>: Splits sequences across devices</li>
          </ul>
          <p>
            The <code>--use-tp-pp-dp-mapping</code> flag ensures proper communication group ordering when combining these strategies.
          </p>
        </div>
      </div>
    </DocsLayout>
  );
}
