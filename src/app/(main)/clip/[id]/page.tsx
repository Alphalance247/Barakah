export default async function ClipSharePreviewPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <section className="p-6">
      <h1 className="text-2xl font-bold">Clip #{id}</h1>
      <p className="text-muted mt-1">Shared clip preview.</p>
    </section>
  );
}
