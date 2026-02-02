
import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { RangeInput } from "./RangeInput";
import { Switch } from "@/components/ui/switch";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { InfoIcon, PhoneCall, AlertCircle } from "lucide-react";
import { ColdCallingPerformanceMetrics } from "./ColdCallingPerformanceMetrics";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { getColdCallingPackagePrice } from "@/utils/coldCallingCalculations";
import { formatCurrency } from "@/lib/formatters";

interface ColdCallingInputsProps {
  includeColdCalling: boolean;
  setIncludeColdCalling: (value: boolean) => void;
  dialCount: number;
  connectRate: number;
  setConnectRate: (value: number) => void;
  isFullTimeDialer: boolean;
  setIsFullTimeDialer: (value: boolean) => void;
  callerCount: number;
  setCallerCount: (value: number) => void;
  callLeads: number;
  callDeals: number;
  callRevenue: number;
  dailyConnections: number;
  dailyLeads: number;
  dailyBookedLeads: number;
  monthlyCallingCost: number;
  annualCallingCost: number;
  callRoi: number;
  includeEmail?: boolean;
  includeLinkedIn?: boolean;
}

export const ColdCallingInputs = ({
  includeColdCalling,
  setIncludeColdCalling,
  dialCount,
  connectRate,
  setConnectRate,
  isFullTimeDialer,
  setIsFullTimeDialer,
  callerCount,
  setCallerCount,
  callLeads,
  callDeals,
  callRevenue,
  dailyConnections,
  dailyLeads,
  dailyBookedLeads,
  monthlyCallingCost,
  annualCallingCost,
  callRoi,
  includeEmail = false,
  includeLinkedIn = false,
}: ColdCallingInputsProps) => {
  const [accordionValue, setAccordionValue] = useState<string>(includeColdCalling ? "cold-calling" : "");
  const [showPerformance, setShowPerformance] = useState(false);

  // Cold calling requires at least email or LinkedIn to be enabled
  const canEnableColdCalling = includeEmail || includeLinkedIn;

  const handleAccordionChange = (value: string) => {
    if (!canEnableColdCalling && value === "cold-calling") {
      return; // Don't allow opening if prerequisites not met
    }
    setAccordionValue(value);
    if (value === "cold-calling") {
      setIncludeColdCalling(true);
    } else {
      setIncludeColdCalling(false);
    }
  };

  const handleCheckboxChange = (checked: boolean) => {
    if (!canEnableColdCalling && checked) {
      return; // Don't allow enabling if prerequisites not met
    }
    setIncludeColdCalling(checked);
    if (checked) {
      setAccordionValue("cold-calling");
    } else {
      setAccordionValue("");
    }
  };

  // Calculate daily dials based on caller type
  const dailyDials = 1000; // Constant value of 1000 dials per day per caller
  const daysPerWeek = isFullTimeDialer ? 5 : 3; // 5 days for full-time, 3 for part-time
  const monthlyDials = dailyDials * daysPerWeek * 4 * callerCount; // 4 weeks in a month

  // Calculate expected daily connections based on connect rate
  const calculatedDailyConnections = Math.round((dailyDials * connectRate) / 100);

  // Get package pricing
  const packagePrice = getColdCallingPackagePrice(callerCount);

  return (
    <Accordion 
      type="single" 
      collapsible 
      value={accordionValue} 
      onValueChange={handleAccordionChange}
      className="border rounded-lg px-4"
    >
      <AccordionItem value="cold-calling" className="border-none">
        <AccordionTrigger className="py-4" disabled={!canEnableColdCalling}>
          <div className="flex items-center gap-3">
            <Checkbox
              checked={includeColdCalling}
              onCheckedChange={(checked) => handleCheckboxChange(checked === true)}
              disabled={!canEnableColdCalling}
              className="h-5 w-5"
            />
            <div className="flex items-center gap-2">
              <PhoneCall className="h-5 w-5 text-green-600" />
              <span className="text-lg font-medium">Add Cold Calling Package</span>
              {!canEnableColdCalling && (
                <Tooltip>
                  <TooltipTrigger>
                    <AlertCircle className="h-4 w-4 text-amber-500" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="w-[250px]">Cold calling is available as an add-on package. Please enable Cold Email or LinkedIn Outbound first.</p>
                  </TooltipContent>
                </Tooltip>
              )}
            </div>
          </div>
        </AccordionTrigger>
        <AccordionContent>
          {!canEnableColdCalling && (
            <Alert className="mb-4 bg-amber-50 border-amber-200">
              <AlertCircle className="h-4 w-4 text-amber-600" />
              <AlertDescription className="text-amber-800">
                Cold calling is available as an add-on package to Cold Email or LinkedIn Outbound. Please enable at least one of these channels first.
              </AlertDescription>
            </Alert>
          )}
          
          {includeColdCalling && (
            <div className="space-y-6 py-4 pl-10">
              <div className="bg-green-50 p-4 rounded-md border border-green-200 mb-4">
                <h4 className="text-sm font-semibold text-green-800 mb-2">Cold Calling Package</h4>
                <p className="text-sm text-green-700 mb-2">
                  This package includes your email/LinkedIn infrastructure plus dedicated callers.
                </p>
                <div className="text-sm text-green-800">
                  <p>• Base package (1 caller): $10,000/mo</p>
                  <p>• Additional callers: +$5,000/mo each</p>
                  <p className="font-medium mt-2">Current package: {formatCurrency(packagePrice)}/mo</p>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <label className="text-sm font-medium text-calculator-text">
                      Caller Type
                    </label>
                    <Tooltip>
                      <TooltipTrigger>
                        <InfoIcon className="h-4 w-4 text-calculator-accent" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="w-[280px]">Part-time: 1000 dials per day, 3 days per week. Full-time: 1000 dials per day, 5 days per week.</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`text-sm ${!isFullTimeDialer ? "font-semibold text-calculator-primary" : "text-gray-500"}`}>Part-time</span>
                    <Switch 
                      checked={isFullTimeDialer}
                      onCheckedChange={setIsFullTimeDialer}
                    />
                    <span className={`text-sm ${isFullTimeDialer ? "font-semibold text-calculator-primary" : "text-gray-500"}`}>Full-time</span>
                  </div>
                </div>
              </div>

              <RangeInput
                label="Number of Callers"
                value={callerCount}
                onChange={setCallerCount}
                min={1}
                max={5}
                step={1}
                tooltip="How many callers are making calls (1-2 callers recommended)"
                unit=""
              />

              <div className="bg-gray-50 p-3 rounded-md border border-gray-100 mb-4">
                <div className="flex flex-col gap-1">
                  <p className="text-sm font-medium text-calculator-text">Monthly Dials: {monthlyDials.toLocaleString()}</p>
                  <p className="text-xs text-gray-500">
                    Based on {dailyDials.toLocaleString()} dials per day, {daysPerWeek} days per week, 4 weeks per month, {callerCount} caller{callerCount > 1 ? 's' : ''}
                  </p>
                </div>
              </div>

              <RangeInput
                label="Connect Rate (%)"
                value={connectRate}
                onChange={setConnectRate}
                min={1}
                max={12}
                step={0.1}
                tooltip="Percentage of dials that result in a live conversation (typically 8-12%)"
              />

              <div className="bg-gray-50 p-3 rounded-md border border-gray-100 mb-4">
                <div className="flex flex-col gap-1">
                  <p className="text-sm font-medium text-calculator-text">Daily Connections: {calculatedDailyConnections}</p>
                  <p className="text-xs text-gray-500">
                    Based on {connectRate}% connect rate (industry average: 8-12%, resulting in 80-120 connects/day)
                  </p>
                </div>
              </div>

              <Collapsible>
                <CollapsibleTrigger className="flex items-center gap-2 text-sm font-medium text-calculator-text hover:text-calculator-primary">
                  <ChevronDown className={`h-4 w-4 transition-transform ${showPerformance ? 'transform rotate-180' : ''}`} />
                  Show Cold Calling Performance
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <div className="mt-4">
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
                  </div>
                </CollapsibleContent>
              </Collapsible>
            </div>
          )}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};
