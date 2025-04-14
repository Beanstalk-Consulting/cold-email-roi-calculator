
import { ResultCard } from "./ResultCard";
import { formatNumber, formatCurrency, formatPercent } from "@/lib/formatters";

interface SDRMetricsProps {
  requiredSDRs: number;
  annualSdrSalaryCost: number;
  sdrRoi: number;
  requiredEmailSDRs?: number;
  requiredLinkedInSDRs?: number;
  requiredCallSDRs?: number;
  includeLinkedIn?: boolean;
  includeColdCalling?: boolean;
}

export const SDRMetrics = ({
  requiredSDRs,
  annualSdrSalaryCost,
  sdrRoi,
  requiredEmailSDRs = 0,
  requiredLinkedInSDRs = 0,
  requiredCallSDRs = 0,
  includeLinkedIn = false,
  includeColdCalling = false,
}: SDRMetricsProps) => {
  return (
    <div>
      <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg mb-4">
        <h4 className="text-sm font-medium text-gray-700 mb-2">In-House SDR Model Analysis:</h4>
        <div className="text-sm text-gray-600 space-y-1">
          <p>This analysis shows how many SDRs you would need to hire to achieve similar results in-house.</p>
          <p>For email outreach, we assume an SDR can manage 250 emails per day (5,500/month).</p>
          <p>For LinkedIn outreach, we assume an SDR can manage 22 personalized messages per day (484/month).</p>
          <p>The average fully-loaded annual cost per SDR is $82,470 including benefits and overhead.</p>
          <p className="font-medium text-amber-700 mt-2">Using our service achieves better ROI without the overhead of managing an in-house team.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <ResultCard
          label="Required SDRs"
          value={formatNumber(requiredSDRs)}
          tooltip="Total number of Sales Development Representatives needed to handle your selected outreach volume across all channels"
          className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200"
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
          className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200"
        />

        {(includeLinkedIn || includeColdCalling) && (
          <div className="col-span-1 md:col-span-3 mt-2">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <ResultCard
                label="Email Channel SDRs"
                value={formatNumber(requiredEmailSDRs)}
                tooltip="SDRs dedicated to email outreach (based on 5,500 emails per month per SDR)"
                className="bg-gradient-to-br from-sky-50 to-sky-100 border-sky-200"
              />
              
              {includeLinkedIn && (
                <ResultCard
                  label="LinkedIn Channel SDRs"
                  value={formatNumber(requiredLinkedInSDRs)}
                  tooltip="SDRs dedicated to LinkedIn outreach (based on 484 personalized messages per month per SDR)"
                  className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200"
                />
              )}
              
              {includeColdCalling && (
                <ResultCard
                  label="Cold Calling SDRs"
                  value={formatNumber(requiredCallSDRs)}
                  tooltip="SDRs dedicated to cold calling"
                  className="bg-gradient-to-br from-green-50 to-green-100 border-green-200"
                />
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
