import { DocsLayout } from "@/components/DocsLayout";

export default function ModelJiutian() {
  return (
    <DocsLayout>
      <div className="space-y-8 animate-in fade-in duration-500">
        <div className="text-sm text-muted-foreground mb-4">
          Docs <span className="mx-2">/</span> Models <span className="mx-2">/</span> Jiutian-13.9B
        </div>

        <div className="space-y-4">
          <h1 className="text-4xl font-bold tracking-tight text-primary">
            Jiutian-13.9B Training Guide
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Learn how to train the Jiutian-13.9B model using SynerFuse with distributed mixture of experts training.
          </p>
        </div>

        <div className="prose prose-slate dark:prose-invert max-w-none">
          <hr className="my-8 border-border" />

          <h2>Model Overview</h2>
          <p>
            Jiutian-13.9B is a sparse mixture of experts (MoE) model with 8 experts. This guide provides the training script and configuration for distributed training using SynerFuse.
          </p>

          <h2>Training Script</h2>
          <p>
            Below is the complete training script for Jiutian-13.9B with distributed expert parallelism:
          </p>

          <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
            <code>{`#!/bin/bash
# Runs Mixtral 8x7B model
export CUDA_DEVICE_MAX_CONNECTIONS=1

GPUS_PER_NODE=8
MASTER_ADDR=\${MASTER_ADDR:-"localhost"}
MASTER_PORT=\${MASTER_PORT:-"6000"}
NNODES=\${SLURM_NNODES:-"1"}
NODE_RANK=\${RANK:-"0"}
WORLD_SIZE=\$((GPUS_PER_NODE*NNODES))

TOKENIZER_MODEL=/data2/nfs/llama-dataset/tokenizer.model
DATA_PATH=/data2/nfs/llama-dataset/RedPajama-Data-1T-Sample/RedPajama-Data-1T-Sample

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
    --seq-length 1024
    --max-position-embeddings 4096
    --num-layers 8
    --hidden-size 5120
    --ffn-hidden-size 13824
    --num-attention-heads 40
    --init-method-std 0.01
    --attention-dropout 0.0
    --hidden-dropout 0.0
    --normalization RMSNorm
    --position-embedding-type rope
    --swiglu
    --untie-embeddings-and-output-weights
    --group-query-attention
    --num-query-groups 40
    --no-masked-softmax-fusion
    --no-position-embedding
    --rotary-base 1000000
)

MOE_ARGS=(
    --expert-model-type Jiutian
    --num-experts 8
    --moe-router-topk 2
    --moe-router-load-balancing-type aux_loss
    --moe-aux-loss-coeff 1e-2
    --overlap-param-gather
    --overlap-grad-reduce
)

DATA_ARGS=(
    --tokenizer-type SentencePieceTokenizer
    --tokenizer-model \${TOKENIZER_MODEL}
    --data-path \${DATA_PATH}
    --split 949,50,1
)

TRAINING_ARGS=(
    --micro-batch-size 1
    --global-batch-size 1024
    --lr 1e-4
    --train-iters 5
    --lr-decay-style cosine
    --min-lr 1.0e-5
    --weight-decay 0.1
    --lr-warmup-iters 1
    --clip-grad 1.0
    --bf16
)

MODEL_PARALLEL_ARGS=(
    --tensor-model-parallel-size 2
    --pipeline-model-parallel-size 4
    --expert-model-parallel-size 1
    --use-distributed-optimizer
    --sequence-parallel
)

LOGGING_ARGS=(
    --log-interval 1
    --save-interval 1000
    --eval-interval 1000
    --eval-iters 10
    --no-load-optim
    --no-load-rng
)

torchrun \${DISTRIBUTED_ARGS[@]} ../../pretrain_gpt.py \\
    \${MODEL_ARGS[@]} \\
    \${MOE_ARGS[@]} \\
    \${DATA_ARGS[@]} \\
    \${TRAINING_ARGS[@]} \\
    \${MODEL_PARALLEL_ARGS[@]} \\
    \${LOGGING_ARGS[@]}`}</code>
          </pre>

          <h2>Key Configuration Parameters</h2>
          <ul>
            <li><strong>Model Size</strong>: 13.9 billion parameters</li>
            <li><strong>Hidden Size</strong>: 5120</li>
            <li><strong>Number of Layers</strong>: 8</li>
            <li><strong>Number of Heads</strong>: 40</li>
            <li><strong>Sequence Length</strong>: 1024</li>
            <li><strong>Tensor Parallel Size</strong>: 2</li>
            <li><strong>Pipeline Parallel Size</strong>: 4</li>
            <li><strong>Expert Parallel Size</strong>: 1</li>
            <li><strong>Number of Experts</strong>: 8</li>
            <li><strong>Top-K Experts</strong>: 2</li>
            <li><strong>Global Batch Size</strong>: 1024</li>
          </ul>

          <h2>Mixture of Experts Configuration</h2>
          <p>
            Jiutian-13.9B uses a sparse MoE architecture with the following characteristics:
          </p>
          <ul>
            <li><strong>Expert Model Type</strong>: Jiutian-specific MoE implementation</li>
            <li><strong>Number of Experts</strong>: 8 independent experts</li>
            <li><strong>Router Top-K</strong>: 2 (each token is routed to top 2 experts)</li>
            <li><strong>Load Balancing</strong>: Auxiliary loss-based load balancing</li>
            <li><strong>Tokenizer</strong>: SentencePiece tokenizer (T5-style)</li>
          </ul>

          <h2>Parallelism Strategy</h2>
          <p>
            Jiutian-13.9B uses a combination of parallelism strategies:
          </p>
          <ul>
            <li><strong>Tensor Parallelism</strong>: 2 (splits model across 2 devices)</li>
            <li><strong>Pipeline Parallelism</strong>: 4 (splits model into 4 stages)</li>
            <li><strong>Sequence Parallelism</strong>: Enabled for improved performance</li>
            <li><strong>Distributed Optimizer</strong>: Reduces memory usage</li>
          </ul>

          <h2>Running the Training</h2>
          <ol>
            <li>Update the tokenizer model path and data path</li>
            <li>Adjust MASTER_ADDR and MASTER_PORT for your cluster</li>
            <li>Run the script: <code>bash train_JT.sh</code></li>
            <li>Monitor training progress via console output</li>
          </ol>

          <h2>Notes</h2>
          <ul>
            <li>This script uses 8 GPUs per node with tensor and pipeline parallelism</li>
            <li>The model uses RMSNorm normalization and rotary position embeddings</li>
            <li>Training uses bfloat16 mixed precision for efficiency</li>
            <li>Supports sequence parallelism for improved performance</li>
            <li>Uses SentencePiece tokenizer (T5-style) for tokenization</li>
            <li>Adjust TRAIN_STEPS, LR, and batch sizes based on your requirements</li>
          </ul>
        </div>
      </div>
    </DocsLayout>
  );
}
