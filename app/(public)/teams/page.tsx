// app/(public)/teams/page.tsx
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { fetchPublicTeams } from "@/lib/data";

export default async function TeamsPage() {
  const teams = await fetchPublicTeams();

  return (
    <div className="container mx-auto px-2 md:px-6 py-4">
      <div className="space-y-2 text-center mb-2">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">
          Unsere Mannschaften
        </h1>
        <p className="max-w-[900px] mx-auto text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
          Von den Bambinis bis zu den Alten Herren – hier schlägt das Herz des
          Vereins.
        </p>
      </div>
      <div className="grid gap-2 md:grid-cols-2 lg:grid-cols-3">
        {teams.map((team) => (
          <Link href={`/teams/${team.slug}`} key={team.slug}>
            <Card className="overflow-hidden h-full transform hover:scale-105 transition-transform duration-300">
              <div className="relative w-full h-24">
                <Image
                  src={team.image || "/placeholder-team-1.jpg"}
                  alt={`Mannschaftsfoto ${team.name}`}
                  fill
                  style={{ objectFit: "cover" }}
                  className="brightness-90"
                />
              </div>
              <CardHeader>
                <CardTitle>{team.name}</CardTitle>
                <CardDescription>{team.liga}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Trainer: {team.trainer?.name || "N/A"}
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
