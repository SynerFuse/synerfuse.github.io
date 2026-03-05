import { DocsLayout } from "@/components/DocsLayout";

export default function ModelMixtral() {
  return (
    <DocsLayout>
      <div className="space-y-8 animate-in fade-in duration-500">
        <div className="text-sm text-muted-foreground mb-4">
          Docs <span className="mx-2">/</span> Models <span className="mx-2">/</span> Mixtral-8x7B
        </div>

        <div className="space-y-4">
          <h1 className="text-4xl font-bold tracking-tight text-primary">
            Mixtral-8x7B Training Guide
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Learn how to train the Mixtral-8x7B model using SynerFuse with distributed mixture of experts training.
          </p>
        </div>

        <div className="prose prose-slate dark:prose-invert max-w-none">
          <hr className="my-8 border-border" />

          <h2>Model Overview</h2>
          <p>
            Mixtral-8x7B is a sparse mixture of experts (MoE) model with 8 experts of 7 billion parameters each. This guide provides the training script and configuration for distributed training using SynerFuse.
          </p>

          <h2>Training Script</h2>
          <p>
            Below is the complete training script for Mixtral-8x7B with distributed expert parallelism:
          </p>

          <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
            <code>{`#!/bin/bash
export CUDA_DEVICE_MAX_CONNECTIONS=1

GPUS_PER_NODE=8
MASTER_ADDR=\${MASTER_ADDR:-"localhost"}
MASTER_PORT=\${MASTER_PORT:-"6000"}
NNODES=\${SLURM_NNODES:-"1"}
NODE_RANK=\${RANK:-"0"}
WORLD_SIZE=\$((GPUS_PER_NODE*NNODES))

CHECKPOINT_PATH=\$1
TOKENIZER_MODEL=\$2
DATA_PATH=\$3

DISTRIBUTED_ARGS=(
    --nproc_per_node \${GPUS_PER_NODE}
    --nnodes \${NNODES}
    --node_rank \${NODE_RANK}
    --master_addr \${MASTER_ADDR}
    --master_port \${MASTER_PORT}
)

MODEL_ARGS=(
    --use-mcore-models
    --disable-bias-linear
    --seq-length 4096
    --max-position-embeddings 32768
    --num-layers 32
    --hidden-size 4096
    --ffn-hidden-size 14336
    --num-attention-heads 32
    --init-method-std 0.01
    --attention-dropout 0.0
    --hidden-dropout 0.0
    --normalization RMSNorm
    --position-embedding-type rope
    --swiglu
    --untie-embeddings-and-output-weights
    --group-query-attention
    --num-query-groups 8
    --no-masked-softmax-fusion
    --no-position-embedding
    --rotary-base 1000000
)

MOE_ARGS=(
    --num-experts 8
    --moe-router-topk 2
    --moe-router-load-balancing-type aux_loss
    --moe-aux-loss-coeff 1e-2
    --moe-grouped-gemm
    --moe-token-dispatcher-type alltoall
    --overlap-param-gather
    --overlap-grad-reduce
)

DATA_ARGS=(
    --tokenizer-type Llama2Tokenizer
    --tokenizer-model \${TOKENIZER_MODEL}
    --data-path \${DATA_PATH}
    --split 99990,8,2
)

TRAINING_ARGS=(
    --micro-batch-size 1
    --global-batch-size 256
    --lr 1e-4
    --train-iters 500000
    --lr-decay-iters 320000
    --lr-decay-style cosine
    --min-lr 1.0e-5
    --weight-decay 0.1
    --lr-warmup-iters 500
    --clip-grad 1.0
    --bf16
)

MODEL_PARALLEL_ARGS=(
    --tensor-model-parallel-size 1
    --pipeline-model-parallel-size 4
    --expert-model-parallel-size 8
    --use-distributed-optimizer
    --sequence-parallel
)

LOGGING_ARGS=(
    --log-interval 1
    --save-interval 10000
    --eval-interval 1000
    --eval-iters 10
    --save \${CHECKPOINT_PATH}
    --load \${CHECKPOINT_PATH}
    --tensorboard-dir "\${CHECKPOINT_PATH}/tensorboard"
    --no-load-optim
    --no-load-rng
)

if [ -n "\${WANDB_API_KEY}" ]; then
    LOGGING_ARGS+=(
        --wandb-project \${WANDB_PROJECT:-"Mixtral"}
        --wandb-exp-name \${WANDB_NAME:-"Mixtral_8x7B"}
    )
fi

torchrun \${DISTRIBUTED_ARGS[@]} pretrain_gpt.py \\
    \${MODEL_ARGS[@]} \\
    \${MOE_ARGS[@]} \\
    \${DATA_ARGS[@]} \\
    \${TRAINING_ARGS[@]} \\
    \${MODEL_PARALLEL_ARGS[@]} \\
    \${LOGGING_ARGS[@]}`}</code>
          </pre>

          <h2>Key Configuration Parameters</h2>
          <ul>
            <li><strong>Model Size</strong>: 8 experts × 7B parameters = 56B total</li>
            <li><strong>Hidden Size</strong>: 4096</li>
            <li><strong>Number of Layers</strong>: 32</li>
            <li><strong>Number of Heads</strong>: 32</li>
            <li><strong>Sequence Length</strong>: 4096</li>
            <li><strong>Tensor Parallel Size</strong>: 1</li>
            <li><strong>Pipeline Parallel Size</strong>: 4</li>
            <li><strong>Expert Parallel Size</strong>: 8</li>
            <li><strong>Number of Experts</strong>: 8</li>
            <li><strong>Top-K Experts</strong>: 2</li>
            <li><strong>Global Batch Size</strong>: 256</li>
          </ul>

          <h2>Mixture of Experts Configuration</h2>
          <p>
            Mixtral-8x7B uses a sparse MoE architecture with the following characteristics:
          </p>
          <ul>
            <li><strong>Number of Experts</strong>: 8 independent experts</li>
            <li><strong>Router Top-K</strong>: 2 (each token is routed to top 2 experts)</li>
            <li><strong>Load Balancing</strong>: Auxiliary loss-based load balancing</li>
            <li><strong>Grouped GEMM</strong>: Optimized matrix multiplication for MoE</li>
            <li><strong>Token Dispatcher</strong>: All-to-all communication for token routing</li>
          </ul>

          <h2>Running the Training</h2>
          <ol>
            <li>Update the checkpoint path, tokenizer model path, and data path</li>
            <li>Adjust MASTER_ADDR and MASTER_PORT for your cluster</li>
            <li>Run the script: <code>bash train_mixtral_8x7b_distributed.sh /path/to/checkpoint /path/to/tokenizer /path/to/data</code></li>
            <li>Monitor training progress via TensorBoard or Weights & Biases</li>
          </ol>

          <h2>Notes</h2>
          <ul>
            <li>This script uses 8 GPUs per node with expert parallelism</li>
            <li>The model uses RMSNorm normalization and rotary position embeddings</li>
            <li>Training uses bfloat16 mixed precision for efficiency</li>
            <li>Supports sequence parallelism for improved performance</li>
            <li>Expert parallelism distributes experts across multiple devices</li>
            <li>Supports Weights & Biases (W&B) integration for experiment tracking</li>
            <li>Adjust TRAIN_STEPS, LR, and batch sizes based on your requirements</li>
          </ul>
        </div>
      </div>
    </DocsLayout>
  );
}
