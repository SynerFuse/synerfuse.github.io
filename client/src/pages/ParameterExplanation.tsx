import { DocsLayout } from "@/components/DocsLayout";

export default function ParameterExplanation() {
  return (
    <DocsLayout>
      <div className="space-y-8 animate-in fade-in duration-500">
        <div className="text-sm text-muted-foreground mb-4">
          Docs <span className="mx-2">/</span> Parameter Explanation
        </div>

        <div className="space-y-4">
          <h1 className="text-4xl font-bold tracking-tight text-primary">
            Parameter Explanation
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Core parameters and example values for heterogeneous distributed training tasks.
          </p>
        </div>

        <div className="prose prose-slate dark:prose-invert max-w-none">
          <hr className="my-8 border-border" />

          <p>
            The core parameters and example values designed in the heterogeneous distributed training task are as follows. Additionally, parameters related to hardware adaptation and heterogeneous strategies will be explained in other chapters.
          </p>

          <h2>Model Arguments</h2>

          <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
            <code>{`MODEL_ARGS=(
    --num-layers 8
    --hidden-size 4096
    --ffn-hidden-size 11008
    --num-attention-heads 32
    --seq-length 4096
    --max-position-embeddings 4096
    --num-query-groups 8
    --swiglu
    --use-flash-attn
    --normalization RMSNorm
    --position-embedding-type rope
    --disable-bias-linear
)`}</code>
          </pre>

          <h3>Model Parameters Explanation</h3>

          <table>
            <thead>
              <tr>
                <th>Parameter</th>
                <th>Value</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code>--num-layers</code></td>
                <td>8</td>
                <td>Number of transformer layers in the model</td>
              </tr>
              <tr>
                <td><code>--hidden-size</code></td>
                <td>4096</td>
                <td>Hidden dimension size of the model</td>
              </tr>
              <tr>
                <td><code>--ffn-hidden-size</code></td>
                <td>11008</td>
                <td>Feed-forward network hidden dimension size</td>
              </tr>
              <tr>
                <td><code>--num-attention-heads</code></td>
                <td>32</td>
                <td>Number of attention heads in multi-head attention</td>
              </tr>
              <tr>
                <td><code>--seq-length</code></td>
                <td>4096</td>
                <td>Maximum sequence length for training</td>
              </tr>
              <tr>
                <td><code>--max-position-embeddings</code></td>
                <td>4096</td>
                <td>Maximum position embeddings supported by the model</td>
              </tr>
              <tr>
                <td><code>--num-query-groups</code></td>
                <td>8</td>
                <td>Number of query groups (for grouped query attention)</td>
              </tr>
              <tr>
                <td><code>--swiglu</code></td>
                <td>Flag</td>
                <td>Use SwiGLU activation function in FFN</td>
              </tr>
              <tr>
                <td><code>--use-flash-attn</code></td>
                <td>Flag</td>
                <td>Enable Flash Attention for faster attention computation</td>
              </tr>
              <tr>
                <td><code>--normalization</code></td>
                <td>RMSNorm</td>
                <td>Layer normalization type (RMSNorm or LayerNorm)</td>
              </tr>
              <tr>
                <td><code>--position-embedding-type</code></td>
                <td>rope</td>
                <td>Position embedding type (rope or alibi)</td>
              </tr>
              <tr>
                <td><code>--disable-bias-linear</code></td>
                <td>Flag</td>
                <td>Disable bias in linear layers</td>
              </tr>
            </tbody>
          </table>

          <h2>Training Arguments</h2>

          <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
            <code>{`TRAINING_ARGS=(
    --micro-batch-size 1
    --global-batch-size 30
    --train-iters 30
    --weight-decay 1e-2
    --use-distributed-optimizer
    --clip-grad 1.0
    --fp16
    --lr 0.00015
    --lr-decay-style cosine
    --min-lr 6.0e-6
    --lr-warmup-fraction .01
    --lr-decay-iters 320000
    --adam-beta1 0.9
    --adam-beta2 0.95
    --attention-dropout 0
    --hidden-dropout 0
    --untie-embeddings-and-output-weights
    --sequence-parallel
    --distributed-backend nccl
)`}</code>
          </pre>

          <h3>Training Parameters Explanation</h3>

          <table>
            <thead>
              <tr>
                <th>Parameter</th>
                <th>Value</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code>--micro-batch-size</code></td>
                <td>1</td>
                <td>Batch size per GPU per training step</td>
              </tr>
              <tr>
                <td><code>--global-batch-size</code></td>
                <td>30</td>
                <td>Total batch size across all GPUs</td>
              </tr>
              <tr>
                <td><code>--train-iters</code></td>
                <td>30</td>
                <td>Number of training iterations</td>
              </tr>
              <tr>
                <td><code>--weight-decay</code></td>
                <td>1e-2</td>
                <td>Weight decay coefficient for regularization</td>
              </tr>
              <tr>
                <td><code>--use-distributed-optimizer</code></td>
                <td>Flag</td>
                <td>Use distributed optimizer to save memory</td>
              </tr>
              <tr>
                <td><code>--clip-grad</code></td>
                <td>1.0</td>
                <td>Gradient clipping value</td>
              </tr>
              <tr>
                <td><code>--fp16</code></td>
                <td>Flag</td>
                <td>Use 16-bit floating point precision</td>
              </tr>
              <tr>
                <td><code>--lr</code></td>
                <td>0.00015</td>
                <td>Initial learning rate</td>
              </tr>
              <tr>
                <td><code>--lr-decay-style</code></td>
                <td>cosine</td>
                <td>Learning rate decay schedule (cosine, linear, etc.)</td>
              </tr>
              <tr>
                <td><code>--min-lr</code></td>
                <td>6.0e-6</td>
                <td>Minimum learning rate after decay</td>
              </tr>
              <tr>
                <td><code>--lr-warmup-fraction</code></td>
                <td>0.01</td>
                <td>Fraction of training for learning rate warmup</td>
              </tr>
              <tr>
                <td><code>--lr-decay-iters</code></td>
                <td>320000</td>
                <td>Number of iterations for learning rate decay</td>
              </tr>
              <tr>
                <td><code>--adam-beta1</code></td>
                <td>0.9</td>
                <td>Adam optimizer beta1 parameter</td>
              </tr>
              <tr>
                <td><code>--adam-beta2</code></td>
                <td>0.95</td>
                <td>Adam optimizer beta2 parameter</td>
              </tr>
              <tr>
                <td><code>--attention-dropout</code></td>
                <td>0</td>
                <td>Dropout rate for attention layers</td>
              </tr>
              <tr>
                <td><code>--hidden-dropout</code></td>
                <td>0</td>
                <td>Dropout rate for hidden layers</td>
              </tr>
              <tr>
                <td><code>--untie-embeddings-and-output-weights</code></td>
                <td>Flag</td>
                <td>Use separate weights for embeddings and output layers</td>
              </tr>
              <tr>
                <td><code>--sequence-parallel</code></td>
                <td>Flag</td>
                <td>Enable sequence parallelism for long sequences</td>
              </tr>
              <tr>
                <td><code>--distributed-backend</code></td>
                <td>nccl</td>
                <td>Distributed communication backend (nccl for GPUs)</td>
              </tr>
            </tbody>
          </table>

          <h2>Key Considerations</h2>

          <ul>
            <li><strong>Batch Size Relationship</strong>: global-batch-size should be divisible by micro-batch-size and the number of data-parallel processes</li>
            <li><strong>Learning Rate</strong>: The learning rate of 0.00015 is relatively small, suitable for fine-tuning or stable training</li>
            <li><strong>Precision</strong>: FP16 training reduces memory usage and speeds up computation while maintaining model quality</li>
            <li><strong>Sequence Parallelism</strong>: Enabled to handle longer sequences efficiently across multiple GPUs</li>
            <li><strong>Distributed Optimizer</strong>: Saves memory by distributing optimizer states across GPUs</li>
            <li><strong>Flash Attention</strong>: Significantly improves attention computation efficiency</li>
          </ul>

          <h2>Hardware Adaptation</h2>

          <p>
            Parameters related to hardware adaptation and heterogeneous strategies (such as <code>--hetero-process-meshes</code>, <code>--hetero-device-types</code>, etc.) are explained in the Advanced Features section.
          </p>
        </div>
      </div>
    </DocsLayout>
  );
}
