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

const getBeanstalkPrice = (emailCount: number): number => {
  if (emailCount <= 20000) return 0.36;
  if (emailCount <= 50000) return 0.20;
  if (emailCount <= 100000) return 0.12;
  if (emailCount <= 500000) return 0.09;
  return 0.085;
};

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
  
  // SDR calculations with updated monthly capacity
  const requiredSDRs = Math.ceil(emailCapacity / EMAILS_PER_SDR_PER_MONTH);
  const annualSdrSalaryCost = requiredSDRs * 82470; // Average SDR salary
  const sdrRoi = ((annualRevenue - annualSdrSalaryCost) / annualSdrSalaryCost) * 100;

  // Beanstalk calculations
  const monthlyEmailPrice = getBeanstalkPrice(emailCapacity);
  const monthlyBeanstalkCost = (emailCapacity * monthlyEmailPrice) / 100; // Convert cents to dollars
  const annualBeanstalkCost = monthlyBeanstalkCost * 12;
  const beanstalkRoi = ((annualRevenue - annualBeanstalkCost) / annualBeanstalkCost) * 100;

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

          <RangeInput
            label="Close Rate (%)"
            value={closeRate}
            onChange={setCloseRate}
            min={0}
            max={100}
            step={1}
          />
        </div>

        <div className="space-y-8">
          {/* Performance Metrics Section */}
          <div>
            <h3 className="text-xl font-semibold text-calculator-primary mb-4">
              Expected Performance
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <ResultCard
                label="Monthly Leads Generated"
                value={formatNumber(monthlyLeads)}
                tooltip="20% of total replies are considered qualified leads"
                className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200"
              />
              <ResultCard
                label="Monthly Closed Deals"
                value={formatNumber(monthlyDeals)}
                tooltip="Based on your conversion and close rates"
                className="bg-gradient-to-br from-green-50 to-green-100 border-green-200"
              />
              <ResultCard
                label="Annual New Revenue"
                value={formatCurrency(annualRevenue)}
                tooltip="Monthly deals × Customer value × 12 months"
                className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200"
              />
            </div>
          </div>

          {/* In-house SDR Cost Section */}
          <div>
            <h3 className="text-xl font-semibold text-calculator-primary mb-4">
              Traditional In-house SDR Approach
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <ResultCard
                label="Required SDRs"
                value={formatNumber(requiredSDRs)}
                tooltip="Based on 250 emails per day per SDR (22 working days per month)"
                className="bg-red-50"
              />
              <ResultCard
                label="Annual SDR Cost"
                value={formatCurrency(annualSdrSalaryCost)}
                tooltip="Average SDR compensation of $82,470 per year"
                className="bg-red-50"
              />
              <ResultCard
                label="SDR ROI"
                value={formatPercent(sdrRoi)}
                tooltip="(Annual Revenue - Annual Cost) / Annual Cost"
                className="bg-red-50"
              />
            </div>
          </div>

          {/* Beanstalk Section */}
          <div>
            <h3 className="text-xl font-semibold text-calculator-primary mb-4">
              Beanstalk Approach
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <ResultCard
                label="Monthly Beanstalk Cost"
                value={formatCurrency(monthlyBeanstalkCost)}
                tooltip={`${monthlyEmailPrice}¢ per email at your volume`}
                className="bg-gradient-to-br from-emerald-50 to-emerald-100 border-emerald-200"
              />
              <ResultCard
                label="Annual Beanstalk Cost"
                value={formatCurrency(annualBeanstalkCost)}
                tooltip="Monthly cost × 12 months"
                className="bg-gradient-to-br from-emerald-50 to-emerald-100 border-emerald-200"
              />
              <ResultCard
                label="Beanstalk ROI"
                value={formatPercent(beanstalkRoi)}
                tooltip="(Annual Revenue - Annual Beanstalk Cost) / Annual Beanstalk Cost"
                className="bg-gradient-to-br from-emerald-50 to-emerald-100 border-emerald-200"
              />
            </div>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
};