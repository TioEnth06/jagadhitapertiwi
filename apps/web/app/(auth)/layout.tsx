import NavBawah from "@/components/shared/NavBawah";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-abu-bg">
      <main className="relative mx-auto min-h-screen max-w-[390px] bg-white pb-20">
        {children}
      </main>
      <NavBawah variant="individu" />
    </div>
  );
}
