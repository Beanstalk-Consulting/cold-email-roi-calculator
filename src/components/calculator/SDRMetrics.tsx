
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
}

export const SDRMetrics = ({
  requiredSDRs,
  annualSdrSalaryCost,
  sdrRoi,
  beanstalkRoi,
  includeLinkedIn = false,
  includeColdCalling = false,
}: SDRMetricsProps) => {
  const channels = [
    "email outreach",
    includeLinkedIn && "LinkedIn outreach",
    includeColdCalling && "cold calling"
  ].filter(Boolean).join(", ");

  const roiDifference = beanstalkRoi ? beanstalkRoi - sdrRoi : 0;

  return (
    <div className="border-2 border-red-500 p-4 rounded-lg">
      <div className="p-4 bg-red-50 border border-red-200 rounded-lg mb-4">
        <h4 className="text-sm font-medium text-red-800 mb-2">Traditional In-House SDR Model Analysis:</h4>
        <div className="text-sm text-red-700 space-y-1">
          <p>This analysis compares the cost and performance of hiring in-house SDRs versus using our automated service.</p>
          <p>Each SDR can handle multiple channels efficiently, including {channels}.</p>
          <p>For email outreach, an SDR typically manages 250 emails per day (5,500/month).</p>
          {includeLinkedIn && <p>For LinkedIn outreach, an SDR typically manages 22 personalized messages per day (484/month).</p>}
          <p>The average fully-loaded annual cost per SDR is {formatCurrency(82470)} including benefits and overhead.</p>
          {beanstalkRoi && (
            <Alert className="mt-3 bg-red-100 border-red-300">
              <AlertDescription className="text-red-800">
                <div className="flex items-center gap-2">
                  <TrendingDown className="h-4 w-4" />
                  <span>
                    The traditional SDR model ROI is {formatPercent(Math.abs(roiDifference))} lower 
                    than Beanstalk's automated solution
                  </span>
                </div>
              </AlertDescription>
            </Alert>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
        <ResultCard
          label="SDR Model ROI"
          value={`${formatPercent(sdrRoi)}`}
          tooltip="Return on investment for the in-house SDR model - typically lower than using our automated solutions"
          className="bg-gradient-to-br from-red-50 to-red-100 border-red-200"
        />
      </div>
    </div>
  );
};
