export default async function CreatorProfilePage({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = await params;
  return (
    <section className="p-6">
      <h1 className="text-2xl font-bold">@{username}</h1>
      <p className="text-muted mt-1">Verified scholar / source profile and clips.</p>
    </section>
  );
}
