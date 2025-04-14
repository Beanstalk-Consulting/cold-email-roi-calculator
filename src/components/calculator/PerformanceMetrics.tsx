
import { ResultCard } from "./ResultCard";
import { formatNumber, formatCurrency } from "@/lib/formatters";

interface PerformanceMetricsProps {
  monthlyLeads: number;
  monthlyDeals: number;
  annualRevenue: number;
}

export const PerformanceMetrics = ({
  monthlyLeads,
  monthlyDeals,
  annualRevenue,
}: PerformanceMetricsProps) => {
  return (
    <div>
      <h3 className="text-xl font-semibold text-calculator-primary mb-4">
        Email Outreach Performance
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <ResultCard
          label="Monthly Leads Generated"
          value={formatNumber(monthlyLeads)}
          tooltip="20% of total replies are considered qualified leads"
          className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200"
        />
        <ResultCard
          label="Monthly Closed Deals (Fully Ramped)"
          value={formatNumber(monthlyDeals)}
          tooltip="Based on your conversion and close rates at full productivity"
          className="bg-gradient-to-br from-green-50 to-green-100 border-green-200"
        />
        <ResultCard
          label="Annual New Revenue"
          value={formatCurrency(annualRevenue)}
          tooltip="Includes ~11% year-one productivity handicap to account for typical ramp-up time"
          className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200"
        />
      </div>
    </div>
  );
};
