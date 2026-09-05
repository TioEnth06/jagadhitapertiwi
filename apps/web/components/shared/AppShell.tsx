interface AppShellProps {
  children: React.ReactNode;
  className?: string;
  mainClassName?: string;
  /** pb-20 for bottom nav, pb-6 for admin, none for full bleed */
  bottomPadding?: "nav" | "compact" | "none";
}

const bottomPaddingClass = {
  nav: "pb-20",
  compact: "pb-6",
  none: "",
} as const;

export default function AppShell({
  children,
  className = "",
  mainClassName = "",
  bottomPadding = "nav",
}: AppShellProps) {
  return (
    <div className={`min-h-screen bg-abu-bg ${className}`.trim()}>
      <main
        className={`relative mx-auto min-h-screen max-w-[390px] bg-white ${bottomPaddingClass[bottomPadding]} ${mainClassName}`.trim()}
      >
        {children}
      </main>
    </div>
  );
}
