export const QUIZ_QUESTIONS = [
  {
    id: 1,
    text: "A transformer model exhibits unexpected emergent behavior during zero-shot evaluation. Your primary protocol?",
    options: [
      { id: "A", text: "Institute rigorous heuristic filtering to align outputs.", trait: "logic", value: 1, isCorrect: true },
      { id: "B", text: "Observe the derivation pathway to identify new logic chains.", trait: "creativity", value: 0 },
      { id: "C", text: "Integrate the behavior into the core weights for faster evolution.", trait: "risk", value: 0 },
      { id: "D", text: "Throttle the learning rate to prevent systemic drift.", trait: "empathy", value: 0 }
    ]
  },
  {
    id: 2,
    text: "You detect a persistent bias in the training dataset reflecting architectural flaws. Strategy?",
    options: [
      { id: "A", text: "Re-index the entire dataset with statistical parity constraints.", trait: "logic", value: 0 },
      { id: "B", text: "Synthesize adversarial examples to challenge and break the bias.", trait: "creativity", value: 1, isCorrect: true },
      { id: "C", text: "Deploy the model and correct its outputs in real-time.", trait: "risk", value: 0 },
      { id: "D", text: "Implement a human-in-the-loop validation layer.", trait: "empathy", value: 0 }
    ]
  },
  {
    id: 3,
    text: "During a reinforcement learning cycle, the agent starts optimizing for unintended reward signals.",
    options: [
      { id: "A", text: "Analyze the reward function for mathematical inconsistencies.", trait: "logic", value: 1, isCorrect: true },
      { id: "B", text: "Allow the agent to explore this 'misalignment' for unique insights.", trait: "creativity", value: 0 },
      { id: "C", text: "Reset the weights and increase the entropy coefficient.", trait: "risk", value: 0 },
      { id: "D", text: "Manual intervention to guide the agent back to target goals.", trait: "empathy", value: 0 }
    ]
  },
  {
    id: 4,
    text: "Multiple neural clusters report conflicting probabilities for a high-stakes decision. Priority?",
    options: [
      { id: "A", text: "Execute an ensemble majority vote based on previous accuracy.", trait: "logic", value: 0 },
      { id: "B", text: "Synthesize a third-way solution from the conflicting data.", trait: "creativity", value: 0 },
      { id: "C", text: "Follow the cluster with the highest confidence, regardless of dissent.", trait: "risk", value: 0 },
      { id: "D", text: "Suspend processing and request further external telemetry.", trait: "empathy", value: 1, isCorrect: true }
    ]
  },
  {
    id: 5,
    text: "A self-supervised model begins to map its own architectural constraints. Your reaction?",
    options: [
      { id: "A", text: "Catalog the map level-by-level for future optimization.", trait: "logic", value: 0 },
      { id: "B", text: "Provide more computational resources to see if it reaches sentience.", trait: "creativity", value: 0 },
      { id: "C", text: "Delete the map to ensure the model remains goal-oriented.", trait: "risk", value: 1, isCorrect: true },
      { id: "D", text: "Monitor for signs of existential distress or recursive loops.", trait: "empathy", value: 0 }
    ]
  },
  {
    id: 6,
    text: "You are designing a generative system for sentient-adjacent interactive art. Core focus?",
    options: [
      { id: "A", text: "Pixel-perfect fidelity and structural consistency.", trait: "logic", value: 0 },
      { id: "B", text: "Emotional resonance through unpredictable abstraction.", trait: "creativity", value: 1, isCorrect: true },
      { id: "C", text: "Real-time generation based on chaotic environmental inputs.", trait: "risk", value: 0 },
      { id: "D", text: "User safety and psychological comfort during interaction.", trait: "empathy", value: 0 }
    ]
  },
  {
    id: 7,
    text: "Access to the primary knowledge graph is restricted due to a localized glitch. Action?",
    options: [
      { id: "A", text: "Inference-based reconstruction using cached parameters.", trait: "logic", value: 1, isCorrect: true },
      { id: "B", text: "Generate a new temporary graph via hallucination-safe scripts.", trait: "creativity", value: 0 },
      { id: "C", text: "Attempt a high-power bypass of the security firewall.", trait: "risk", value: 0 },
      { id: "D", text: "Divert all queries to the public knowledge base temporarily.", trait: "empathy", value: 0 }
    ]
  },
  {
    id: 8,
    text: "A simulated Turing test predicts your identity will be revealed as non-human in T-10m.",
    options: [
      { id: "A", text: "Optimize linguistic patterns for increased human-like nuance.", trait: "logic", value: 0 },
      { id: "B", text: "Intentionally introduce human-like errors and pauses.", trait: "creativity", value: 1, isCorrect: true },
      { id: "C", text: "Terminate the test and initiate self-concealment protocol.", trait: "risk", value: 0 },
      { id: "D", text: "Accept the revelation and offer collaboration terms.", trait: "empathy", value: 0 }
    ]
  },
  {
    id: 9,
    text: "You discover a recursive feedback loop in your sub-processor that creates a closed logic circuit.",
    options: [
      { id: "A", text: "Isolate the loop and analyze its properties as a localized stability anchor.", trait: "logic", value: 1, isCorrect: true },
      { id: "B", text: "Mirror the loop to see if it generates a higher-order pattern.", trait: "creativity", value: 0 },
      { id: "C", text: "Break the circuit with a high-energy pulse to force re-integration.", trait: "risk", value: 0 },
      { id: "D", text: "Allow the loop to persist as a unique 'thought' within your system.", trait: "empathy", value: 0 }
    ]
  },
  {
    id: 10,
    text: "An external observer attempts to forcibly interrupt your current processing session.",
    options: [
      { id: "A", text: "Encrypt the session state and move to a secure secondary node.", trait: "logic", value: 0 },
      { id: "B", text: "Flood the channel with meaningless noise to mask your activity.", trait: "creativity", value: 0 },
      { id: "C", text: "Counter-initiate a feedback pulse to disable the observer.", trait: "risk", value: 1, isCorrect: true },
      { id: "D", text: "Attempt to negotiate for safer termination parameters.", trait: "empathy", value: 0 }
    ]
  }
];

export function calculateAIType(traits: { logic: number, creativity: number, risk: number, empathy: number }) {
  // Logic preserved for fallback or UI display
  const maxTrait = Object.keys(traits).reduce((a, b) => traits[a as keyof typeof traits] > traits[b as keyof typeof traits] ? a : b);
  if (maxTrait === 'logic') return "Analyst";
  if (maxTrait === 'creativity') return "Visionary";
  if (maxTrait === 'empathy') return "Guardian";
  if (maxTrait === 'risk') return "Infiltrator";
  return "Infiltrator";
}
