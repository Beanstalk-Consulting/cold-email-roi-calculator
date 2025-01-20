import { ResultCard } from "./ResultCard";
import { formatCurrency, formatPercent } from "@/lib/formatters";

interface BeanstalkMetricsProps {
  monthlyBeanstalkCost: number;
  annualBeanstalkCost: number;
  beanstalkRoi: number;
}

export const BeanstalkMetrics = ({
  monthlyBeanstalkCost,
  annualBeanstalkCost,
  beanstalkRoi,
}: BeanstalkMetricsProps) => {
  return (
    <div>
      <h3 className="text-xl font-semibold text-calculator-primary mb-4">
        Beanstalk Approach
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <ResultCard
          label="Monthly Beanstalk Cost"
          value={formatCurrency(monthlyBeanstalkCost)}
          tooltip="Based on your email volume"
          className="bg-gradient-to-br from-emerald-50 to-emerald-100 border-emerald-200"
        />
        <ResultCard
          label="Annual Beanstalk Cost"
          value={formatCurrency(annualBeanstalkCost)}
          tooltip="Monthly cost × 12 months"
          className="bg-gradient-to-br from-emerald-50 to-emerald-100 border-emerald-200"
        />
        <ResultCard
          label="Beanstalk ROI"
          value={formatPercent(beanstalkRoi)}
          tooltip="(Annual Revenue - Annual Beanstalk Cost) / Annual Beanstalk Cost"
          className="bg-gradient-to-br from-emerald-50 to-emerald-100 border-emerald-200"
        />
      </div>
    </div>
  );
};