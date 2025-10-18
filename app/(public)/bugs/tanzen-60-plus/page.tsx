// app/(public)/bugs/tanzen-60-plus/page.tsx
import CloudinaryImage from "@/components/CloudinaryImage";

export default function Tanzen60Page() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">Tanzen 60+</h1>
      <div className="flex flex-col md:flex-row gap-2">
        <div className="relative w-full md:w-1/3 aspect-[4/3] rounded-lg overflow-hidden">
          <CloudinaryImage
            src="v1760793021/tanzen_60__ieo3hm.jpg"
            alt="Tanzen 60+ Kurs"
            fill
            style={{ objectFit: "cover" }}
          />
        </div>
        <div className="md:w-2/3 prose">
          <p>
            Tanzen macht Spaß, ist gesund und Balsam für die Seele. Wir tanzen
            internationale Folkloretänze, aber auch Standardtänze. Alle Tänze
            sind leicht erlernbar, keine*r festen Tanzpartner*in erforderlich,
            aber herzlich willkommen.
          </p>
          <h3 className="text-lg font-semibold mt-1">
            Kurszeiten / Kursleiterin
          </h3>
          <p>Jeden Dienstag 16:00 - 17:00 Uhr / Ingrid Schulze</p>

          <h3 className="text-lg font-semibold mt-1">Ort</h3>
          <p>Sporthalle Hachenburger Str. 11, 51103 Köln Humboldt-Gremberg</p>

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
