
import { ResultCard } from "./ResultCard";
import { formatNumber, formatCurrency } from "@/lib/formatters";

interface ColdCallingPerformanceMetricsProps {
  callLeads: number;
  callDeals: number;
  callRevenue: number;
  callConvertRate: number; // Added this prop to show in the tooltip
}

export const ColdCallingPerformanceMetrics = ({
  callLeads,
  callDeals,
  callRevenue,
  callConvertRate,
}: ColdCallingPerformanceMetricsProps) => {
  return (
    <div>
      <h3 className="text-xl font-semibold text-calculator-primary mb-4">
        Cold Calling Performance
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <ResultCard
          label="Monthly Leads Generated"
          value={formatNumber(callLeads)}
          tooltip={`Based on your ${callConvertRate}% call to meeting conversion rate`}
          className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200"
        />
        <ResultCard
          label="Monthly Closed Deals"
          value={formatNumber(callDeals)}
          tooltip="Based on your cold calling conversion and close rates"
          className="bg-gradient-to-br from-green-50 to-green-100 border-green-200"
        />
        <ResultCard
          label="Annual New Revenue"
          value={formatCurrency(callRevenue)}
          tooltip="Monthly cold calling deals × Customer value × 12 months"
          className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200"
        />
      </div>
    </div>
  );
};
