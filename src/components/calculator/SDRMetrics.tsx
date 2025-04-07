
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
      <h3 className="text-xl font-semibold text-calculator-primary mb-4">
        SDR Model Performance
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <ResultCard
          label="Required SDRs"
          value={formatNumber(requiredSDRs)}
          tooltip="Number of Sales Development Representatives needed"
          className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200"
        />
        <ResultCard
          label="Annual SDR Cost"
          value={formatCurrency(annualSdrSalaryCost)}
          tooltip="Total annual cost of employing SDRs"
          className="bg-gradient-to-br from-green-50 to-green-100 border-green-200"
        />
        <ResultCard
          label="SDR Model ROI"
          value={`${formatPercent(sdrRoi)}`}
          tooltip="Return on investment for the SDR model"
          className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200"
        />

        {(includeLinkedIn || includeColdCalling) && (
          <div className="col-span-1 md:col-span-3 mt-2">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <ResultCard
                label="Email Channel SDRs"
                value={formatNumber(requiredEmailSDRs)}
                tooltip="SDRs dedicated to email outreach"
                className="bg-gradient-to-br from-sky-50 to-sky-100 border-sky-200"
              />
              
              {includeLinkedIn && (
                <ResultCard
                  label="LinkedIn Channel SDRs"
                  value={formatNumber(requiredLinkedInSDRs)}
                  tooltip="SDRs dedicated to LinkedIn outreach"
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
