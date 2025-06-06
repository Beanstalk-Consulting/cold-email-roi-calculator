
import { ResultCard } from "./ResultCard";
import { formatNumber, formatCurrency, formatPercent } from "@/lib/formatters";
import { TrendingDown } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface SDRMetricsProps {
  requiredSDRs: number;
  annualSdrSalaryCost: number;
  sdrRoi: number;
  beanstalkRoi?: number;
  includeLinkedIn?: boolean;
  includeColdCalling?: boolean;
  projectedRevenue?: number;
}

export const SDRMetrics = ({
  requiredSDRs,
  annualSdrSalaryCost,
  sdrRoi,
  beanstalkRoi,
  includeLinkedIn = false,
  includeColdCalling = false,
  projectedRevenue = 0,
}: SDRMetricsProps) => {
  const channels = [
    "email outreach",
    includeLinkedIn && "LinkedIn outreach",
    includeColdCalling && "cold calling"
  ].filter(Boolean).join(", ");

  const roiDifference = beanstalkRoi ? beanstalkRoi - sdrRoi : 0;
  const avgSdrCost = 82470; // Annual cost per SDR including benefits and overhead

  return (
    <div className="border-2 border-red-500 p-4 rounded-lg">
      <div className="p-4 bg-red-50 border border-red-200 rounded-lg mb-4">
        <h4 className="text-sm font-medium text-red-800 mb-2">Traditional In-House SDR Model Analysis:</h4>
        <div className="text-sm text-red-700 space-y-1">
          <p>This analysis shows the limitations of using in-house SDRs compared to Beanstalk dedicated channel experts.</p>
          <p>When SDRs manage multiple channels, their effectiveness is significantly reduced:</p>
          <ul className="list-disc pl-5 space-y-1 mt-2">
            <p>• Each SDR can manage about 5,500 emails per month (250 per day × 22 working days)</p>
            {includeLinkedIn && <p>• Each SDR can handle about 165 LinkedIn messages per month (11 per day × 15 working days)</p>}
            {includeColdCalling && <p>• Cold calling requires 2 SDRs per caller to match Beanstalk dedicated channel experts performance</p>}
          </ul>
          <p>The average fully-loaded annual cost per SDR is {formatCurrency(avgSdrCost)} including benefits and overhead.</p>
          {beanstalkRoi && (
            <Alert className="mt-3 bg-red-100 border-red-300">
              <AlertDescription className="text-red-800">
                <div className="flex items-center gap-2">
                  <TrendingDown className="h-4 w-4" />
                  <span>
                    The traditional SDR model ROI is {formatPercent(Math.abs(roiDifference))} lower 
                    than Beanstalk's dedicated channel experts solution due to reduced efficiency and higher costs
                  </span>
                </div>
              </AlertDescription>
            </Alert>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="grid grid-cols-2 gap-4">
          <ResultCard
            label="Required SDRs"
            value={formatNumber(requiredSDRs)}
            tooltip="Total number of Sales Development Representatives needed to handle your selected outreach volume across all channels"
            className="bg-gradient-to-br from-red-50 to-red-100 border-red-200"
          />
          <ResultCard
            label="Annual SDR Cost"
            value={formatCurrency(annualSdrSalaryCost)}
            tooltip="Total annual cost of employing SDRs including benefits and overhead expenses"
            className="bg-gradient-to-br from-red-50 to-red-100 border-red-200"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <ResultCard
            label="Projected Revenue"
            value={formatCurrency(projectedRevenue)}
            tooltip="Projected annual revenue reflects the efficiency of omnichannel SDRs. Email outreach maintains full effectiveness, while LinkedIn and cold calling performance are reduced by 50% compared to dedicated channel specialists, as SDRs must divide their attention across multiple channels."
            className="bg-gradient-to-br from-red-50 to-red-100 border-red-200"
          />
          <ResultCard
            label="SDR Model ROI"
            value={`${formatPercent(sdrRoi)}`}
            tooltip="Return on investment for the in-house SDR model - typically lower than using our automated solutions due to reduced efficiency across multiple channels"
            className="bg-gradient-to-br from-red-50 to-red-100 border-red-200"
          />
        </div>
      </div>
    </div>
  );
};
