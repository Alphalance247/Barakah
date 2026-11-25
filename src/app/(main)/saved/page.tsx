import { AppShell } from "@/components/layout";
import { SavedView } from "@/components/saved";

export default function SavedPage() {
  return (
    <AppShell title="Saved" activeTab="saved">
      <SavedView />
    </AppShell>
  );
}
