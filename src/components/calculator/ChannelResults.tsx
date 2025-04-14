
import { PerformanceMetrics } from "./PerformanceMetrics";
import { LinkedInPerformanceMetrics } from "./LinkedInPerformanceMetrics";
import { ColdCallingPerformanceMetrics } from "./ColdCallingPerformanceMetrics";
import { CombinedMetrics } from "./CombinedMetrics";
import { SDRMetrics } from "./SDRMetrics";
import { BeanstalkMetrics } from "./BeanstalkMetrics";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

interface ChannelResultsProps {
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

export const ChannelResults = ({
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
}: ChannelResultsProps) => {
  return (
    <div className="space-y-8">
      {/* Email Performance */}
      {includeEmail && (
        <PerformanceMetrics
          monthlyLeads={monthlyLeads}
          monthlyDeals={monthlyDeals}
          annualRevenue={emailRevenue}
        />
      )}

      {/* LinkedIn Performance (if included) */}
      {includeLinkedIn && (
        <LinkedInPerformanceMetrics
          linkedInLeads={linkedInLeads}
          linkedInDeals={linkedInDeals}
          linkedInRevenue={linkedInRevenue}
        />
      )}

      {/* Cold Calling Performance (if included) */}
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

      {/* Combined Performance (if more than one channel is used) */}
      {((includeEmail && includeLinkedIn) || 
        (includeEmail && includeColdCalling) || 
        (includeLinkedIn && includeColdCalling)) && (
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
      )}

      {/* SDR Model Comparison - Updated as an expandable accordion */}
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="sdr-comparison">
          <AccordionTrigger className="text-xl font-semibold text-calculator-primary">
            In-House SDR Model Comparison
          </AccordionTrigger>
          <AccordionContent>
            <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg mb-4">
              <p className="text-sm text-amber-800">
                This section compares the cost and performance of hiring in-house SDRs versus using our automated service. 
                The calculations show why hiring in-house is generally less cost-effective.
              </p>
            </div>
            <SDRMetrics
              requiredSDRs={totalSDRs}
              annualSdrSalaryCost={annualSdrSalaryCost}
              sdrRoi={sdrRoi}
              includeLinkedIn={includeLinkedIn}
              includeColdCalling={includeColdCalling}
            />
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      {/* Beanstalk Metrics - Now including all required props */}
      <BeanstalkMetrics
        monthlyBeanstalkCost={monthlyBeanstalkCost}
        annualBeanstalkCost={annualBeanstalkCost}
        beanstalkRoi={beanstalkRoi}
        totalLeads={totalLeads}
        totalDeals={totalDeals}
        totalRevenue={totalRevenue}
      />
    </div>
  );
};
