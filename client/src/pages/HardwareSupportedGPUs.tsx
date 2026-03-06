export default function HardwareSupportedGPUs() {
  const gpuData = [
    {
      supplier: "NVIDIA",
      ipAddress: "10.21.18.43",
      gpuModel: "H100",
      driver: "550.90.07",
      cuda: "CUDA Version: 12.4",
    },
    {
      supplier: "NVIDIA",
      ipAddress: "10.21.18.44",
      gpuModel: "H100",
      driver: "560.35.03",
      cuda: "CUDA Version: 12.6",
    },
    {
      supplier: "Iluvatar CoreX",
      ipAddress: "10.21.18.49",
      gpuModel: "BI150S",
      driver: "Driver Version: 4.1.0",
      cuda: "CUDA Version: 10.2",
    },
    {
      supplier: "Vastai Technologies",
      ipAddress: "10.21.18.56",
      gpuModel: "VA10",
      driver: "3.2.1",
      cuda: "-",
    },
    {
      supplier: "Huawei",
      ipAddress: "10.21.48.100",
      gpuModel: "910B4",
      driver: "24.1.rc3",
      cuda: "-",
    },
    {
      supplier: "Hygon",
      ipAddress: "10.21.48.104",
      gpuModel: "K100-AI",
      driver: "5.15.0-119-generic",
      cuda: "-",
    },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="space-y-4">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-primary">
          List Of Supported GPUs
        </h1>
        <p className="text-xl text-muted-foreground leading-relaxed">
          HDT framework supports a wide range of GPU accelerators from multiple vendors, enabling heterogeneous distributed training across different hardware platforms.
        </p>
      </div>

      <div className="space-y-8">
        <section className="space-y-4">
          <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight">
            Supported GPU Accelerators
          </h2>
          <p className="text-lg leading-7">
            The following table lists all GPU accelerators that have been tested and verified to work with the HDT framework:
          </p>
          
          {/* GPU Support Table */}
          <div className="overflow-x-auto border rounded-lg">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="px-6 py-3 text-left font-semibold text-foreground">Equipment Supplier</th>
                  <th className="px-6 py-3 text-left font-semibold text-foreground">IP Address</th>
                  <th className="px-6 py-3 text-left font-semibold text-foreground">GPU Model</th>
                  <th className="px-6 py-3 text-left font-semibold text-foreground">Driver</th>
                  <th className="px-6 py-3 text-left font-semibold text-foreground">CUDA / Other</th>
                </tr>
              </thead>
              <tbody>
                {gpuData.map((gpu, index) => (
                  <tr key={index} className="border-b hover:bg-muted/30 transition-colors">
                    <td className="px-6 py-3 text-foreground font-medium">{gpu.supplier}</td>
                    <td className="px-6 py-3 text-muted-foreground font-mono text-xs">{gpu.ipAddress}</td>
                    <td className="px-6 py-3 text-foreground font-medium">{gpu.gpuModel}</td>
                    <td className="px-6 py-3 text-muted-foreground font-mono text-xs">{gpu.driver}</td>
                    <td className="px-6 py-3 text-muted-foreground text-xs">{gpu.cuda}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight">
            GPU Vendor Overview
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* NVIDIA */}
            <div className="border rounded-lg p-6 space-y-3 hover:shadow-md transition-shadow">
              <h3 className="text-xl font-semibold text-primary">NVIDIA</h3>
              <p className="text-sm text-muted-foreground">
                Industry-leading GPU manufacturer with H100 tensor accelerators.
              </p>
              <ul className="text-sm space-y-2 text-muted-foreground">
                <li>✓ H100 (CUDA 12.4, 12.6)</li>
                <li>✓ Latest driver support</li>
                <li>✓ Full CUDA ecosystem</li>
              </ul>
            </div>

            {/* Iluvatar CoreX */}
            <div className="border rounded-lg p-6 space-y-3 hover:shadow-md transition-shadow">
              <h3 className="text-xl font-semibold text-primary">Iluvatar CoreX</h3>
              <p className="text-sm text-muted-foreground">
                Chinese GPU manufacturer specializing in AI accelerators.
              </p>
              <ul className="text-sm space-y-2 text-muted-foreground">
                <li>✓ BI150S accelerator</li>
                <li>✓ Driver Version 4.1.0</li>
                <li>✓ CUDA 10.2 compatible</li>
              </ul>
            </div>

            {/* Vastai Technologies */}
            <div className="border rounded-lg p-6 space-y-3 hover:shadow-md transition-shadow">
              <h3 className="text-xl font-semibold text-primary">Vastai Technologies</h3>
              <p className="text-sm text-muted-foreground">
                Emerging GPU vendor with custom AI accelerators.
              </p>
              <ul className="text-sm space-y-2 text-muted-foreground">
                <li>✓ VA10 accelerator</li>
                <li>✓ Driver Version 3.2.1</li>
                <li>✓ Custom compute architecture</li>
              </ul>
            </div>

            {/* Huawei */}
            <div className="border rounded-lg p-6 space-y-3 hover:shadow-md transition-shadow">
              <h3 className="text-xl font-semibold text-primary">Huawei</h3>
              <p className="text-sm text-muted-foreground">
                Cloud and hardware solutions provider with AI accelerators.
              </p>
              <ul className="text-sm space-y-2 text-muted-foreground">
                <li>✓ 910B4 accelerator</li>
                <li>✓ Driver Version 24.1.rc3</li>
                <li>✓ Enterprise-grade support</li>
              </ul>
            </div>

            {/* Hygon */}
            <div className="border rounded-lg p-6 space-y-3 hover:shadow-md transition-shadow">
              <h3 className="text-xl font-semibold text-primary">Hygon</h3>
              <p className="text-sm text-muted-foreground">
                Chinese processor manufacturer with AI compute solutions.
              </p>
              <ul className="text-sm space-y-2 text-muted-foreground">
                <li>✓ K100-AI accelerator</li>
                <li>✓ Linux kernel integration</li>
                <li>✓ Custom instruction set</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight">
            Key Features
          </h2>
          <ul className="list-disc list-inside space-y-3 text-lg leading-7 ml-4">
            <li>
              <span className="font-medium">Multi-Vendor Support</span>: HDT seamlessly works with GPUs from NVIDIA, Iluvatar CoreX, Vastai Technologies, Huawei, and Hygon.
            </li>
            <li>
              <span className="font-medium">Heterogeneous Acceleration</span>: Mix and match different GPU types in a single training job for optimal resource utilization.
            </li>
            <li>
              <span className="font-medium">Driver Compatibility</span>: Supports a wide range of driver versions for maximum flexibility.
            </li>
            <li>
              <span className="font-medium">CUDA and Beyond</span>: Full CUDA support where available, with custom compute backends for non-NVIDIA accelerators.
            </li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight">
            Adding New GPU Support
          </h2>
          <p className="text-lg leading-7">
            To add support for a new GPU accelerator, please refer to the <a href="#" className="font-medium text-primary underline underline-offset-4">Hardware Integration Guide</a>.
          </p>
          <div className="bg-blue-50 dark:bg-blue-950/30 border-l-4 border-blue-500 p-4 rounded-r-md space-y-2">
            <h4 className="font-semibold text-blue-700 dark:text-blue-300">Note</h4>
            <p className="text-sm text-blue-600 dark:text-blue-400">
              GPU support is continuously expanding. If you have a specific GPU accelerator you'd like to use with HDT, please contact our support team or submit an issue on GitHub.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
