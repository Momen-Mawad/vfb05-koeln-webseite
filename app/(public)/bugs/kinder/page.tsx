// app/(public)/bugs/kinder/page.tsx
import CloudinaryImage from "@/components/CloudinaryImage";

// Helper component for course blocks
const CourseBlock = ({
  title,
  description,
  times,
  imageSrc,
}: {
  title: string;
  description: string;
  times: string[];
  imageSrc?: string;
}) => (
  <div className="mb-2">
    <h2 className="text-2xl font-semibold mb-1">{title}</h2>
    <div className="flex flex-col md:flex-row gap-2">
      {imageSrc && (
        <div className="relative w-full md:w-1/3 aspect-[4/3] rounded-lg overflow-hidden">
          <CloudinaryImage
            // src={imageSrc}
            src={"vfb_placeholder_nymtsc.png"} // Placeholder image
            alt={title}
            fill
            style={{ objectFit: "cover" }}
          />
        </div>
      )}
      <div className={imageSrc ? "md:w-2/3 prose" : "prose max-w-none"}>
        <p>{description}</p>
        <h3 className="text-lg font-semibold mt-1">Kurszeiten</h3>
        <ul className="list-disc pl-1">
          {times.map((time, i) => (
            <li key={i}>{time}</li>
          ))}
        </ul>
        <h3 className="text-lg font-semibold mt-1">Ort</h3>
        <p>Sporthalle Hachenburger Str. 11, 51105 Köln Humboldt-Gremberg</p>
        <p className="mt-1 text-sm">
          <strong>Abteilungsleitung:</strong> E-Mail: bugs@vfb05koeln.de
        </p>
      </div>
    </div>
  </div>
);

export default function KinderPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">Kinder</h1>

      <CourseBlock
        title="Eltern-Kind-Gruppe (Donnerstag)"
        description="Schon Kleinkinder sind von Spielkameraden fasziniert. Und mit Mama oder Papa in Reichweite, lernen die Kleinen in der EK-Gruppe spielerisch, auf andere Kinder und Erwachsene zuzugehen. Das gibt kleinen Kindern Selbstvertrauen. Ganz nebenbei sammeln sie ihre ersten sozialen Erfahrungen, diese frühen Kontakte sind ein prima Training für den Kindergarten."
        times={["Donnerstag 16:00 - 17:00 Uhr"]}
        // imageSrc="/bugs/placeholder.jpg" // Add image path if available
      />
      <hr className="my-2" />
      <CourseBlock
        title="Eltern - Kind - Gruppen 1 - 4 Jahre"
        description="Regen Zulauf finden die Eltern-Kind-Gruppen. Hier spielen und toben die 1-4 jährigen Kinder gemeinsam mit ihren Eltern. Es werden die ersten Erfahrungen mit verschiedenen Klein- und Alltagsmaterialien und großen Geräten ausprobiert. Im Vordergrund steht der Spaß und die vielseitige Bewegung. Im Spiel können sich die Kinder ausprobieren und damit sich und die Welt kennenlernen."
        times={[
          "Montag 16:00 - 17:00 Uhr",
          "Dienstag 17:00 - 18:00 Uhr",
          "Mittwoch 16:00 - 17:00 Uhr",
          "Freitag 16:30 - 17:30 Uhr",
        ]}
        imageSrc="/bugs/Eltern-Kind-Gruppen-3.jpg" // Replace with actual path
      />
      <hr className="my-2" />
      <CourseBlock
        title="Kinderturnen 4 - 6 Jahre"
        description="Hier wird ohne die Eltern gespielt und getobt. Erste gemeinsame Lauf- und Fangspiele aber auch Gerätelandschaften, die sich in einem Dschungel oder fremde Planeten verwandeln, ermöglichen vielseitige Bewegungen und machen vor allem viel Spaß. Es soll die Freude an sportlicher Bewegung geweckt und gefördert werden, denn motorische Aktivitäten unterstützen die gesunde Entwicklung des Kindes."
        times={[
          "Montag 17:00 - 18:00 Uhr",
          "Mittwoch 17:00 - 18:00 Uhr",
          "Freitag 17:30 - 18:30 Uhr",
        ]}
        imageSrc="/bugs/Eltern-Kind-Gruppen-5.jpg" // Replace with actual path
      />
      <hr className="my-2" />
      <CourseBlock
        title="Kindertanz & Ballett"
        description="Kindgerecht und phantasievoll tanzen, hüpfen, springen und drehen wir uns. Zur Musik tanzen wir Märchen und Geschichten aus dem Weltall, dem Zirkus und dem Dschungel. Material wie Tücher, Hüte und Luftballons inspirieren uns dabei zu immer neuen Bewegungen und Tänzen. Kommt vorbei und macht mit!"
        times={[
          "Dienstag 16:30 - 17:15 Uhr (Kinder 4-6 Jahre)",
          "Dienstag 17:20 - 18:20 Uhr (Kinder ab 7 Jahre)",
        ]}
        imageSrc="/bugs/Kindertanz_und_Ballett.jpg" // Replace with actual path
        // Note: This course mentions a different location: Sporthalle Lohmarer Straße 11
      />
      <hr className="my-2" />
      <CourseBlock
        title="JUMP & RUN 7-11 Jahre"
        description="Probier mal was Neues aus und lerne die Basics richtig und neue coole Tricks. Wöchentlich bieten wir Euch Parkour, Tumbling / Akrobatik und Trampolin an. Jeden Dienstag lernt ihr die grundlegenden Techniken der Sportarten kennen und versucht, diese in die Praxis umzusetzen. Wir freuen uns auf viele neue mutige Athleten."
        times={["Dienstag 18:00 - 19:00 Uhr"]}
        imageSrc="/bugs/JUMP_-_RUN_.PNG" // Replace with actual path
      />
    </div>
  );
}
