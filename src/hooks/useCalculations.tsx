
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
  callConvertRate,
}: CalculationsProps) => {
  // Constants
  const EMAILS_PER_SDR_PER_MONTH = 250 * 22; // 250 emails per day * 22 working days
  const LINKEDIN_MESSAGES_PER_SDR_PER_MONTH = 22 * 22; // 22 messages per day * 22 working days
  const WORKING_DAYS_PER_MONTH = 22; // 22 working days per month

  // Email calculated values
  const monthlyProspects = includeEmail ? Math.round(emailCapacity / 2) : 0; // 2-step sequence
  const totalReplies = Math.round((monthlyProspects * replyRate) / 100);
  const monthlyLeads = Math.round(totalReplies * 0.2); // 20% of replies are positive
  const monthlyDeals = Math.round((monthlyLeads * convertRate * closeRate) / 10000);
  const emailRevenue = monthlyDeals * customerValue * 12;
  
  // LinkedIn calculated values
  // Total connection requests available based on profiles
  const totalLinkedInRequests = includeLinkedIn ? linkedInMessages * linkedInProfiles : 0;
  // First calculate direct replies to messages before connection
  const directReplies = Math.round((totalLinkedInRequests * linkedInMessageReplyRate) / 100);
  // Then calculate accepted connections
  const linkedInConnections = includeLinkedIn ? Math.round((totalLinkedInRequests * linkedInConnectRate) / 100) : 0;
  // Then calculate responses from those connections
  const linkedInResponses = Math.round((linkedInConnections * linkedInResponseRate) / 100);
  // Total responses are direct replies + connection responses
  const totalLinkedInResponses = directReplies + linkedInResponses;
  // Now calculate leads based on the reply to call conversion rate
  const linkedInLeads = Math.round((totalLinkedInResponses * linkedInReplyToCallRate) / 100);
  const linkedInDeals = Math.round((linkedInLeads * closeRate) / 100);
  const linkedInRevenue = linkedInDeals * customerValue * 12;

  // Cold calling calculated values - updated with new logic
  const dailyDials = 1000; // Constant value of 1000 dials per day per caller
  const daysPerWeek = isFullTimeDialer ? 5 : 3; // 5 days for full-time, 3 for part-time
  const workingDaysPerMonth = daysPerWeek * 4.4; // More accurately represent 22 working days per month
  
  // Calculate monthly dials
  const monthlyDialCount = includeColdCalling ? dailyDials * daysPerWeek * 4 * callerCount : 0;
  
  // Daily metrics for a single caller
  const dailyConnections = Math.round((dailyDials * connectRate) / 100); // 8-12% connect rate means 80-120 connects/day
  const dailyLeads = Math.round((dailyConnections * callConvertRate) / 100); // Warm leads (interested but not booked)
  
  // Daily booked leads is now fixed to be between 0-3
  // We'll display this as a fixed range in the UI
  const dailyBookedLeads = 3; // This is now just a display value showing the upper limit
  
  // Calculate monthly booked leads using a random approach
  // For each caller, randomly select between 1-3 booked meetings for each working day
  const randomizedMonthlyBookedLeads = () => {
    let totalBookings = 0;
    // For each caller
    for (let c = 0; c < callerCount; c++) {
      // For each working day in a month (based on full-time or part-time)
      const callerWorkingDays = daysPerWeek * 4; // 4 weeks per month
      for (let d = 0; d < callerWorkingDays; d++) {
        // Random number between 1 and 3
        const dailyBookings = Math.floor(Math.random() * 3) + 1;
        totalBookings += dailyBookings;
      }
    }
    return totalBookings;
  };
  
  // Monthly metrics for all callers
  const callConnections = Math.round((dailyDials * daysPerWeek * 4 * connectRate * callerCount) / 100);
  // Use our randomized function to calculate monthly booked leads
  const callLeads = includeColdCalling ? randomizedMonthlyBookedLeads() : 0;
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
    directReplies,
    linkedInConnections,
    linkedInResponses,
    totalLinkedInResponses,
    linkedInLeads,
    linkedInDeals,
    linkedInRevenue,
    
    // Cold calling metrics
    monthlyDialCount, // Renamed from dialCount to monthlyDialCount
    callConnections,
    callLeads,
    callDeals,
    callRevenue,
    dailyConnections,
    dailyLeads,
    dailyBookedLeads,
    callBookedLeads: callLeads,
    
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
