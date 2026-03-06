

export default function AdvancedContextParallelism() {
  return (
    
      <div className="space-y-8 animate-in fade-in duration-500">
        <div className="text-sm text-muted-foreground mb-4">
        

        <div className="space-y-4">
          <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-primary">
            Heterogeneous Context Parallelism
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Configure context parallelism across heterogeneous GPU clusters with different device types and computational capabilities.
          </p>
        

        
          <hr className="my-8 border-border" />

          <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight">Heterogeneous Mesh Configuration</h2>

          <h3>Example Configuration</h3>
          <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
            <code>{`--enable-hetero
--hetero-process-meshes 1 2 1 2 1  1 4 1 2 1
--hetero-device-types H100 BI150S
--hetero-current-device-type H100`}</code>
          </pre>

          <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight">Parameter Explanation</h2>

          <h3>--enable-hetero</h3>
          <p className="text-lg leading-7">
            Master switch to enable heterogeneous training mode. Once set, the framework will parse and apply all other heterogeneous-related configurations.
          </p>

          <h3>--hetero-process-meshes</h3>
          <p className="text-lg leading-7">
            Defines the topology and parallelism strategy of the entire heterogeneous cluster.
          </p>

          <h4>Format</h4>
          <p className="text-lg leading-7">
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
          <p className="text-lg leading-7">
            In the example above, <code>--hetero-process-meshes 1 2 1 2 1  1 4 1 2 1</code> defines two meshes:
          </p>
          <ul>
            <li><strong>mesh 0</strong>: <code>tp=1, cp=2, ep=1, dp=2, pp=1</code></li>
            <li><strong>mesh 1</strong>: <code>tp=1, cp=4, ep=1, dp=2, pp=1</code></li>
          </ul>

          <h4>Constraints</h4>
          <p className="text-lg leading-7">
            The sum of <code>world_size</code> (i.e., <code>tp*cp*ep*dp*pp</code>) for all meshes must equal the total number of processes launched for the training task.
          </p>

          <h3>--hetero-device-types</h3>
          <p className="text-lg leading-7">
            Defines the names of all device types in the heterogeneous cluster and specifies their priority in logical rank ordering.
          </p>

          <h4>Format</h4>
          <p className="text-lg leading-7">
            <code>TYPE_A TYPE_B ...</code>
          </p>

          <ul>
            <li>List the string names of all device types in order.</li>
            <li>This order is crucial. The framework sorts physical ranks according to this order to generate globally consistent logical ranks. Generally, place higher-performance devices first.</li>
          </ul>

          <h4>Example Explanation</h4>
          <p className="text-lg leading-7">
            <code>--hetero-device-types H100 BI150S</code> indicates the cluster contains two device types, and logically, H100 devices will have ranks before BI150S devices.
          </p>

          <h3>--hetero-current-device-type</h3>
          <p className="text-lg leading-7">
            Informs the current execution script which device type the node belongs to.
          </p>

          <h4>Format</h4>
          <p className="text-lg leading-7">
            <code>TYPE_NAME</code>
          </p>

          <ul>
            <li><code>TYPE_NAME</code> must be one of the names defined in <code>--hetero-device-types</code>.</li>
          </ul>

          <h4>Purpose</h4>
          <p className="text-lg leading-7">
            In multi-machine launch scripts, you need to set different <code>hetero-current-device-type</code> values for different machine node types, so each node can correctly identify itself. For example, processes launched on H100 machines should set this parameter to <code>H100</code>.
          </p>

          <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight">Context Parallelism in Heterogeneous Environment</h2>
          <p className="text-lg leading-7">
            Context parallelism splits the sequence context across multiple devices. In a heterogeneous environment:
          </p>

          <ul>
            <li>Different meshes can have different context-parallel-size values</li>
            <li>Mesh 0 uses <code>cp=2</code>, splitting context across 2 devices</li>
            <li>Mesh 1 uses <code>cp=4</code>, splitting context across 4 devices</li>
            <li>This allows optimizing context parallelism based on device capabilities and memory constraints</li>
            <li>Larger context can be processed on more powerful devices</li>
          </ul>

          <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight">Long Context Processing</h2>
          <ul>
            <li>Context parallelism is essential for processing long sequences</li>
            <li>Different device types may have different memory and compute capabilities</li>
            <li>Assign larger context-parallel-size to more powerful devices</li>
            <li>Balance context distribution to avoid memory bottlenecks</li>
            <li>Monitor communication overhead for context synchronization</li>
          </ul>

          <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight">Best Practices</h2>
          <ul>
            <li>Profile your heterogeneous devices to understand their relative performance</li>
            <li>Assign higher context-parallel-size to more powerful devices with more memory</li>
            <li>Ensure balanced context distribution across device types</li>
            <li>Monitor communication overhead between context-parallel devices</li>
            <li>Test different configurations to find optimal context placement</li>
            <li>Consider sequence length and memory requirements when setting context-parallel-size</li>
          </ul>
        
      
    
  );
}
