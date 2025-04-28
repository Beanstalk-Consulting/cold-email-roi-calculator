
import { getLinkedInPrice } from "../hooks/useCalculatorState";

// Constants
const LINKEDIN_MESSAGES_PER_DAY_PER_SDR = 11;
const WORKING_DAYS_PER_MONTH = 15;
const YEAR_ONE_PRODUCTIVITY = 0.89;

interface LinkedInCalculationProps {
  includeLinkedIn: boolean;
  linkedInMessages: number;
  linkedInMessageReplyRate: number;
  linkedInResponseRate: number;
  linkedInReplyToCallRate: number;
  linkedInConnectRate: number;
  linkedInProfiles: number;
  closeRate: number;
  customerValue: number;
}

export const calculateLinkedInMetrics = ({
  includeLinkedIn,
  linkedInMessages,
  linkedInMessageReplyRate,
  linkedInResponseRate,
  linkedInReplyToCallRate,
  linkedInConnectRate,
  linkedInProfiles,
  closeRate,
  customerValue,
}: LinkedInCalculationProps) => {
  if (!includeLinkedIn) {
    return {
      directReplies: 0,
      linkedInConnections: 0,
      linkedInResponses: 0,
      totalLinkedInResponses: 0,
      linkedInLeads: 0,
      linkedInDeals: 0,
      linkedInRevenue: 0,
      monthlyLinkedInCost: 0,
      annualLinkedInCost: 0,
      linkedInRoi: 0,
      requiredLinkedInSDRs: 0,
      sdrLinkedInRevenue: 0,
    };
  }

  const monthlyLinkedInCost = getLinkedInPrice(linkedInProfiles);
  const annualLinkedInCost = monthlyLinkedInCost * 12;

  // Calculate accepted connections first
  const linkedInConnections = Math.round((linkedInMessages * linkedInConnectRate) / 100);
  
  // Calculate replies from accepted connections
  const directReplies = Math.round((linkedInConnections * linkedInMessageReplyRate) / 100);
  
  // Calculate leads from connections
  const linkedInResponses = Math.round((linkedInConnections * linkedInResponseRate) / 100);
  
  // Total responses are direct replies + connection responses
  const totalLinkedInResponses = directReplies + linkedInResponses;
  
  // Calculate leads and deals
  const linkedInLeads = Math.round((totalLinkedInResponses * linkedInReplyToCallRate) / 100);
  const linkedInDeals = Math.round((linkedInLeads * closeRate) / 100);
  const linkedInRevenue = linkedInDeals * customerValue * 12 * YEAR_ONE_PRODUCTIVITY;
  
  const linkedInRoi = annualLinkedInCost > 0 ? ((linkedInRevenue - annualLinkedInCost) / annualLinkedInCost) * 100 : 0;

  // Calculate required SDRs for LinkedIn
  const LINKEDIN_MESSAGES_PER_SDR_PER_MONTH = LINKEDIN_MESSAGES_PER_DAY_PER_SDR * WORKING_DAYS_PER_MONTH;
  const requiredLinkedInSDRs = Math.ceil(linkedInMessages / LINKEDIN_MESSAGES_PER_SDR_PER_MONTH);

  // LinkedIn efficiency reduced by 50% for SDR model
  const sdrLinkedInRevenue = linkedInRevenue * 0.5;

  return {
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
    requiredLinkedInSDRs,
    sdrLinkedInRevenue,
  };
};

