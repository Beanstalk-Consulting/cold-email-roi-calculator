
import { calculateEmailMetrics } from "../utils/emailCalculations";
import { calculateLinkedInMetrics } from "../utils/linkedInCalculations";
import { calculateColdCallingMetrics } from "../utils/coldCallingCalculations";
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

const SDR_ANNUAL_SALARY = 82470;

export const useCalculations = (props: CalculationsProps): CalculationContextProps => {
  // Calculate metrics for each channel
  const emailMetrics = calculateEmailMetrics({
    includeEmail: props.includeEmail,
    emailCapacity: props.emailCapacity,
    replyRate: props.replyRate,
    convertRate: props.convertRate,
    closeRate: props.closeRate,
    customerValue: props.customerValue,
  });

  const linkedInMetrics = calculateLinkedInMetrics({
    includeLinkedIn: props.includeLinkedIn,
    linkedInMessages: props.linkedInMessages,
    linkedInMessageReplyRate: props.linkedInMessageReplyRate,
    linkedInResponseRate: props.linkedInResponseRate,
    linkedInReplyToCallRate: props.linkedInReplyToCallRate,
    linkedInConnectRate: props.linkedInConnectRate,
    linkedInProfiles: props.linkedInProfiles,
    closeRate: props.closeRate,
    customerValue: props.customerValue,
  });

  const coldCallingMetrics = calculateColdCallingMetrics({
    includeColdCalling: props.includeColdCalling,
    isFullTimeDialer: props.isFullTimeDialer,
    callerCount: props.callerCount,
    connectRate: props.connectRate,
    closeRate: props.closeRate,
    customerValue: props.customerValue,
  });

  // Calculate total metrics
  const totalLeads = emailMetrics.monthlyLeads + linkedInMetrics.linkedInLeads + coldCallingMetrics.callLeads;
  const totalDeals = emailMetrics.monthlyDeals + linkedInMetrics.linkedInDeals + coldCallingMetrics.callDeals;
  const totalRevenue = emailMetrics.emailRevenue + linkedInMetrics.linkedInRevenue + coldCallingMetrics.callRevenue;

  // Calculate total SDR requirements and costs
  const totalSDRs = emailMetrics.requiredEmailSDRs + linkedInMetrics.requiredLinkedInSDRs + coldCallingMetrics.requiredCallerSDRs;
  const annualSdrSalaryCost = totalSDRs * SDR_ANNUAL_SALARY;

  // Calculate total revenue for SDR model with channel-specific efficiencies
  const sdrTotalRevenue = emailMetrics.sdrEmailRevenue + linkedInMetrics.sdrLinkedInRevenue + coldCallingMetrics.sdrCallRevenue;
  const sdrRoi = annualSdrSalaryCost > 0 ? ((sdrTotalRevenue - annualSdrSalaryCost) / annualSdrSalaryCost) * 100 : 0;

  // Calculate Beanstalk metrics
  const monthlyEmailPrice = props.includeEmail ? getBeanstalkPrice(props.emailCapacity) : 0;
  const monthlyBeanstalkCost = (props.includeEmail ? props.emailCapacity * monthlyEmailPrice : 0) + 
                               (props.includeColdCalling ? coldCallingMetrics.monthlyCallingCost : 0) + 
                               (props.includeLinkedIn ? linkedInMetrics.monthlyLinkedInCost : 0);

  const activeChannelCount = [props.includeEmail, props.includeLinkedIn, props.includeColdCalling].filter(Boolean).length;
  const discountRate = activeChannelCount === 3 ? 0.25 : (activeChannelCount === 2 ? 0.15 : 0);
  
  const discountedMonthlyBeanstalkCost = monthlyBeanstalkCost * (1 - discountRate);
  const annualBeanstalkCost = discountedMonthlyBeanstalkCost * 12;
  const beanstalkRoi = annualBeanstalkCost > 0 ? ((totalRevenue - annualBeanstalkCost) / annualBeanstalkCost) * 100 : 0;

  // Calculate combined metrics
  const combinedCost = annualBeanstalkCost + annualSdrSalaryCost;
  const combinedRoi = combinedCost > 0 ? ((totalRevenue - combinedCost) / combinedCost) * 100 : 0;

  return {
    ...emailMetrics,
    ...linkedInMetrics,
    ...coldCallingMetrics,
    totalLeads,
    totalDeals,
    totalRevenue,
    totalSDRs,
    annualSdrSalaryCost,
    sdrRoi,
    monthlyEmailPrice,
    monthlyBeanstalkCost,
    discountedMonthlyBeanstalkCost,
    annualBeanstalkCost,
    beanstalkRoi,
    activeChannelCount,
    combinedCost,
    combinedRoi,
  };
};
