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
  const EMAILS_PER_SDR_PER_MONTH = 250 * 22; // 250 emails per day * 22 working days
  const LINKEDIN_MESSAGES_PER_SDR_PER_MONTH = 22 * 22; // 22 messages per day * 22 working days
  const WORKING_DAYS_PER_MONTH = 22; // 22 working days per month
  const SDR_ANNUAL_SALARY = 82470; // Average SDR salary

  // Email calculated values
  const monthlyProspects = includeEmail ? Math.round(emailCapacity / 2) : 0;
  const totalReplies = Math.round((monthlyProspects * replyRate) / 100);
  const monthlyLeads = Math.round(totalReplies * 0.2);
  const monthlyDeals = Math.round((monthlyLeads * convertRate * closeRate) / 10000);
  // Apply ramp to email deals only
  const rampedEmailDeals = applyRampToDeals(monthlyDeals);
  const emailRevenue = rampedEmailDeals * customerValue * 12;
  
  // LinkedIn calculated values
  const totalLinkedInRequests = includeLinkedIn ? linkedInMessages : 0;
  const monthlyLinkedInCost = includeLinkedIn ? getLinkedInPrice(linkedInProfiles) : 0;
  const annualLinkedInCost = monthlyLinkedInCost * 12;
  
  // Calculate direct replies to connection requests before acceptance
  const directReplies = Math.round((totalLinkedInRequests * linkedInMessageReplyRate) / 100);
  
  // Calculate accepted connections
  const linkedInConnections = Math.round((totalLinkedInRequests * linkedInConnectRate) / 100);
  
  // Calculate leads from connections (based on the renamed "Lead Generation Rate")
  const linkedInResponses = Math.round((linkedInConnections * linkedInResponseRate) / 100);
  
  // Total responses are direct replies + connection responses
  const totalLinkedInResponses = directReplies + linkedInResponses;
  
  // Now calculate leads based on the reply to call conversion rate
  const linkedInLeads = totalLinkedInResponses;
  const linkedInDeals = Math.round((linkedInLeads * closeRate) / 100);
  // Apply ramp to LinkedIn deals only
  const rampedLinkedInDeals = applyRampToDeals(linkedInDeals);
  const linkedInRevenue = rampedLinkedInDeals * customerValue * 12;
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
  // Apply ramp to cold calling deals only
  const rampedCallDeals = applyRampToDeals(callDeals);
  const callRevenue = rampedCallDeals * customerValue * 12;
  
  // Calculate calling costs
  const monthlyCallingCost = includeColdCalling ? callerCount * (isFullTimeDialer ? 4499 : 2999) : 0;
  const annualCallingCost = monthlyCallingCost * 12;
  const callRoi = annualCallingCost > 0 ? ((callRevenue - annualCallingCost) / annualCallingCost) * 100 : 0;

  // Calculate total values with ramped deals
  const totalLeads = monthlyLeads + (includeLinkedIn ? linkedInLeads : 0) + (includeColdCalling ? callLeads : 0);
  const totalRampedDeals = rampedEmailDeals + 
                          (includeLinkedIn ? rampedLinkedInDeals : 0) + 
                          (includeColdCalling ? rampedCallDeals : 0);
  const totalRevenue = totalRampedDeals * customerValue * 12;
  
  // SDR calculations with ramped deals
  const requiredEmailCapacity = includeEmail ? Math.ceil(emailCapacity / EMAILS_PER_SDR_PER_MONTH) : 0;
  const requiredLinkedInCapacity = includeLinkedIn ? Math.ceil(linkedInMessages / LINKEDIN_MESSAGES_PER_SDR_PER_MONTH) : 0;
  const requiredCallCapacity = includeColdCalling ? callerCount : 0;
  
  const totalSDRs = Math.max(requiredEmailCapacity, requiredLinkedInCapacity, requiredCallCapacity);
  const annualSdrSalaryCost = totalSDRs * SDR_ANNUAL_SALARY;
  
  // Calculate SDR ROI using ramped deals
  const sdrRevenue = totalRampedDeals * customerValue * 12;
  const sdrRoi = totalSDRs > 0 ? ((sdrRevenue - annualSdrSalaryCost) / annualSdrSalaryCost) * 100 : 0;

  // Beanstalk calculations
  const monthlyEmailPrice = getBeanstalkPrice(emailCapacity);
  const monthlyBeanstalkCost = (includeEmail ? emailCapacity * monthlyEmailPrice : 0) + 
                               (includeColdCalling ? monthlyCallingCost : 0) + 
                               (includeLinkedIn ? monthlyLinkedInCost : 0);
  const annualBeanstalkCost = monthlyBeanstalkCost * 12;
  const beanstalkRoi = annualBeanstalkCost > 0 ? ((totalRevenue - annualBeanstalkCost) / annualBeanstalkCost) * 100 : 0;

  const combinedCost = annualBeanstalkCost + annualSdrSalaryCost;
  const combinedRoi = combinedCost > 0 ? ((totalRevenue - combinedCost) / combinedCost) * 100 : 0;

  // Helper function to apply ramp to monthly deals
  function applyRampToDeals(monthlyDeals: number): number {
    const rampSchedule = [
      0.275, // Month 1: 27.5% (middle of 25-30%)
      0.55,  // Month 2: 55% (middle of 50-60%)
      0.80,  // Month 3: 80% (middle of 75-85%)
      0.95,  // Month 4: 95% (middle of 90-100%)
      1.0,   // Month 5: 100%
      1.0,   // Month 6: 100%
      1.0,   // Months 7-12: 100%
      1.0,
      1.0,
      1.0,
      1.0,
      1.0
    ];
    
    // Calculate average monthly deals accounting for ramp
    const totalRampedDeals = rampSchedule.reduce((sum, rampPercentage) => 
      sum + (monthlyDeals * rampPercentage), 0
    );
    
    return Math.round(totalRampedDeals / 12); // Return average monthly deals after ramp
  }

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
    
    // Updated SDR metrics - we're not returning individual channel SDR counts anymore
    totalSDRs,
    annualSdrSalaryCost,
    sdrRoi,
    
    // Beanstalk metrics - updated
    monthlyEmailPrice,
    monthlyBeanstalkCost,
    annualBeanstalkCost,
    beanstalkRoi,
    
    // Combined ROI
    combinedCost,
    combinedRoi,
  };
};
