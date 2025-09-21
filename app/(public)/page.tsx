import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { allNews } from "@/lib/mock-data";

// Mock data for news articles
const latestNews = allNews.slice(0, 2);

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* --- Hero Section --- */}
      <section className="relative w-full h-[60vh] flex items-center justify-center text-center text-white">
        <Image
          src="/jubelnde_mannschaft.png"
          alt="Jubelnde Mannschaft"
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

      {/* --- Next Match Section --- */}
      <section className="container mx-auto px-4 md:px-6 py-12">
        <Card>
          <CardContent className="flex flex-col md:flex-row items-center justify-around p-6 gap-6">
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Nächstes Spiel</p>
              <p className="text-lg font-bold">Kreisliga C - 13. Spieltag</p>
            </div>
            <div className="flex items-center gap-4 text-2xl font-bold">
              <span>VfB 05 Köln</span>
              <span className="text-muted-foreground">vs.</span>
              <span>SC West Köln</span>
            </div>
            <div className="text-center">
              <p className="text-lg font-bold">Sonntag, 28. September 2025</p>
              <p className="text-sm text-muted-foreground">
                15:00 Uhr - Sportpark West
              </p>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* --- Latest News Section --- */}
      <section className="bg-muted/40 py-12">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl font-bold text-center mb-8">Aktuelle News</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {latestNews.map((article) => (
              <Link href="/news" key={article.title}>
                <Card className="overflow-hidden h-full transform hover:scale-105 transition-transform duration-300">
                  <div className="relative w-full h-48">
                    <Image
                      src={article.image}
                      alt={article.title}
                      fill
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                  <CardContent className="p-4">
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
