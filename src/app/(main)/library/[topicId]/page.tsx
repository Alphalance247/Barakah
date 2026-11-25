export default async function TopicDetailPage({
  params,
}: {
  params: Promise<{ topicId: string }>;
}) {
  const { topicId } = await params;
  return (
    <section className="p-6">
      <h1 className="text-2xl font-bold capitalize">{topicId.replace("-", " ")}</h1>
      <p className="text-muted mt-1">Verified clips in this topic.</p>
    </section>
  );
}
