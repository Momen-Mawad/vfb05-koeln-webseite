// app/(public)/bugs/yoga/page.tsx
import CloudinaryImage from "@/components/CloudinaryImage";

export default function YogaPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">Yoga</h1>
      <div className="flex flex-col md:flex-row gap-2">
        <div className="relative w-full md:w-1/3 aspect-[4/3] rounded-lg overflow-hidden">
          <CloudinaryImage
            src="v1760792539/yoga_wenjra.jpg" // Replace with actual path
            alt="Yoga Kurs"
            fill
            style={{ objectFit: "cover" }}
          />
        </div>
        <div className="md:w-2/3 prose">
          <p>
            Yoga ist Meditation in Bewegung. In einer klar strukturierten
            Abfolge von Asanas (Körperhaltungen) wird der Körper in Einklang mit
            einem ruhigen fließenden Atemrhythmus bewegt. Darüber wird der Geist
            zur Ruhe gebracht, Körperwahrnehmung und Konzentration werden
            geschult. Kraft, Flexibilität und Entspannung werden ausbalanciert.
            Yoga wirkt harmonisierend auf alle dem Körper innewohnenden Systeme
            wie Herz-/Kreislauf-, Hormon und Nervensystem. Der Unterricht findet
            im Soboco Stil statt, der moderne Methoden wie Spiraldynamik und
            Faszienarbeit in die traditionelle Lehre des Hatha Yoga und Ayurveda
            integriert.
          </p>
          <h3 className="text-lg font-semibold mt-1">
            Kurszeiten / Kursleiterin
          </h3>
          <p>Dienstag 19:15 - 20:45 Uhr / Stefanie Popp</p>
          <p className="text-sm">
            Tel: 0178-6546741
            <br />
            E-Mail: info@arthouse-yoga.de
          </p>

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
