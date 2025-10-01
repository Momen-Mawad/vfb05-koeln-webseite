"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Users, Calendar, BarChart2, Shield } from "lucide-react";
import { cn } from "@/lib/utils"; // shadcn's helper for conditional classes
import { useSession } from "next-auth/react";
import { UserRole } from "@/models/model-types";

export default function ProtectedNav() {
  const { data: session } = useSession();
  const pathname = usePathname();

  // We define our links as an array of objects for easier mapping
  const navLinks = [
    { href: "/dashboard", label: "Übersicht", icon: Home },
    { href: "/profil", label: "Mein Profil", icon: Users },
    { href: "/kalender", label: "Kalender", icon: Calendar },
    { href: "/statistiken", label: "Statistiken", icon: BarChart2 },
  ];

  return (
    <nav className="grid text-sm font-medium">
      {navLinks.map((link) => {
        const isActive = pathname === link.href;
        return (
          <Link
            key={link.label}
            href={link.href}
            className={cn(
              "flex items-center gap-1 rounded-lg px-1 py-1 transition-all",
              isActive
                ? "bg-muted text-primary" // Active styles
                : "text-muted-foreground hover:text-primary" // Default styles
            )}
          >
            <link.icon />
            {link.label}
          </Link>
        );
      })}

      {session?.user?.role === UserRole.VERWALTUNG && (
        <Link
          href="/admin"
          className={cn(
            "flex items-center gap-1 rounded-lg px-3 py-1 mt-4 transition-all",
            pathname === "/admin"
              ? "bg-muted text-primary"
              : "text-muted-foreground hover:text-primary"
          )}
        >
          <Shield />
          Verwaltung
        </Link>
      )}
    </nav>
  );
}
