import { ResultCard } from "./ResultCard";
import { formatNumber, formatCurrency, formatPercent } from "@/lib/formatters";

interface SDRMetricsProps {
  requiredSDRs: number;
  annualSdrSalaryCost: number;
  sdrRoi: number;
}

export const SDRMetrics = ({
  requiredSDRs,
  annualSdrSalaryCost,
  sdrRoi,
}: SDRMetricsProps) => {
  return (
    <div>
      <h3 className="text-xl font-semibold text-calculator-primary mb-4">
        Traditional In-house SDR Approach
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <ResultCard
          label="Required SDRs"
          value={formatNumber(requiredSDRs)}
          tooltip="Based on 250 emails per day per SDR (22 working days per month)"
          className="bg-red-50"
        />
        <ResultCard
          label="Annual SDR Cost"
          value={formatCurrency(annualSdrSalaryCost)}
          tooltip="Average SDR compensation of $82,470 per year"
          className="bg-red-50"
        />
        <ResultCard
          label="SDR ROI"
          value={formatPercent(sdrRoi)}
          tooltip="(Annual Revenue - Annual Cost) / Annual Cost"
          className="bg-red-50"
        />
      </div>
    </div>
  );
};