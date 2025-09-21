"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Users, Calendar, BarChart2 } from "lucide-react";
import { cn } from "@/lib/utils"; // shadcn's helper for conditional classes

export default function ProtectedNav() {
  const pathname = usePathname();

  // We define our links as an array of objects for easier mapping
  const navLinks = [
    { href: "/dashboard", label: "Übersicht", icon: Home },
    { href: "/profil", label: "Mein Profil", icon: Users },
    { href: "/kalender", label: "Kalender", icon: Calendar },
    { href: "/statistiken", label: "Statistiken", icon: BarChart2 },
  ];

  return (
    <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
      {navLinks.map((link) => {
        const isActive = pathname === link.href;
        return (
          <Link
            key={link.label}
            href={link.href}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 transition-all",
              isActive
                ? "bg-muted text-primary" // Active styles
                : "text-muted-foreground hover:text-primary" // Default styles
            )}
          >
            <link.icon/>
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}
