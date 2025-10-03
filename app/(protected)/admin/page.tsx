// app/(protected)/admin/page.tsx
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import UserManagementTab from "@/components/admin/UserManagementTab";
import TeamManagementTab from "@/components/admin/TeamManagementTab";

export default function AdminPage() {
  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-3xl font-bold">Verwaltungsbereich</h1>
      <Tabs defaultValue="users">
        <TabsList className="grid grid-cols-2">
          <TabsTrigger value="users">Benutzer</TabsTrigger>
          <TabsTrigger value="teams">Teams</TabsTrigger>
        </TabsList>
        <TabsContent value="users">
          <UserManagementTab />
        </TabsContent>
        <TabsContent value="teams">
          <TeamManagementTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}
