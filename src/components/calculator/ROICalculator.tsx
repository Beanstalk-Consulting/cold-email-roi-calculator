
import { useState } from "react";
import { TooltipProvider } from "@/components/ui/tooltip";
import { CalculatorInputs } from "./CalculatorInputs";
import { PerformanceMetrics } from "./PerformanceMetrics";
import { SDRMetrics } from "./SDRMetrics";
import { BeanstalkMetrics } from "./BeanstalkMetrics";
import { LinkedInInputs } from "./LinkedInInputs";
import { ColdCallingInputs } from "./ColdCallingInputs";
import { CombinedMetrics } from "./CombinedMetrics";

const EMAILS_PER_SDR_PER_MONTH = 250 * 22; // 250 emails per day * 22 working days
const LINKEDIN_MESSAGES_PER_SDR_PER_MONTH = 22 * 22; // 22 messages per day * 22 working days
const CALLS_PER_SDR_PER_DAY = 80; // Average number of calls one SDR can make per day

const getBeanstalkPrice = (emailCount: number): number => {
  if (emailCount <= 8000) return 0.40;
  if (emailCount <= 20000) return 0.20;
  if (emailCount <= 50000) return 0.12;
  if (emailCount <= 250000) return 0.09;
  if (emailCount <= 500000) return 0.085;
  return 0.085; // 500k+ emails
};

