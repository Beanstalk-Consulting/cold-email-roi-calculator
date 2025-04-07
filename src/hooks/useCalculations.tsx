
import { getBeanstalkPrice } from "./useCalculatorState";

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
  linkedInResponseRate: number;
  linkedInConvertRate: number;
  linkedInConnectRate: number;
  linkedInProfiles: number;
  
  // Cold calling props
  includeColdCalling: boolean;
  isFullTimeDialer: boolean;
  callerCount: number;
  connectRate: number;
  callConvertRate: number;
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
  linkedInResponseRate,
  linkedInConvertRate,
  linkedInConnectRate,
  linkedInProfiles,
  
  // Cold calling props
  includeColdCalling,
  isFullTimeDialer,
  callerCount,
  connectRate,
  callConvertRate,
}: CalculationsProps) => {
  // Constants
  const EMAILS_PER_SDR_PER_MONTH = 250 * 22; // 250 emails per day * 22 working days
  const LINKEDIN_MESSAGES_PER_SDR_PER_MONTH = 22 * 22; // 22 messages per day * 22 working days

  // Email calculated values
  const monthlyProspects = includeEmail ? Math.round(emailCapacity / 2) : 0; // 2-step sequence
  const totalReplies = Math.round((monthlyProspects * replyRate) / 100);
  const monthlyLeads = Math.round(totalReplies * 0.2); // 20% of replies are positive
  const monthlyDeals = Math.round((monthlyLeads * convertRate * closeRate) / 10000);
  const emailRevenue = monthlyDeals * customerValue * 12;
  
  // LinkedIn calculated values
  // Total connection requests available based on profiles
  const totalLinkedInRequests = includeLinkedIn ? linkedInMessages * linkedInProfiles : 0;
  const linkedInConnections = includeLinkedIn ? Math.round((totalLinkedInRequests * linkedInConnectRate) / 100) : 0;
  const linkedInResponses = Math.round((linkedInConnections * linkedInResponseRate) / 100);
  const linkedInLeads = Math.round(linkedInResponses * 0.7); // 70% of responses are positive on LinkedIn
  const linkedInDeals = Math.round((linkedInLeads * linkedInConvertRate * closeRate) / 10000);
  const linkedInRevenue = linkedInDeals * customerValue * 12;

  // Cold calling calculated values
  const dailyDials = 1000; // Constant value of 1000 dials per day per caller
  const daysPerWeek = isFullTimeDialer ? 5 : 3; // 5 days for full-time, 3 for part-time
  const dialCount = includeColdCalling ? dailyDials * daysPerWeek * 4 * callerCount : 0; // 4 weeks in a month
  
  const callConnections = Math.round((dialCount * connectRate) / 100);
  const callLeads = Math.round((callConnections * callConvertRate) / 100);
  const callDeals = Math.round((callLeads * closeRate) / 100);
  const callRevenue = callDeals * customerValue * 12;
  
  // Calculate total values
  const totalLeads = monthlyLeads + (includeLinkedIn ? linkedInLeads : 0) + (includeColdCalling ? callLeads : 0);
  const totalDeals = monthlyDeals + (includeLinkedIn ? linkedInDeals : 0) + (includeColdCalling ? callDeals : 0);
  const totalRevenue = emailRevenue + (includeLinkedIn ? linkedInRevenue : 0) + (includeColdCalling ? callRevenue : 0);
  
  // SDR calculations for email
  const requiredEmailSDRs = includeEmail ? Math.ceil(emailCapacity / EMAILS_PER_SDR_PER_MONTH) : 0;
  
  // SDR calculations for LinkedIn - based on profiles
  const requiredLinkedInSDRs = includeLinkedIn ? linkedInProfiles : 0;
  
  // SDR calculations for cold calling
  const requiredCallSDRs = includeColdCalling ? callerCount : 0;
  
  // Total SDR requirement and cost
  const totalSDRs = requiredEmailSDRs + requiredLinkedInSDRs + requiredCallSDRs;
  const annualSdrSalaryCost = totalSDRs * 82470; // Average SDR salary
  const sdrRoi = totalSDRs > 0 ? ((totalRevenue - annualSdrSalaryCost) / annualSdrSalaryCost) * 100 : 0;

  // Beanstalk calculations
  const monthlyEmailPrice = getBeanstalkPrice(emailCapacity);
  const monthlyBeanstalkCost = includeEmail ? emailCapacity * monthlyEmailPrice : 0;
  const annualBeanstalkCost = monthlyBeanstalkCost * 12;
  const beanstalkRoi = annualBeanstalkCost > 0 ? ((emailRevenue - annualBeanstalkCost) / annualBeanstalkCost) * 100 : 0;

  // Combined ROI for all channels using Beanstalk for email automation
  const combinedCost = annualBeanstalkCost + (requiredLinkedInSDRs + requiredCallSDRs) * 82470;
  const combinedRoi = combinedCost > 0 ? ((totalRevenue - combinedCost) / combinedCost) * 100 : 0;

  return {
    // Email metrics
    monthlyProspects,
    totalReplies,
    monthlyLeads,
    monthlyDeals,
    emailRevenue,
    
    // LinkedIn metrics
    linkedInConnections,
    linkedInResponses,
    linkedInLeads,
    linkedInDeals,
    linkedInRevenue,
    
    // Cold calling metrics
    dialCount,
    callConnections,
    callLeads,
    callDeals,
    callRevenue,
    
    // Combined metrics
    totalLeads,
    totalDeals,
    totalRevenue,
    
    // SDR metrics
    requiredEmailSDRs,
    requiredLinkedInSDRs,
    requiredCallSDRs,
    totalSDRs,
    annualSdrSalaryCost,
    sdrRoi,
    
    // Beanstalk metrics
    monthlyEmailPrice,
    monthlyBeanstalkCost,
    annualBeanstalkCost,
    beanstalkRoi,
    
    // Combined ROI
    combinedCost,
    combinedRoi,
  };
};
