import * as React from "react";
import { cn } from "@/lib/utils";

interface RangeInputProps {
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  step?: number;
  label: string;
  className?: string;
}

export const RangeInput = ({
  value,
  onChange,
  min,
  max,
  step = 1,
  label,
  className,
}: RangeInputProps) => {
  return (
    <div className={cn("space-y-2", className)}>
      <label className="text-sm font-medium text-calculator-text">{label}</label>
      <div className="flex items-center gap-4">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="w-full h-2 bg-calculator-gray rounded-lg appearance-none cursor-pointer accent-calculator-accent"
        />
        <span className="min-w-[60px] text-right font-medium">{value}</span>
      </div>
    </div>
  );
};