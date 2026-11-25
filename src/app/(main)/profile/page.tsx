import { AppShell } from "@/components/layout";
import { ProfileView } from "@/components/profile";

export default function ProfilePage() {
  return (
    <AppShell title="Home Feed" activeTab="profile">
      <ProfileView />
    </AppShell>
  );
}
