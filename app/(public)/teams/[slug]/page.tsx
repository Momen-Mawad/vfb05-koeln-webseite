import { notFound } from "next/navigation";
import Image from "next/image";
import {
  allTeams,
  teamRosters,
  teamSchedules,
  leagueTables,
} from "@/lib/mock-data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Generate static pages for each team at build time
export function generateStaticParams() {
  return allTeams.map((team) => ({ slug: team.slug }));
}

export default function TeamDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const team = allTeams.find((t) => t.slug === params.slug);
  const roster = teamRosters[params.slug];
  const schedule = teamSchedules[params.slug];
  const table = leagueTables[params.slug];

  if (!team) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 md:px-6 py-12">
      {/* Team Header */}
      <div className="flex flex-col md:flex-row items-start gap-6 mb-8">
        <div className="relative w-full md:w-1/3 h-64 rounded-lg overflow-hidden">
          <Image
            src={team.image}
            alt={`Mannschaftsfoto ${team.name}`}
            fill
            style={{ objectFit: "cover" }}
          />
        </div>
        <div className="flex-1">
          <h1 className="text-4xl font-bold">{team.name}</h1>
          <p className="text-xl text-muted-foreground">{team.league}</p>
          <p className="mt-4">
            <strong>Trainer:</strong> {team.coach}
          </p>
        </div>
      </div>

      {/* Tabs for Roster, Schedule, Table */}
      <Tabs defaultValue="kader">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="kader">Kader</TabsTrigger>
          <TabsTrigger value="spielplan">Spielplan</TabsTrigger>
          <TabsTrigger value="tabelle">Tabelle</TabsTrigger>
        </TabsList>

        {/* Roster Tab */}
        <TabsContent value="kader">
          <Card>
            <CardHeader>
              <CardTitle>Mannschaftskader</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">Nr.</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Position</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {roster?.map((player) => (
                    <TableRow key={player.num}>
                      <TableCell className="font-medium">
                        {player.num}
                      </TableCell>
                      <TableCell>{player.name}</TableCell>
                      <TableCell>{player.pos}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Schedule Tab */}
        <TabsContent value="spielplan">
          <Card>
            <CardHeader>
              <CardTitle>Spielplan & Ergebnisse</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Datum</TableHead>
                    <TableHead>Gegner</TableHead>
                    <TableHead>Ergebnis</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {schedule?.map((match) => (
                    <TableRow key={match.opponent}>
                      <TableCell>
                        {new Date(match.date).toLocaleDateString("de-DE")}
                      </TableCell>
                      <TableCell>{match.opponent}</TableCell>
                      <TableCell>{match.result}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* League Table Tab */}
        <TabsContent value="tabelle">
          <Card>
            <CardHeader>
              <CardTitle>Ligatabelle</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Pos.</TableHead>
                    <TableHead>Mannschaft</TableHead>
                    <TableHead>Punkte</TableHead>
                    <TableHead>Tordifferenz</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {table?.map((row) => (
                    <TableRow
                      key={row.team}
                      className={
                        row.team === "VfB 05 Köln" ? "bg-muted/50" : ""
                      }
                    >
                      <TableCell>{row.pos}</TableCell>
                      <TableCell>{row.team}</TableCell>
                      <TableCell>{row.pts}</TableCell>
                      <TableCell>{row.gd}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
