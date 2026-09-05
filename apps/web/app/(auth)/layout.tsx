"use client";

import AppShell from "@/components/shared/AppShell";
import NavBawah from "@/components/shared/NavBawah";
import AuthGuard from "@/components/shared/AuthGuard";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AppShell>
        <AuthGuard>{children}</AuthGuard>
      </AppShell>
      <NavBawah variant="individu" />
    </>
  );
}
