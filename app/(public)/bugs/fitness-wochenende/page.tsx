// app/(public)/bugs/fitness-wochenende/page.tsx
import CloudinaryImage from "@/components/CloudinaryImage";
import Link from "next/link";

export default function FitnessWochenendePage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">Fitnesswochenende für Frauen</h1>
      <p className="text-xl font-semibold mb-2">21.11. - 23.11.2025</p>

      <div className="flex flex-col sm:flex-row gap-2 items-start">
        <div className="relative w-full sm:w-1/4 aspect-[1/1] rounded overflow-hidden">
          <CloudinaryImage
            src="v1760789986/vfb_placeholder_nymtsc.png"
            alt="Fitness Wochenende"
            fill
            style={{ objectFit: "contain" }}
          />
        </div>

        <div className="prose sm:w-3/4">
          <p className="font-semibold">
            Fitness, Rückentraining, Yoga Fitness, Walken, Entspannung, Sauna,
            uvm.
          </p>
          <p>
            <strong>Ort:</strong> Sport- und Seminarcenter Radevormwald
          </p>

          <ul className="list-disc pl-5 my-2">
            <li>ÜB/VP/Fitness- und Entspannungsprogramm</li>
            <li>EZ 280 €</li>
            <li>DZ 250 € (Buchung nur mit einer 2. Person möglich)</li>
          </ul>

          <p>
            <Link
              href="#"
              target="_blank"
              className="text-primary hover:underline"
            >
              Download des Anmeldeformulars
            </Link>
          </p>
          <h3 className="text-lg font-semibold mt-2">
            Mehr Informationen zum Fitnesswochenende
          </h3>
          <p>
            <Link
              href="#"
              target="_blank"
              className="text-primary hover:underline"
            >
              Ausführlich hier (Flyer)
            </Link>{" "}
            oder Fragen per Mail an:{" "}
            <a
              href="mailto:kristina.buchholz@vfb05koeln.de"
              className="text-primary hover:underline"
            >
              kristina.buchholz@vfb05koeln.de
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
