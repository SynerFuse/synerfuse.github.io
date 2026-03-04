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
      
      {/* 通配符路由：匹配所有其他文档路径，按照 SynerFuseDoc.md 的新结构 */}
      <Route path="/parameter/:sub*" component={withLayout(GenericDoc)} />
      <Route path="/models/:sub*" component={withLayout(GenericDoc)} />
      <Route path="/hardware/:sub*" component={withLayout(GenericDoc)} />
      <Route path="/advanced/:sub*" component={withLayout(GenericDoc)} />
      <Route path="/api/:sub*" component={withLayout(GenericDoc)} />
      
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
