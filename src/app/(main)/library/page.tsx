import { AppShell } from "@/components/layout";
import { LibraryView } from "@/components/library";

export default function LibraryPage() {
  return (
    <AppShell title="Library" activeTab="library">
      <LibraryView />
    </AppShell>
  );
}
