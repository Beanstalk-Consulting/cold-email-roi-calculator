
import { RangeInput } from "./RangeInput";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { InfoIcon, Mail } from "lucide-react";
import { formatNumber } from "@/lib/formatters";
import { Checkbox } from "@/components/ui/checkbox";

const EMAIL_CAPACITY_OPTIONS = [
  { value: 8000, label: "8,000" },
  { value: 20000, label: "20,000" },
  { value: 50000, label: "50,000" },
  { value: 100000, label: "100,000" },
  { value: 250000, label: "250,000" },
  { value: 500000, label: "500,000" },
  { value: 1000000, label: "1,000,000" },
];

const CONVERSION_RATE_OPTIONS = [0, 10, 25, 40, 50, 75];

interface CalculatorInputsProps {
  emailCapacity: number;
  setEmailCapacity: (value: number) => void;
  customerValue: number;
  setCustomerValue: (value: number) => void;
  replyRate: number;
  setReplyRate: (value: number) => void;
  convertRate: number;
  setConvertRate: (value: number) => void;
  closeRate: number;
  setCloseRate: (value: number) => void;
  monthlyProspects: number;
  includeEmail: boolean;
  setIncludeEmail: (value: boolean) => void;
}

export const CalculatorInputs = ({
  emailCapacity,
  setEmailCapacity,
  customerValue,
  setCustomerValue,
  replyRate,
  setReplyRate,
  convertRate,
  setConvertRate,
  closeRate,
  setCloseRate,
  monthlyProspects,
  includeEmail,
  setIncludeEmail,
}: CalculatorInputsProps) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-4">
        <Checkbox
          checked={includeEmail}
          onCheckedChange={(checked) => {
            setIncludeEmail(checked === true);
          }}
          className="h-5 w-5"
        />
        <div className="flex items-center gap-2">
          <Mail className="h-5 w-5 text-blue-500" />
          <span className="text-lg font-medium">Include Cold Email</span>
        </div>
      </div>
      
      {includeEmail && (
        <div className="space-y-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium text-calculator-text">Monthly Email Sending Capacity</label>
              <Tooltip>
                <TooltipTrigger>
                  <InfoIcon className="h-4 w-4 text-calculator-accent" />
                </TooltipTrigger>
                <TooltipContent>
                  <p className="w-[200px]">Select your desired monthly email sending capacity</p>
                </TooltipContent>
              </Tooltip>
            </div>
            <Select
              value={emailCapacity.toString()}
              onValueChange={(value) => setEmailCapacity(Number(value))}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {EMAIL_CAPACITY_OPTIONS.map((option) => (
                  <SelectItem key={option.value} value={option.value.toString()}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium text-calculator-text">Monthly Unique Prospects</label>
              <Tooltip>
                <TooltipTrigger>
                  <InfoIcon className="h-4 w-4 text-calculator-accent" />
                </TooltipTrigger>
                <TooltipContent>
                  <p className="w-[200px]">Based on a 2-step sequence, this is half of your monthly sending capacity</p>
                </TooltipContent>
              </Tooltip>
            </div>
            <Input value={formatNumber(monthlyProspects)} disabled className="bg-gray-100" />
          </div>

          <RangeInput
            label="Reply Rate (%)"
            value={replyRate}
            onChange={setReplyRate}
            min={0}
            max={15}
            step={1}
          />

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium text-calculator-text">Lead to Call Conversion Rate (%)</label>
              <Tooltip>
                <TooltipTrigger>
                  <InfoIcon className="h-4 w-4 text-calculator-accent" />
                </TooltipTrigger>
                <TooltipContent>
                  <p className="w-[200px]">Percentage of leads that convert to sales calls</p>
                </TooltipContent>
              </Tooltip>
            </div>
            <Select
              value={convertRate.toString()}
              onValueChange={(value) => setConvertRate(Number(value))}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {CONVERSION_RATE_OPTIONS.map((rate) => (
                  <SelectItem key={rate} value={rate.toString()}>
                    {rate}%
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      )}
      
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
