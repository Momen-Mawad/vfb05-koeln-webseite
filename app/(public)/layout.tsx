import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-14 flex items-center shadow-sm">
        <Link href="/" className="flex items-center justify-center">
          <Image
            src="/vfb-logo.png"
            alt="VfB 05 Köln Logo"
            width={32}
            height={32}
          />
          <span className="sr-only">VfB 05 Köln</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link
            href="/news"
            className="text-sm font-medium hover:underline underline-offset-4"
          >
            News
          </Link>
          <Link
            href="/teams"
            className="text-sm font-medium hover:underline underline-offset-4"
          >
            Teams
          </Link>
          <Link
            href="/verein"
            className="text-sm font-medium hover:underline underline-offset-4"
          >
            Verein
          </Link>
          <Link
            href="/login"
            className="text-sm font-medium hover:underline underline-offset-4"
          >
            Login
          </Link>
        </nav>
      </header>
      <main className="flex-1">{children}</main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} VfB 05 Köln e.V. Alle Rechte
          vorbehalten.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link
            href="/impressum"
            className="text-xs hover:underline underline-offset-4"
          >
            Impressum
          </Link>
          <Link
            href="/datenschutz"
            className="text-xs hover:underline underline-offset-4"
          >
            Datenschutz
          </Link>
        </nav>
      </footer>
    </div>
  );
}
