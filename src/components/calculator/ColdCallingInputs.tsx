
import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { RangeInput } from "./RangeInput";
import { Input } from "@/components/ui/input";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { InfoIcon, PhoneCall } from "lucide-react";

interface ColdCallingInputsProps {
  includeColdCalling: boolean;
  setIncludeColdCalling: (value: boolean) => void;
  dialCount: number;
  setDialCount: (value: number) => void;
  connectRate: number;
  setConnectRate: (value: number) => void;
  callConvertRate: number;
  setCallConvertRate: (value: number) => void;
  callCloseRate: number;
  setCallCloseRate: (value: number) => void;
}

export const ColdCallingInputs = ({
  includeColdCalling,
  setIncludeColdCalling,
  dialCount,
  setDialCount,
  connectRate,
  setConnectRate,
  callConvertRate,
  setCallConvertRate,
  callCloseRate,
  setCallCloseRate,
}: ColdCallingInputsProps) => {
  const [accordionValue, setAccordionValue] = useState<string>(includeColdCalling ? "cold-calling" : "");

  const handleAccordionChange = (value: string) => {
    setAccordionValue(value);
    if (value === "cold-calling") {
      setIncludeColdCalling(true);
    } else {
      setIncludeColdCalling(false);
    }
  };

  return (
    <Accordion 
      type="single" 
      collapsible 
      value={accordionValue} 
      onValueChange={handleAccordionChange}
      className="border rounded-lg px-4"
    >
      <AccordionItem value="cold-calling" className="border-none">
        <AccordionTrigger className="py-4">
          <div className="flex items-center gap-3">
            <Checkbox
              checked={includeColdCalling}
              onCheckedChange={(checked) => {
                setIncludeColdCalling(checked === true);
                if (checked) {
                  setAccordionValue("cold-calling");
                } else {
                  setAccordionValue("");
                }
              }}
              className="h-5 w-5"
            />
            <div className="flex items-center gap-2">
              <PhoneCall className="h-5 w-5 text-green-600" />
              <span className="text-lg font-medium">Include Cold Calling</span>
            </div>
          </div>
        </AccordionTrigger>
        <AccordionContent>
          {includeColdCalling && (
            <div className="space-y-6 py-4 pl-10">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <label className="text-sm font-medium text-calculator-text">
                    Monthly Call Dials
                  </label>
                  <Tooltip>
                    <TooltipTrigger>
                      <InfoIcon className="h-4 w-4 text-calculator-accent" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="w-[200px]">Number of cold calls made per month</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
                <Input
                  type="number"
                  value={dialCount}
                  onChange={(e) => setDialCount(Number(e.target.value))}
                  min={0}
                  className="w-full"
                />
              </div>

              <RangeInput
                label="Connect Rate (%)"
                value={connectRate}
                onChange={setConnectRate}
                min={0}
                max={50}
                step={1}
                tooltip="Percentage of dials that result in a live conversation"
              />

              <RangeInput
                label="Call to Meeting Conversion Rate (%)"
                value={callConvertRate}
                onChange={setCallConvertRate}
                min={0}
                max={100}
                step={1}
                tooltip="Percentage of conversations that convert to sales meetings"
              />

              <RangeInput
                label="Meeting Close Rate (%)"
                value={callCloseRate}
                onChange={setCallCloseRate}
                min={0}
                max={100}
                step={1}
                tooltip="Percentage of meetings that convert to closed deals"
              />
            </div>
          )}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};
