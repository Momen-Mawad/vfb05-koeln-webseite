import { Card, CardContent } from "@/components/ui/card";
import { allNews } from "@/lib/mock-data";
import Image from "next/image";
import Link from "next/link";

export default function NewsPage() {
  return (
    <div className="container mx-auto px-2 md:px-6 py-4">
      <div className="space-y-2 text-center mb-2">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">
          Alle Neuigkeiten
        </h1>
        <p className="max-w-[900px] mx-auto text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
          Bleiben Sie auf dem Laufenden über alles, was beim VfB 05 Köln
          passiert.
        </p>
      </div>
      <div className="grid gap-2 md:grid-cols-2 lg:grid-cols-3">
        {allNews.map((article) => (
          <Link href={`/news/${article.slug}`} key={article.slug}>
            <Card className="overflow-hidden h-full transform hover:scale-105 transition-transform duration-300">
              <div className="relative w-full h-24">
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  style={{ objectFit: "cover" }}
                />
              </div>
              <CardContent className="p-2">
                <p className="text-xs text-muted-foreground">
                  {new Date(article.date).toLocaleDateString("de-DE", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
                <h3 className="text-lg font-bold mt-1">{article.title}</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  {article.summary}
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
