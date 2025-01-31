import { useState } from "react";
import { TooltipProvider } from "@/components/ui/tooltip";
import { CalculatorInputs } from "./CalculatorInputs";
import { PerformanceMetrics } from "./PerformanceMetrics";
import { SDRMetrics } from "./SDRMetrics";
import { BeanstalkMetrics } from "./BeanstalkMetrics";

const EMAILS_PER_SDR_PER_MONTH = 250 * 22; // 250 emails per day * 22 working days

const getBeanstalkPrice = (emailCount: number): number => {
  if (emailCount <= 8000) return 0.35;
  if (emailCount <= 20000) return 0.30;
  if (emailCount <= 50000) return 0.25;
  if (emailCount <= 100000) return 0.20;
  if (emailCount <= 250000) return 0.15;
  if (emailCount <= 500000) return 0.12;
  return 0.10; // 1M+ emails
};

export const ROICalculator = () => {
  const [emailCapacity, setEmailCapacity] = useState(8000);
  const [customerValue, setCustomerValue] = useState(3000);
  const [replyRate, setReplyRate] = useState(3);
  const [convertRate, setConvertRate] = useState(40);
  const [closeRate, setCloseRate] = useState(25);

  // Calculate derived values
  const monthlyProspects = Math.round(emailCapacity / 2); // 2-step sequence
  const totalReplies = Math.round((monthlyProspects * replyRate) / 100);
  const monthlyLeads = Math.round(totalReplies * 0.2); // 20% of replies are positive
  const monthlyDeals = Math.round((monthlyLeads * convertRate * closeRate) / 10000);
  const annualRevenue = monthlyDeals * customerValue * 12;
  
  // SDR calculations
  const requiredSDRs = Math.ceil(emailCapacity / EMAILS_PER_SDR_PER_MONTH);
  const annualSdrSalaryCost = requiredSDRs * 82470; // Average SDR salary
  const sdrRoi = ((annualRevenue - annualSdrSalaryCost) / annualSdrSalaryCost) * 100;

  // Beanstalk calculations
  const monthlyEmailPrice = getBeanstalkPrice(emailCapacity);
  const monthlyBeanstalkCost = emailCapacity * monthlyEmailPrice;
  const annualBeanstalkCost = monthlyBeanstalkCost * 12;
  const beanstalkRoi = ((annualRevenue - annualBeanstalkCost) / annualBeanstalkCost) * 100;

  return (
    <TooltipProvider>
      <div className="max-w-3xl mx-auto p-6 space-y-8 bg-white rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold text-calculator-primary text-center">
          Cold Email ROI Calculator
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

        <div className="space-y-8">
          <PerformanceMetrics
            monthlyLeads={monthlyLeads}
            monthlyDeals={monthlyDeals}
            annualRevenue={annualRevenue}
          />

          <SDRMetrics
            requiredSDRs={requiredSDRs}
            annualSdrSalaryCost={annualSdrSalaryCost}
            sdrRoi={sdrRoi}
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