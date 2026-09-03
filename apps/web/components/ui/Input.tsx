import { cn } from "ui";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  mono?: boolean;
}

export default function Input({ className, mono, ...props }: InputProps) {
  return (
    <input
      className={cn("input", mono && "font-mono", className)}
      {...props}
    />
  );
}
