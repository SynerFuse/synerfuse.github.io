export default function QuickStart() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="space-y-4">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-primary">
          Quick Start
        </h1>
        <p className="text-xl text-muted-foreground leading-relaxed">
          Get up and running with SynerFuse in minutes.
        </p>
      </div>

      <div className="space-y-8">
        <section className="space-y-4">
          <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight">
            Environment Preparation
          </h2>
          <p className="text-lg leading-7">
            SynerFuse is recommended to run in a containerized environment based on NVIDIA's NGC PyTorch image, which ensures compatibility with GPU-accelerated libraries.
          </p>
          <ul className="list-disc list-inside space-y-2 text-lg leading-7 ml-4">
            <li>Ubuntu 20.04 / 22.04</li>
            <li>Python 3.10+</li>
            <li>PyTorch 2.4.0+ (with GPU support)</li>
            <li>NVIDIA GPUs with a recent driver (the NGC container includes CUDA and cuDNN)</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight">
            Setup
          </h2>
          <p className="text-lg leading-7">
            We recommend using NGC's PyTorch container (e.g., <a href="https://catalog.ngc.nvidia.com/orgs/nvidia/containers/pytorch" target="_blank" rel="noopener noreferrer" className="font-medium text-primary underline underline-offset-4">nvcr.io/nvidia/pytorch:24.02-py3</a>) for setup.
          </p>
          <ol className="list-decimal list-inside space-y-6 text-lg leading-7 ml-4">
            <li>
              <span className="font-medium">Create and start the container:</span>
              <pre className="mt-2 bg-muted p-4 rounded-lg overflow-x-auto text-sm font-mono"><code>{`docker run -itd \\
  --name synerfuse \\
  --gpus all \\
  --network=host \\
  --ipc=host \\
  --privileged \\
  nvcr.io/nvidia/pytorch:24.07-py3 \\
  bash`}</code></pre>
            </li>
            <li>
              <span className="font-medium">Access the container:</span>
              <pre className="mt-2 bg-muted p-4 rounded-lg overflow-x-auto text-sm font-mono"><code>docker exec -it synerfuse bash</code></pre>
            </li>
            <li>
              <span className="font-medium">Clone the repository:</span>
              <pre className="mt-2 bg-muted p-4 rounded-lg overflow-x-auto text-sm font-mono"><code>git clone https://github.com/SynerFuse/SynerFuse</code></pre>
            </li>
            <li>
              <span className="font-medium">Install dependencies:</span>
              <pre className="mt-2 bg-muted p-4 rounded-lg overflow-x-auto text-sm font-mono"><code>pip install sentencepiece</code></pre>
            </li>
          </ol>
        </section>

        <section className="space-y-4">
          <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight">
            Prepare Data
          </h2>
          <p className="text-lg leading-7">Before running training tasks, prepare the following data files:</p>
          <ol className="list-decimal list-inside space-y-2 text-lg leading-7 ml-4">
            <li><strong>Tokenizer Model</strong>: Download or prepare a tokenizer model file (e.g., <code>tokenizer.model</code>).</li>
            <li><strong>Training Dataset</strong>: Prepare training data in Megatron-LM format (<code>.bin</code> and <code>.idx</code> files).</li>
          </ol>
          <p className="text-lg leading-7 mt-4">Update the following paths in <code>run.sh</code> according to your data location:</p>
          <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm font-mono"><code>{`TOKENIZER_PATH=/path/to/your/tokenizer.model
DATA_PATH=/path/to/your/dataset`}</code></pre>
        </section>

        <section className="space-y-4">
          <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight">
            Configure Paths
          </h2>
          <p className="text-lg leading-7">Configure directories for checkpoints and TensorBoard logs in <code>run.sh</code>:</p>
          <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm font-mono"><code>{`CHECKPOINT_PATH=/path/to/your/checkpoints
TENSORBOARD_LOGS_PATH=/path/to/your/tensorboard_logs`}</code></pre>
          <p className="text-lg leading-7 mt-4">Make sure these directories exist inside the container, for example:</p>
          <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm font-mono"><code>{`mkdir -p /workspace/checkpoints
mkdir -p /workspace/tensorboard_logs`}</code></pre>
        </section>

        <section className="space-y-4">
          <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight">
            Run a Task
          </h2>
          <p className="text-lg leading-7">SynerFuse provides a simple bash script for running pre-training tasks. To start distributed heterogeneous training:</p>
          <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm font-mono"><code>{`cd SynerFuse
bash run.sh`}</code></pre>
          <p className="text-lg leading-7 mt-4">The script launches a distributed training job with default configurations.</p>
          <p className="text-lg leading-7">Monitor training progress through the console output and (optionally) TensorBoard if enabled.</p>
        </section>
      </div>
    </div>
  );
}
