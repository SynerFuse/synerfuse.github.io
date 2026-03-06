export default function ModelLLaMA7B() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="space-y-4">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-primary">
          LLaMA-7B Training Guide
        </h1>
        <p className="text-xl text-muted-foreground leading-relaxed">
          Learn how to train the LLaMA-7B model using SynerFuse with heterogeneous distributed training.
        </p>
      </div>

      <div className="space-y-8">
        <section className="space-y-4">
          <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight">
            Model Overview
          </h2>
          <p className="text-lg leading-7">
            LLaMA-7B is a 7 billion parameter language model. This guide provides the training script and configuration for distributed training using SynerFuse.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight">
            Training Script
          </h2>
          <p className="text-lg leading-7">
            Below is the complete training script for LLaMA-7B with heterogeneous pipeline parallelism configuration:
          </p>
          <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm font-mono"><code>{`#!/bin/bash
# Runs the "7B" parameter model
export CUDA_DEVICE_MAX_CONNECTIONS=1
export NCCL_SOCKET_IFNAME=ibs5
export NCCL_IB_DISABLE=0
export NCCL_IB_CUDA_SUPPORT=1
export NCCL_IB_GID_INDEX=2
export NCCL_IB_RETRY_CNT=7
export OMP_NUM_THREADS=4
export GLOO_SOCKET_IFNAME=ibs5
export NCCL_DEBUG=none
export NCCL_IB_HCA=mlx5_2,mlx5_3
export NCCL_NET_SHARED_BUFFERS=0
export NCCL_ALGO=Ring
export NCCL_P2P_NET_CHUNKSIZE=1048576
export NCCL_CHUNK_SIZE=1048576
export NCCL_BUFFSIZE=8388608

CHECKPOINT_PATH=/path/to/checkpoints
TENSORBOARD_LOGS_PATH=/path/to/tensorboard_logs
TOKENIZER_PATH=/path/to/tokenizer.model
DATA_PATH=/path/to/dataset

DISTRIBUTED_ARGS=(
    --nproc_per_node 8
    --nnodes 1
    --node_rank 0
    --master_addr localhost
    --master_port 6000
)

MODEL_ARGS=(
    --num-layers 32
    --hidden-size 4096
    --num-attention-heads 32
    --seq-length 4096
    --max-position-embeddings 4096
)

TRAINING_ARGS=(
    --micro-batch-size 1
    --global-batch-size 32
    --train-iters 500000
    --weight-decay 0.1
    --clip-grad 1.0
    --fp16
    --lr 1.5e-4
    --lr-decay-style cosine
    --min-lr 1.5e-5
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
            <li><strong>num-attention-heads</strong>: 32 attention heads</li>
            <li><strong>seq-length</strong>: 4096 token sequence length</li>
            <li><strong>micro-batch-size</strong>: 1 sample per GPU per step</li>
            <li><strong>global-batch-size</strong>: 32 samples total per step</li>
            <li><strong>learning-rate</strong>: 1.5e-4 with cosine decay</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight">
            Running the Training
          </h2>
          <ol className="list-decimal list-inside space-y-4 text-lg leading-7 ml-4">
            <li>
              <span className="font-medium">Set up the environment:</span>
              <pre className="mt-2 bg-muted p-4 rounded-lg overflow-x-auto text-sm font-mono"><code>export CUDA_VISIBLE_DEVICES=0,1,2,3,4,5,6,7</code></pre>
            </li>
            <li>
              <span className="font-medium">Update paths in the script:</span>
              <pre className="mt-2 bg-muted p-4 rounded-lg overflow-x-auto text-sm font-mono"><code>{`CHECKPOINT_PATH=/your/checkpoint/path
TENSORBOARD_LOGS_PATH=/your/logs/path
TOKENIZER_PATH=/your/tokenizer/path
DATA_PATH=/your/data/path`}</code></pre>
            </li>
            <li>
              <span className="font-medium">Run the training script:</span>
              <pre className="mt-2 bg-muted p-4 rounded-lg overflow-x-auto text-sm font-mono"><code>bash run_llama7b.sh</code></pre>
            </li>
            <li>
              <span className="font-medium">Monitor training progress:</span>
              <pre className="mt-2 bg-muted p-4 rounded-lg overflow-x-auto text-sm font-mono"><code>tensorboard --logdir=$TENSORBOARD_LOGS_PATH</code></pre>
            </li>
          </ol>
        </section>

        <section className="space-y-4">
          <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight">
            Performance Tips
          </h2>
          <ul className="list-disc list-inside space-y-2 text-lg leading-7 ml-4">
            <li>Use high-bandwidth interconnect (InfiniBand) for multi-node training</li>
            <li>Enable Flash Attention for faster computation</li>
            <li>Use gradient checkpointing to reduce memory usage</li>
            <li>Adjust micro-batch-size based on available GPU memory</li>
            <li>Monitor NCCL communication for network bottlenecks</li>
          </ul>
        </section>
      </div>
    </div>
  );
}
