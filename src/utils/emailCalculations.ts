
// Constants
const EMAILS_PER_DAY_PER_SDR = 125;
const WORKING_DAYS_PER_MONTH = 15;
const YEAR_ONE_PRODUCTIVITY = 0.89;

interface EmailCalculationProps {
  includeEmail: boolean;
  emailCapacity: number;
  replyRate: number;
  convertRate: number;
  closeRate: number;
  customerValue: number;
}

export const calculateEmailMetrics = ({
  includeEmail,
  emailCapacity,
  replyRate,
  convertRate,
  closeRate,
  customerValue,
}: EmailCalculationProps) => {
  if (!includeEmail) {
    return {
      monthlyProspects: 0,
      totalReplies: 0,
      monthlyLeads: 0,
      monthlyDeals: 0,
      emailRevenue: 0,
      requiredEmailSDRs: 0,
      sdrEmailRevenue: 0,
    };
  }

  const monthlyProspects = Math.round(emailCapacity / 2);
  const totalReplies = Math.round((monthlyProspects * replyRate) / 100);
  const monthlyLeads = Math.round(totalReplies * 0.2);
  const monthlyDeals = Math.round((monthlyLeads * convertRate * closeRate) / 10000);
  const emailRevenue = monthlyDeals * customerValue * 12 * YEAR_ONE_PRODUCTIVITY;

  // Calculate required SDRs for email
  const EMAILS_PER_SDR_PER_MONTH = EMAILS_PER_DAY_PER_SDR * WORKING_DAYS_PER_MONTH;
  const requiredEmailSDRs = Math.ceil(emailCapacity / EMAILS_PER_SDR_PER_MONTH);

  // Email efficiency stays at 100% for SDR model
  const sdrEmailRevenue = emailRevenue;

  return {
    monthlyProspects,
    totalReplies,
    monthlyLeads,
    monthlyDeals,
    emailRevenue,
    requiredEmailSDRs,
    sdrEmailRevenue,
  };
};

