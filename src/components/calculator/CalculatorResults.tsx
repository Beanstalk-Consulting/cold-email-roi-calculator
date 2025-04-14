import React from "react";
import { PerformanceMetrics } from "./PerformanceMetrics";
import { LinkedInPerformanceMetrics } from "./LinkedInPerformanceMetrics";
import { ColdCallingPerformanceMetrics } from "./ColdCallingPerformanceMetrics";
import { CombinedMetrics } from "./CombinedMetrics";
import { SDRMetrics } from "./SDRMetrics";
import { BeanstalkMetrics } from "./BeanstalkMetrics";

interface CalculatorResultsProps {
  // Control flags
  includeEmail: boolean;
  includeLinkedIn: boolean;
  includeColdCalling: boolean;
  
  // Email metrics
  monthlyLeads: number;
  monthlyDeals: number;
  emailRevenue: number;
  
  // LinkedIn metrics
  linkedInLeads: number;
  linkedInDeals: number;
  linkedInRevenue: number;
  
  // Cold calling metrics
  callLeads: number;
  callDeals: number;
  callRevenue: number;
  dailyConnections?: number;
  dailyLeads?: number;
  dailyBookedLeads?: number;
  
  // Combined metrics
  totalLeads: number;
  totalDeals: number;
  totalRevenue: number;
  combinedRoi: number;
  
  // SDR metrics
  requiredEmailSDRs: number;
  requiredLinkedInSDRs: number;
  requiredCallSDRs: number;
  totalSDRs: number;
  annualSdrSalaryCost: number;
  sdrRoi: number;
  
  // Beanstalk metrics
  monthlyBeanstalkCost: number;
  annualBeanstalkCost: number;
  beanstalkRoi: number;
}

export const CalculatorResults = ({
  // Control flags
  includeEmail,
  includeLinkedIn,
  includeColdCalling,
  
  // Email metrics
  monthlyLeads,
  monthlyDeals,
  emailRevenue,
  
  // LinkedIn metrics
  linkedInLeads,
  linkedInDeals,
  linkedInRevenue,
  
  // Cold calling metrics
  callLeads,
  callDeals,
  callRevenue,
  dailyConnections = 0,
  dailyLeads = 0,
  dailyBookedLeads = 0,
  
  // Combined metrics
  totalLeads,
  totalDeals,
  totalRevenue,
  combinedRoi,
  
  // SDR metrics
  requiredEmailSDRs,
  requiredLinkedInSDRs,
  requiredCallSDRs,
  totalSDRs,
  annualSdrSalaryCost,
  sdrRoi,
  
  // Beanstalk metrics
  monthlyBeanstalkCost,
  annualBeanstalkCost,
  beanstalkRoi,
}: CalculatorResultsProps) => {
  return (
    <div className="space-y-8">
      {/* Email Performance */}
      {includeEmail && (
        <PerformanceMetrics
          monthlyLeads={monthlyLeads}
          monthlyDeals={monthlyDeals}
          annualRevenue={emailRevenue}
        />
      )}

      {/* LinkedIn Performance (if included) */}
      {includeLinkedIn && (
        <LinkedInPerformanceMetrics
          linkedInLeads={linkedInLeads}
          linkedInDeals={linkedInDeals}
          linkedInRevenue={linkedInRevenue}
        />
      )}

      {/* Cold Calling Performance (if included) */}
      {includeColdCalling && (
        <ColdCallingPerformanceMetrics
          callLeads={callLeads}
          callDeals={callDeals}
          callRevenue={callRevenue}
          dailyConnections={dailyConnections}
          dailyLeads={dailyLeads}
          dailyBookedLeads={dailyBookedLeads}
        />
      )}

      {/* Combined Performance (if more than one channel is used) */}
      {((includeEmail && includeLinkedIn) || 
        (includeEmail && includeColdCalling) || 
        (includeLinkedIn && includeColdCalling)) && (
        <CombinedMetrics
          totalLeads={totalLeads}
          totalDeals={totalDeals}
          totalRevenue={totalRevenue}
          includeEmail={includeEmail}
          emailRevenue={emailRevenue}
          includeLinkedIn={includeLinkedIn}
          linkedInRevenue={linkedInRevenue}
          includeColdCalling={includeColdCalling}
          callRevenue={callRevenue}
          combinedRoi={combinedRoi}
        />
      )}

      <SDRMetrics
        requiredSDRs={totalSDRs}
        annualSdrSalaryCost={annualSdrSalaryCost}
        sdrRoi={sdrRoi}
        requiredEmailSDRs={requiredEmailSDRs}
        requiredLinkedInSDRs={requiredLinkedInSDRs}
        requiredCallSDRs={requiredCallSDRs}
        includeLinkedIn={includeLinkedIn}
        includeColdCalling={includeColdCalling}
      />

      {includeEmail && (
        <BeanstalkMetrics
          monthlyBeanstalkCost={monthlyBeanstalkCost}
          annualBeanstalkCost={annualBeanstalkCost}
          beanstalkRoi={beanstalkRoi}
        />
      )}
    </div>
  );
};
