interface EmptyStateProps {
  title: string;
  description?: string;
}

export default function EmptyState({ title, description }: EmptyStateProps) {
  return (
    <div className="app-empty">
      <p className="text-sm font-semibold text-[#111]">{title}</p>
      {description && <p className="mt-1 text-sm text-abu-teks">{description}</p>}
    </div>
  );
}
