export default function ParameterExplanation() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="space-y-4">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-primary">
          Parameter Explanation
        </h1>
        <p className="text-xl text-muted-foreground leading-relaxed">
          Core parameters and example values for heterogeneous distributed training tasks.
        </p>
      </div>

      <div className="space-y-8">
        <section className="space-y-4">
          <p className="text-lg leading-7">
            The core parameters and example values designed in the heterogeneous distributed training task are as follows. Additionally, parameters related to hardware adaptation and heterogeneous strategies will be explained in other chapters.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight">
            Model Arguments
          </h2>
          <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm font-mono"><code>{`MODEL_ARGS=(
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
)`}</code></pre>

          <div className="overflow-x-auto">
            <table className="w-full text-lg leading-7">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2 px-4 font-semibold">Parameter</th>
                  <th className="text-left py-2 px-4 font-semibold">Value</th>
                  <th className="text-left py-2 px-4 font-semibold">Description</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="py-2 px-4"><code>--num-layers</code></td>
                  <td className="py-2 px-4">8</td>
                  <td className="py-2 px-4">Number of transformer layers in the model</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 px-4"><code>--hidden-size</code></td>
                  <td className="py-2 px-4">4096</td>
                  <td className="py-2 px-4">Hidden dimension size of the model</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 px-4"><code>--ffn-hidden-size</code></td>
                  <td className="py-2 px-4">11008</td>
                  <td className="py-2 px-4">Feed-forward network hidden dimension size</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 px-4"><code>--num-attention-heads</code></td>
                  <td className="py-2 px-4">32</td>
                  <td className="py-2 px-4">Number of attention heads in multi-head attention</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 px-4"><code>--seq-length</code></td>
                  <td className="py-2 px-4">4096</td>
                  <td className="py-2 px-4">Maximum sequence length for training</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 px-4"><code>--max-position-embeddings</code></td>
                  <td className="py-2 px-4">4096</td>
                  <td className="py-2 px-4">Maximum position embeddings supported by the model</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 px-4"><code>--num-query-groups</code></td>
                  <td className="py-2 px-4">8</td>
                  <td className="py-2 px-4">Number of query groups (for grouped query attention)</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 px-4"><code>--swiglu</code></td>
                  <td className="py-2 px-4">Flag</td>
                  <td className="py-2 px-4">Use SwiGLU activation function in FFN</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 px-4"><code>--use-flash-attn</code></td>
                  <td className="py-2 px-4">Flag</td>
                  <td className="py-2 px-4">Enable Flash Attention for faster attention computation</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 px-4"><code>--normalization</code></td>
                  <td className="py-2 px-4">RMSNorm</td>
                  <td className="py-2 px-4">Layer normalization type (RMSNorm or LayerNorm)</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 px-4"><code>--position-embedding-type</code></td>
                  <td className="py-2 px-4">rope</td>
                  <td className="py-2 px-4">Position embedding type (rope or alibi)</td>
                </tr>
                <tr>
                  <td className="py-2 px-4"><code>--disable-bias-linear</code></td>
                  <td className="py-2 px-4">Flag</td>
                  <td className="py-2 px-4">Disable bias in linear layers</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight">
            Training Arguments
          </h2>
          <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm font-mono"><code>{`TRAINING_ARGS=(
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
)`}</code></pre>

          <div className="overflow-x-auto">
            <table className="w-full text-lg leading-7">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2 px-4 font-semibold">Parameter</th>
                  <th className="text-left py-2 px-4 font-semibold">Value</th>
                  <th className="text-left py-2 px-4 font-semibold">Description</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="py-2 px-4"><code>--micro-batch-size</code></td>
                  <td className="py-2 px-4">1</td>
                  <td className="py-2 px-4">Batch size per GPU per training step</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 px-4"><code>--global-batch-size</code></td>
                  <td className="py-2 px-4">30</td>
                  <td className="py-2 px-4">Total batch size across all GPUs</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 px-4"><code>--train-iters</code></td>
                  <td className="py-2 px-4">30</td>
                  <td className="py-2 px-4">Number of training iterations</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 px-4"><code>--weight-decay</code></td>
                  <td className="py-2 px-4">1e-2</td>
                  <td className="py-2 px-4">Weight decay coefficient for regularization</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 px-4"><code>--use-distributed-optimizer</code></td>
                  <td className="py-2 px-4">Flag</td>
                  <td className="py-2 px-4">Use distributed optimizer to save memory</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 px-4"><code>--clip-grad</code></td>
                  <td className="py-2 px-4">1.0</td>
                  <td className="py-2 px-4">Gradient clipping value</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 px-4"><code>--fp16</code></td>
                  <td className="py-2 px-4">Flag</td>
                  <td className="py-2 px-4">Use 16-bit floating point precision</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 px-4"><code>--lr</code></td>
                  <td className="py-2 px-4">0.00015</td>
                  <td className="py-2 px-4">Initial learning rate</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 px-4"><code>--lr-decay-style</code></td>
                  <td className="py-2 px-4">cosine</td>
                  <td className="py-2 px-4">Learning rate decay schedule (cosine, linear, etc.)</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 px-4"><code>--min-lr</code></td>
                  <td className="py-2 px-4">6.0e-6</td>
                  <td className="py-2 px-4">Minimum learning rate after decay</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 px-4"><code>--lr-warmup-fraction</code></td>
                  <td className="py-2 px-4">0.01</td>
                  <td className="py-2 px-4">Fraction of training for learning rate warmup</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 px-4"><code>--lr-decay-iters</code></td>
                  <td className="py-2 px-4">320000</td>
                  <td className="py-2 px-4">Number of iterations for learning rate decay</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 px-4"><code>--adam-beta1</code></td>
                  <td className="py-2 px-4">0.9</td>
                  <td className="py-2 px-4">Adam optimizer beta1 parameter</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 px-4"><code>--adam-beta2</code></td>
                  <td className="py-2 px-4">0.95</td>
                  <td className="py-2 px-4">Adam optimizer beta2 parameter</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 px-4"><code>--attention-dropout</code></td>
                  <td className="py-2 px-4">0</td>
                  <td className="py-2 px-4">Dropout rate for attention layers</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 px-4"><code>--hidden-dropout</code></td>
                  <td className="py-2 px-4">0</td>
                  <td className="py-2 px-4">Dropout rate for hidden layers</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 px-4"><code>--untie-embeddings-and-output-weights</code></td>
                  <td className="py-2 px-4">Flag</td>
                  <td className="py-2 px-4">Use separate weights for embeddings and output layers</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 px-4"><code>--sequence-parallel</code></td>
                  <td className="py-2 px-4">Flag</td>
                  <td className="py-2 px-4">Enable sequence parallelism for long sequences</td>
                </tr>
                <tr>
                  <td className="py-2 px-4"><code>--distributed-backend</code></td>
                  <td className="py-2 px-4">nccl</td>
                  <td className="py-2 px-4">Distributed communication backend (nccl for GPUs)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight">
            Key Considerations
          </h2>
          <ul className="list-disc list-inside space-y-2 text-lg leading-7 ml-4">
            <li><strong>Batch Size Relationship</strong>: global-batch-size should be divisible by micro-batch-size and the number of data-parallel processes</li>
            <li><strong>Learning Rate</strong>: The learning rate of 0.00015 is relatively small, suitable for fine-tuning or stable training</li>
            <li><strong>Precision</strong>: FP16 training reduces memory usage and speeds up computation while maintaining model quality</li>
            <li><strong>Sequence Parallelism</strong>: Enabled to handle longer sequences efficiently across multiple GPUs</li>
            <li><strong>Distributed Optimizer</strong>: Saves memory by distributing optimizer states across GPUs</li>
            <li><strong>Flash Attention</strong>: Significantly improves attention computation efficiency</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight">
            Hardware Adaptation
          </h2>
          <p className="text-lg leading-7">
            Parameters related to hardware adaptation and heterogeneous strategies (such as <code>--hetero-process-meshes</code>, <code>--hetero-device-types</code>, etc.) are explained in the Advanced Features section.
          </p>
        </section>
      </div>
    </div>
  );
}
