import React from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import ProtectedNav from "@/components/layout/ProtectedNav"; // Import the new component
import Image from "next/image";
import Link from "next/link";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      {/* --- Desktop Sidebar --- */}
      <div className="hidden border-r bg-muted/40 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2 items-center">
          <div className="flex items-center lg:h-[60px]">
            <Link href="/" className="flex items-center gap-2 font-semibold">
              <Image
                width={24}
                height={24}
                src="/vfb-logo.png"
                alt="VfB 05 Köln Logo"
                className="h-2 w-2"
              />
              <span className="text-xs">VfB 05 Köln</span>
            </Link>
          </div>
          <div className="flex-1">
            <ProtectedNav />
          </div>
        </div>
      </div>

      <div className="flex flex-col">
        {/* --- Mobile Header --- */}
        <header className="flex h-6 px-2 items-center gap-4 border-b bg-muted/40 lg:h-[60px]">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="shrink-0 md:hidden"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col w-xs">
              <ProtectedNav /> {/* And also use it here for the mobile sheet */}
            </SheetContent>
          </Sheet>

          <div className="w-full flex-1"></div>
        </header>

        {/* --- Page Content --- */}
        <main className="flex flex-1 flex-col gap-4 p-2 lg:gap-6">
          {children}
        </main>
      </div>
    </div>
  );
}
