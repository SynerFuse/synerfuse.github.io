import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Router as WouterRouter, Switch } from "wouter";
import { useHashLocation } from "wouter/use-hash-location";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import GenericDoc from "./pages/GenericDoc";
import Introduction from "./pages/Introduction";
import QuickStart from "./pages/QuickStart";
import Architecture from "./pages/Architecture";
import ParameterExplanation from "./pages/ParameterExplanation";
import ModelLLaMA7B from "./pages/ModelLLaMA7B";
import ModelQwen from "./pages/ModelQwen";
import ModelDeepSeek from "./pages/ModelDeepSeek";
import ModelMixtral from "./pages/ModelMixtral";
import ModelJiutian from "./pages/ModelJiutian";
import AdvancedPipelineParallelism from "./pages/AdvancedPipelineParallelism";
import AdvancedDataParallelism from "./pages/AdvancedDataParallelism";
import AdvancedTensorParallelism from "./pages/AdvancedTensorParallelism";
import AdvancedExpertParallelism from "./pages/AdvancedExpertParallelism";
import AdvancedContextParallelism from "./pages/AdvancedContextParallelism";
import { DocsLayout } from "./components/DocsLayout";

// 使用 Hash 路由以兼容 GitHub Pages 静态托管
function HashRouter({ children }: { children: React.ReactNode }) {
  return (
    <WouterRouter hook={useHashLocation}>
      {children}
    </WouterRouter>
  );
}

// 包装组件：为页面添加 DocsLayout
const withLayout = (Component: React.ComponentType) => {
  return (props: any) => (
    <DocsLayout>
      <Component {...props} />
    </DocsLayout>
  );
};

function AppRoutes() {
  return (
    <Switch>
      {/* 首页现在是 Introduction */}
      <Route path="/" component={withLayout(Introduction)} />
      
      {/* Quick Start 独立页面 */}
      <Route path="/quick-start" component={withLayout(QuickStart)} />
      
      {/* Parameter Explanation */}
      <Route path="/parameter/explanation" component={withLayout(ParameterExplanation)} />
      
      {/* Models */}
      <Route path="/models/llama-7b" component={withLayout(ModelLLaMA7B)} />
      <Route path="/models/qwen2.5-2.7b" component={withLayout(ModelQwen)} />
      <Route path="/models/deepseek-v3" component={withLayout(ModelDeepSeek)} />
      <Route path="/models/mixtral-8x7b" component={withLayout(ModelMixtral)} />
      <Route path="/models/jiutian-13.9b" component={withLayout(ModelJiutian)} />
      
      {/* Advanced Features */}
      <Route path="/advanced/pipeline-parallelism" component={withLayout(AdvancedPipelineParallelism)} />
      <Route path="/advanced/data-parallelism" component={withLayout(AdvancedDataParallelism)} />
      <Route path="/advanced/tensor-parallelism" component={withLayout(AdvancedTensorParallelism)} />
      <Route path="/advanced/expert-parallelism" component={withLayout(AdvancedExpertParallelism)} />
      <Route path="/advanced/context-parallelism" component={withLayout(AdvancedContextParallelism)} />
      
      {/* 通配符路由：匹配所有其他文档路径 */}
      <Route path="/parameter/:sub*" component={withLayout(GenericDoc)} />
      <Route path="/models/:sub*" component={withLayout(GenericDoc)} />
      <Route path="/hardware/:sub*" component={withLayout(GenericDoc)} />
      <Route path="/advanced/:sub*" component={withLayout(GenericDoc)} />
      
      {/* 404 页面 */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <HashRouter>
            <AppRoutes />
          </HashRouter>
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
