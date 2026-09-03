import NavBawah from "@/components/shared/NavBawah";

export default function B2BLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-abu-bg">
      <main className="relative mx-auto min-h-screen max-w-[390px] bg-white pb-20">
        {children}
      </main>
      <NavBawah variant="b2b" />
    </div>
  );
}
