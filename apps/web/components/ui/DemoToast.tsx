"use client";

interface DemoToastProps {
  message: string | null;
  onDismiss?: () => void;
  variant?: "default" | "landing";
}

export default function DemoToast({ message, onDismiss, variant = "default" }: DemoToastProps) {
  if (!message) return null;

  const positionClass =
    variant === "landing"
      ? "bottom-8 left-1/2 -translate-x-1/2"
      : "bottom-24 left-1/2 -translate-x-1/2";

  return (
    <div
      className={`fixed z-[100] max-w-[340px] rounded-xl bg-[#111] px-4 py-3 text-sm font-semibold text-white shadow-lg ${positionClass}`}
      role="status"
    >
      <div className="flex items-center justify-between gap-3">
        <span>{message}</span>
        {onDismiss && (
          <button type="button" onClick={onDismiss} className="text-white/70 hover:text-white">
            ✕
          </button>
        )}
      </div>
    </div>
  );
}
