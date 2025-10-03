// components/admin/TeamManagementTab.tsx
"use client";

import { useEffect, useState, useCallback } from "react";
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
import AddTeamDialog from "./AddTeamDialog"; // 1. Import the new component

interface PopulatedTeam {
  _id: string;
  name: string;
  liga: string;
  trainer?: { _id: string; name: string };
  spieler: { _id: string; name: string }[];
  createdAt: string;
}

export default function TeamManagementTab() {
  const [teams, setTeams] = useState<PopulatedTeam[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTeams = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/teams");
      if (!res.ok) throw new Error("Fehler beim Abrufen der Teams");
      const data = await res.json();
      setTeams(data);
      setError(null);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Ein unbekannter Fehler ist aufgetreten"
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTeams();
  }, [fetchTeams]);

  const renderContent = () => {
    if (loading) return <p className="text-center">Lade Teams...</p>;
    if (error) return <p className="text-center text-red-500">{error}</p>;

    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Teamname</TableHead>
            <TableHead>Liga</TableHead>
            <TableHead>Trainer</TableHead>
            <TableHead>Anzahl Spieler</TableHead>
            <TableHead className="text-right">Aktionen</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {teams.map((team) => (
            <TableRow key={team._id}>
              <TableCell className="font-medium">{team.name}</TableCell>
              <TableCell>{team.liga}</TableCell>
              <TableCell>{team.trainer?.name || "N/A"}</TableCell>
              <TableCell>{team.spieler.length}</TableCell>
              <TableCell className="text-right"></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-start justify-between">
        <h2 className="text-2xl font-bold">Teamverwaltung</h2>
        {/* 2. Replace the old button with the new dialog */}
        <AddTeamDialog onTeamAdded={fetchTeams} />
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Alle Teams</CardTitle>
          <CardDescription>
            Hier ist eine Liste aller Teams im Verein.
          </CardDescription>
        </CardHeader>
        <CardContent>{renderContent()}</CardContent>
      </Card>
    </div>
  );
}
