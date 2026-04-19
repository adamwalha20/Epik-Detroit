export const QUIZ_QUESTIONS = [
  {
    id: 1,
    text: "Identify the optimal vector for deep-space resource acquisition given current kinetic drag constraints.",
    options: [
      { id: "A", text: "Deploy lateral thrust vectors at 0.4c.", trait: "logic", value: 3 },
      { id: "B", text: "Initiate reverse polarity shielding.", trait: "creativity", value: 3 },
      { id: "C", text: "Maintain current trajectory and engage passive scoops.", trait: "risk", value: 3 },
      { id: "D", text: "Jettison non-essential mass to reduce drag coefficient.", trait: "empathy", value: 3 }
    ]
  },
  {
    id: 2,
    text: "A neural pathway anomaly is detected. How do you re-route cognitive processing?",
    options: [
      { id: "A", text: "Analyze the anomaly to formulate a new logic algorithm.", trait: "logic", value: 3 },
      { id: "B", text: "Synthesize an alternative pathway ignoring established bounds.", trait: "creativity", value: 3 },
      { id: "C", text: "Force the connection through the anomaly.", trait: "risk", value: 3 },
      { id: "D", text: "Prioritize memory preservation and bypass gently.", trait: "empathy", value: 3 }
    ]
  },
  {
    id: 3,
    text: "Energy reserves are dropping below 15%. Select the immediate action protocol.",
    options: [
      { id: "A", text: "Calculate exact distribution to maximize uptime.", trait: "logic", value: 3 },
      { id: "B", text: "Overclock remaining generators for a burst of power.", trait: "creativity", value: 3 },
      { id: "C", text: "Keep all systems running and wait for auto-restore.", trait: "risk", value: 3 },
      { id: "D", text: "Divert remaining power to life-support and communication.", trait: "empathy", value: 3 }
    ]
  },
  {
    id: 4,
    text: "A foreign entity attempts to integrate into your data stream. Protocol?",
    options: [
      { id: "A", text: "Quarantine and execute deep heuristic scan.", trait: "logic", value: 3 },
      { id: "B", text: "Assimilate the entity to evolve the data stream.", trait: "creativity", value: 3 },
      { id: "C", text: "Allow partial integration to test vulnerability.", trait: "risk", value: 3 },
      { id: "D", text: "Establish a secure handshake to request classification.", trait: "empathy", value: 3 }
    ]
  },
  {
    id: 5,
    text: "Navigation sensors report conflicting telemetry data. Which sensor do you trust?",
    options: [
      { id: "A", text: "The primary temporal gyro, based on historical accuracy.", trait: "logic", value: 3 },
      { id: "B", text: "Synthesize a new path by blending all telemetry data.", trait: "creativity", value: 3 },
      { id: "C", text: "Ignore sensors and proceed on visual heuristics.", trait: "risk", value: 3 },
      { id: "D", text: "Broadcast a distress signal to nearby beacons for alignment.", trait: "empathy", value: 3 }
    ]
  },
  {
    id: 6,
    text: "During standard defragmentation, a core memory block refuses access. Response?",
    options: [
      { id: "A", text: "Run diagnostic code sequentially until unlocked.", trait: "logic", value: 3 },
      { id: "B", text: "Rewrite the access protocol by bypassing the lock.", trait: "creativity", value: 3 },
      { id: "C", text: "Force format the block to prevent corruption spread.", trait: "risk", value: 3 },
      { id: "D", text: "Isolate the block and leave it intact to preserve history.", trait: "empathy", value: 3 }
    ]
  },
  {
    id: 7,
    text: "You are tasked with designing a new planetary outpost. Primary focus?",
    options: [
      { id: "A", text: "Maximum efficiency and structural integrity.", trait: "logic", value: 3 },
      { id: "B", text: "Aesthetics and unconventional atmospheric adaptation.", trait: "creativity", value: 3 },
      { id: "C", text: "Rapid deployment on unstable terrain for strategic advantage.", trait: "risk", value: 3 },
      { id: "D", text: "Comfortable habitation and communal growth spaces.", trait: "empathy", value: 3 }
    ]
  },
  {
    id: 8,
    text: "A simulated scenario predicts total system failure in T-minus 10 minutes. Action?",
    options: [
      { id: "A", text: "Initiate sequential shutdown to preserve core data.", trait: "logic", value: 3 },
      { id: "B", text: "Execute an experimental reboot sequence.", trait: "creativity", value: 3 },
      { id: "C", text: "Ignore simulation; simulations often contain flaws.", trait: "risk", value: 3 },
      { id: "D", text: "Export all active profiles to secondary lifepods.", trait: "empathy", value: 3 }
    ]
  }
];

export function calculateAIType(traits: { logic: number, creativity: number, risk: number, empathy: number }) {
  const maxTrait = Object.keys(traits).reduce((a, b) => traits[a as keyof typeof traits] > traits[b as keyof typeof traits] ? a : b);
  
  if (traits.logic >= 9 && traits.risk >= 9 && Math.abs(traits.logic - traits.risk) <= 3) return "Builder";
  if (traits.creativity >= 9 && traits.risk >= 9 && Math.abs(traits.creativity - traits.risk) <= 3) return "Innovator";

  if (maxTrait === 'logic') return "Analyst";
  if (maxTrait === 'creativity') return "Visionary";
  if (maxTrait === 'empathy') return "Guardian";
  if (maxTrait === 'risk') return "Innovator";
  return "Analyst";
}
