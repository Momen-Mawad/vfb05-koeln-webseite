export default function PlaceholderPage({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="container mx-auto px-4 md:px-6 py-12">
      <div className="space-y-4">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">
          {title}
        </h1>
        <div className="prose max-w-none">{children}</div>
      </div>
    </div>
  );
}
