import { DocsLayout } from "@/components/DocsLayout";

export default function ModelDeepSeek() {
  return (
    <DocsLayout>
      <div className="space-y-8 animate-in fade-in duration-500">
        <div className="text-sm text-muted-foreground mb-4">
          Docs <span className="mx-2">/</span> Models <span className="mx-2">/</span> DeepSeek-V3
        </div>

        <div className="space-y-4">
          <h1 className="text-4xl font-bold tracking-tight text-primary">
            DeepSeek-V3 Training Guide
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Learn how to train the DeepSeek-V3 model using SynerFuse with heterogeneous distributed training and mixture of experts.
          </p>
        </div>

        <div className="prose prose-slate dark:prose-invert max-w-none">
          <hr className="my-8 border-border" />

          <h2>Model Overview</h2>
          <p>
            DeepSeek-V3 is an advanced language model with mixture of experts (MoE) architecture. This guide provides the training script and configuration for distributed training using SynerFuse with heterogeneous pipeline parallelism.
          </p>

          <h2>Training Script</h2>
          <p>
            Below is the complete training script for DeepSeek-V3 with heterogeneous pipeline parallelism and expert parallelism:
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

MOE_ARGS=(
    --moe-ffn-hidden-size 1408
    --moe-router-load-balancing-type aux_loss
    --moe-router-score-function sigmoid
    --moe-router-enable-expert-bias
    --moe-router-bias-update-rate 0.001
    --moe-router-topk 6
    --moe-router-num-groups 1
    --moe-router-group-topk 1
    --num-experts 64
    --moe-layer-freq 1
    --moe-aux-loss-coeff 1e-2
    --expert-model-parallel-size 2
    --kv-lora-rank 512
    --qk-head-dim 128
    --qk-pos-emb-head-dim 64
    --v-head-dim 128
)

TRAINING_ARGS=(
    --lr 1e-5
    --bf16
    --min-lr 1e-6
    --lr-decay-style cosine
    --weight-decay 0.1
    --adam-beta1 0.9
    --adam-beta2 0.95
    --clip-grad 1.0
    --init-method-std 0.008
    --attention-dropout 0.0
    --hidden-dropout 0.0
    --micro-batch-size 1
    --global-batch-size 8
    --num-layers 12
    --hidden-size 2048
    --num-attention-heads 16
    --ffn-hidden-size 11264
    --seq-length 1024
    --max-position-embeddings 4096
    --log-interval 1
    --eval-interval 10000
    --eval-iters 10
    --tensorboard-queue-size 1
    --log-timers-to-tensorboard
    --log-validation-ppl-to-tensorboard
    --no-load-optim
    --no-load-rng
    --num-workers 8
    --extra-vocab-size 467
    --tokenizer-type DeepSeekV2Tokenizer
    --dataset MMAP
    --swiglu
    --normalization RMSNorm
    --no-bias-swiglu-fusion
    --norm-epsilon 1e-06
    --use-rotary-position-embeddings
    --no-rope-fusion
    --position-embedding-type rope
    --rotary-scaling-factor 40
    --no-save-optim
    --untie-embeddings-and-output-weights
    --disable-bias-linear
    --add-qkv-bias
    --rotary-base 10000
    --rotary-seq-len-interpolation-factor 1
    --lr-decay-iters 320000
    --train-iters 100000
    --transformer-impl transformer_engine
    --kv-channels 128
    --qk-layernorm
    --multi-latent-attention
    --ckpt-format torch
    --sequence-parallel
    --use-distributed-optimizer
    --overlap-grad-reduce
    --overlap-param-gather
)

MODEL_PARALLEL_ARGS=(
    --enable-hetero
    --hetero-process-meshes 1 1 1 4 1 1 1 1 4 1
    --hetero-device-types H100 H100
    --hetero-current-device-type H100
    --hetero-pipeline-stages 1 8 1 4
    --tensor-model-parallel-size 1
    --pipeline-model-parallel-size 2
    --context-parallel-size 1
)

DATA_ARGS=(
    --data-path \${DATA_PATH}
    --apply-sft-dataset-separated-loss-mask-if-existed
    --split 99,1,0
)

EVAL_AND_LOGGING_ARGS=(
    --log-interval 1
    --tokenizer-path \${TOKENIZER_PATH}
)

cmd="
torchrun \${DISTRIBUTED_ARGS[@]} /path/to/pretrain_gpt.py \\
    \${TRAINING_ARGS[@]} \\
    \${MOE_ARGS[@]} \\
    \${MODEL_PARALLEL_ARGS[@]} \\
    \${DATA_ARGS[@]} \\
    \${EVAL_AND_LOGGING_ARGS[@]}
"

echo \$cmd
eval \$cmd`}</code>
          </pre>

          <h2>Key Configuration Parameters</h2>
          <ul>
            <li><strong>Model Size</strong>: 12 layers with 64 experts</li>
            <li><strong>Hidden Size</strong>: 2048</li>
            <li><strong>Number of Heads</strong>: 16</li>
            <li><strong>Sequence Length</strong>: 1024</li>
            <li><strong>Tensor Parallel Size</strong>: 1</li>
            <li><strong>Pipeline Parallel Size</strong>: 2</li>
            <li><strong>Expert Parallel Size</strong>: 2</li>
            <li><strong>Number of Experts</strong>: 64</li>
            <li><strong>Top-K Experts</strong>: 6</li>
            <li><strong>Global Batch Size</strong>: 8</li>
          </ul>

          <h2>Heterogeneous Configuration</h2>
          <p>
            DeepSeek-V3 uses heterogeneous pipeline parallelism with different GPU types:
          </p>
          <ul>
            <li><strong>Hetero Process Meshes</strong>: 1 1 1 4 1 1 1 1 4 1 (defines the mesh topology)</li>
            <li><strong>Device Types</strong>: H100 GPUs</li>
            <li><strong>Pipeline Stages</strong>: 1 8 1 4 (Stage 0: 1 device with 8 layers, Stage 1: 1 device with 4 layers)</li>
          </ul>

          <h2>Running the Training</h2>
          <ol>
            <li>Update the paths in the script (TOKENIZER_PATH, DATA_PATH, etc.)</li>
            <li>Adjust MASTER_ADDR and MASTER_PORT for your cluster</li>
            <li>Run the script: <code>bash deepseek_v3_nv_1n.sh</code></li>
            <li>Monitor training progress via TensorBoard</li>
          </ol>

          <h2>Notes</h2>
          <ul>
            <li>This script uses 8 GPUs per node with mixture of experts architecture</li>
            <li>Supports heterogeneous pipeline parallelism for different GPU types</li>
            <li>Uses expert parallelism to distribute experts across devices</li>
            <li>Training uses bfloat16 mixed precision for efficiency</li>
            <li>Includes sequence parallelism for improved performance</li>
            <li>Adjust TRAIN_STEPS, LR, and batch sizes based on your requirements</li>
          </ul>
        </div>
      </div>
    </DocsLayout>
  );
}
