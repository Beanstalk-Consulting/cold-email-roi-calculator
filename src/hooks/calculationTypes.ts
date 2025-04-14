
export interface CalculationContextProps {
  // Email metrics
  monthlyProspects: number;
  totalReplies: number;
  monthlyLeads: number;
  monthlyDeals: number;
  emailRevenue: number;
  
  // LinkedIn metrics
  directReplies: number;
  linkedInConnections: number;
  linkedInResponses: number;
  totalLinkedInResponses: number;
  linkedInLeads: number;
  linkedInDeals: number;
  linkedInRevenue: number;
  monthlyLinkedInCost: number;
  annualLinkedInCost: number;
  linkedInRoi: number;
  
  // Cold calling metrics
  monthlyDialCount: number;
  callConnections: number;
  callLeads: number;
  callDeals: number;
  callRevenue: number;
  dailyConnections: number;
  dailyLeads: number;
  dailyBookedLeads: number;
  callBookedLeads: number;
  monthlyCallingCost: number;
  annualCallingCost: number;
  callRoi: number;
  
  // Combined metrics
  totalLeads: number;
  totalDeals: number;
  totalRevenue: number;
  
  // SDR metrics
  totalSDRs: number;
  annualSdrSalaryCost: number;
  sdrRoi: number;
  
  // Beanstalk metrics
  monthlyEmailPrice: number;
  monthlyBeanstalkCost: number;
  discountedMonthlyBeanstalkCost: number;
  annualBeanstalkCost: number;
  beanstalkRoi: number;
  activeChannelCount: number;
  
  // Combined ROI
  combinedCost: number;
  combinedRoi: number;
}
