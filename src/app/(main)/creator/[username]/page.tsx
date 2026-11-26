import { PublicProfileView, PUBLIC_CREATORS } from "@/components/profile";

export function generateStaticParams() {
  return Object.keys(PUBLIC_CREATORS).map((username) => ({ username }));
}

interface CreatorProfilePageProps {
  params: Promise<{ username: string }>;
}

export default async function CreatorProfilePage({
  params,
}: CreatorProfilePageProps) {
  const { username } = await params;
  return <PublicProfileView handle={username} />;
}
