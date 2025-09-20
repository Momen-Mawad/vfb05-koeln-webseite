import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import SignOutButton from "@/components/auth/SignOutButton";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  // Protect the route
  if (!session) {
    redirect("/login");
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="p-8 border rounded-lg shadow-md text-center">
        <h1 className="text-2xl font-bold">Willkommen im Mitgliederbereich!</h1>
        <p className="mt-2">
          Angemeldet als:{" "}
          <strong>{session.user?.name || session.user?.email}</strong>
        </p>
        <div className="mt-6">
          <SignOutButton />
        </div>
      </div>
    </div>
  );
}
