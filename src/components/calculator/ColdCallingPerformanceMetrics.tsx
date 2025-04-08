
import { ResultCard } from "./ResultCard";
import { formatNumber, formatCurrency } from "@/lib/formatters";

interface ColdCallingPerformanceMetricsProps {
  callLeads: number;
  callDeals: number;
  callRevenue: number;
  callConvertRate: number;
  dailyConnections: number;
  dailyLeads: number;
  dailyBookedLeads: number;
}

export const ColdCallingPerformanceMetrics = ({
  callLeads,
  callDeals,
  callRevenue,
  callConvertRate,
  dailyConnections,
  dailyLeads,
  dailyBookedLeads,
}: ColdCallingPerformanceMetricsProps) => {
  return (
    <div>
      <h3 className="text-xl font-semibold text-calculator-primary mb-4">
        Cold Calling Performance
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <ResultCard
          label="Daily Phone Connects"
          value={formatNumber(dailyConnections)}
          tooltip="Average number of live conversations per day"
          className="bg-gradient-to-br from-gray-50 to-gray-100 border-gray-200"
        />
        <ResultCard
          label="Daily Warm Leads"
          value={formatNumber(dailyLeads)}
          tooltip="Interested prospects who haven't booked yet (1-8 per day typical)"
          className="bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200"
        />
        <ResultCard
          label="Daily Booked Meetings"
          value="1-3"
          tooltip="Random number of booked meetings generated each day (1-3 per day)"
          className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200"
        />
        <ResultCard
          label="Monthly Booked Meetings"
          value={formatNumber(callLeads)}
          tooltip="Total booked meetings generated per month across all callers"
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
