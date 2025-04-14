
import { ResultCard } from "./ResultCard";
import { formatNumber, formatCurrency, formatPercent } from "@/lib/formatters";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

interface CombinedMetricsProps {
  totalLeads: number;
  totalDeals: number;
  totalRevenue: number;
  includeEmail: boolean;
  emailRevenue: number;
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
  includeEmail,
  emailRevenue,
  includeLinkedIn,
  linkedInRevenue,
  includeColdCalling,
  callRevenue,
  combinedRoi,
}: CombinedMetricsProps) => {
  return (
    <div>
      <div className="grid grid-cols-1 gap-4">
        <Alert className="mb-4 bg-blue-50 border-blue-200">
          <AlertTitle className="text-blue-800">Year One Productivity Explanation</AlertTitle>
          <AlertDescription className="text-blue-700">
            <p>Our calculations apply an ~89% year-one productivity factor to account for typical sales ramp-up time.</p>
            <div className="mt-2">
              <strong>Typical Sales Ramp Schedule:</strong>
              <ul className="list-disc list-inside">
                <li>Month 1: 30% of full capacity</li>
                <li>Month 2: 55% of full capacity</li>
                <li>Month 3: 80% of full capacity</li>
                <li>Months 4-12: 100% of full capacity</li>
              </ul>
            </div>
            <p className="mt-2 font-semibold">
              This results in approximately 88.75% effective productivity for year one, 
              translating to an ~11-12% handicap in annual projections.
            </p>
          </AlertDescription>
        </Alert>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <ResultCard
            label="Total Monthly Leads"
            value={formatNumber(totalLeads)}
            tooltip="Combined leads from all active channels"
            className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200"
          />
          <ResultCard
            label="Monthly Deals (Fully Ramped)"
            value={formatNumber(totalDeals)}
            tooltip="Combined deals from all active channels at full productivity"
            className="bg-gradient-to-br from-green-50 to-green-100 border-green-200"
          />
          <ResultCard
            label="Total Annual Revenue"
            value={formatCurrency(totalRevenue)}
            tooltip="Combined revenue from all active channels (includes ~11% year-one productivity handicap)"
            className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200"
          />
        </div>
        
        <div className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <ResultCard
              label="Combined ROI"
              value={`${formatPercent(combinedRoi)}`}
              tooltip="ROI across all selected channels"
              className="bg-gradient-to-br from-amber-50 to-amber-100 border-amber-200"
            />
            
            {includeEmail && totalRevenue > 0 && (
              <ResultCard
                label="Cold Email Revenue Contribution"
                value={`${formatPercent(emailRevenue / totalRevenue * 100)}`}
                tooltip="Percentage of total revenue from cold email outreach"
                className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200"
              />
            )}
            
            {includeLinkedIn && totalRevenue > 0 && (
              <ResultCard
                label="LinkedIn Revenue Contribution"
                value={`${formatPercent(linkedInRevenue / totalRevenue * 100)}`}
                tooltip="Percentage of total revenue from LinkedIn outreach"
                className="bg-gradient-to-br from-green-50 to-green-100 border-green-200"
              />
            )}
            
            {includeColdCalling && totalRevenue > 0 && (
              <ResultCard
                label="Cold Calling Revenue Contribution"
                value={`${formatPercent(callRevenue / totalRevenue * 100)}`}
                tooltip="Percentage of total revenue from cold calling"
                className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200"
              />
            )}
          </div>
        </div>

        <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
          <h4 className="text-sm font-medium text-gray-700 mb-2">Typical Sales Ramp Schedule:</h4>
          <div className="text-sm text-gray-600 space-y-1">
            <p>Month 1: 30% of full capacity</p>
            <p>Month 2: 55% of full capacity</p>
            <p>Month 3: 80% of full capacity</p>
            <p>Months 4-12: 100% of full capacity</p>
            <p className="pt-2 font-medium">This results in ~89% effective productivity for year one (or ~11% handicap).</p>
          </div>
        </div>
      </div>
    </div>
  );
};
