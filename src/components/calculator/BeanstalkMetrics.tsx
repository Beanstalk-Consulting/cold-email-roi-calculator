import { ResultCard } from "./ResultCard";
import { formatCurrency, formatPercent } from "@/lib/formatters";
import { TooltipProvider } from "@/components/ui/tooltip";

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
    <TooltipProvider delayDuration={0}>
      <div>
        <h3 className="text-xl font-semibold text-calculator-primary mb-4">
          Beanstalk Approach
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <ResultCard
            label="Monthly Beanstalk Cost"
            value={formatCurrency(monthlyBeanstalkCost)}
            tooltip="Monthly cost is calculated by multiplying the number of emails sent by $0.35 per email"
            className="bg-gradient-to-br from-emerald-50 to-emerald-100 border-emerald-200"
          />
          <ResultCard
            label="Annual Beanstalk Cost"
            value={formatCurrency(annualBeanstalkCost)}
            tooltip="Your monthly Beanstalk cost multiplied by 12 months"
            className="bg-gradient-to-br from-emerald-50 to-emerald-100 border-emerald-200"
          />
          <ResultCard
            label="Beanstalk ROI"
            value={formatPercent(beanstalkRoi)}
            tooltip="Return on Investment calculation: (Annual Revenue - Annual Beanstalk Cost) / Annual Beanstalk Cost. This shows how many times over you'll earn back your Beanstalk investment."
            className="bg-gradient-to-br from-emerald-50 to-emerald-100 border-emerald-200"
          />
        </div>
      </div>
    </TooltipProvider>
  );
};