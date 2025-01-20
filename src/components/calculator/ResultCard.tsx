import { cn } from "@/lib/utils";

interface ResultCardProps {
  label: string;
  value: string;
  className?: string;
}

export const ResultCard = ({ label, value, className }: ResultCardProps) => {
  return (
    <div
      className={cn(
        "p-4 rounded-lg bg-white shadow-md border border-gray-100",
        className
      )}
    >
      <div className="text-sm text-gray-600">{label}</div>
      <div className="text-xl font-bold text-calculator-primary animate-number-change">
        {value}
      </div>
    </div>
  );
};