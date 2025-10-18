// app/(public)/bugs/gymnastik-60-plus/page.tsx
import CloudinaryImage from "@/components/CloudinaryImage";

export default function Gymnastik60Page() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">Gymnastik 60+</h1>
      <div className="prose max-w-none">
        <h2 className="text-xl font-semibold mb-2">Bewegt älter werden</h2>
        <p className="mb-1">
          Wer sich sein ganzes Leben regelmäßig bewegt, bleibt auch im Alter
          nicht nur aktiv, sondern vor allem fit. Durch eine vielseitige
          Gymnastik wird die Muskulatur gedehnt und gekräftigt und das
          Gleichgewicht und die Stabilität gefördert. Spezielles Faszientraining
          dient der Gelenkmobilisation und der Schmerzreduktion. Die Stunden
          werden mit kleinen Spielen und Koordinationsübungen ergänzt.
          Kleingeräte wie Stäbe, Hanteln, Brasils, Therabänder, Bälle u.a.
          kommen regelmäßig zum Einsatz - das hält auch den Kopf fit!
        </p>

        <div className="flex flex-col sm:flex-row gap-2 items-start">
          <div className="relative w-full sm:w-1/4 aspect-[1/1] rounded overflow-hidden">
            <CloudinaryImage
              src="v1760789986/vfb_placeholder_nymtsc.png"
              alt="Gymnastik 60+"
              fill
              style={{ objectFit: "contain" }}
            />
          </div>
          <div>
            <h3 className="text-lg font-semibold">Trainingszeiten</h3>
            <p>Montag 18:15 Uhr - 19:15 Uhr</p>

            <h3 className="text-lg font-semibold mt-1">Wo?</h3>
            <p>Turnhalle Hachenburger Str. 11, 51105 Köln Humboldt-Gremberg</p>
            <p className="mt-1 text-sm">
              <a
                href="mailto:bugs@vfb05koeln.de"
                className="text-primary hover:underline"
              >
                bugs@vfb05koeln.de
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
