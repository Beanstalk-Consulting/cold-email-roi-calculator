
import { TooltipProvider } from "@/components/ui/tooltip";
import { CalculatorInputs } from "./CalculatorInputs";
import { LinkedInInputs } from "./LinkedInInputs";
import { ColdCallingInputs } from "./ColdCallingInputs";
import { Card } from "@/components/ui/card";
import { useCalculatorState } from "@/hooks/useCalculatorState";
import { useCalculations } from "@/hooks/useCalculations";
import { GlobalSettings } from "./GlobalSettings";
import { ChannelResults } from "./ChannelResults";

export const ROICalculator = () => {
  // Get all state variables from our hook
  const {
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
    linkedInResponseRate,
    setLinkedInResponseRate,
    linkedInConvertRate,
    setLinkedInConvertRate,
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
  } = useCalculatorState();

  // Calculate all metrics based on the current state
  const {
    // Email metrics
    monthlyProspects,
    monthlyLeads,
    monthlyDeals,
    emailRevenue,
    
    // LinkedIn metrics
    linkedInLeads,
    linkedInDeals,
    linkedInRevenue,
    
    // Cold calling metrics
    dialCount,
    callLeads,
    callDeals,
    callRevenue,
    
    // Combined metrics
    totalLeads,
    totalDeals,
    totalRevenue,
    
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
    
    // Combined ROI
    combinedRoi,
  } = useCalculations({
    // Global settings
    closeRate,
    customerValue,
    
    // Email props
    includeEmail,
    emailCapacity,
    replyRate,
    convertRate,
    
    // LinkedIn props
    includeLinkedIn,
    linkedInMessages,
    linkedInResponseRate,
    linkedInConvertRate,
    linkedInConnectRate,
    linkedInProfiles,
    
    // Cold calling props
    includeColdCalling,
    isFullTimeDialer,
    callerCount,
    connectRate,
    callConvertRate,
  });

  return (
    <TooltipProvider>
      <div className="max-w-4xl mx-auto p-6 space-y-8 bg-white rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold text-calculator-primary text-center">
          Multi-Channel Outreach ROI Calculator
        </h2>

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
          linkedInResponseRate={linkedInResponseRate}
          setLinkedInResponseRate={setLinkedInResponseRate}
          linkedInConvertRate={linkedInConvertRate}
          setLinkedInConvertRate={setLinkedInConvertRate}
          linkedInConnectRate={linkedInConnectRate}
          setLinkedInConnectRate={setLinkedInConnectRate}
          linkedInProfiles={linkedInProfiles}
          setLinkedInProfiles={setLinkedInProfiles}
        />

        <ColdCallingInputs
          includeColdCalling={includeColdCalling}
          setIncludeColdCalling={setIncludeColdCalling}
          dialCount={dialCount}
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

        <ChannelResults
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
    </TooltipProvider>
  );
};
