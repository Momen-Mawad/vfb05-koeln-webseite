import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { allNews } from "@/lib/mock-data";
import CloudinaryImage from "@/components/CloudinaryImage";

// Mock data for news articles
const latestNews = allNews.slice(0, 2);

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* --- Hero Section --- */}
      <section className="relative w-full h-[60vh] flex items-center justify-center text-center text-white">
        <CloudinaryImage
          src="v1760796463/verein_startseite_20250823_l8gtxr.png"
          alt="VfB 05 Köln Hero Image"
          fill
          style={{ objectFit: "cover" }}
          className="brightness-50"
        />
        <div className="relative z-10 p-4">
          <h1 className="text-4xl md:text-6xl font-bold">VfB 05 Köln</h1>
          <p className="text-lg md:text-xl mt-2">
            Tradition. Leidenschaft. Zukunft.
          </p>
          <Button asChild className="mt-6">
            <Link href="/teams">Unsere Teams</Link>
          </Button>
        </div>
      </section>

      {/* --- Latest News Section --- */}
      <section className="bg-muted/40 py-4">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl font-bold text-center mb-2">Aktuelle News</h2>
          <div className="grid gap-2 md:grid-cols-2">
            {latestNews.map((article) => (
              <Link href="/news" key={article.title}>
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
                    <h3 className="text-lg font-bold">{article.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      {article.summary}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
