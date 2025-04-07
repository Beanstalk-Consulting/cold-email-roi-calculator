
import { ResultCard } from "./ResultCard";
import { formatNumber, formatCurrency, formatPercent } from "@/lib/formatters";

interface CombinedMetricsProps {
  totalLeads: number;
  totalDeals: number;
  totalRevenue: number;
  includeLinkedIn: boolean;
  linkedInRevenue: number;
  includeColdCalling: boolean;
  callRevenue: number;
  combinedRoi: number;
}

export const CombinedMetrics = ({
  totalLeads,
  totalDeals,
  totalRevenue,
  includeLinkedIn,
  linkedInRevenue,
  includeColdCalling,
  callRevenue,
  combinedRoi,
}: CombinedMetricsProps) => {
  return (
    <div>
      <h3 className="text-xl font-semibold text-calculator-primary mb-4">
        Combined Channel Performance
      </h3>
      <div className="grid grid-cols-1 gap-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <ResultCard
            label="Total Monthly Leads"
            value={formatNumber(totalLeads)}
            tooltip="Combined leads from all active channels"
            className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200"
          />
          <ResultCard
            label="Total Monthly Deals"
            value={formatNumber(totalDeals)}
            tooltip="Combined deals from all active channels"
            className="bg-gradient-to-br from-green-50 to-green-100 border-green-200"
          />
          <ResultCard
            label="Total Annual Revenue"
            value={formatCurrency(totalRevenue)}
            tooltip="Combined revenue from all active channels"
            className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200"
          />
        </div>
        
        <div className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <ResultCard
              label="Combined ROI"
              value={`${formatPercent(combinedRoi)}`}
              tooltip="ROI across all selected channels"
              className="bg-gradient-to-br from-amber-50 to-amber-100 border-amber-200"
            />
            
            {includeLinkedIn && totalRevenue > 0 && (
              <ResultCard
                label="LinkedIn Revenue Contribution"
                value={`${formatPercent(linkedInRevenue / totalRevenue * 100)}`}
                tooltip="Percentage of total revenue from LinkedIn outreach"
                className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200"
              />
            )}
            
            {includeColdCalling && totalRevenue > 0 && (
              <ResultCard
                label="Cold Calling Revenue Contribution"
                value={`${formatPercent(callRevenue / totalRevenue * 100)}`}
                tooltip="Percentage of total revenue from cold calling"
                className="bg-gradient-to-br from-green-50 to-green-100 border-green-200"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
