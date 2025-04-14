import React from "react";
import { Card } from "@/components/ui/card";
import { GlobalSettings } from "./GlobalSettings";
import { CalculatorInputs } from "./CalculatorInputs";
import { LinkedInInputs } from "./LinkedInInputs";
import { ColdCallingInputs } from "./ColdCallingInputs";
import { CalculatorResults } from "./CalculatorResults";
import { CalculationContextProps } from "@/hooks/calculationTypes";

interface CalculatorContentProps {
  // Global settings
  closeRate: number;
  setCloseRate: (value: number) => void;
  customerValue: number;
  setCustomerValue: (value: number) => void;
  
  // Email outreach state
  includeEmail: boolean;
  setIncludeEmail: (value: boolean) => void;
  emailCapacity: number;
  setEmailCapacity: (value: number) => void;
  replyRate: number;
  setReplyRate: (value: number) => void;
  convertRate: number;
  setConvertRate: (value: number) => void;
  
  // LinkedIn outreach state
  includeLinkedIn: boolean;
  setIncludeLinkedIn: (value: boolean) => void;
  linkedInMessages: number;
  setLinkedInMessages: (value: number) => void;
  linkedInMessageReplyRate: number;
  setLinkedInMessageReplyRate: (value: number) => void;
  linkedInResponseRate: number;
  setLinkedInResponseRate: (value: number) => void;
  linkedInReplyToCallRate: number;
  setLinkedInReplyToCallRate: (value: number) => void;
  linkedInConnectRate: number;
  setLinkedInConnectRate: (value: number) => void;
  linkedInProfiles: number;
  setLinkedInProfiles: (value: number) => void;
  
  // Cold calling outreach state
  includeColdCalling: boolean;
  setIncludeColdCalling: (value: boolean) => void;
  isFullTimeDialer: boolean;
  setIsFullTimeDialer: (value: boolean) => void;
  callerCount: number;
  setCallerCount: (value: number) => void;
  connectRate: number;
  setConnectRate: (value: number) => void;
  
  // Calculation results
  calculations: CalculationContextProps;
}

export const CalculatorContent = ({
  // Global settings
  closeRate,
  setCloseRate,
  customerValue,
  setCustomerValue,
  
  // Email outreach state
  includeEmail,
  setIncludeEmail,
  emailCapacity,
  setEmailCapacity,
  replyRate,
  setReplyRate,
  convertRate,
  setConvertRate,
  
  // LinkedIn outreach state
  includeLinkedIn,
  setIncludeLinkedIn,
  linkedInMessages,
  setLinkedInMessages,
  linkedInMessageReplyRate,
  setLinkedInMessageReplyRate,
  linkedInResponseRate,
  setLinkedInResponseRate,
  linkedInReplyToCallRate,
  setLinkedInReplyToCallRate,
  linkedInConnectRate,
  setLinkedInConnectRate,
  linkedInProfiles,
  setLinkedInProfiles,
  
  // Cold calling outreach state
  includeColdCalling,
  setIncludeColdCalling,
  isFullTimeDialer,
  setIsFullTimeDialer,
  callerCount,
  setCallerCount,
  connectRate,
  setConnectRate,
  
  // Calculation results
  calculations,
}: CalculatorContentProps) => {
  const {
    monthlyProspects,
    monthlyLeads,
    monthlyDeals,
    emailRevenue,
    linkedInLeads,
    linkedInDeals,
    linkedInRevenue,
    monthlyDialCount,
    callLeads,
    callDeals,
    callRevenue,
    dailyConnections,
    dailyLeads,
    dailyBookedLeads,
    monthlyCallingCost,
    annualCallingCost,
    callRoi,
    totalLeads,
    totalDeals,
    totalRevenue,
    totalSDRs,
    annualSdrSalaryCost,
    sdrRoi,
    monthlyBeanstalkCost,
    annualBeanstalkCost,
    beanstalkRoi,
    combinedRoi,
  } = calculations;

  return (
    <div className="space-y-8">
      <Card className="p-6">
        <GlobalSettings 
          closeRate={closeRate}
          setCloseRate={setCloseRate}
          customerValue={customerValue}
          setCustomerValue={setCustomerValue}
        />

        <CalculatorInputs
          emailCapacity={emailCapacity}
          setEmailCapacity={setEmailCapacity}
          replyRate={replyRate}
          setReplyRate={setReplyRate}
          convertRate={convertRate}
          setConvertRate={setConvertRate}
          closeRate={closeRate}
          monthlyProspects={monthlyProspects}
          includeEmail={includeEmail}
          setIncludeEmail={setIncludeEmail}
        />
      </Card>

      <LinkedInInputs
        includeLinkedIn={includeLinkedIn}
        setIncludeLinkedIn={setIncludeLinkedIn}
        linkedInMessages={linkedInMessages}
        setLinkedInMessages={setLinkedInMessages}
        linkedInMessageReplyRate={linkedInMessageReplyRate}
        setLinkedInMessageReplyRate={setLinkedInMessageReplyRate}
        linkedInResponseRate={linkedInResponseRate}
        setLinkedInResponseRate={setLinkedInResponseRate}
        linkedInReplyToCallRate={linkedInReplyToCallRate}
        setLinkedInReplyToCallRate={setLinkedInReplyToCallRate}
        linkedInConnectRate={linkedInConnectRate}
        setLinkedInConnectRate={setLinkedInConnectRate}
        linkedInProfiles={linkedInProfiles}
        setLinkedInProfiles={setLinkedInProfiles}
        linkedInLeads={linkedInLeads}
        linkedInDeals={linkedInDeals}
        linkedInRevenue={linkedInRevenue}
      />

      <ColdCallingInputs
        includeColdCalling={includeColdCalling}
        setIncludeColdCalling={setIncludeColdCalling}
        dialCount={monthlyDialCount}
        connectRate={connectRate}
        setConnectRate={setConnectRate}
        isFullTimeDialer={isFullTimeDialer}
        setIsFullTimeDialer={setIsFullTimeDialer}
        callerCount={callerCount}
        setCallerCount={setCallerCount}
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

      <div className="mt-12 space-y-8">
        <h2 className="text-2xl font-semibold text-calculator-primary mb-6">
          Performance & Cost Comparison
        </h2>
        
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <SDRMetrics
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

          <BeanstalkMetrics
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
      </div>
    </div>
  );
};
