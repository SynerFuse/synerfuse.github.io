import { DocsLayout } from "@/components/DocsLayout";

export default function ModelQwen() {
  return (
    <DocsLayout>
      <div className="space-y-8 animate-in fade-in duration-500">
        <div className="text-sm text-muted-foreground mb-4">
          Docs <span className="mx-2">/</span> Models <span className="mx-2">/</span> Qwen2.5-2.7B
        </div>

        <div className="space-y-4">
          <h1 className="text-4xl font-bold tracking-tight text-primary">
            Qwen2.5-2.7B Training Guide
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Learn how to train the Qwen2.5-2.7B model using SynerFuse with heterogeneous distributed training.
          </p>
        </div>

        <div className="prose prose-slate dark:prose-invert max-w-none">
          <hr className="my-8 border-border" />

          <h2>Model Overview</h2>
          <p>
            Qwen2.5-2.7B is a 2.7 billion parameter language model from Alibaba. This guide provides the training script and configuration for distributed training using SynerFuse.
          </p>

          <h2>Training Script</h2>
          <p>
            Below is the complete training script for Qwen2.5-2.7B with heterogeneous pipeline parallelism configuration:
          </p>

          <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
            <code>{`#!/bin/bash
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
export NCCL_MAX_NCHANNELS=1
export NCCL_MIN_NCHANNELS=1
export NCCL_MAX_P2P_NCHANNELS=1
export NCCL_PROTO=Simple
export NCCL_P2P_LL_THRESHOLD=0
export IXCCL_MIX_NV=1
export IXCCL_FUSED_ENABLE=0
export NCCL_NET_PLUGIN=none
export NCCL_SHM_DISABLE=1

GPUS_PER_NODE=8
MASTER_ADDR=localhost
MASTER_PORT=6000
NNODES=1
NODE_RANK=0

TOKENIZER_PATH=/path/to/tokenizer.model
DATA_PATH=/path/to/dataset

DISTRIBUTED_ARGS=(
    --nproc_per_node \${GPUS_PER_NODE}
    --nnodes \${NNODES}
    --node_rank \${NODE_RANK}
    --master_addr \${MASTER_ADDR}
    --master_port \${MASTER_PORT}
)

LLAMA_MODEL_ARGS=(
    --use-mcore-models
    --disable-bias-linear
    --seq-length 4096
    --max-position-embeddings 32768
    --num-layers 24
    --hidden-size 2048
    --ffn-hidden-size 5504
    --num-attention-heads 16
    --init-method-std 0.02
    --attention-dropout 0.0
    --hidden-dropout 0.0
    --normalization RMSNorm
    --position-embedding-type rope
    --swiglu
    --untie-embeddings-and-output-weights
    --group-query-attention
    --num-query-groups 2
    --no-masked-softmax-fusion
    --no-position-embedding
    --rotary-base 1000000
    --rotary-seq-len-interpolation-factor 1
)

TRAINING_ARGS=(
    --lr 1e-4
    --bf16
    --min-lr 1e-5
    --lr-decay-style cosine
    --weight-decay 0.1
    --adam-beta1 0.9
    --adam-beta2 0.95
    --clip-grad 1.0
    --init-method-std 0.02
    --attention-dropout 0.0
    --hidden-dropout 0.0
    --micro-batch-size 1
    --global-batch-size 32
    --num-layers 24
    --hidden-size 2048
    --num-attention-heads 16
    --ffn-hidden-size 5504
    --seq-length 4096
    --max-position-embeddings 32768
    --log-interval 1
    --eval-interval 1000
    --eval-iters 10
    --tensorboard-queue-size 1
    --log-timers-to-tensorboard
    --log-validation-ppl-to-tensorboard
    --no-load-optim
    --no-load-rng
    --num-workers 8
    --tokenizer-type Qwen2Tokenizer
    --dataset MMAP
    --lr-decay-iters 320000
    --train-iters 60000
    --transformer-impl transformer_engine
    --sequence-parallel
    --use-distributed-optimizer
)

MODEL_PARALLEL_ARGS=(
    --tensor-model-parallel-size 1
    --pipeline-model-parallel-size 2
)

DATA_ARGS=(
    --data-path \${DATA_PATH}
    --split 99,1,0
    --dataset MMAP
)

EVAL_AND_LOGGING_ARGS=(
    --log-interval 1
    --save-interval 100000
    --tensorboard-dir ./tensorboard
)

cmd="
torchrun \${DISTRIBUTED_ARGS[@]} /path/to/pretrain_qwen2_5.py \\
    \${LLAMA_MODEL_ARGS[@]} \\
    \${TRAINING_ARGS[@]} \\
    \${MODEL_PARALLEL_ARGS[@]} \\
    \${DATA_ARGS[@]} \\
    \${EVAL_AND_LOGGING_ARGS[@]}
"

echo \$cmd
eval \$cmd`}</code>
          </pre>

          <h2>Key Configuration Parameters</h2>
          <ul>
            <li><strong>Model Size</strong>: 2.7 billion parameters</li>
            <li><strong>Hidden Size</strong>: 2048</li>
            <li><strong>Number of Layers</strong>: 24</li>
            <li><strong>Number of Heads</strong>: 16</li>
            <li><strong>Sequence Length</strong>: 4096</li>
            <li><strong>Tensor Parallel Size</strong>: 1</li>
            <li><strong>Pipeline Parallel Size</strong>: 2</li>
            <li><strong>Global Batch Size</strong>: 32</li>
          </ul>

          <h2>Running the Training</h2>
          <ol>
            <li>Update the paths in the script (TOKENIZER_PATH, DATA_PATH, etc.)</li>
            <li>Adjust MASTER_ADDR and MASTER_PORT for your cluster</li>
            <li>Run the script: <code>bash qwen2_5_1n.sh</code></li>
            <li>Monitor training progress via TensorBoard</li>
          </ol>

          <h2>Notes</h2>
          <ul>
            <li>This script uses 8 GPUs per node with pipeline parallelism</li>
            <li>The model uses RMSNorm normalization and rotary position embeddings</li>
            <li>Training uses bfloat16 mixed precision for efficiency</li>
            <li>Supports sequence parallelism for improved performance</li>
            <li>Adjust TRAIN_STEPS, LR, and batch sizes based on your requirements</li>
          </ul>
        </div>
      </div>
    </DocsLayout>
  );
}
