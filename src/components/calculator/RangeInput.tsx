
import * as React from "react";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { InfoIcon } from "lucide-react";

interface RangeInputProps {
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  step?: number;
  label: string;
  className?: string;
  tooltip?: string;
}

export const RangeInput = ({
  value,
  onChange,
  min,
  max,
  step = 1,
  label,
  className,
  tooltip,
}: RangeInputProps) => {
  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex items-center gap-2">
        <label className="text-sm font-medium text-calculator-text">{label}</label>
        {tooltip && (
          <Tooltip>
            <TooltipTrigger>
              <InfoIcon className="h-4 w-4 text-calculator-accent" />
            </TooltipTrigger>
            <TooltipContent>
              <p className="w-[200px]">{tooltip}</p>
            </TooltipContent>
          </Tooltip>
        )}
      </div>
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
        <span className="min-w-[60px] text-right font-medium">{value}%</span>
      </div>
    </div>
  );
};
