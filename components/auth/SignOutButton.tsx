"use client";

import { signOut } from "next-auth/react";
import { Button } from "../ui/button";

export default function SignOutButton() {
  return (
    <Button size="sm" onClick={() => signOut({ callbackUrl: "/login" })}>Abmelden</Button>
  );
}
