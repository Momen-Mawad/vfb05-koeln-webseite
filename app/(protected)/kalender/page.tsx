import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Mock data for upcoming events. Later, this will come from our database.
const upcomingEvents = [
  {
    date: "2025-09-27",
    title: "Trainingseinheit",
    description: "Fokus auf Taktik und Standardsituationen.",
  },
  {
    date: "2025-10-04",
    title: "Heimspiel vs. SC West",
    description: "Anstoß ist um 15:00 Uhr.",
  },
  {
    date: "2025-10-11",
    title: "Auswärtsspiel bei Fortuna Köln II",
    description: "Abfahrt des Mannschaftsbusses um 12:30 Uhr.",
  },
];

export default async function CalendarPage() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/login");
  }

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-3xl font-bold">Kalender</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Monatsübersicht</CardTitle>
          </CardHeader>
          <CardContent className="flex justify-center p-0 sm:p-6">
            <Calendar
              mode="single"
              selected={new Date()}
              className="rounded-md"
              weekStartsOn={1} // Start week on Monday for German locale
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Nächste Termine</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {upcomingEvents.map((event) => (
              <div key={event.title} className="flex items-start gap-3">
                <div className="flex flex-col items-center justify-center rounded-md bg-muted p-2 text-sm">
                  <span>
                    {new Date(event.date).toLocaleString("de-DE", {
                      month: "short",
                    })}
                  </span>
                  <span className="font-bold">
                    {new Date(event.date).getDate()}
                  </span>
                </div>
                <div>
                  <p className="font-semibold">{event.title}</p>
                  <p className="text-sm text-muted-foreground">
                    {event.description}
                  </p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
