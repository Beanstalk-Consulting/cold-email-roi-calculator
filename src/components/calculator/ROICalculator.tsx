
import { TooltipProvider } from "@/components/ui/tooltip";
import { useCalculatorState } from "@/hooks/useCalculatorState";
import { useCalculations } from "@/hooks/useCalculations";
import { CalculatorHeader } from "./CalculatorHeader";
import { CalculatorContent } from "./CalculatorContent";

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
  } = useCalculatorState();

  // Calculate all metrics based on the current state
  const calculations = useCalculations({
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
    linkedInMessageReplyRate,
    linkedInResponseRate,
    linkedInReplyToCallRate,
    linkedInConnectRate,
    linkedInProfiles,
    
    // Cold calling props
    includeColdCalling,
    isFullTimeDialer,
    callerCount,
    connectRate,
  });

  return (
    <TooltipProvider>
      <div className="max-w-4xl mx-auto p-6 space-y-8 bg-white rounded-xl shadow-lg">
        <CalculatorHeader />
        <CalculatorContent
          // Global settings
          closeRate={closeRate}
          setCloseRate={setCloseRate}
          customerValue={customerValue}
          setCustomerValue={setCustomerValue}
          
          // Email outreach state
          includeEmail={includeEmail}
          setIncludeEmail={setIncludeEmail}
          emailCapacity={emailCapacity}
          setEmailCapacity={setEmailCapacity}
          replyRate={replyRate}
          setReplyRate={setReplyRate}
          convertRate={convertRate}
          setConvertRate={setConvertRate}
          
          // LinkedIn outreach state
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
          
          // Cold calling outreach state
          includeColdCalling={includeColdCalling}
          setIncludeColdCalling={setIncludeColdCalling}
          isFullTimeDialer={isFullTimeDialer}
          setIsFullTimeDialer={setIsFullTimeDialer}
          callerCount={callerCount}
          setCallerCount={setCallerCount}
          connectRate={connectRate}
          setConnectRate={setConnectRate}
          
          // Calculation results
          calculations={calculations}
        />
      </div>
    </TooltipProvider>
  );
};
