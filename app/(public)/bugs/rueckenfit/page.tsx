// app/(public)/bugs/rueckenfit/page.tsx
import CloudinaryImage from "@/components/CloudinaryImage";

export default function RueckenfitPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">Rückenfit</h1>
      <div className="flex flex-col md:flex-row gap-2">
        <div className="relative w-full md:w-1/3 aspect-[4/3] rounded-lg overflow-hidden">
          <CloudinaryImage
            src="rueckenfit_fapjiw" // Replace with actual path
            alt="Rückenfit Kurs"
            fill
            style={{ objectFit: "cover" }}
          />
        </div>
        <div className="md:w-2/3 prose">
          <p>
            Fitnessorientiertes und ganzheitliches (Rücken-) Training mit Yoga
            Fitness, Core, Faszientraining und Entspannung. Unterschiedliche
            Fitnessformen zur Anregung des Herz-Kreislauf Systems bilden den
            Einstieg einer Kursstunde. Durch Yoga Fitness, Funktionelles
            Training (Kräftigung, Stretching, modernes Faszientraining) und
            Mobilisationsübungen für die Wirbelsäule wird die &quot;Rückengesundheit&quot;
            und die allgemeine Fitness gefördert. Verschiedene
            Entspannungsmethoden runden das Programm ab und bringen Körper und
            Geist in Balance. Bitte für die Entspannung warme Kleidung oder eine
            Decke mitbringen.
          </p>
          <h3 className="text-lg font-semibold mt-2">
            Kurszeiten / Kursleiterin
          </h3>
          <p>Mittwoch 18:15 - 19:45 Uhr / Kristina Buchholz</p>

          <h3 className="text-lg font-semibold mt-2">Ort</h3>
          <p>Sporthalle Hachenburger Straße 11, 51105 Köln Humboldt-Gremberg</p>

          <p className="mt-2 text-sm">
            <strong>Kursleitung: Kristina Buchholz</strong>
            <br />
            E-Mail: kristina.buchholz@vfb05koeln.de
            <br />
            Tel: 0221-4302727
          </p>
        </div>
      </div>
    </div>
  );
}
