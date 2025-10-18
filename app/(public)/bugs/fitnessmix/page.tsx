// app/(public)/bugs/fitnessmix/page.tsx
import CloudinaryImage from "@/components/CloudinaryImage";

export default function FitnessmixPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">Fitnessmix</h1>
      <div className="flex flex-col md:flex-row gap-2">
        <div className="relative w-full md:w-1/3 aspect-[4/3] rounded-lg overflow-hidden">
          <CloudinaryImage
            src="v1760792452/fitness_mix_ioogrl.jpg"
            alt="Fitnessmix Kurs"
            fill
            style={{ objectFit: "cover" }}
          />
        </div>
        <div className="md:w-2/3 prose">
          <p>
            Ein vielseitiges und innovatives Training für den ganzen Körper -
            für Anfänger*innen und Fortgeschrittene. Durch ein
            abwechslungsreiches Programm mit Herz-Kreislauftraining,
            Funktionsgymnastik und Faszienstretching werden Freude und Spaß an
            der Bewegung vermittelt und leistungssteigernde Impulse gesetzt.
          </p>
          <h3 className="text-lg font-semibold mt-1">
            Kurszeiten / Kursleiterin
          </h3>
          <ul className="list-disc pl-5">
            <li>Montag 19:15 - 20:45 Uhr</li>
            <li>Donnerstag 18:30 - 20:00 Uhr</li>
          </ul>

          <h3 className="text-lg font-semibold mt-1">Ort</h3>
          <p>Sporthalle Hachenburger Straße 11, 51105 Köln Humboldt-Gremberg</p>

          <p className="mt-1 text-sm">
            <strong>Abteilungsleitung:</strong>
            <br />
            E-Mail: bugs@vfb05koeln.de
          </p>
        </div>
      </div>
    </div>
  );
}
