
import { ResultCard } from "./ResultCard";
import { formatNumber, formatCurrency, formatPercent } from "@/lib/formatters";

interface LinkedInPerformanceMetricsProps {
  linkedInLeads: number;
  linkedInDeals: number;
  linkedInRevenue: number;
  monthlyLinkedInCost?: number;
  linkedInRoi?: number;
}

export const LinkedInPerformanceMetrics = ({
  linkedInLeads,
  linkedInDeals,
  linkedInRevenue,
  monthlyLinkedInCost = 0,
  linkedInRoi = 0,
}: LinkedInPerformanceMetricsProps) => {
  return (
    <div>
      <h3 className="text-xl font-semibold text-calculator-primary mb-4">
        LinkedIn Outreach Performance
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <ResultCard
          label="Monthly Leads Generated"
          value={formatNumber(linkedInLeads)}
          tooltip="Based on replies to connection requests and positive responses from connections"
          className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200"
        />
        <ResultCard
          label="Monthly Closed Deals (Fully Ramped)"
          value={formatNumber(linkedInDeals)}
          tooltip="Based on your lead generation rate and close rate at full productivity"
          className="bg-gradient-to-br from-green-50 to-green-100 border-green-200"
        />
        <ResultCard
          label="Annual New Revenue"
          value={formatCurrency(linkedInRevenue)}
          tooltip="Includes ~11% year-one productivity handicap to account for typical ramp-up time"
          className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ResultCard
          label="Monthly LinkedIn Cost"
          value={formatCurrency(monthlyLinkedInCost)}
          tooltip="First profile: $1,499/mo, Additional profiles: $499/mo each"
          className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200"
        />
        <ResultCard
          label="Annual ROI"
          value={formatPercent(linkedInRoi)}
          tooltip="Annual Return on Investment from LinkedIn outreach, calculated as (Annual Revenue - Annual Cost) / Annual Cost"
          className="bg-gradient-to-br from-teal-50 to-teal-100 border-teal-200"
        />
      </div>
    </div>
  );
};
