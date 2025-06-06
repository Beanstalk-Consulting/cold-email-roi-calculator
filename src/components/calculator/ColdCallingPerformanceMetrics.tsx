
import { ResultCard } from "./ResultCard";
import { formatNumber, formatCurrency } from "@/lib/formatters";

interface ColdCallingPerformanceMetricsProps {
  callLeads: number;
  callDeals: number;
  callRevenue: number;
  dailyConnections?: number;
  dailyLeads?: number;
  dailyBookedLeads?: number;
  monthlyCallingCost?: number;
  annualCallingCost?: number;
  callRoi?: number;
}

export const ColdCallingPerformanceMetrics = ({
  callLeads,
  callDeals,
  callRevenue,
  dailyConnections = 0,
  dailyLeads = 0,
  dailyBookedLeads = 0,
  monthlyCallingCost = 0,
  annualCallingCost = 0,
  callRoi = 0,
}: ColdCallingPerformanceMetricsProps) => {
  return (
    <div>
      <h3 className="text-xl font-semibold text-calculator-primary mb-4">
        Cold Calling Performance
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <ResultCard
          label="Monthly Leads Generated"
          value={formatNumber(callLeads)}
          tooltip="Based on your connect rate and total dials, calculated from your daily booked leads × working days"
          className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200"
        />
        <ResultCard
          label="Monthly Closed Deals"
          value={formatNumber(callDeals)}
          tooltip="Based on your lead generation rate and close rate, accounting for actual performance data"
          className="bg-gradient-to-br from-green-50 to-green-100 border-green-200"
        />
        <ResultCard
          label="Annual New Revenue"
          value={formatCurrency(callRevenue)}
          tooltip="Monthly deals × Customer value × 12 months, with an 11% reduction in year one to account for ramp-up time"
          className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ResultCard
          label="Monthly Calling Cost"
          value={formatCurrency(monthlyCallingCost)}
          tooltip="Monthly cost per caller: Part-time ($2,999/mo) or Full-time ($4,499/mo) × number of callers"
          className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200"
        />
        <ResultCard
          label="Annual ROI"
          value={`${formatNumber(callRoi)}%`}
          tooltip="Annual Return on Investment from cold calling, calculated as (Annual Revenue - Annual Calling Cost) / Annual Calling Cost"
          className="bg-gradient-to-br from-teal-50 to-teal-100 border-teal-200"
        />
      </div>
    </div>
  );
};
