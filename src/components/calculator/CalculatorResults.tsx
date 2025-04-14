
import React from "react";
import { PerformanceMetrics } from "./PerformanceMetrics";
import { LinkedInPerformanceMetrics } from "./LinkedInPerformanceMetrics";
import { ColdCallingPerformanceMetrics } from "./ColdCallingPerformanceMetrics";
import { CombinedMetrics } from "./CombinedMetrics";
import { SDRMetrics } from "./SDRMetrics";
import { BeanstalkMetrics } from "./BeanstalkMetrics";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

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
  monthlyCallingCost?: number;
  annualCallingCost?: number;
  callRoi?: number;
  
  // Combined metrics
  totalLeads: number;
  totalDeals: number;
  totalRevenue: number;
  combinedRoi: number;
  
  // SDR metrics
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
  monthlyCallingCost = 0,
  annualCallingCost = 0,
  callRoi = 0,
  
  // Combined metrics
  totalLeads,
  totalDeals,
  totalRevenue,
  combinedRoi,
  
  // SDR metrics
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
      {/* Individual Channel Performance */}
      {includeEmail && (
        <PerformanceMetrics
          monthlyLeads={monthlyLeads}
          monthlyDeals={monthlyDeals}
          annualRevenue={emailRevenue}
        />
      )}

      {includeLinkedIn && (
        <LinkedInPerformanceMetrics
          linkedInLeads={linkedInLeads}
          linkedInDeals={linkedInDeals}
          linkedInRevenue={linkedInRevenue}
        />
      )}

      {includeColdCalling && (
        <ColdCallingPerformanceMetrics
          callLeads={callLeads}
          callDeals={callDeals}
          callRevenue={callRevenue}
          dailyConnections={dailyConnections}
          dailyLeads={dailyLeads}
          dailyBookedLeads={dailyBookedLeads}
          monthlyCallingCost={monthlyCallingCost}
          annualCallingCost={annualCallingCost}
          callRoi={callRoi}
        />
      )}

      {/* Performance Comparison Section */}
      <div className="mt-12 space-y-8">
        <h2 className="text-2xl font-semibold text-calculator-primary mb-6">
          Performance & Cost Comparison
        </h2>
        
        {/* Combined Performance First (without additional "Combined Channel Performance" label) */}
        {((includeEmail && includeLinkedIn) || 
          (includeEmail && includeColdCalling) || 
          (includeLinkedIn && includeColdCalling)) && (
          <div className="bg-slate-50 p-6 rounded-lg">
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
          </div>
        )}

        {/* Comparison Models */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* SDR Model */}
          <div className="bg-slate-50 p-6 rounded-lg">
            <h3 className="text-xl font-semibold text-calculator-primary mb-4">
              In-House SDR Model
            </h3>
            <SDRMetrics
              requiredSDRs={totalSDRs}
              annualSdrSalaryCost={annualSdrSalaryCost}
              sdrRoi={sdrRoi}
              includeLinkedIn={includeLinkedIn}
              includeColdCalling={includeColdCalling}
            />
          </div>

          {/* Beanstalk Model */}
          {includeEmail && (
            <div className="bg-slate-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-calculator-primary mb-4">
                Beanstalk Automated Approach
              </h3>
              <BeanstalkMetrics
                monthlyBeanstalkCost={monthlyBeanstalkCost}
                annualBeanstalkCost={annualBeanstalkCost}
                beanstalkRoi={beanstalkRoi}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