export const ROICalculator = () => {
  // Email outreach state
  const [emailCapacity, setEmailCapacity] = useState(8000);
  const [customerValue, setCustomerValue] = useState(3000);
  const [replyRate, setReplyRate] = useState(3);
  const [convertRate, setConvertRate] = useState(40);
  const [closeRate, setCloseRate] = useState(25);

  // LinkedIn outreach state
  const [includeLinkedIn, setIncludeLinkedIn] = useState(false);
  const [linkedInMessages, setLinkedInMessages] = useState(400);
  const [linkedInResponseRate, setLinkedInResponseRate] = useState(30);
  const [linkedInConvertRate, setLinkedInConvertRate] = useState(50);
  const [linkedInCloseRate, setLinkedInCloseRate] = useState(30);
  const [linkedInConnectRate, setLinkedInConnectRate] = useState(40);

  // Cold calling outreach state
  const [includeColdCalling, setIncludeColdCalling] = useState(false);
  const [isFullTimeDialer, setIsFullTimeDialer] = useState(false); // Added: part-time/full-time toggle
  const [callerCount, setCallerCount] = useState(1); // Added: number of callers
  const [connectRate, setConnectRate] = useState(20);
  const [callConvertRate, setCallConvertRate] = useState(60);
  const [callCloseRate, setCallCloseRate] = useState(35);

  // Email calculated values
  const monthlyProspects = Math.round(emailCapacity / 2); // 2-step sequence
  const totalReplies = Math.round((monthlyProspects * replyRate) / 100);
  const monthlyLeads = Math.round(totalReplies * 0.2); // 20% of replies are positive
  const monthlyDeals = Math.round((monthlyLeads * convertRate * closeRate) / 10000);
  const emailRevenue = monthlyDeals * customerValue * 12;
  
  // LinkedIn calculated values
  const linkedInConnections = Math.round((linkedInMessages * linkedInConnectRate) / 100);
  const linkedInResponses = Math.round((linkedInConnections * linkedInResponseRate) / 100);
  const linkedInLeads = Math.round(linkedInResponses * 0.7); // 70% of responses are positive on LinkedIn
  const linkedInDeals = Math.round((linkedInLeads * linkedInConvertRate * linkedInCloseRate) / 10000);
  const linkedInRevenue = linkedInDeals * customerValue * 12;

  // Cold calling calculated values - updated to use new caller model
  const dailyDials = 1000; // Constant value of 1000 dials per day per caller
  const daysPerWeek = isFullTimeDialer ? 5 : 3; // 5 days for full-time, 3 for part-time
  const dialCount = dailyDials * daysPerWeek * 4 * callerCount; // 4 weeks in a month
  
  const callConnections = Math.round((dialCount * connectRate) / 100);
  const callLeads = Math.round(callConnections * 0.5); // 50% of connections are positive on calls
  const callDeals = Math.round((callLeads * callConvertRate * callCloseRate) / 10000);
  const callRevenue = callDeals * customerValue * 12;
  
  // Calculate total values
  const totalLeads = monthlyLeads + (includeLinkedIn ? linkedInLeads : 0) + (includeColdCalling ? callLeads : 0);
  const totalDeals = monthlyDeals + (includeLinkedIn ? linkedInDeals : 0) + (includeColdCalling ? callDeals : 0);
  const totalRevenue = emailRevenue + (includeLinkedIn ? linkedInRevenue : 0) + (includeColdCalling ? callRevenue : 0);
  
  // SDR calculations for email
  const requiredEmailSDRs = Math.ceil(emailCapacity / EMAILS_PER_SDR_PER_MONTH);
  
  // SDR calculations for LinkedIn
  const requiredLinkedInSDRs = includeLinkedIn ? Math.ceil(linkedInMessages / LINKEDIN_MESSAGES_PER_SDR_PER_MONTH) : 0;
  
  // SDR calculations for cold calling - updated for part-time/full-time model
  const callsPerMonth = dialCount;
  const requiredCallSDRs = includeColdCalling ? callerCount : 0; // Now we directly use caller count
  
  // Total SDR requirement and cost
  const totalSDRs = requiredEmailSDRs + requiredLinkedInSDRs + requiredCallSDRs;
  const annualSdrSalaryCost = totalSDRs * 82470; // Average SDR salary
  const sdrRoi = ((totalRevenue - annualSdrSalaryCost) / annualSdrSalaryCost) * 100;

  // Beanstalk calculations
  const monthlyEmailPrice = getBeanstalkPrice(emailCapacity);
  const monthlyBeanstalkCost = emailCapacity * monthlyEmailPrice;
  const annualBeanstalkCost = monthlyBeanstalkCost * 12;
  const beanstalkRoi = ((emailRevenue - annualBeanstalkCost) / annualBeanstalkCost) * 100;

  // Combined ROI for all channels using Beanstalk for email automation
  const combinedCost = annualBeanstalkCost + (requiredLinkedInSDRs + requiredCallSDRs) * 82470;
  const combinedRoi = ((totalRevenue - combinedCost) / combinedCost) * 100;

  return (
    <TooltipProvider>
      <div className="max-w-4xl mx-auto p-6 space-y-8 bg-white rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold text-calculator-primary text-center">
          Multi-Channel Outreach ROI Calculator
        </h2>

        <CalculatorInputs
          emailCapacity={emailCapacity}
          setEmailCapacity={setEmailCapacity}
          customerValue={customerValue}
          setCustomerValue={setCustomerValue}
          replyRate={replyRate}
          setReplyRate={setReplyRate}
          convertRate={convertRate}
          setConvertRate={setConvertRate}
          closeRate={closeRate}
          setCloseRate={setCloseRate}
          monthlyProspects={monthlyProspects}
        />

        <LinkedInInputs
          includeLinkedIn={includeLinkedIn}
          setIncludeLinkedIn={setIncludeLinkedIn}
          linkedInMessages={linkedInMessages}
          setLinkedInMessages={setLinkedInMessages}
          linkedInResponseRate={linkedInResponseRate}
          setLinkedInResponseRate={setLinkedInResponseRate}
          linkedInConvertRate={linkedInConvertRate}
          setLinkedInConvertRate={setLinkedInConvertRate}
          linkedInCloseRate={linkedInCloseRate}
          setLinkedInCloseRate={setLinkedInCloseRate}
          linkedInConnectRate={linkedInConnectRate}
          setLinkedInConnectRate={setLinkedInConnectRate}
        />

        <ColdCallingInputs
          includeColdCalling={includeColdCalling}
          setIncludeColdCalling={setIncludeColdCalling}
          dialCount={dialCount}
          connectRate={connectRate}
          setConnectRate={setConnectRate}
          callConvertRate={callConvertRate}
          setCallConvertRate={setCallConvertRate}
          callCloseRate={callCloseRate}
          setCallCloseRate={setCallCloseRate}
          isFullTimeDialer={isFullTimeDialer}
          setIsFullTimeDialer={setIsFullTimeDialer}
          callerCount={callerCount}
          setCallerCount={setCallerCount}
        />

        <div className="space-y-8">
          <PerformanceMetrics
            monthlyLeads={monthlyLeads}
            monthlyDeals={monthlyDeals}
            annualRevenue={emailRevenue}
          />

          {(includeLinkedIn || includeColdCalling) && (
            <CombinedMetrics
              totalLeads={totalLeads}
              totalDeals={totalDeals}
              totalRevenue={totalRevenue}
              includeLinkedIn={includeLinkedIn}
              linkedInLeads={linkedInLeads}
              linkedInDeals={linkedInDeals}
              linkedInRevenue={linkedInRevenue}
              includeColdCalling={includeColdCalling}
              callLeads={callLeads}
              callDeals={callDeals}
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

          <BeanstalkMetrics
            monthlyBeanstalkCost={monthlyBeanstalkCost}
            annualBeanstalkCost={annualBeanstalkCost}
            beanstalkRoi={beanstalkRoi}
          />
        </div>
      </div>
    </TooltipProvider>
  );
};
