
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
import { InfoIcon, Linkedin } from "lucide-react";

interface LinkedInInputsProps {
  includeLinkedIn: boolean;
  setIncludeLinkedIn: (value: boolean) => void;
  linkedInMessages: number;
  setLinkedInMessages: (value: number) => void;
  linkedInResponseRate: number;
  setLinkedInResponseRate: (value: number) => void;
  linkedInConvertRate: number;
  setLinkedInConvertRate: (value: number) => void;
  linkedInCloseRate: number;
  setLinkedInCloseRate: (value: number) => void;
}

export const LinkedInInputs = ({
  includeLinkedIn,
  setIncludeLinkedIn,
  linkedInMessages,
  setLinkedInMessages,
  linkedInResponseRate,
  setLinkedInResponseRate,
  linkedInConvertRate,
  setLinkedInConvertRate,
  linkedInCloseRate,
  setLinkedInCloseRate,
}: LinkedInInputsProps) => {
  const [accordionValue, setAccordionValue] = useState<string>(includeLinkedIn ? "linkedin" : "");

  const handleAccordionChange = (value: string) => {
    setAccordionValue(value);
    if (value === "linkedin") {
      setIncludeLinkedIn(true);
    } else {
      setIncludeLinkedIn(false);
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
      <AccordionItem value="linkedin" className="border-none">
        <AccordionTrigger className="py-4">
          <div className="flex items-center gap-3">
            <Checkbox
              checked={includeLinkedIn}
              onCheckedChange={(checked) => {
                setIncludeLinkedIn(checked === true);
                if (checked) {
                  setAccordionValue("linkedin");
                } else {
                  setAccordionValue("");
                }
              }}
              className="h-5 w-5"
            />
            <div className="flex items-center gap-2">
              <Linkedin className="h-5 w-5 text-blue-600" />
              <span className="text-lg font-medium">Include LinkedIn Outbound</span>
            </div>
          </div>
        </AccordionTrigger>
        <AccordionContent>
          {includeLinkedIn && (
            <div className="space-y-6 py-4 pl-10">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <label className="text-sm font-medium text-calculator-text">
                    Monthly LinkedIn Messages
                  </label>
                  <Tooltip>
                    <TooltipTrigger>
                      <InfoIcon className="h-4 w-4 text-calculator-accent" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="w-[200px]">Number of LinkedIn messages sent per month</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
                <Input
                  type="number"
                  value={linkedInMessages}
                  onChange={(e) => setLinkedInMessages(Number(e.target.value))}
                  min={0}
                  className="w-full"
                />
              </div>

              <RangeInput
                label="LinkedIn Response Rate (%)"
                value={linkedInResponseRate}
                onChange={setLinkedInResponseRate}
                min={0}
                max={30}
                step={1}
                tooltip="Average percentage of LinkedIn messages that receive a response"
              />

              <RangeInput
                label="LinkedIn Lead to Call Conversion Rate (%)"
                value={linkedInConvertRate}
                onChange={setLinkedInConvertRate}
                min={0}
                max={100}
                step={1}
                tooltip="Percentage of LinkedIn leads that convert to sales calls"
              />

              <RangeInput
                label="LinkedIn Close Rate (%)"
                value={linkedInCloseRate}
                onChange={setLinkedInCloseRate}
                min={0}
                max={100}
                step={1}
                tooltip="Percentage of LinkedIn-originated calls that convert to deals"
              />
            </div>
          )}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};
