import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { allTeams } from "@/lib/mock-data";
import Image from "next/image";
import Link from "next/link";

export default function TeamsPage() {
  return (
    <div className="container mx-auto px-4 md:px-6 py-12">
      <div className="space-y-4 text-center mb-10">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">
          Unsere Mannschaften
        </h1>
        <p className="max-w-[900px] mx-auto text-muted-foreground md:text-xl/relaxed">
          Von den Bambinis bis zu den Alten Herren – hier schlägt das Herz des
          Vereins.
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {allTeams.map((team) => (
          <Link href={`/teams/${team.slug}`} key={team.slug}>
            <Card className="overflow-hidden h-full transform hover:scale-105 transition-transform duration-300">
              <div className="relative w-full h-56">
                <Image
                  src={team.image}
                  alt={`Mannschaftsfoto ${team.name}`}
                  fill
                  style={{ objectFit: "cover" }}
                  className="brightness-90"
                />
              </div>
              <CardHeader>
                <CardTitle>{team.name}</CardTitle>
                <CardDescription>{team.league}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Trainer: {team.coach}
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
