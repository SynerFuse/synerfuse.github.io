import { DocsLayout } from "@/components/DocsLayout";

export default function AdvancedTensorParallelism() {
  return (
    <DocsLayout>
      <div className="space-y-8 animate-in fade-in duration-500">
        <div className="text-sm text-muted-foreground mb-4">
          Docs <span className="mx-2">/</span> Advanced Features <span className="mx-2">/</span> Heterogeneous Tensor Parallelism
        </div>

        <div className="space-y-4">
          <h1 className="text-4xl font-bold tracking-tight text-primary">
            Heterogeneous Tensor Parallelism
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Configure tensor parallelism across heterogeneous GPU clusters with different device types and computational capabilities.
          </p>
        </div>

        <div className="prose prose-slate dark:prose-invert max-w-none">
          <hr className="my-8 border-border" />

          <h2>Heterogeneous Mesh Configuration</h2>

          <h3>Example Configuration</h3>
          <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
            <code>{`--enable-hetero
--hetero-process-meshes 2 1 1 2 1  4 1 1 2 1
--hetero-device-types H100 BI150S
--hetero-current-device-type H100`}</code>
          </pre>

          <h2>Parameter Explanation</h2>

          <h3>--enable-hetero</h3>
          <p>
            Master switch to enable heterogeneous training mode. Once set, the framework will parse and apply all other heterogeneous-related configurations.
          </p>

          <h3>--hetero-process-meshes</h3>
          <p>
            Defines the topology and parallelism strategy of the entire heterogeneous cluster.
          </p>

          <h4>Format</h4>
          <p>
            This parameter accepts a series of tuples: <code>tp cp ep dp pp ...</code>
          </p>

          <ul>
            <li>Each tuple <code>(tp, cp, ep, dp, pp)</code> defines the parallel configuration of a <strong>mesh</strong> (a homogeneous compute unit).</li>
            <li><strong>tp</strong>: tensor-parallel-size</li>
            <li><strong>cp</strong>: context-parallel-size</li>
            <li><strong>ep</strong>: expert-parallel-size</li>
            <li><strong>dp</strong>: data-parallel-size</li>
            <li><strong>pp</strong>: pipeline-model-parallel-size</li>
            <li>The framework defines mesh 0, mesh 1, ... in the order of the tuples in the parameter.</li>
          </ul>

          <h4>Example Explanation</h4>
          <p>
            In the example above, <code>--hetero-process-meshes 2 1 1 2 1  4 1 1 2 1</code> defines two meshes:
          </p>
          <ul>
            <li><strong>mesh 0</strong>: <code>tp=2, cp=1, ep=1, dp=2, pp=1</code></li>
            <li><strong>mesh 1</strong>: <code>tp=4, cp=1, ep=1, dp=2, pp=1</code></li>
          </ul>

          <h4>Constraints</h4>
          <p>
            The sum of <code>world_size</code> (i.e., <code>tp*cp*ep*dp*pp</code>) for all meshes must equal the total number of processes launched for the training task.
          </p>

          <h3>--hetero-device-types</h3>
          <p>
            Defines the names of all device types in the heterogeneous cluster and specifies their priority in logical rank ordering.
          </p>

          <h4>Format</h4>
          <p>
            <code>TYPE_A TYPE_B ...</code>
          </p>

          <ul>
            <li>List the string names of all device types in order.</li>
            <li>This order is crucial. The framework sorts physical ranks according to this order to generate globally consistent logical ranks. Generally, place higher-performance devices first.</li>
          </ul>

          <h4>Example Explanation</h4>
          <p>
            <code>--hetero-device-types H100 BI150S</code> indicates the cluster contains two device types, and logically, H100 devices will have ranks before BI150S devices.
          </p>

          <h3>--hetero-current-device-type</h3>
          <p>
            Informs the current execution script which device type the node belongs to.
          </p>

          <h4>Format</h4>
          <p>
            <code>TYPE_NAME</code>
          </p>

          <ul>
            <li><code>TYPE_NAME</code> must be one of the names defined in <code>--hetero-device-types</code>.</li>
          </ul>

          <h4>Purpose</h4>
          <p>
            In multi-machine launch scripts, you need to set different <code>hetero-current-device-type</code> values for different machine node types, so each node can correctly identify itself. For example, processes launched on H100 machines should set this parameter to <code>H100</code>.
          </p>

          <h2>Tensor Parallelism in Heterogeneous Environment</h2>
          <p>
            Tensor parallelism splits model tensors across multiple devices. In a heterogeneous environment:
          </p>

          <ul>
            <li>Different meshes can have different tensor-parallel-size values</li>
            <li>Mesh 0 uses <code>tp=2</code>, processing tensors across 2 devices</li>
            <li>Mesh 1 uses <code>tp=4</code>, processing tensors across 4 devices</li>
            <li>This allows optimizing tensor parallelism based on device capabilities</li>
          </ul>

          <h2>Best Practices</h2>
          <ul>
            <li>Profile your heterogeneous devices to understand their relative performance</li>
            <li>Assign higher tensor-parallel-size to more powerful devices</li>
            <li>Ensure load balancing across different device types</li>
            <li>Monitor communication overhead between devices</li>
            <li>Test different configurations to find optimal performance</li>
          </ul>
        </div>
      </div>
    </DocsLayout>
  );
}
