// app/(protected)/admin/teams/[id]/kader/page.tsx
"use client";

import { useEffect, useState, useCallback } from "react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { IUser } from "@/models/User";
import Link from "next/link";
import { ArrowLeft, UserPlus, UserMinus } from "lucide-react";

// Type for a team with players populated
interface TeamWithRoster {
  _id: string;
  name: string;
  spieler: { _id: string; name: string; email: string }[];
}

export default function ManageRosterPage() {
  const params = useParams();
  const teamId = params.id as string;

  const [team, setTeam] = useState<TeamWithRoster | null>(null);
  const [availablePlayers, setAvailablePlayers] = useState<IUser[]>([]);
  const [selectedPlayer, setSelectedPlayer] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      // Fetch both team data and available players simultaneously
      const [teamRes, playersRes] = await Promise.all([
        fetch(`/api/admin/teams/${teamId}`),
        fetch(`/api/admin/users?availableForTeam=true`),
      ]);

      if (!teamRes.ok || !playersRes.ok) {
        throw new Error("Fehler beim Laden der Daten.");
      }

      const teamData = await teamRes.json();
      const availablePlayersData = await playersRes.json();

      setTeam(teamData);
      setAvailablePlayers(availablePlayersData);
      setError(null);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Ein Fehler ist aufgetreten."
      );
    } finally {
      setLoading(false);
    }
  }, [teamId]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleRosterChange = async (
    action: "add_player" | "remove_player",
    playerId: string
  ) => {
    try {
      const response = await fetch(`/api/admin/teams/${teamId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action, playerId }),
      });
      if (!response.ok)
        throw new Error("Kader konnte nicht aktualisiert werden.");

      // Refresh all data after a successful change
      fetchData();
      setSelectedPlayer(""); // Reset dropdown
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Aktualisierung fehlgeschlagen."
      );
    }
  };

  if (loading) return <p className="text-center">Daten werden geladen...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;
  if (!team) return <p className="text-center">Team nicht gefunden.</p>;

  return (
    <div className="flex flex-col gap-2">
      <Link
        href="/admin"
        className="flex items-center gap-2 text-sm text-muted-foreground hover:underline"
      >
        <ArrowLeft />
        Zurück zur Übersicht
      </Link>
      <h1 className="text-3xl font-bold">Kader verwalten: {team.name}</h1>

      <div className="grid gap-2 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Aktueller Kader ({team.spieler.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead className="text-right">Aktion</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {team.spieler.map((player) => (
                  <TableRow key={player._id}>
                    <TableCell>{player.name}</TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() =>
                          handleRosterChange("remove_player", player._id)
                        }
                      >
                        <UserMinus className="h-4 w-4 text-red-500" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Spieler hinzufügen</CardTitle>
            <CardDescription>
              Wählen Sie einen verfügbaren Spieler aus der Liste aus.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Select onValueChange={setSelectedPlayer}>
                <SelectTrigger>
                  <SelectValue placeholder="Spieler auswählen" />
                </SelectTrigger>
                <SelectContent>
                  {availablePlayers.map((player) => (
                    <SelectItem
                      key={String(player._id)}
                      value={String(player._id)}
                    >
                      {player.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button
                onClick={() => handleRosterChange("add_player", selectedPlayer)}
                disabled={!selectedPlayer}
              >
                <UserPlus />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
