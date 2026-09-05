"use client";

import AppShell from "@/components/shared/AppShell";
import NavBawah from "@/components/shared/NavBawah";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AppShell>
        {children}
      </AppShell>
      <NavBawah variant="individu" />
    </>
  );
}
