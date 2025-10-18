// app/(public)/bugs/layout.tsx
import Link from "next/link";
import BugsMobileNav from "@/components/bugs/MobileNav";

// Sidebar navigation items based on your screenshot
const bugsNavItems = [
  { href: "/bugs/kontakt", label: "Kontakt" },
  { href: "/bugs/kinder", label: "Kinder" },
  { href: "/bugs/rueckenfit", label: "Rückenfit" },
  { href: "/bugs/fitnessmix", label: "Fitnessmix" },
  { href: "/bugs/yoga", label: "Yoga" },
  { href: "/bugs/tanzen-60-plus", label: "Tanzen 60+" },
  { href: "/bugs/gymnastik-60-plus", label: "Gymnastik 60 +" },
  { href: "/bugs/moderner-tanz", label: "Moderner Tanz" },
  { href: "/bugs/beitraege-infos", label: "Beiträge & Infos" },
  { href: "/bugs/fitness-wochenende", label: "FitnessWochenende" },
];

export default function BugsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="container mx-auto px-4 md:px-6 py-2">
      <BugsMobileNav />
      <div className="container mx-auto px-2 md:px-4 py-2 grid md:grid-cols-[240px_1fr] gap-4">
        <aside className="hidden md:block border-r pr-6">
          <h2 className="text-xl font-semibold mb-4">
            Breiten- & Gesundheitssport
          </h2>
          <nav className="flex flex-col space-y-2">
            {bugsNavItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-muted-foreground hover:text-primary"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </aside>

        <section>{children}</section>
      </div>
    </div>
  );
}
