import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="text-center">
        <h1 className="text-4xl font-bold">VfB 05 Köln</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Website coming soon!
        </p>
        <Button className="mt-4">Click Me</Button>
      </div>
    </main>
  );
}