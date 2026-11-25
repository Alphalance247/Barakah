import { AppShell } from "@/components/layout";
import { SubmitClipForm } from "@/components/submit";

export default function SubmitContentPage() {
  return (
    <AppShell title="Home Feed" activeTab="submit">
      <SubmitClipForm />
    </AppShell>
  );
}
