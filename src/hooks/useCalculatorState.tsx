import { useState } from "react";

// Constants from the original file
const EMAILS_PER_SDR_PER_MONTH = 250 * 22; // 250 emails per day * 22 working days
const LINKEDIN_MESSAGES_PER_SDR_PER_MONTH = 22 * 22; // 22 messages per day * 22 working days

export const getLinkedInPrice = (profileCount: number): number => {
  if (profileCount <= 0) return 0;
  // First profile costs $1499, additional profiles now cost $149
  return 1499 + (Math.max(0, profileCount - 1) * 149);
};

export const getBeanstalkPrice = (emailCount: number): number => {
  if (emailCount <= 8000) return 0.40;
  if (emailCount <= 20000) return 0.20;
  if (emailCount <= 50000) return 0.12;
  if (emailCount <= 250000) return 0.09;
  if (emailCount <= 500000) return 0.085;
  return 0.085; // 500k+ emails
};

export const useCalculatorState = () => {
  // Update global settings default close rate from 25 to 15
  const [closeRate, setCloseRate] = useState(15);
  const [customerValue, setCustomerValue] = useState(3000);
  
  // Email outreach state
  const [includeEmail, setIncludeEmail] = useState(true);
  const [emailCapacity, setEmailCapacity] = useState(8000);
  const [replyRate, setReplyRate] = useState(3);
  const [convertRate, setConvertRate] = useState(40);
  
  // LinkedIn outreach state
  const [includeLinkedIn, setIncludeLinkedIn] = useState(false);
  const [linkedInMessages, setLinkedInMessages] = useState(473);
  const [linkedInMessageReplyRate, setLinkedInMessageReplyRate] = useState(15);
  const [linkedInResponseRate, setLinkedInResponseRate] = useState(20);
  const [linkedInReplyToCallRate, setLinkedInReplyToCallRate] = useState(10);
  const [linkedInConnectRate, setLinkedInConnectRate] = useState(15);
  const [linkedInProfiles, setLinkedInProfiles] = useState(1);
  
  // Cold calling outreach state
  const [includeColdCalling, setIncludeColdCalling] = useState(false);
  const [isFullTimeDialer, setIsFullTimeDialer] = useState(false);
  const [callerCount, setCallerCount] = useState(1);
  const [connectRate, setConnectRate] = useState(8); // Default to 8% (industry average)

  return {
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
  };
};
