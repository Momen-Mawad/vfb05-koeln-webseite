// app/(public)/bugs/beitraege-infos/page.tsx
import Link from "next/link";

export default function BeitraegeInfosPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">Beiträge und Infos</h1>

      {/* Datenschutz Section */}
      <div className="mb-2 prose max-w-none">
        <p>
          Informationen zur Datenschutzgrundverordnung entnehmen Sie bitte der
          Rubrik
          <Link href="/datenschutz" className="text-primary hover:underline">
            Datenschutz
          </Link>
          .
        </p>
      </div>

      <hr className="my-2" />

      {/* Beiträge Section */}
      <div className="prose max-w-none">
        <h2 className="text-2xl font-semibold mb-1">
          Das Kleingedruckte / Beiträge
        </h2>
        <div className="text-center mb-2">
          <p className="text-xl font-bold">
            Verein für Bewegungsspiele 1905 e.V. rrh.
          </p>
          <p className="font-semibold">Vereinsbeiträge und Aufnahmegebühr</p>
          <p className="text-red-600">
            Die einmalige Aufnahmegebühr beträgt 10,00 Euro.
          </p>
        </div>

        <h3 className="text-lg font-semibold mt-1">Vereinsbeiträge:</h3>
        <table className="w-full my-2 border">
          <thead>
            <tr className="bg-muted/50">
              <th className="p-1 border text-left">Mitgliedschaft</th>
              <th className="p-1 border text-right">
                Beitrag pro Monat / Halbjahr
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="p-1 border">Aktive Mitglieder (außer Ballett*)</td>
              <td className="p-1 border text-right">10,00 Euro / 60,00 Euro</td>
            </tr>
            <tr>
              <td className="p-1 border">
                Passive Mitglieder (Momentan keine aktive Kursteilnahme und
                Eltern der EK Gruppen)
              </td>
              <td className="p-1 border text-right">5,00 Euro / 30,00 Euro</td>
            </tr>
            <tr>
              <td className="p-1 border">* Ballett</td>
              <td className="p-1 border text-right">
                20,00 Euro / 120,00 Euro
              </td>
            </tr>
          </tbody>
        </table>

        <h3 className="text-lg font-semibold mt-2 underline">
          SEPA-Lastschriftmandat (ab 01.02.2014):
        </h3>
        <p>
          Die zu entrichtenden Beitragszahlungen sowie die einmalige
          Aufnahmegebühr werden mittels Lastschrift eingezogen.
        </p>

        <h3 className="text-lg font-semibold mt-4">Hinweis:</h3>
        <p>
          Innerhalb von acht Wochen, beginnend mit dem Belastungsdatum, kann die
          Erstattung des belasteten Betrags verlangt werden. Es gelten dabei die
          mit dem Kreditinstitut des Mitglieds vereinbarten Bedingungen. Vor dem
          ersten Einzug einer SEPA-Lastschrift informiert der Verein über den
          Einzug in dieser Verfahrensart. Wenn das Konto die erforderliche
          Deckung nicht aufweist, ist das kontoführende Institut nicht zur
          Einlösung verpflichtet. Die dadurch entstehenden Mehrkosten für den
          Verein für Bewegungsspiele 1905 Köln rrh. e.V. gehen zu Lasten des
          beantragenden Mitglieds (bzw. seiner gesetzlichen Vertreter).
        </p>

        <h3 className="text-lg font-semibold mt-2 underline">
          Zum Abmeldeverfahren:
        </h3>
        <p>
          Die Abmeldung ist grundsätzlich per Einschreibebrief oder Postkarte
          per Einschreiben zu senden. Im Jugendbereich nur gültig mit
          Unterschrift eines Erziehungsberechtigten! Die Abmeldetermine sind der
          30.06. und der 31.12. des laufenden Kalenderjahres!
        </p>
      </div>
    </div>
  );
}
