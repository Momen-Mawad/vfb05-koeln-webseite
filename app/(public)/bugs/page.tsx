// app/(public)/bugs/page.tsx
import CloudinaryImage from "@/components/CloudinaryImage";

export default function BugsHomePage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-2">kommen und mitmachen</h1>
      <div className="relative w-full md:max-w-2xl md:max-h-96 aspect-video mb-4 rounded-lg overflow-hidden">
        <CloudinaryImage
          src="v1760786145/bugs-main-image_gwjjqr.jpg"
          alt="Kinder spielen im Freien"
          fill
          style={{ objectFit: "cover" }}
        />
      </div>
      <div className="prose max-w-none">
        <p>
          1956 wurde die &quot;Turnabteilung&quot; gegründet. Den Anfang machten
          einige Hausfrauen, die mit &quot;Turnvater Zillig&quot;
          Hausfrauengymnastik machten. Heute ist die Abteilung zu einer kleinen
          Breiten- und Gesundheitssportabteilung (BuGs) mit ca. 220
          Teilnehmenden angewachsen.
        </p>
        <p>
          In 17 Gruppen bewegen sich Kinder und Erwachsene unter der
          qualifizierten Anleitung von Übungsleiterinnen bzw. Sportlehrerinnen.
          In der BuGs bieten wir den Kindern Bewegung - Spiel und Sport in
          unterschiedlichen Altersgruppen an. Hier steht der Breitensport und
          die Bewegungsförderung im Vordergund. Die Erwachsenen können sich in
          Fitness- und Gesundheitssportkursen mit Spaß fit halten.
        </p>
      </div>
    </div>
  );
}
