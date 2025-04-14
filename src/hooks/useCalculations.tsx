
import { getBeanstalkPrice } from "./useCalculatorState";
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
  const monthlyProspects = includeEmail ? Math.round(emailCapacity / 2) : 0; // 2-step sequence
  const totalReplies = Math.round((monthlyProspects * replyRate) / 100);
  const monthlyLeads = Math.round(totalReplies * 0.2); // 20% of replies are positive
  const monthlyDeals = Math.round((monthlyLeads * convertRate * closeRate) / 10000);
  const emailRevenue = calculateRampedRevenue(monthlyDeals, customerValue);
  
  // LinkedIn calculated values
  const totalLinkedInRequests = includeLinkedIn ? linkedInMessages : 0;
  
  // Calculate direct replies to connection requests before acceptance
  const directReplies = Math.round((totalLinkedInRequests * linkedInMessageReplyRate) / 100);
  
  // Calculate accepted connections
  const linkedInConnections = Math.round((totalLinkedInRequests * linkedInConnectRate) / 100);
  
  // Calculate leads from connections (based on the renamed "Lead Generation Rate")
  const linkedInResponses = Math.round((linkedInConnections * linkedInResponseRate) / 100);
  
  // Total responses are direct replies + connection responses
  const totalLinkedInResponses = directReplies + linkedInResponses;
  
  // Now calculate leads based on the reply to call conversion rate
  const linkedInLeads = totalLinkedInResponses; // All responses are now considered leads
  
  // Calculate deals from leads
  const linkedInDeals = Math.round((linkedInLeads * closeRate) / 100);
  
  // Calculate annual revenue from LinkedIn deals
  const linkedInRevenue = calculateRampedRevenue(linkedInDeals, customerValue);

  // Cold calling calculated values - updated with new logic
  const dailyDials = 1000; // Constant value of 1000 dials per day per caller
  const daysPerWeek = isFullTimeDialer ? 5 : 3; // 5 days for full-time, 3 for part-time
  const workingDaysPerMonth = daysPerWeek * 4.4; // More accurately represent 22 working days per month
  
  // Calculate monthly dials
  const monthlyDialCount = includeColdCalling ? dailyDials * daysPerWeek * 4 * callerCount : 0;
  
  // Daily metrics for a single caller
  const dailyConnections = Math.round((dailyDials * connectRate) / 100); // 8-12% connect rate means 80-120 connects/day
  const dailyLeads = Math.round((dailyConnections * 5) / 100); // Warm leads based on daily connections * 5%
  
  // Update daily booked leads calculation to be based on daily connections * 1.85%
  const dailyBookedLeads = Math.round((dailyConnections * 1.85) / 100);
  
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
  const callRevenue = calculateRampedRevenue(callDeals, customerValue);
  
  // Calculate total values
  const totalLeads = monthlyLeads + (includeLinkedIn ? linkedInLeads : 0) + (includeColdCalling ? callLeads : 0);
  const totalDeals = monthlyDeals + (includeLinkedIn ? linkedInDeals : 0) + (includeColdCalling ? callDeals : 0);
  const totalRevenue = emailRevenue + (includeLinkedIn ? linkedInRevenue : 0) + (includeColdCalling ? callRevenue : 0);
  
  // SDR calculations for email - based on required capacity
  const requiredEmailSDRs = includeEmail ? Math.ceil(emailCapacity / EMAILS_PER_SDR_PER_MONTH) : 0;
  
  // SDR calculations for LinkedIn - based on profiles
  // Each SDR can handle approximately LINKEDIN_MESSAGES_PER_SDR_PER_MONTH per month
  const requiredLinkedInSDRsCapacity = includeLinkedIn ? 
    Math.ceil(linkedInMessages / LINKEDIN_MESSAGES_PER_SDR_PER_MONTH) : 0;
  
  // Use the higher of profile count or capacity-based calculation
  const requiredLinkedInSDRs = includeLinkedIn ? 
    Math.max(linkedInProfiles, requiredLinkedInSDRsCapacity) : 0;
  
  // SDR calculations for cold calling
  const requiredCallSDRs = includeColdCalling ? callerCount : 0;
  
  // Total SDR requirement and cost
  const totalSDRs = requiredEmailSDRs + requiredLinkedInSDRs + requiredCallSDRs;
  const annualSdrSalaryCost = totalSDRs * SDR_ANNUAL_SALARY;
  const sdrRoi = totalSDRs > 0 ? ((totalRevenue - annualSdrSalaryCost) / annualSdrSalaryCost) * 100 : 0;

  // Beanstalk calculations
  const monthlyEmailPrice = getBeanstalkPrice(emailCapacity);
  const monthlyBeanstalkCost = includeEmail ? emailCapacity * monthlyEmailPrice : 0;
  const annualBeanstalkCost = monthlyBeanstalkCost * 12;
  const beanstalkRoi = annualBeanstalkCost > 0 ? ((emailRevenue - annualBeanstalkCost) / annualBeanstalkCost) * 100 : 0;

  // Combined ROI for all channels using Beanstalk for email automation
  const combinedCost = annualBeanstalkCost + (requiredLinkedInSDRs + requiredCallSDRs) * SDR_ANNUAL_SALARY;
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
    monthlyDialCount,
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

const calculateRampedRevenue = (monthlyDeals: number, customerValue: number) => {
  // Ramp percentages for months 1-12
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
  
  // Calculate revenue for each month based on ramp schedule
  const monthlyRevenue = rampSchedule.map(rampPercentage => 
    Math.round(monthlyDeals * customerValue * rampPercentage)
  );
  
  // Sum up the annual revenue
  return monthlyRevenue.reduce((sum, rev) => sum + rev, 0);
};
