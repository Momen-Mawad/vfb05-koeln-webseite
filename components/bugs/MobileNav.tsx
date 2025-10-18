// components/bugs/MobileNav.tsx
"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";

// Re-define the nav items here or import them if you centralize them
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

export default function BugsMobileNav() {
  return (
    <header className="sticky top-0 z-30 flex h-4 items-center gap-1 border-b bg-background px-1 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6 md:hidden">
      <Sheet>
        <SheetTrigger asChild>
          <Button size="icon" variant="outline" className="md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle BuGS Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="sm:max-w-xs">
          <nav className="grid gap-1 text-lg font-medium">
            <span className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base">
              <span className="sr-only">VfB 05 BuGS</span>
            </span>
            {bugsNavItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-2 px-2.5 text-muted-foreground hover:text-foreground"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </SheetContent>
      </Sheet>
      <h2 className="text-xl font-semibold whitespace-nowrap">
        Breiten- & Gesundheitssport
      </h2>
    </header>
  );
}
