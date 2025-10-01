import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);

  // Protect the route
  if (!session || !session.user) {
    redirect("/login");
  }

  const user = session.user;
  // Get user initials for the avatar fallback
  const initials =
    user.name
      ?.split(" ")
      .map((n) => n[0])
      .join("") ||
    user.email?.[0].toUpperCase() ||
    "U";

  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-3xl font-bold">Mein Profil</h1>
      <Card>
        <CardHeader>
          <CardTitle>Profilinformationen</CardTitle>
          <CardDescription>
            Ihre persönlichen Daten. Diese Informationen sind nicht öffentlich
            sichtbar.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={user.image || ""} alt="User avatar" />
              <AvatarFallback>{initials}</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-xl font-semibold">{user.name}</p>
              <p className="text-sm text-muted-foreground">{user.email}</p>
            </div>
          </div>
          {/* We can add more user details here in the future */}
        </CardContent>
      </Card>
    </div>
  );
}
