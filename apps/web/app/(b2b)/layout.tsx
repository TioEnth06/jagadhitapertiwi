import AppShell from "@/components/shared/AppShell";
import NavBawah from "@/components/shared/NavBawah";
import "@/styles/landing.css";
import "@/styles/b2b.css";

export default function B2BLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="landing-root">
      <AppShell>
        {children}
      </AppShell>
      <NavBawah variant="b2b" />
    </div>
  );
}
