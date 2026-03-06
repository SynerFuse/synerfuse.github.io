

export default function AdvancedPipelineParallelism() {
  return (
    
      <div className="space-y-8 animate-in fade-in duration-500">
        <div className="text-sm text-muted-foreground mb-4">
        

        <div className="space-y-4">
          <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-primary">
            Heterogeneous Pipeline Parallelism
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Configure different layer counts for different pipeline stages to optimize training on heterogeneous GPU clusters.
          </p>
        

        
          <hr className="my-8 border-border" />

          <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight">Overview</h2>
          <p className="text-lg leading-7">
            The <code>--hetero-pipeline-stages</code> parameter configures different layer counts for different pipeline stages. 
            This enables assigning more layers to more powerful GPUs and fewer layers to less powerful GPUs in a heterogeneous GPU cluster.
          </p>

          <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight">Format</h2>
          <p className="text-lg leading-7">
            <code>n0 layers_0_0 layers_0_1 ... n1 layers_1_0 layers_1_1 ...</code>
          </p>

          <h3>Parameter Description</h3>
          <ul>
            <li>
              <strong>n0</strong>: Number of devices in the 0-th heterogeneous stage, followed by layer counts for each device in that stage
              (<code>layers_0_0</code>, <code>layers_0_1</code>, ...)
            </li>
            <li>
              <strong>n1</strong>: Number of devices in the 1-st heterogeneous stage, followed by layer counts for each device in that stage
              (<code>layers_1_0</code>, <code>layers_1_1</code>, ...)
            </li>
            <li>Additional stages follow the same pattern: <code>n2 layers_2_0 layers_2_1 ...</code></li>
          </ul>

          <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight">Constraints</h2>
          <p className="text-lg leading-7">
            The following constraints must be satisfied:
          </p>
          <ul>
            <li>∑ i = 0 k − 1 n i = pipeline-model-parallel-size</li>
            <li>num-layers = ∑ i = 0 k − 1 ∑ j = 0 n i − 1 layers i , j</li>
          </ul>

          <h3>Where</h3>
          <ul>
            <li><strong>k</strong> is the number of heterogeneous stages</li>
            <li><strong>n i</strong> is the number of devices in the i-th stage</li>
            <li><strong>layers i , j</strong> is the layer count for the j-th device in the i-th stage</li>
          </ul>

          <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight">Example</h2>
          <p className="text-lg leading-7">For a pipeline with 2 stages and 8 layers in total:</p>

          <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
            <code>{`--num-layers 8
--pipeline-model-parallel-size 2
--hetero-pipeline-stages 1 6 1 2`}</code>
          </pre>

          <p className="text-lg leading-7">This configuration specifies:</p>
          <ul>
            <li>Stage 0: 1 device with 6 layers (<code>layers_0_0 = 6</code>)</li>
            <li>Stage 1: 1 device with 2 layers (<code>layers_1_0 = 2</code>)</li>
          </ul>

          <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight">Use Cases</h2>
          <ul>
            <li><strong>Mixed GPU Clusters</strong>: Assign more layers to high-performance GPUs (e.g., H100) and fewer to lower-performance ones (e.g., A100)</li>
            <li><strong>Cost Optimization</strong>: Balance computational load across different GPU types to maximize efficiency</li>
            <li><strong>Scalability</strong>: Enable training on heterogeneous hardware without requiring all GPUs to be identical</li>
          </ul>

          <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight">Best Practices</h2>
          <ul>
            <li>Profile your GPUs to understand their relative performance</li>
            <li>Assign layer counts proportionally to GPU compute capability</li>
            <li>Monitor pipeline bubble to ensure balanced load distribution</li>
            <li>Start with equal layer distribution and adjust based on performance metrics</li>
          </ul>
        
      
    
  );
}
