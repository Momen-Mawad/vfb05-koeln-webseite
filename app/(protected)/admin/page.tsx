"use client";

// app/(protected)/admin/page.tsx

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
import { IUser } from "@/models/User";
import AddUserDialog from "@/components/admin/AddUserDialog";

export default function AdminPage() {
  const [users, setUsers] = useState<IUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/users");
      if (!res.ok) {
        throw new Error("Fehler beim Abrufen der Benutzer");
      }
      const data = await res.json();
      setUsers(data);
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
    fetchUsers();
  }, [fetchUsers]);

  const renderContent = () => {
    if (loading) {
      return <p className="text-center">Lade Benutzer...</p>;
    }

    if (error) {
      return <p className="text-center text-red-500">{error}</p>;
    }

    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>E-Mail</TableHead>
            <TableHead>Rolle</TableHead>
            <TableHead>Beigetreten am</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={String(user._id)}>
              <TableCell className="font-medium">{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>
                {typeof user.role === "string"
                  ? user.role
                  : String(user.role?.toString?.() ?? "")}
              </TableCell>
              <TableCell>
                {user.createdAt
                  ? new Date(user.createdAt).toLocaleDateString("de-DE")
                  : "-"}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-start justify-between">
        <h1 className="text-3xl font-bold">Benutzerverwaltung</h1>
        {/* 5. Replace the old button with the new dialog component */}
        <AddUserDialog onUserAdded={fetchUsers} />
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Alle Benutzer</CardTitle>
          <CardDescription>
            Hier ist eine Liste aller registrierten Benutzer im System.
          </CardDescription>
        </CardHeader>
        <CardContent>{renderContent()}</CardContent>
      </Card>
    </div>
  );
}
