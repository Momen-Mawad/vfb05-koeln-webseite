// app/(public)/teams/[slug]/page.tsx
import { notFound } from "next/navigation";
import Image from "next/image";
import { fetchTeamBySlug, fetchPublicTeams } from "@/lib/data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export async function generateStaticParams() {
  const teams = await fetchPublicTeams();
  return teams.map((team) => ({
    slug: team.slug,
  }));
}

export default async function TeamDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const team = await fetchTeamBySlug(params.slug);

  if (!team) {
    notFound();
  }

  return (
    <div className="container mx-auto px-2 md:px-4 py-4">
      {/* Team Header */}
      <div className="flex-1">
        <h1 className="text-4xl font-bold">{team.name}</h1>
        <p className="text-xl text-muted-foreground">{team.liga}</p>
        <p className="my-1">
          <strong>Trainer:</strong> {team.trainer?.name || "N/A"}
        </p>
      </div>
      <div className="relative aspect-[3/2] rounded-lg overflow-hidden">
        <Image
          src={team.image || "/placeholder-team-1.jpg"}
          alt={`Mannschaftsfoto ${team.name}`}
          fill
          style={{ objectFit: "cover" }}
        />
      </div>

      <div className="pt-1">
        {/* Simplified Tabs - only show the Roster for now */}
        <Tabs defaultValue="kader">
          <TabsContent value="kader">
            <Card>
              <CardHeader>
                <CardTitle>Mannschaftskader</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {team.spieler?.map((player) => (
                      <TableRow key={player._id}>
                        <TableCell>{player.name}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
