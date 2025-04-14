import React from "react";
import { Card } from "@/components/ui/card";
import { GlobalSettings } from "./GlobalSettings";
import { CalculatorInputs } from "./CalculatorInputs";
import { LinkedInInputs } from "./LinkedInInputs";
import { ColdCallingInputs } from "./ColdCallingInputs";
import { CalculatorResults } from "./CalculatorResults";
import { CalculationContextProps } from "@/hooks/calculationTypes";

interface CalculatorContentProps {
  closeRate: number;
  setCloseRate: (value: number) => void;
  customerValue: number;
  setCustomerValue: (value: number) => void;
  
  includeEmail: boolean;
  setIncludeEmail: (value: boolean) => void;
  emailCapacity: number;
  setEmailCapacity: (value: number) => void;
  replyRate: number;
  setReplyRate: (value: number) => void;
  convertRate: number;
  setConvertRate: (value: number) => void;
  
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
  
  includeColdCalling: boolean;
  setIncludeColdCalling: (value: boolean) => void;
  isFullTimeDialer: boolean;
  setIsFullTimeDialer: (value: boolean) => void;
  callerCount: number;
  setCallerCount: (value: number) => void;
  connectRate: number;
  setConnectRate: (value: number) => void;
  
  calculations: CalculationContextProps;
}

export const CalculatorContent = ({
  closeRate,
  setCloseRate,
  customerValue,
  setCustomerValue,
  
  includeEmail,
  setIncludeEmail,
  emailCapacity,
  setEmailCapacity,
  replyRate,
  setReplyRate,
  convertRate,
  setConvertRate,
  
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
  
  includeColdCalling,
  setIncludeColdCalling,
  isFullTimeDialer,
  setIsFullTimeDialer,
  callerCount,
  setCallerCount,
  connectRate,
  setConnectRate,
  
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
        dailyConnections={dailyConnections}
        dailyLeads={dailyLeads}
        dailyBookedLeads={dailyBookedLeads}
        monthlyCallingCost={monthlyCallingCost}
        annualCallingCost={annualCallingCost}
        callRoi={callRoi}
        totalLeads={totalLeads}
        totalDeals={totalDeals}
        totalRevenue={totalRevenue}
        totalSDRs={totalSDRs}
        annualSdrSalaryCost={annualSdrSalaryCost}
        sdrRoi={sdrRoi}
        monthlyBeanstalkCost={monthlyBeanstalkCost}
        annualBeanstalkCost={annualBeanstalkCost}
        beanstalkRoi={beanstalkRoi}
        combinedRoi={combinedRoi}
      />
    </div>
  );
};
