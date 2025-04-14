
import React, { useState } from "react";
import { SDRMetrics } from "./SDRMetrics";
import { BeanstalkMetrics } from "./BeanstalkMetrics";
import { Button } from "@/components/ui/button";

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
  discountedMonthlyBeanstalkCost: number;
  annualBeanstalkCost: number;
  beanstalkRoi: number;
  activeChannelCount: number;
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
  discountedMonthlyBeanstalkCost,
  annualBeanstalkCost,
  beanstalkRoi,
  activeChannelCount,
}: CalculatorResultsProps) => {
  const [showSdrComparison, setShowSdrComparison] = useState(false);
  
  // Calculate sdrTotalRevenue without considering part-time/full-time distinction
  const sdrEmailRevenue = includeEmail ? emailRevenue : 0;
  const sdrLinkedInRevenue = includeLinkedIn ? linkedInRevenue * 0.5 : 0;
  const sdrCallRevenue = includeColdCalling ? callRevenue : 0;

  const sdrTotalRevenue = sdrEmailRevenue + sdrLinkedInRevenue + sdrCallRevenue;

  return (
    <div className="space-y-8">
      {/* Beanstalk Performance Summary - Always Visible */}
      <div className="bg-slate-50 p-6 rounded-lg border border-slate-200">
        <h2 className="text-2xl font-semibold text-calculator-primary mb-6">
          Beanstalk Performance Summary
        </h2>
        <BeanstalkMetrics
          monthlyBeanstalkCost={monthlyBeanstalkCost}
          discountedMonthlyBeanstalkCost={discountedMonthlyBeanstalkCost}
          annualBeanstalkCost={annualBeanstalkCost}
          beanstalkRoi={beanstalkRoi}
          totalLeads={totalLeads}
          totalDeals={totalDeals}
          totalRevenue={totalRevenue}
          activeChannelCount={activeChannelCount}
        />
      </div>

      <div className="flex justify-center">
        <Button 
          variant="outline"
          onClick={() => setShowSdrComparison(!showSdrComparison)}
          className="text-calculator-primary border-calculator-primary hover:bg-calculator-primary hover:text-white"
        >
          Compare To Cost Of Doing Outbound In-House
        </Button>
      </div>

      {showSdrComparison && (
        <div className="bg-slate-50 p-6 rounded-lg">
          <h3 className="text-xl font-semibold text-calculator-primary mb-4">
            In-House SDR Model
          </h3>
          <SDRMetrics
            requiredSDRs={totalSDRs}
            annualSdrSalaryCost={annualSdrSalaryCost}
            sdrRoi={sdrRoi}
            beanstalkRoi={beanstalkRoi}
            includeLinkedIn={includeLinkedIn}
            includeColdCalling={includeColdCalling}
            projectedRevenue={sdrTotalRevenue}
          />
        </div>
      )}
    </div>
  );
};
