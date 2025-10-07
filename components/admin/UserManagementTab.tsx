// components/admin/UserManagementTab.tsx
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
import { IUser } from "@/models/User";
import AddUserDialog from "@/components/admin/AddUserDialog";
import EditUserDialog from "@/components/admin/EditUserDialog";
import DeleteUserDialog from "@/components/admin/DeleteUserDialog";

// The component is the same, just renamed
export default function UserManagementTab() {
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
            <TableHead className="text-right">Aktionen</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={String(user._id)}>
              <TableCell className="font-medium">{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>
                {typeof user.role === "string" ? user.role : String(user.role)}
              </TableCell>
              <TableCell>
                {user.createdAt
                  ? new Date(user.createdAt).toLocaleDateString("de-DE")
                  : "—"}
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <EditUserDialog user={user} onUserUpdated={fetchUsers} />
                  <DeleteUserDialog
                    userId={String(user._id)}
                    onUserDeleted={fetchUsers}
                  />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-start justify-between">
        <h2 className="text-2xl font-bold">Benutzerverwaltung</h2>
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
