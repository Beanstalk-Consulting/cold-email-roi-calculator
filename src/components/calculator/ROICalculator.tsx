import { useState } from "react";
import { RangeInput } from "./RangeInput";
import { ResultCard } from "./ResultCard";
import { formatCurrency, formatNumber, formatPercent } from "@/lib/formatters";

export const ROICalculator = () => {
  const [emailCapacity, setEmailCapacity] = useState(8000);
  const [customerValue, setCustomerValue] = useState(3000);
  const [monthlyProspects, setMonthlyProspects] = useState(2667);
  const [replyRate, setReplyRate] = useState(3);
  const [convertRate, setConvertRate] = useState(40);
  const [closeRate, setCloseRate] = useState(25);

  // Calculate derived values
  const monthlyLeads = Math.round((monthlyProspects * replyRate) / 100);
  const monthlyDeals = Math.round((monthlyLeads * convertRate * closeRate) / 10000);
  const annualRevenue = monthlyDeals * customerValue * 12;
  const annualSalaryCost = 119956;
  const roi = ((annualRevenue - annualSalaryCost) / annualSalaryCost) * 100;

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-8 bg-white rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold text-calculator-primary text-center">
        Cold Email ROI Calculator
      </h2>

      <div className="space-y-6">
        <RangeInput
          label="Monthly Email Sending Capacity"
          value={emailCapacity}
          onChange={setEmailCapacity}
          min={5000}
          max={150000}
          step={1000}
        />

        <RangeInput
          label="Customer Lifetime Value ($)"
          value={customerValue}
          onChange={setCustomerValue}
          min={1000}
          max={10000}
          step={100}
        />

        <RangeInput
          label="Monthly Unique Prospects"
          value={monthlyProspects}
          onChange={setMonthlyProspects}
          min={1000}
          max={5000}
          step={100}
        />

        <RangeInput
          label="Reply Rate (%)"
          value={replyRate}
          onChange={setReplyRate}
          min={1}
          max={10}
          step={0.1}
        />

        <RangeInput
          label="Lead to Call Conversion Rate (%)"
          value={convertRate}
          onChange={setConvertRate}
          min={0}
          max={100}
          step={1}
        />

        <RangeInput
          label="Close Rate (%)"
          value={closeRate}
          onChange={setCloseRate}
          min={0}
          max={100}
          step={1}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
        <ResultCard
          label="Monthly Leads Generated"
          value={formatNumber(monthlyLeads)}
        />
        <ResultCard
          label="Monthly Closed Deals"
          value={formatNumber(monthlyDeals)}
        />
        <ResultCard
          label="Annual New Revenue"
          value={formatCurrency(annualRevenue)}
        />
        <ResultCard
          label="Annual Salary Cost"
          value={formatCurrency(annualSalaryCost)}
        />
        <ResultCard
          label="Return on Investment"
          value={formatPercent(roi)}
          className="md:col-span-2 lg:col-span-1"
        />
      </div>
    </div>
  );
};