
import { RangeInput } from "./RangeInput";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Input } from "@/components/ui/input";
import { InfoIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { BoxIcon } from "lucide-react";

interface GlobalSettingsProps {
  closeRate: number;
  setCloseRate: (value: number) => void;
  customerValue: number;
  setCustomerValue: (value: number) => void;
}

export const GlobalSettings = ({
  closeRate,
  setCloseRate,
  customerValue,
  setCustomerValue,
}: GlobalSettingsProps) => {
  return (
    <div className={cn(
      "space-y-5 mb-6", 
      "bg-white", // Changed to white for clarity
      "p-6", 
      "rounded-lg", 
      "border-2", // Increased border width
      "border-primary-purple", // Use a more distinctive purple border
      "shadow-md", // Slightly increased shadow
      "relative" // For positioning the icon
    )}>
      <div className="absolute top-4 right-4">
        <BoxIcon 
          className="text-primary-purple opacity-30" 
          size={32} 
        />
      </div>
      <h3 className="text-xl font-semibold text-dark-charcoal flex items-center gap-2">
        <BoxIcon className="text-primary-purple" size={24} />
        Global Settings
      </h3>
      
      <div className="bg-soft-purple/10 p-4 rounded-md border border-soft-purple/30">
        <RangeInput
          label="Meeting Close Rate (%)"
          value={closeRate}
          onChange={setCloseRate}
          min={0}
          max={100}
          step={1}
          tooltip="Percentage of meetings that convert to closed deals - this rate applies to all channels"
          className="mb-2"
        />
        <p className="text-xs text-vivid-purple">
          This is the percentage of meetings that convert to closed deals across all channels
        </p>
      </div>
      
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-dark-charcoal">Customer Lifetime Value ($)</label>
          <Tooltip>
            <TooltipTrigger>
              <InfoIcon className="h-4 w-4 text-vivid-purple" />
            </TooltipTrigger>
            <TooltipContent>
              <p className="w-[200px]">Enter the average lifetime value of your customers</p>
            </TooltipContent>
          </Tooltip>
        </div>
        <Input
          type="number"
          value={customerValue}
          onChange={(e) => setCustomerValue(Number(e.target.value))}
          min={0}
          className="w-full"
        />
      </div>
    </div>
  );
};
