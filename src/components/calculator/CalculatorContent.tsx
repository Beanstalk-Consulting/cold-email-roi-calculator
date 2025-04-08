
import React from "react";
import { Card } from "@/components/ui/card";
import { GlobalSettings } from "./GlobalSettings";
import { CalculatorInputs } from "./CalculatorInputs";
import { LinkedInInputs } from "./LinkedInInputs";
import { ColdCallingInputs } from "./ColdCallingInputs";
import { CalculatorResults } from "./CalculatorResults";
import { CalculationContextProps } from "@/hooks/useCalculations";

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
  callConvertRate: number;
  setCallConvertRate: (value: number) => void;
  
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
  callConvertRate,
  setCallConvertRate,
  
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
    totalLeads,
    totalDeals,
    totalRevenue,
    requiredEmailSDRs,
    requiredLinkedInSDRs,
    requiredCallSDRs,
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
      />

      <ColdCallingInputs
        includeColdCalling={includeColdCalling}
        setIncludeColdCalling={setIncludeColdCalling}
        dialCount={monthlyDialCount}
        connectRate={connectRate}
        setConnectRate={setConnectRate}
        callConvertRate={callConvertRate}
        setCallConvertRate={setCallConvertRate}
        isFullTimeDialer={isFullTimeDialer}
        setIsFullTimeDialer={setIsFullTimeDialer}
        callerCount={callerCount}
        setCallerCount={setCallerCount}
        closeRate={closeRate}
      />

      <CalculatorResults
        includeEmail={includeEmail}
        includeLinkedIn={includeLinkedIn}
        includeColdCalling={includeColdCalling}
        
        monthlyLeads={monthlyLeads}
        monthlyDeals={monthlyDeals}
        emailRevenue={emailRevenue}
        
        linkedInLeads={linkedInLeads}
        linkedInDeals={linkedInDeals}
        linkedInRevenue={linkedInRevenue}
        
        callLeads={callLeads}
        callDeals={callDeals}
        callRevenue={callRevenue}
        callConvertRate={callConvertRate}
        dailyConnections={dailyConnections}
        dailyLeads={dailyLeads}
        dailyBookedLeads={dailyBookedLeads}
        
        totalLeads={totalLeads}
        totalDeals={totalDeals}
        totalRevenue={totalRevenue}
        combinedRoi={combinedRoi}
        
        requiredEmailSDRs={requiredEmailSDRs}
        requiredLinkedInSDRs={requiredLinkedInSDRs}
        requiredCallSDRs={requiredCallSDRs}
        totalSDRs={totalSDRs}
        annualSdrSalaryCost={annualSdrSalaryCost}
        sdrRoi={sdrRoi}
        
        monthlyBeanstalkCost={monthlyBeanstalkCost}
        annualBeanstalkCost={annualBeanstalkCost}
        beanstalkRoi={beanstalkRoi}
      />
    </div>
  );
};
