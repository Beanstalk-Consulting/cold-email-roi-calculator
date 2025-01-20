import { useState } from "react";
import { RangeInput } from "./RangeInput";
import { ResultCard } from "./ResultCard";
import { formatCurrency, formatNumber, formatPercent } from "@/lib/formatters";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { InfoIcon } from "lucide-react";

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

const EMAILS_PER_SDR_PER_MONTH = 250 * 22; // 250 emails per day * 22 working days

export const ROICalculator = () => {
  const [emailCapacity, setEmailCapacity] = useState(8000);
  const [customerValue, setCustomerValue] = useState(3000);
  const [replyRate, setReplyRate] = useState(3);
  const [convertRate, setConvertRate] = useState(40);
  const [closeRate, setCloseRate] = useState(25);

  // Calculate derived values
  const monthlyProspects = Math.round(emailCapacity / 2); // 2-step sequence
  const totalReplies = Math.round((monthlyProspects * replyRate) / 100);
  const monthlyLeads = Math.round(totalReplies * 0.2); // 20% of replies are positive
  const monthlyDeals = Math.round((monthlyLeads * convertRate * closeRate) / 10000);
  const annualRevenue = monthlyDeals * customerValue * 12;
  
  // SDR calculations
  const requiredSDRs = Math.ceil(emailCapacity / EMAILS_PER_SDR_PER_MONTH);
  const annualSalaryCost = requiredSDRs * 82470;
  const roi = ((annualRevenue - annualSalaryCost) / annualSalaryCost) * 100;

  return (
    <TooltipProvider>
      <div className="max-w-3xl mx-auto p-6 space-y-8 bg-white rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold text-calculator-primary text-center">
          Cold Email ROI Calculator
        </h2>

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

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium text-calculator-text">Reply Rate (%)</label>
              <Tooltip>
                <TooltipTrigger>
                  <InfoIcon className="h-4 w-4 text-calculator-accent" />
                </TooltipTrigger>
                <TooltipContent>
                  <p className="w-[200px]">Expected percentage of prospects who will reply to your emails</p>
                </TooltipContent>
              </Tooltip>
            </div>
            <RangeInput
              value={replyRate}
              onChange={setReplyRate}
              min={0}
              max={15}
              step={1}
            />
          </div>

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

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium text-calculator-text">Close Rate (%)</label>
              <Tooltip>
                <TooltipTrigger>
                  <InfoIcon className="h-4 w-4 text-calculator-accent" />
                </TooltipTrigger>
                <TooltipContent>
                  <p className="w-[200px]">Percentage of sales calls that result in closed deals</p>
                </TooltipContent>
              </Tooltip>
            </div>
            <RangeInput
              value={closeRate}
              onChange={setCloseRate}
              min={0}
              max={100}
              step={1}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
          <ResultCard
            label="Monthly Leads Generated"
            value={formatNumber(monthlyLeads)}
            tooltip="20% of total replies are considered qualified leads"
          />
          <ResultCard
            label="Monthly Closed Deals"
            value={formatNumber(monthlyDeals)}
            tooltip="Based on your conversion and close rates"
          />
          <ResultCard
            label="Annual New Revenue"
            value={formatCurrency(annualRevenue)}
            tooltip="Monthly deals × Customer value × 12 months"
          />
          <ResultCard
            label="Required SDRs"
            value={formatNumber(requiredSDRs)}
            tooltip="Based on 250 emails per day per SDR"
          />
          <ResultCard
            label="Annual SDR Cost"
            value={formatCurrency(annualSalaryCost)}
            tooltip="Average SDR compensation of $82,470 per year"
          />
          <ResultCard
            label="Return on Investment"
            value={formatPercent(roi)}
            tooltip="(Annual Revenue - Annual Cost) / Annual Cost"
          />
        </div>
      </div>
    </TooltipProvider>
  );
};