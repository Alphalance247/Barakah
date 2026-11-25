import { TopHeader } from "./TopHeader";
import { BottomNav, type NavTab } from "./BottomNav";

interface AppShellProps {
  title: string;
  activeTab?: NavTab;
  children: React.ReactNode;
}

export function AppShell({ title, activeTab, children }: AppShellProps) {
  return (
    <div className="min-h-screen flex flex-col bg-surface text-on-surface">
      <TopHeader title={title} />
      <main className="flex-1 flex flex-col relative w-full max-w-120 mx-auto pt-16 pb-24 bg-surface">
        {children}
      </main>
      <BottomNav activeTab={activeTab} />
    </div>
  );
}
