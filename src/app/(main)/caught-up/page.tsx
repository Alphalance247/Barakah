import { AppShell } from "@/components/layout";
import { AllCaughtUpView } from "@/components/feed";

export default function CaughtUpPage() {
  return (
    <AppShell title="Home Feed" activeTab="home">
      <AllCaughtUpView />
    </AppShell>
  );
}
