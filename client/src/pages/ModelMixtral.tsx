export default function ModelMixtral() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="space-y-4">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-primary">
          Mixtral-8x7B Training Guide
        </h1>
        <p className="text-xl text-muted-foreground leading-relaxed">
          Learn how to train the Mixtral-8x7B MoE model using SynerFuse with heterogeneous distributed training.
        </p>
      </div>

      <div className="space-y-8">
        <section className="space-y-4">
          <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight">
            Model Overview
          </h2>
          <p className="text-lg leading-7">
            Mixtral-8x7B is a Mixture of Experts model with 8 expert networks, each with 7 billion parameters. This guide provides the training script and configuration for distributed training using SynerFuse.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight">
            Training Script
          </h2>
          <p className="text-lg leading-7">
            Below is the complete training script for Mixtral-8x7B with distributed expert parallelism:
          </p>
          <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm font-mono"><code>{`#!/bin/bash
# Mixtral-8x7B Training Script
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
    --num-layers 32
    --hidden-size 4096
    --num-attention-heads 32
    --num-experts 8
    --expert-model-parallel-size 4
    --seq-length 4096
    --max-position-embeddings 4096
)

TRAINING_ARGS=(
    --micro-batch-size 2
    --global-batch-size 128
    --train-iters 500000
    --weight-decay 0.01
    --clip-grad 1.0
    --fp16
    --lr 5e-5
    --lr-decay-style cosine
    --min-lr 5e-6
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
            <li><strong>num-layers</strong>: 32 transformer layers</li>
            <li><strong>hidden-size</strong>: 4096 hidden dimensions</li>
            <li><strong>num-experts</strong>: 8 expert networks</li>
            <li><strong>expert-model-parallel-size</strong>: 4 for expert parallelism</li>
            <li><strong>micro-batch-size</strong>: 2 samples per GPU per step</li>
            <li><strong>global-batch-size</strong>: 128 samples total per step</li>
            <li><strong>learning-rate</strong>: 5e-5 with cosine decay</li>
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
              <pre className="mt-2 bg-muted p-4 rounded-lg overflow-x-auto text-sm font-mono"><code>bash run_mixtral_8x7b.sh</code></pre>
            </li>
          </ol>
        </section>

        <section className="space-y-4">
          <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight">
            Performance Tips
          </h2>
          <ul className="list-disc list-inside space-y-2 text-lg leading-7 ml-4">
            <li>Expert parallelism distributes experts across multiple GPUs</li>
            <li>Use gradient checkpointing to reduce memory usage</li>
            <li>Monitor expert load balancing for optimal throughput</li>
            <li>Use high-bandwidth interconnect for multi-node training</li>
            <li>Enable Flash Attention for faster attention computation</li>
          </ul>
        </section>
      </div>
    </div>
  );
}
