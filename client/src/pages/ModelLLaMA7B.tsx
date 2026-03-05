import { DocsLayout } from "@/components/DocsLayout";

export default function ModelLLaMA7B() {
  return (
    <DocsLayout>
      <div className="space-y-8 animate-in fade-in duration-500">
        <div className="text-sm text-muted-foreground mb-4">
          Docs <span className="mx-2">/</span> Models <span className="mx-2">/</span> LLaMA-7B
        </div>

        <div className="space-y-4">
          <h1 className="text-4xl font-bold tracking-tight text-primary">
            LLaMA-7B Training Guide
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Learn how to train the LLaMA-7B model using SynerFuse with heterogeneous distributed training.
          </p>
        </div>

        <div className="prose prose-slate dark:prose-invert max-w-none">
          <hr className="my-8 border-border" />

          <h2>Model Overview</h2>
          <p>
            LLaMA-7B is a 7 billion parameter language model. This guide provides the training script and configuration for distributed training using SynerFuse.
          </p>

          <h2>Training Script</h2>
          <p>
            Below is the complete training script for LLaMA-7B with heterogeneous pipeline parallelism configuration:
          </p>

          <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
            <code>{`#!/bin/bash
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
export NCCL_MAX_NCHANNELS=8
export NCCL_MIN_NCHANNELS=8
export NCCL_MAX_P2P_NCHANNELS=1
export NCCL_PROTO=Simple
export NCCL_P2P_LL_THRESHOLD=0
export IXCCL_MIX_NV=1
export IXCCL_FUSED_ENABLE=0
export NCCL_NET_PLUGIN=none
export NCCL_SHM_DISABLE=1

GPUS_PER_NODE=8
MASTER_ADDR=10.21.18.44
MASTER_PORT=6000
NNODES=1
NODE_RANK=0

TENSORBOARD_LOGS_PATH=/data2/nfs/zhurui/cmcc/cmcc-megatron-menhu/examples/llama/tb/nv_1
mkdir -p \${TENSORBOARD_LOGS_PATH}

TOKENIZER_PATH=/data2/nfs/llama-dataset/tokenizer.model
DATA_PATH=/data2/nfs/llama-dataset/merged-1t/merged-1t

# 7B Model Configuration
HIDDEN_SIZE=4096
FFN_HIDDEN_SIZE=11008
NUM_LAYERS=12
NUM_HEADS=32
SEQ_LENGTH=4096
TRAIN_STEPS=5000
LR=3e-4
MIN_LR=3e-5
LR_WARMUP_STEPS=1
WEIGHT_DECAY=0.1
GRAD_CLIP=1
TP=1
PP=4
MIXED_MODE="dp"
MIXED_MBS="1 1 1 1"
GBS=256

DISTRIBUTED_ARGS=(
    --nproc_per_node \${GPUS_PER_NODE}
    --nnodes \${NNODES}
    --node_rank \${NODE_RANK}
    --master_addr \${MASTER_ADDR}
    --master_port \${MASTER_PORT}
)

TRAINING_ARGS=(
    --transformer-impl local
    --use-legacy-models
    --train-iters \${TRAIN_STEPS}
    --eval-iters 0
    --eval-interval 2000
    --tensor-model-parallel-size \${TP}
    --pipeline-model-parallel-size \${PP}
    --disable-bias-linear
    --use-distributed-optimizer
    --use-flash-attn
)

MIXED_PRETRAIN_ARGS=(
    --use-tp-pp-dp-mapping
    --micro-batch-size-per-dp \${MIXED_MBS}
    --global-batch-size \${GBS}
)

MIXED_PRECISION_ARGS=(
    --bf16
    --initial-loss-scale 65536
    --min-loss-scale 1.0
    --loss-scale-window 1024
    --attention-softmax-in-fp32
)

DATA_ARGS=(
    --data-path \${DATA_PATH}
    --split 1
    --tokenizer-type Llama2Tokenizer
    --tokenizer-model \${TOKENIZER_PATH}
)

NETWORK_ARGS=(
    --num-layers \${NUM_LAYERS}
    --hidden-size \${HIDDEN_SIZE}
    --ffn-hidden-size \${FFN_HIDDEN_SIZE}
    --num-attention-heads \${NUM_HEADS}
    --seq-length \${SEQ_LENGTH}
    --max-position-embeddings \${SEQ_LENGTH}
    --use-rotary-position-embeddings
    --no-position-embedding
    --normalization RMSNorm
    --swiglu
    --make-vocab-size-divisible-by 64
    --untie-embeddings-and-output-weights
)

INITIALIZATION_ARGS=(
    --init-method-std 0.02
    --seed 1234
)

REGULARIZATION_ARGS=(
    --attention-dropout 0.0
    --hidden-dropout 0.0
    --weight-decay 0.1
    --adam-beta1 0.9
    --adam-beta2 0.95
    --clip-grad 1.0
)

LEARNING_RATE_ARGS=(
    --lr \${LR}
    --lr-decay-style cosine
    --lr-warmup-iters 2
    --min-lr 1.5e-5
)

LOGGING_ARGS=(
    --log-interval 1
    --timing-log-level 1
    --tensorboard-dir \${TENSORBOARD_LOGS_PATH}
)

LOG_DIR=/data2/nfs/zhurui/cmcc/cmcc-megatron-menhu/examples/llama/logs/nv_1
mkdir -p \${LOG_DIR}

cmd="
torchrun \${DISTRIBUTED_ARGS[@]} /data2/nfs/zhurui/cmcc/cmcc-megatron-menhu/pretrain_llama.py \\
    \${TRAINING_ARGS[@]} \\
    \${MIXED_PRETRAIN_ARGS[@]} \\
    \${MIXED_PRECISION_ARGS[@]} \\
    \${DATA_ARGS[@]} \\
    \${NETWORK_ARGS[@]} \\
    \${INITIALIZATION_ARGS[@]} \\
    \${REGULARIZATION_ARGS[@]} \\
    \${LEARNING_RATE_ARGS[@]} \\
    \${LOGGING_ARGS[@]} | tee \${LOG_DIR}/node\${NODE_RANK}.log
"

echo \$cmd
eval \$cmd`}</code>
          </pre>

          <h2>Key Configuration Parameters</h2>
          <ul>
            <li><strong>Model Size</strong>: 7 billion parameters</li>
            <li><strong>Hidden Size</strong>: 4096</li>
            <li><strong>Number of Layers</strong>: 12</li>
            <li><strong>Number of Heads</strong>: 32</li>
            <li><strong>Sequence Length</strong>: 4096</li>
            <li><strong>Tensor Parallel Size</strong>: 1</li>
            <li><strong>Pipeline Parallel Size</strong>: 4</li>
            <li><strong>Global Batch Size</strong>: 256</li>
          </ul>

          <h2>Running the Training</h2>
          <ol>
            <li>Update the paths in the script (TOKENIZER_PATH, DATA_PATH, etc.)</li>
            <li>Adjust MASTER_ADDR and MASTER_PORT for your cluster</li>
            <li>Run the script: <code>bash LLaMA2_7B_1n_nv.sh</code></li>
            <li>Monitor training progress via TensorBoard</li>
          </ol>

          <h2>Notes</h2>
          <ul>
            <li>This script uses 8 GPUs per node with heterogeneous data parallelism</li>
            <li>The model uses RMSNorm normalization and rotary position embeddings</li>
            <li>Training uses bfloat16 mixed precision for efficiency</li>
            <li>Adjust TRAIN_STEPS, LR, and batch sizes based on your requirements</li>
          </ul>
        </div>
      </div>
    </DocsLayout>
  );
}
