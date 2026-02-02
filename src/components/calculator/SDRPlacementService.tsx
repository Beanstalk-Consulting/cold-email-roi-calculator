
import { Card } from "@/components/ui/card";
import { Users, DollarSign, InfoIcon } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { formatNumber, formatCurrency } from "@/lib/formatters";

interface SDRPlacementServiceProps {
  emailCapacity: number;
  totalLeads: number;
}

export const SDRPlacementService = ({ emailCapacity, totalLeads }: SDRPlacementServiceProps) => {
  // Recommend 1 SDR until 100,000+ emails per month
  const recommendedReps = emailCapacity >= 100000 ? Math.ceil(emailCapacity / 100000) : 1;
  const placementFee = 4000; // One-time $4,000 per rep
  const totalPlacementCost = recommendedReps * placementFee;

  return (
    <Card className="p-6 bg-gradient-to-br from-indigo-50 to-purple-50 border-indigo-200">
      <div className="flex items-center gap-3 mb-4">
        <Users className="h-6 w-6 text-indigo-600" />
        <h3 className="text-lg font-semibold text-indigo-900">SDR Placement Service</h3>
        <Tooltip>
          <TooltipTrigger>
            <InfoIcon className="h-4 w-4 text-indigo-400" />
          </TooltipTrigger>
          <TooltipContent>
            <p className="w-[280px]">
              We can help you hire and place qualified SDRs to manage your cold outbound leads. 
              One-time placement fee per rep.
            </p>
          </TooltipContent>
        </Tooltip>
      </div>

      <div className="space-y-4">
        <div className="bg-white/60 p-4 rounded-lg border border-indigo-100">
          <div className="flex items-center gap-2 mb-2">
            <DollarSign className="h-5 w-5 text-indigo-600" />
            <span className="font-medium text-indigo-800">One-Time Placement Fee</span>
          </div>
          <p className="text-2xl font-bold text-indigo-900">{formatCurrency(placementFee)} <span className="text-sm font-normal">per rep</span></p>
        </div>

        <div className="bg-white/60 p-4 rounded-lg border border-indigo-100">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-indigo-700">Your Email Volume</span>
            <span className="font-medium text-indigo-900">{formatNumber(emailCapacity)}/month</span>
          </div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-indigo-700">Expected Monthly Leads</span>
            <span className="font-medium text-indigo-900">{formatNumber(totalLeads)}</span>
          </div>
          <div className="border-t border-indigo-200 pt-2 mt-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-indigo-800">Recommended SDRs</span>
              <span className="text-lg font-bold text-indigo-900">{recommendedReps}</span>
            </div>
            <p className="text-xs text-indigo-600 mt-1">
              1 SDR can handle up to 100,000 emails/month of lead volume
            </p>
          </div>
        </div>

        {recommendedReps > 0 && (
          <div className="bg-indigo-100 p-3 rounded-lg">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-indigo-800">Total Placement Cost</span>
              <span className="text-lg font-bold text-indigo-900">{formatCurrency(totalPlacementCost)}</span>
            </div>
            <p className="text-xs text-indigo-600 mt-1">One-time fee • No ongoing costs</p>
          </div>
        )}
      </div>
    </Card>
  );
};
