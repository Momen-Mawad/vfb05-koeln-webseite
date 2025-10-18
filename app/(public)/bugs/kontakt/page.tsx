// app/(public)/bugs/kontakt/page.tsx
import CloudinaryImage from "@/components/CloudinaryImage";

// Helper component for consistent contact blocks
const ContactBlock = ({
  title,
  name,
  tel,
  email,
  imageSrc,
}: {
  title: string;
  name?: string;
  tel?: string;
  email?: string;
  imageSrc?: string;
}) => (
  <div className="mb-2 p-2 border rounded-lg shadow-sm">
    <h2 className="text-xl font-semibold mb-1">{title}</h2>
    <div className="flex flex-col sm:flex-row gap-1">
      {imageSrc && (
        <div className="relative w-full sm:w-1/4 aspect-[1/1] rounded overflow-hidden mb-1 sm:mb-0">
          <CloudinaryImage
            src={"vfb_placeholder_nymtsc.png"} // Placeholder image
            alt={name || title}
            fill
            style={{ objectFit: "cover" }}
          />
        </div>
      )}
      <div className={imageSrc ? "sm:w-3/4" : ""}>
        {name && <p className="text-lg font-medium">{name}</p>}
        {(tel || email) && (
          <p className="mt-2 text-sm font-semibold underline">Kontakt</p>
        )}
        {tel && <p className="text-sm">Tel: {tel}</p>}
        {email && (
          <p className="text-sm">
            E-Mail:{" "}
            <a
              href={`mailto:${email}`}
              className="text-primary hover:underline"
            >
              {email}
            </a>
          </p>
        )}

        <p className="mt-2 text-sm font-semibold underline">Vereinsanschrift</p>
        <p className="text-sm">VfB 05 Köln, Reitweg 13, 50679 Köln-Deutz</p>
      </div>
    </div>
  </div>
);

export default function KontaktPage() {
  // Replace placeholders with actual Cloudinary paths
  const contacts = [
    {
      title: "Abteilungsleiterin Breiten- und Gesundheitssport",
      email: "bugs@vfb05koeln.de",
    },
    {
      title: "Stellvertretende Abteilungsleiterin",
      name: "Heidi Thoma",
      tel: "0221-855615",
      email: "heidi.thoma@vfb05koeln.de",
      imageSrc: "/bugs/Heidi_Thoma.jpg",
    },
    {
      title: "Kursleiterin",
      name: "Kristina Buchholz",
      tel: "0221-4302727",
      email: "kristina.buchholz@vfb05koeln.de",
      imageSrc: "/bugs/Kristina_Buchholz.jpg",
    },
    {
      title: "Kursleiterin",
      name: "Marlena Meier",
      email: "bugs@vfb05koeln.de",
      imageSrc: "/bugs/Marlena_Meier.jpg",
    },
    {
      title: "Kursleiterin",
      name: "Jesse Schöne",
      email: "bugs@vfb05koeln.de",
      imageSrc: "/bugs/Marlena_Meier.jpg",
    },
    {
      title: "Kursleiterin (Yoga)",
      name: "Stefanie Popp",
      tel: "0178-6546741",
      email: "info@arthouse-yoga.de",
      imageSrc: "/bugs/Stefanie_Popp.jpg",
    },
    {
      title: "Kursleiterin",
      name: "Heike Napierala",
      email: "bugs@vfb05koeln.de",
      imageSrc: "/vfb-logo.png",
    }, // Placeholder
    {
      title: "Helferin",
      name: "Loni Jung",
      email: "bugs@vfb05koeln.de",
      imageSrc: "/vfb-logo.png",
    }, // Placeholder
    {
      title: "Kursleiter",
      email: "bugs@vfb05koeln.de",
      imageSrc: "/vfb-logo.png",
    }, // Placeholder
    {
      title: "Kursleiterin",
      name: "Ingrid Schulze",
      email: "bugs@vfb05koeln.de",
      imageSrc: "/vfb-logo.png",
    }, // Placeholder
    {
      title: "Kursleiterin",
      name: "Belana Mittler",
      email: "bugs@vfb05koeln.de",
      imageSrc: "/vfb-logo.png",
    }, // Placeholder
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">Kontakt</h1>
      {contacts.map((contact, index) => (
        <ContactBlock key={index} {...contact} />
      ))}
    </div>
  );
}
