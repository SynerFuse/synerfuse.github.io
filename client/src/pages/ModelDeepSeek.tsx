export default function ModelDeepSeek() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="space-y-4">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-primary">
          DeepSeek-V3 Training Guide
        </h1>
        <p className="text-xl text-muted-foreground leading-relaxed">
          Learn how to train the DeepSeek-V3 MoE model using SynerFuse with heterogeneous distributed training.
        </p>
      </div>

      <div className="space-y-8">
        <section className="space-y-4">
          <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight">
            Model Overview
          </h2>
          <p className="text-lg leading-7">
            DeepSeek-V3 is a Mixture of Experts (MoE) model with advanced architecture optimizations. This guide provides the training script and configuration for distributed training using SynerFuse.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight">
            Training Script
          </h2>
          <p className="text-lg leading-7">
            Below is the complete training script for DeepSeek-V3 with MoE configuration:
          </p>
          <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm font-mono"><code>{`#!/bin/bash
# DeepSeek-V3 MoE Training Script
export CUDA_DEVICE_MAX_CONNECTIONS=1
export NCCL_SOCKET_IFNAME=ibs5
export NCCL_IB_DISABLE=0
export OMP_NUM_THREADS=4

CHECKPOINT_PATH=/path/to/checkpoints
TENSORBOARD_LOGS_PATH=/path/to/tensorboard_logs
TOKENIZER_PATH=/path/to/tokenizer.model
DATA_PATH=/path/to/dataset

DISTRIBUTED_ARGS=(
    --nproc_per_node 8
    --nnodes 2
    --node_rank 0
    --master_addr localhost
    --master_port 6000
)

MODEL_ARGS=(
    --num-layers 61
    --hidden-size 7168
    --num-attention-heads 128
    --num-experts 256
    --expert-model-parallel-size 8
    --seq-length 4096
    --max-position-embeddings 4096
)

TRAINING_ARGS=(
    --micro-batch-size 1
    --global-batch-size 128
    --train-iters 500000
    --weight-decay 0.01
    --clip-grad 1.0
    --bf16
    --lr 1e-4
    --lr-decay-style cosine
    --min-lr 1e-5
    --lr-warmup-fraction 0.01
    --adam-beta1 0.9
    --adam-beta2 0.95
)

torchrun \${DISTRIBUTED_ARGS[@]} pretrain_gpt.py \\
    --tokenizer-type SentencePieceTokenizer \\
    --tokenizer-model \${TOKENIZER_PATH} \\
    --data-path \${DATA_PATH} \\
    --output-dir \${CHECKPOINT_PATH} \\
    --log-dir \${TENSORBOARD_LOGS_PATH} \\
    \${MODEL_ARGS[@]} \\
    \${TRAINING_ARGS[@]} \\
    --save-interval 1000 \\
    --eval-interval 1000 \\
    --eval-iters 10`}</code></pre>
        </section>

        <section className="space-y-4">
          <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight">
            Key Configuration Parameters
          </h2>
          <ul className="list-disc list-inside space-y-2 text-lg leading-7 ml-4">
            <li><strong>num-layers</strong>: 61 transformer layers</li>
            <li><strong>hidden-size</strong>: 7168 hidden dimensions</li>
            <li><strong>num-experts</strong>: 256 expert networks</li>
            <li><strong>expert-model-parallel-size</strong>: 8 for expert parallelism</li>
            <li><strong>micro-batch-size</strong>: 1 sample per GPU per step</li>
            <li><strong>global-batch-size</strong>: 128 samples total per step</li>
            <li><strong>bf16</strong>: BFloat16 precision for better numerical stability</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight">
            Running the Training
          </h2>
          <ol className="list-decimal list-inside space-y-4 text-lg leading-7 ml-4">
            <li>
              <span className="font-medium">Set up multi-node environment:</span>
              <pre className="mt-2 bg-muted p-4 rounded-lg overflow-x-auto text-sm font-mono"><code>export CUDA_VISIBLE_DEVICES=0,1,2,3,4,5,6,7</code></pre>
            </li>
            <li>
              <span className="font-medium">Run the training script:</span>
              <pre className="mt-2 bg-muted p-4 rounded-lg overflow-x-auto text-sm font-mono"><code>bash run_deepseek_v3.sh</code></pre>
            </li>
          </ol>
        </section>

        <section className="space-y-4">
          <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight">
            Performance Tips
          </h2>
          <ul className="list-disc list-inside space-y-2 text-lg leading-7 ml-4">
            <li>Use BFloat16 for better numerical stability with large models</li>
            <li>Expert parallelism helps distribute MoE computation across GPUs</li>
            <li>Use high-bandwidth interconnect for multi-node training</li>
            <li>Monitor expert load balancing to ensure efficient computation</li>
            <li>Enable gradient checkpointing to reduce memory usage</li>
          </ul>
        </section>
      </div>
    </div>
  );
}
