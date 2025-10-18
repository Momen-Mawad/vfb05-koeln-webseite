// app/(public)/bugs/moderner-tanz/page.tsx
import CloudinaryImage from "@/components/CloudinaryImage";

export default function ModernerTanzPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">Moderner Tanz</h1>
      <div className="flex flex-col md:flex-row gap-2">
        <div className="relative w-full md:w-1/3 aspect-[4/3] rounded-lg overflow-hidden">
          <CloudinaryImage
            src="v1760793623/moderner_tanz_dtrdja.png"
            alt="Moderner Tanz Kurs"
            fill
            style={{ objectFit: "cover" }}
          />
        </div>
        <div className="md:w-2/3 prose">
          <p>
            Tanzkunst: Zeitgenössisch, kreativ, fließend ... und mit viel Spaß
            untereinander und an der Bewegung!
          </p>
          <h3 className="text-lg font-semibold mt-1">
            Kurszeiten / Kursleiterin
          </h3>
          <p>Dienstag 18:25 - 19:25 Uhr / Marlena Meier</p>

          <h3 className="text-lg font-semibold mt-1">Ort</h3>
          <p>Sporthalle Lohmarer Straße 11, 51105 Köln Humboldt-Gremberg</p>

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
