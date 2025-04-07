
import { RangeInput } from "./RangeInput";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Input } from "@/components/ui/input";
import { InfoIcon } from "lucide-react";

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
    <div className="space-y-5 mb-6">
      <h3 className="text-xl font-semibold">Global Settings</h3>
      
      <RangeInput
        label="Meeting Close Rate (%)"
        value={closeRate}
        onChange={setCloseRate}
        min={0}
        max={100}
        step={1}
        tooltip="Percentage of meetings that convert to closed deals - this rate applies to all channels"
      />
      
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-calculator-text">Customer Lifetime Value ($)</label>
          <Tooltip>
            <TooltipTrigger>
              <InfoIcon className="h-4 w-4 text-calculator-accent" />
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
