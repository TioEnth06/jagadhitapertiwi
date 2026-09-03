export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-abu-bg">
      <main className="relative mx-auto min-h-screen max-w-[390px] bg-white pb-6">
        {children}
      </main>
    </div>
  );
}
