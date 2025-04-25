
import { getBeanstalkPrice, getLinkedInPrice } from "./useCalculatorState";
import { CalculationContextProps } from "./calculationTypes";

interface CalculationsProps {
  // Global settings
  closeRate: number;
  customerValue: number;
  
  // Email props
  includeEmail: boolean;
  emailCapacity: number;
  replyRate: number;
  convertRate: number;
  
  // LinkedIn props
  includeLinkedIn: boolean;
  linkedInMessages: number;
  linkedInMessageReplyRate: number;
  linkedInResponseRate: number;
  linkedInReplyToCallRate: number;
  linkedInConnectRate: number;
  linkedInProfiles: number;
  
  // Cold calling props
  includeColdCalling: boolean;
  isFullTimeDialer: boolean;
  callerCount: number;
  connectRate: number;
}

export const useCalculations = ({
  // Global settings
  closeRate,
  customerValue,
  
  // Email props
  includeEmail,
  emailCapacity,
  replyRate,
  convertRate,
  
  // LinkedIn props
  includeLinkedIn,
  linkedInMessages,
  linkedInMessageReplyRate,
  linkedInResponseRate,
  linkedInReplyToCallRate,
  linkedInConnectRate,
  linkedInProfiles,
  
  // Cold calling props
  includeColdCalling,
  isFullTimeDialer,
  callerCount,
  connectRate,
}: CalculationsProps): CalculationContextProps => {
  // Constants
  const EMAILS_PER_DAY_PER_SDR = 125; // Reduced from 250 to 125 emails per day
  const LINKEDIN_MESSAGES_PER_DAY_PER_SDR = 11; // Reduced from 22 to 11 messages per day
  const WORKING_DAYS_PER_MONTH = 15; // Updated from 22 to 15 working days
  const SDR_ANNUAL_SALARY = 82470;
  
  // Year one productivity handicap - approximately 89% based on ramp calculation
  const YEAR_ONE_PRODUCTIVITY = 0.89;

  // Email calculated values
  const monthlyProspects = includeEmail ? Math.round(emailCapacity / 2) : 0;
  const totalReplies = Math.round((monthlyProspects * replyRate) / 100);
  const monthlyLeads = Math.round(totalReplies * 0.2);
  const monthlyDeals = Math.round((monthlyLeads * convertRate * closeRate) / 10000);
  // Apply year one productivity handicap to annual revenue
  const emailRevenue = monthlyDeals * customerValue * 12 * YEAR_ONE_PRODUCTIVITY;
  
  // LinkedIn calculated values
  const totalLinkedInRequests = includeLinkedIn ? linkedInMessages : 0;
  const monthlyLinkedInCost = includeLinkedIn ? getLinkedInPrice(linkedInProfiles) : 0;
  const annualLinkedInCost = monthlyLinkedInCost * 12;
  
  // Calculate accepted connections first
  const linkedInConnections = Math.round((totalLinkedInRequests * linkedInConnectRate) / 100);
  
  // Calculate replies from accepted connections (based on message reply rate)
  const directReplies = Math.round((linkedInConnections * linkedInMessageReplyRate) / 100);
  
  // Calculate leads from connections (based on the Lead Generation Rate)
  const linkedInResponses = Math.round((linkedInConnections * linkedInResponseRate) / 100);
  
  // Total responses are direct replies + connection responses
  const totalLinkedInResponses = directReplies + linkedInResponses;
  
  // Now calculate leads based on the reply to call conversion rate
  const linkedInLeads = Math.round((totalLinkedInResponses * linkedInReplyToCallRate) / 100);
  const linkedInDeals = Math.round((linkedInLeads * closeRate) / 100);
  // Apply year one productivity handicap to annual revenue
  const linkedInRevenue = linkedInDeals * customerValue * 12 * YEAR_ONE_PRODUCTIVITY;
  const linkedInRoi = annualLinkedInCost > 0 ? ((linkedInRevenue - annualLinkedInCost) / annualLinkedInCost) * 100 : 0;

  // Cold calling calculated values
  const dailyDials = 1000; // Constant value of 1000 dials per day per caller
  const daysPerWeek = isFullTimeDialer ? 5 : 3; // 5 days for full-time, 3 for part-time
  const workingDaysPerMonth = daysPerWeek * 4.4; // More accurately represent 22 working days per month
  
  // Calculate monthly dials
  const monthlyDialCount = includeColdCalling ? dailyDials * daysPerWeek * 4 * callerCount : 0;
  
  // Daily metrics for a single caller
  const dailyConnections = Math.round((dailyDials * connectRate) / 100);
  const dailyLeads = Math.round((dailyConnections * 5) / 100);
  const dailyBookedLeads = Math.round((dailyConnections * 1.85) / 100);
  
  // Monthly metrics for all callers
  const callConnections = Math.round((dailyDials * daysPerWeek * 4 * connectRate * callerCount) / 100);
  
  const callLeads = includeColdCalling ? Math.round(dailyBookedLeads * daysPerWeek * 4 * callerCount) : 0;
  const callDeals = Math.round((callLeads * closeRate) / 100);
  // Apply year one productivity handicap to annual revenue
  const callRevenue = callDeals * customerValue * 12 * YEAR_ONE_PRODUCTIVITY;
  
  // Calculate calling costs
  const monthlyCallingCost = includeColdCalling ? callerCount * (isFullTimeDialer ? 4499 : 2999) : 0;
  const annualCallingCost = monthlyCallingCost * 12;
  const callRoi = annualCallingCost > 0 ? ((callRevenue - annualCallingCost) / annualCallingCost) * 100 : 0;

  // Calculate total values
  const totalLeads = monthlyLeads + (includeLinkedIn ? linkedInLeads : 0) + (includeColdCalling ? callLeads : 0);
  const totalDeals = monthlyDeals + (includeLinkedIn ? linkedInDeals : 0) + (includeColdCalling ? callDeals : 0);
  const totalRevenue = emailRevenue + (includeLinkedIn ? linkedInRevenue : 0) + (includeColdCalling ? callRevenue : 0);
  
  // Corrected SDR calculations based on accurate monthly capacities
  const EMAILS_PER_SDR_PER_MONTH = EMAILS_PER_DAY_PER_SDR * WORKING_DAYS_PER_MONTH; // 125 * 15 = 1875 emails per month
  const LINKEDIN_MESSAGES_PER_SDR_PER_MONTH = LINKEDIN_MESSAGES_PER_DAY_PER_SDR * WORKING_DAYS_PER_MONTH; // 11 * 15 = 165 messages per month
  
  // Calculate required capacity for each channel
  const requiredEmailSDRs = includeEmail ? Math.ceil(emailCapacity / EMAILS_PER_SDR_PER_MONTH) : 0;
  const requiredLinkedInSDRs = includeLinkedIn ? Math.ceil(linkedInMessages / LINKEDIN_MESSAGES_PER_SDR_PER_MONTH) : 0;
  const requiredCallerSDRs = includeColdCalling ? callerCount * 2 : 0; // Cold calling requires 2 SDRs per caller
  
  // Total SDRs should be at least the sum of each channel's requirements
  // This is because we're modeling SDRs who are dedicated to specific channels
  // not SDRs who are splitting time between channels
  const totalSDRs = Math.ceil(requiredEmailSDRs + requiredLinkedInSDRs + requiredCallerSDRs);
  
  const annualSdrSalaryCost = totalSDRs * SDR_ANNUAL_SALARY;
  
  // Calculate SDR ROI using updated performance metrics
  const sdrEmailRevenue = includeEmail ? emailRevenue : 0; // Email efficiency stays at 100%
  const sdrLinkedInRevenue = includeLinkedIn ? linkedInRevenue * 0.5 : 0; // 50% efficiency for LinkedIn
  const sdrCallRevenue = includeColdCalling ? callRevenue * 0.5 : 0; // 50% efficiency for cold calling
  
  const sdrTotalRevenue = sdrEmailRevenue + sdrLinkedInRevenue + sdrCallRevenue;
  
  const sdrRoi = annualSdrSalaryCost > 0 ? ((sdrTotalRevenue - annualSdrSalaryCost) / annualSdrSalaryCost) * 100 : 0;

  // Beanstalk calculations
  const monthlyEmailPrice = getBeanstalkPrice(emailCapacity);
  const monthlyBeanstalkCost = (includeEmail ? emailCapacity * monthlyEmailPrice : 0) + 
                               (includeColdCalling ? monthlyCallingCost : 0) + 
                               (includeLinkedIn ? monthlyLinkedInCost : 0);
                               
  // Calculate active channel count and discount
  const activeChannelCount = [includeEmail, includeLinkedIn, includeColdCalling].filter(Boolean).length;
  const discountRate = activeChannelCount === 3 ? 0.25 : (activeChannelCount === 2 ? 0.15 : 0);
  
  // Apply discount to monthly cost
  const discountedMonthlyBeanstalkCost = monthlyBeanstalkCost * (1 - discountRate);
  const annualBeanstalkCost = discountedMonthlyBeanstalkCost * 12;
  const beanstalkRoi = annualBeanstalkCost > 0 ? ((totalRevenue - annualBeanstalkCost) / annualBeanstalkCost) * 100 : 0;

  // Calculate combined cost
  const combinedCost = annualBeanstalkCost + annualSdrSalaryCost;
  const combinedRoi = combinedCost > 0 ? ((totalRevenue - combinedCost) / combinedCost) * 100 : 0;

  return {
    // Email metrics
    monthlyProspects,
    totalReplies,
    monthlyLeads,
    monthlyDeals,
    emailRevenue,
    
    // LinkedIn metrics with costs
    directReplies,
    linkedInConnections,
    linkedInResponses,
    totalLinkedInResponses,
    linkedInLeads,
    linkedInDeals,
    linkedInRevenue,
    monthlyLinkedInCost,
    annualLinkedInCost,
    linkedInRoi,
    
    // Cold calling metrics with costs
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
    
    // Combined metrics
    totalLeads,
    totalDeals,
    totalRevenue,
    
    // Updated SDR metrics with proper calculation
    totalSDRs,
    annualSdrSalaryCost,
    sdrRoi,
    
    // Beanstalk metrics - updated
    monthlyEmailPrice,
    monthlyBeanstalkCost,
    discountedMonthlyBeanstalkCost,
    annualBeanstalkCost,
    beanstalkRoi,
    activeChannelCount,
    
    // Combined ROI
    combinedCost,
    combinedRoi,
  };
};
