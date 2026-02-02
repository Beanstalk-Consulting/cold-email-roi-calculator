
import React from "react";
import { Card } from "@/components/ui/card";
import { GlobalSettings } from "./GlobalSettings";
import { CalculatorInputs } from "./CalculatorInputs";
import { LinkedInInputs } from "./LinkedInInputs";
import { ColdCallingInputs } from "./ColdCallingInputs";
import { CalculatorResults } from "./CalculatorResults";
import { SDRPlacementService } from "./SDRPlacementService";
import { CalculationContextProps } from "@/hooks/calculationTypes";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown } from "lucide-react";
import { PerformanceMetrics } from "./PerformanceMetrics";

interface CalculatorContentProps {
  closeRate: number;
  setCloseRate: (value: number) => void;
  customerValue: number;
  setCustomerValue: (number) => void;
  
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
    discountedMonthlyBeanstalkCost,  // Make sure to destructure this
    annualBeanstalkCost,
    beanstalkRoi,
    combinedRoi,
    monthlyLinkedInCost,
    linkedInRoi,
    activeChannelCount,  // Also destructure this
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

        <Collapsible>
          <div className="flex flex-col space-y-4">
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
            
            {includeEmail && (
              <CollapsibleTrigger className="flex items-center justify-between w-full p-2 text-sm font-medium text-left text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200">
                <span>Show Email Performance Details</span>
                <ChevronDown className="w-4 h-4" />
              </CollapsibleTrigger>
            )}
            
            <CollapsibleContent>
              {includeEmail && (
                <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                  <PerformanceMetrics
                    monthlyLeads={monthlyLeads}
                    monthlyDeals={monthlyDeals}
                    annualRevenue={emailRevenue}
                  />
                </div>
              )}
            </CollapsibleContent>
          </div>
        </Collapsible>
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
        monthlyLinkedInCost={monthlyLinkedInCost}
        linkedInRoi={linkedInRoi}
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
        includeEmail={includeEmail}
        includeLinkedIn={includeLinkedIn}
      />

      <SDRPlacementService
        emailCapacity={emailCapacity}
        totalLeads={totalLeads}
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
        discountedMonthlyBeanstalkCost={discountedMonthlyBeanstalkCost}  // Add this prop
        annualBeanstalkCost={annualBeanstalkCost}
        beanstalkRoi={beanstalkRoi}
        combinedRoi={combinedRoi}
        activeChannelCount={activeChannelCount}  // Add this prop
      />
    </div>
  );
};
