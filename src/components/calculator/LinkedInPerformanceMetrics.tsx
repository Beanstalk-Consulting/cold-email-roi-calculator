
import { ResultCard } from "./ResultCard";
import { formatNumber, formatCurrency } from "@/lib/formatters";

interface LinkedInPerformanceMetricsProps {
  linkedInLeads: number;
  linkedInDeals: number;
  linkedInRevenue: number;
}

export const LinkedInPerformanceMetrics = ({
  linkedInLeads,
  linkedInDeals,
  linkedInRevenue,
}: LinkedInPerformanceMetricsProps) => {
  return (
    <div>
      <h3 className="text-xl font-semibold text-calculator-primary mb-4">
        LinkedIn Outreach Performance
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <ResultCard
          label="Monthly Leads Generated"
          value={formatNumber(linkedInLeads)}
          tooltip="Based on your LinkedIn reply to call conversion rate"
          className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200"
        />
        <ResultCard
          label="Monthly Closed Deals"
          value={formatNumber(linkedInDeals)}
          tooltip="Based on your LinkedIn conversion and close rates"
          className="bg-gradient-to-br from-green-50 to-green-100 border-green-200"
        />
        <ResultCard
          label="Annual New Revenue"
          value={formatCurrency(linkedInRevenue)}
          tooltip="Monthly LinkedIn deals × Customer value × 12 months"
          className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200"
        />
      </div>
    </div>
  );
};
