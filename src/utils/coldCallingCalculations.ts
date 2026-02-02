
// Constants
const YEAR_ONE_PRODUCTIVITY = 0.89;

interface ColdCallingCalculationProps {
  includeColdCalling: boolean;
  isFullTimeDialer: boolean;
  callerCount: number;
  connectRate: number;
  closeRate: number;
  customerValue: number;
}

// Cold calling is now a package add-on that includes email/LinkedIn + callers
// Minimum $10,000/month for 1 caller, $15,000/month for 2 callers
export const getColdCallingPackagePrice = (callerCount: number): number => {
  if (callerCount <= 0) return 0;
  // Base package $10,000 (includes email/LinkedIn infrastructure + 1 caller)
  // Additional callers add $5,000 each (covers $3k-$7k base+variable)
  return 10000 + (Math.max(0, callerCount - 1) * 5000);
};

export const calculateColdCallingMetrics = ({
  includeColdCalling,
  isFullTimeDialer,
  callerCount,
  connectRate,
  closeRate,
  customerValue,
}: ColdCallingCalculationProps) => {
  if (!includeColdCalling) {
    return {
      monthlyDialCount: 0,
      callConnections: 0,
      callLeads: 0,
      callDeals: 0,
      callRevenue: 0,
      dailyConnections: 0,
      dailyLeads: 0,
      dailyBookedLeads: 0,
      callBookedLeads: 0,
      monthlyCallingCost: 0,
      annualCallingCost: 0,
      callRoi: 0,
      requiredCallerSDRs: 0,
      sdrCallRevenue: 0,
    };
  }

  const dailyDials = 1000;
  const daysPerWeek = isFullTimeDialer ? 5 : 3;
  const workingDaysPerMonth = daysPerWeek * 4.4;

  const monthlyDialCount = dailyDials * daysPerWeek * 4 * callerCount;
  
  // Daily metrics for a single caller
  const dailyConnections = Math.round((dailyDials * connectRate) / 100);
  const dailyLeads = Math.round((dailyConnections * 5) / 100);
  const dailyBookedLeads = Math.round((dailyConnections * 1.85) / 100);
  
  // Monthly metrics for all callers
  const callConnections = Math.round((dailyDials * daysPerWeek * 4 * connectRate * callerCount) / 100);
  const callLeads = Math.round(dailyBookedLeads * daysPerWeek * 4 * callerCount);
  const callDeals = Math.round((callLeads * closeRate) / 100);
  const callRevenue = callDeals * customerValue * 12 * YEAR_ONE_PRODUCTIVITY;
  
  // Use new package pricing
  const monthlyCallingCost = getColdCallingPackagePrice(callerCount);
  const annualCallingCost = monthlyCallingCost * 12;
  const callRoi = annualCallingCost > 0 ? ((callRevenue - annualCallingCost) / annualCallingCost) * 100 : 0;

  // Cold calling requires 2 SDRs per caller
  const requiredCallerSDRs = callerCount * 2;

  // Cold calling efficiency reduced by 50% for SDR model
  const sdrCallRevenue = callRevenue * 0.5;

  return {
    monthlyDialCount,
    callConnections,
    callLeads,
    callDeals,
    callRevenue,
    dailyConnections,
    dailyLeads,
    dailyBookedLeads,
    callBookedLeads: callLeads,
    monthlyCallingCost,
    annualCallingCost,
    callRoi,
    requiredCallerSDRs,
    sdrCallRevenue,
  };
};
