import { AppShell } from "@/components/layout";
import { HomeFeedView } from "@/components/feed";

export default function FeedPage() {
  return (
    <AppShell title="Home Feed" activeTab="home">
      <HomeFeedView />
    </AppShell>
  );
}
