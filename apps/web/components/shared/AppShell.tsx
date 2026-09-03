interface AppShellProps {
  children: React.ReactNode;
  className?: string;
}

export default function AppShell({ children, className }: AppShellProps) {
  return (
    <div className={`min-h-screen bg-abu-bg ${className ?? ""}`}>
      <main className="relative mx-auto min-h-screen max-w-[390px] bg-white">{children}</main>
    </div>
  );
}
