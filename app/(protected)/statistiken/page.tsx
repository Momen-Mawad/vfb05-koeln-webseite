import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Mock data for team and player stats
const teamStats = {
  spiele: 12,
  siege: 8,
  unentschieden: 2,
  niederlagen: 2,
  tore: 34,
  gegentore: 15,
};

const playerStats = [
  { name: "Max Mustermann", spiele: 12, tore: 9, vorlagen: 5 },
  { name: "Peter Schmidt", spiele: 11, tore: 6, vorlagen: 8 },
  { name: "Jonas Becker", spiele: 12, tore: 2, vorlagen: 3 },
  { name: "Lukas Weber", spiele: 10, tore: 0, vorlagen: 1 },
  { name: "Klaus Fischer", spiele: 12, tore: 0, vorlagen: 0 },
];

export default async function StatisticsPage() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/login");
  }

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-3xl font-bold">Saison-Statistiken</h1>

      {/* Team Stats Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Spiele</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{teamStats.spiele}</div>
            <p className="text-xs text-muted-foreground">
              {teamStats.siege} S - {teamStats.unentschieden} U -{" "}
              {teamStats.niederlagen} N
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tore</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{teamStats.tore}</div>
            <p className="text-xs text-muted-foreground">
              Torverhältnis: +{teamStats.tore - teamStats.gegentore}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Player Stats Table */}
      <Card>
        <CardHeader>
          <CardTitle>Spieler-Statistiken</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Spieler</TableHead>
                <TableHead className="text-right">Spiele</TableHead>
                <TableHead className="text-right">Tore</TableHead>
                <TableHead className="text-right">Vorlagen</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {playerStats.map((player) => (
                <TableRow key={player.name}>
                  <TableCell className="font-medium">{player.name}</TableCell>
                  <TableCell className="text-right">{player.spiele}</TableCell>
                  <TableCell className="text-right">{player.tore}</TableCell>
                  <TableCell className="text-right">
                    {player.vorlagen}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
