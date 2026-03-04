import { DocsLayout } from "@/components/DocsLayout";
import { useLocation } from "wouter";

export default function GenericDoc() {
  const [location] = useLocation();
  
  // 从路径中提取标题，例如 "/getting-started/installation" -> "Installation"
  const getTitleFromPath = (path: string) => {
    const parts = path.split('/').filter(Boolean);
    if (parts.length === 0) return "Introduction";
    
    const lastPart = parts[parts.length - 1];
    // 将 kebab-case 转换为 Title Case
    return lastPart
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const title = getTitleFromPath(location);

  return (
    <DocsLayout>
      <div className="space-y-8 animate-in fade-in duration-500">
        {/* 面包屑导航模拟 */}
        <div className="text-sm text-muted-foreground mb-4">
          Docs <span className="mx-2">/</span> {location.split('/')[1] || 'General'} <span className="mx-2">/</span> <span className="text-foreground font-medium">{title}</span>
        </div>

        <div className="space-y-4">
          <h1 className="text-4xl font-bold tracking-tight text-primary">{title}</h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            This is a placeholder page for the <strong>{title}</strong> documentation.
          </p>
        </div>

        <div className="prose prose-slate dark:prose-invert max-w-none">
          <hr className="my-8 border-border" />
          
          <h3>What goes here?</h3>
          <p>
            You can replace this generic component with specific content for each section. 
            Currently, this page is dynamically rendered based on the URL route: 
            <code className="bg-muted px-1.5 py-0.5 rounded text-sm">{location}</code>
          </p>

          <div className="bg-blue-50 dark:bg-blue-950/30 border-l-4 border-blue-500 p-4 my-6 rounded-r-md">
            <h4 className="text-blue-700 dark:text-blue-300 font-semibold mt-0 mb-2">Tip: Customizing Content</h4>
            <p className="text-blue-600 dark:text-blue-400 m-0 text-sm">
              To add real content, create a new file in <code>client/src/pages/</code> (e.g., <code>Installation.tsx</code>) 
              and update the routing in <code>App.tsx</code> to point to it.
            </p>
          </div>

          <h3>Example Structure</h3>
          <ul>
            <li><strong>Overview</strong>: High-level summary of the topic.</li>
            <li><strong>Prerequisites</strong>: What users need before starting.</li>
            <li><strong>Step-by-step Guide</strong>: Detailed instructions.</li>
            <li><strong>Troubleshooting</strong>: Common issues and fixes.</li>
          </ul>
        </div>
      </div>
    </DocsLayout>
  );
}
