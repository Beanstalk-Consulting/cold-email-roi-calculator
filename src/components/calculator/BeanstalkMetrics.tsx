
import { ResultCard } from "./ResultCard";
import { formatCurrency, formatPercent, formatNumber } from "@/lib/formatters";
import { TooltipProvider } from "@/components/ui/tooltip";

interface BeanstalkMetricsProps {
  monthlyBeanstalkCost: number;
  annualBeanstalkCost: number;
  beanstalkRoi: number;
  totalLeads: number;
  totalDeals: number;
  totalRevenue: number;
}

export const BeanstalkMetrics = ({
  monthlyBeanstalkCost,
  annualBeanstalkCost,
  beanstalkRoi,
  totalLeads,
  totalDeals,
  totalRevenue,
}: BeanstalkMetricsProps) => {
  return (
    <TooltipProvider delayDuration={0}>
      <div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
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
            tooltip="Combined annual revenue from all active channels"
            className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <ResultCard
            label="Monthly Beanstalk Cost"
            value={formatCurrency(monthlyBeanstalkCost)}
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
            tooltip="Return on Investment calculation: (Annual Revenue - Annual Beanstalk Cost) / Annual Beanstalk Cost"
            className="bg-gradient-to-br from-emerald-50 to-emerald-100 border-emerald-200"
          />
        </div>
      </div>
    </TooltipProvider>
  );
};
