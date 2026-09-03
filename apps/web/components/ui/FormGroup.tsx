interface FormGroupProps {
  label: string;
  htmlFor?: string;
  children: React.ReactNode;
  className?: string;
}

export default function FormGroup({ label, htmlFor, children, className }: FormGroupProps) {
  return (
    <div className={className ?? "mb-4"}>
      <label htmlFor={htmlFor} className="mb-1.5 block text-[13px] font-semibold text-[#1A1A1A]">
        {label}
      </label>
      {children}
    </div>
  );
}
