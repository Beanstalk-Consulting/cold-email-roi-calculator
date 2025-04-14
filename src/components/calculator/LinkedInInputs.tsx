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
import { InfoIcon, Linkedin, Users } from "lucide-react";
import { cn } from "@/lib/utils";

interface LinkedInInputsProps {
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
}

export const LinkedInInputs = ({
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

  const calculatedMonthlyRequests = linkedInProfiles * 22 * 22;

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
                    Number of LinkedIn Profiles for Outreach
                  </label>
                  <Tooltip>
                    <TooltipTrigger>
                      <InfoIcon className="h-4 w-4 text-calculator-accent" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="w-[200px]">Total number of LinkedIn profiles in your team that can be used for outreach</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
                <div className="flex items-center gap-2">
                  <Input
                    type="number"
                    value={linkedInProfiles}
                    onChange={(e) => {
                      const value = Number(e.target.value);
                      setLinkedInProfiles(value);
                      setLinkedInMessages(value * 22 * 22);
                    }}
                    min={1}
                    className="w-full"
                  />
                  <Users className="h-4 w-4 text-calculator-accent" />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <label className="text-sm font-medium text-calculator-text">
                    Monthly Connection Requests (Calculated)
                  </label>
                  <Tooltip>
                    <TooltipTrigger>
                      <InfoIcon className="h-4 w-4 text-calculator-accent" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="w-[200px]">Based on 22 connection requests per day for 22 working days per month per profile</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
                <div className={cn(
                  "w-full p-3",
                  "bg-gray-100",
                  "border border-gray-200",
                  "rounded-md",
                  "text-gray-600",
                  "font-medium"
                )}>
                  {calculatedMonthlyRequests.toLocaleString()}
                </div>
              </div>

              <RangeInput
                label="Reply Rate from Messages (%)"
                value={linkedInMessageReplyRate}
                onChange={setLinkedInMessageReplyRate}
                min={0}
                max={50}
                step={1}
                tooltip="Percentage of connection requests that receive a reply"
              />

              <RangeInput
                label="Connection Acceptance Rate (%)"
                value={linkedInConnectRate}
                onChange={setLinkedInConnectRate}
                min={0}
                max={100}
                step={1}
                tooltip="Percentage of connection requests that are accepted"
              />

              <RangeInput
                label="Reply Rate from Connections (%)"
                value={linkedInResponseRate}
                onChange={setLinkedInResponseRate}
                min={0}
                max={100}
                step={1}
                tooltip="Percentage of accepted connections that reply to your messages"
              />

              <RangeInput
                label="Reply to Call Conversion Rate (%)"
                value={linkedInReplyToCallRate}
                onChange={setLinkedInReplyToCallRate}
                min={0}
                max={100}
                step={1}
                tooltip="Percentage of LinkedIn replies that convert to sales calls"
              />
            </div>
          )}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};
