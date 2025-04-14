
import { ResultCard } from "./ResultCard";
import { formatCurrency, formatPercent, formatNumber } from "@/lib/formatters";
import { TooltipProvider } from "@/components/ui/tooltip";

interface BeanstalkMetricsProps {
  monthlyBeanstalkCost: number;
  discountedMonthlyBeanstalkCost: number;
  annualBeanstalkCost: number;
  beanstalkRoi: number;
  totalLeads: number;
  totalDeals: number;
  totalRevenue: number;
  activeChannelCount: number;
}

export const BeanstalkMetrics = ({
  monthlyBeanstalkCost,
  discountedMonthlyBeanstalkCost,
  annualBeanstalkCost,
  beanstalkRoi,
  totalLeads,
  totalDeals,
  totalRevenue,
  activeChannelCount,
}: BeanstalkMetricsProps) => {
  const discountRate = activeChannelCount === 3 ? 25 : (activeChannelCount === 2 ? 15 : 0);
  const discountMessage = activeChannelCount >= 2 
    ? `Your ${discountRate}% multi-channel Beanstalk discount is automatically applied when using ${activeChannelCount} channels` 
    : "Enable multiple channels to unlock Beanstalk discounts: 15% off for 2 channels, 25% off for all 3 channels!";

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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <ResultCard
            label="Monthly Beanstalk Cost"
            value={formatCurrency(monthlyBeanstalkCost)}
            tooltip="List pricing: $0.40/email (first 8k emails), with different rates for higher volumes. LinkedIn: $1,499 first profile, $149 per additional profile. Cold calling: $4,499/mo full-time or $2,999/mo part-time"
            className="bg-gradient-to-br from-emerald-50 to-emerald-100 border-emerald-200"
          />
          <ResultCard
            label="Annual Beanstalk Cost"
            value={formatCurrency(annualBeanstalkCost)}
            tooltip="Your discounted monthly Beanstalk cost multiplied by 12 months"
            className="bg-gradient-to-br from-emerald-50 to-emerald-100 border-emerald-200"
          />
          <ResultCard
            label="Beanstalk ROI"
            value={formatPercent(beanstalkRoi)}
            tooltip="Return on Investment calculation: (Annual Revenue - Annual Beanstalk Cost) / Annual Beanstalk Cost"
            className="bg-gradient-to-br from-emerald-50 to-emerald-100 border-emerald-200"
          />
        </div>
        <div className="col-span-full">
          <ResultCard
            label="Beanstalk Multi-Channel Discounted Cost"
            value={formatCurrency(discountedMonthlyBeanstalkCost)}
            tooltip={discountMessage}
            className="bg-gradient-to-br from-emerald-100 to-emerald-200 border-2 border-emerald-400 font-bold"
          />
        </div>
      </div>
    </TooltipProvider>
  );
};

