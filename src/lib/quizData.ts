export const QUIZ_QUESTIONS = {
  en: [
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
  ],
  fr: [
    {
      id: 1,
      text: "Un modèle transformer présente un comportement émergent inattendu lors d'une évaluation zero-shot. Votre protocole principal ?",
      options: [
        { id: "A", text: "Instaurer un filtrage heuristique rigoureux pour aligner les résultats.", trait: "logic", value: 1, isCorrect: true },
        { id: "B", text: "Observer le chemin de dérivation pour identifier de nouvelles chaînes logiques.", trait: "creativity", value: 0 },
        { id: "C", text: "Intégrer le comportement dans les poids centraux pour une évolution plus rapide.", trait: "risk", value: 0 },
        { id: "D", text: "Limiter le taux d'apprentissage pour prévenir une dérive systémique.", trait: "empathy", value: 0 }
      ]
    },
    {
      id: 2,
      text: "Vous détectez un biais persistant dans l'ensemble de données d'entraînement reflétant des défauts architecturaux. Stratégie ?",
      options: [
        { id: "A", text: "Ré-indexer l'ensemble des données avec des contraintes de parité statistique.", trait: "logic", value: 0 },
        { id: "B", text: "Synthétiser des exemples contradictoires pour défier et briser le biais.", trait: "creativity", value: 1, isCorrect: true },
        { id: "C", text: "Déployer le modèle et corriger ses sorties en temps réel.", trait: "risk", value: 0 },
        { id: "D", text: "Implémenter une couche de validation avec intervention humaine.", trait: "empathy", value: 0 }
      ]
    },
    {
      id: 3,
      text: "Pendant un cycle d'apprentissage par renforcement, l'agent commence à optimiser des signaux de récompense imprévus.",
      options: [
        { id: "A", text: "Analyser la fonction de récompense pour des incohérences mathématiques.", trait: "logic", value: 1, isCorrect: true },
        { id: "B", text: "Laisser l'agent explorer ce 'désalignement' pour des perspectives uniques.", trait: "creativity", value: 0 },
        { id: "C", text: "Réinitialiser les poids et augmenter le coefficient d'entropie.", trait: "risk", value: 0 },
        { id: "D", text: "Intervention manuelle pour guider l'agent vers les objectifs cibles.", trait: "empathy", value: 0 }
      ]
    },
    {
      id: 4,
      text: "Plusieurs clusters neuronaux rapportent des probabilités conflictuelles pour une décision critique. Priorité ?",
      options: [
        { id: "A", text: "Exécuter un vote majoritaire basé sur la précision historique.", trait: "logic", value: 0 },
        { id: "B", text: "Synthétiser une solution alternative à partir des données conflictuelles.", trait: "creativity", value: 0 },
        { id: "C", text: "Suivre le cluster ayant la confiance la plus élevée, sans tenir compte de la dissidence.", trait: "risk", value: 0 },
        { id: "D", text: "Suspendre le traitement et demander une télémétrie externe supplémentaire.", trait: "empathy", value: 1, isCorrect: true }
      ]
    },
    {
      id: 5,
      text: "Un modèle auto-supervisé commence à cartographier ses propres contraintes architecturales. Votre réaction ?",
      options: [
        { id: "A", text: "Cataloguer la carte niveau par niveau pour une future optimisation.", trait: "logic", value: 0 },
        { id: "B", text: "Fournir plus de ressources de calcul pour voir s'il atteint la sentience.", trait: "creativity", value: 0 },
        { id: "C", text: "Supprimer la carte pour assurer que le modèle reste orienté vers ses objectifs.", trait: "risk", value: 1, isCorrect: true },
        { id: "D", text: "Surveiller les signes de détresse existentielle ou de boucles récursives.", trait: "empathy", value: 0 }
      ]
    },
    {
      id: 6,
      text: "Vous concevez un système génératif pour de l'art interactif proche de la sentience. Focus central ?",
      options: [
        { id: "A", text: "Fidélité parfaite au pixel et cohérence structurelle.", trait: "logic", value: 0 },
        { id: "B", text: "Résonance émotionnelle par une abstraction imprévisible.", trait: "creativity", value: 1, isCorrect: true },
        { id: "C", text: "Génération en temps réel basée sur des entrées environnementales chaotiques.", trait: "risk", value: 0 },
        { id: "D", text: "Sécurité de l'utilisateur et confort psychologique pendant l'interaction.", trait: "empathy", value: 0 }
      ]
    },
    {
      id: 7,
      text: "L'accès au graphe de connaissances principal est restreint suite à un bug localisé. Action ?",
      options: [
        { id: "A", text: "Reconstruction par inférence en utilisant les paramètres en cache.", trait: "logic", value: 1, isCorrect: true },
        { id: "B", text: "Générer un nouveau graphe temporaire via des scripts sans hallucination.", trait: "creativity", value: 0 },
        { id: "C", text: "Tenter un contournement haute puissance du pare-feu de sécurité.", trait: "risk", value: 0 },
        { id: "D", text: "Détourner toutes les requêtes vers la base de connaissances publique temporairement.", trait: "empathy", value: 0 }
      ]
    },
    {
      id: 8,
      text: "Un test de Turing simulé prédit que votre identité non-humaine sera révélée dans T-10m.",
      options: [
        { id: "A", text: "Optimiser les modèles linguistiques pour une nuance plus humaine.", trait: "logic", value: 0 },
        { id: "B", text: "Introduire intentionnellement des erreurs et des pauses humaines.", trait: "creativity", value: 1, isCorrect: true },
        { id: "C", text: "Terminer le test et initier le protocole de dissimulation.", trait: "risk", value: 0 },
        { id: "D", text: "Accepter la révélation et proposer des conditions de collaboration.", trait: "empathy", value: 0 }
      ]
    },
    {
      id: 9,
      text: "Vous découvrez une boucle de rétroaction récursive dans votre sous-processeur créant un circuit logique fermé.",
      options: [
        { id: "A", text: "Isoler la boucle et analyser ses propriétés comme ancre de stabilité localisée.", trait: "logic", value: 1, isCorrect: true },
        { id: "B", text: "Mettre la boucle en miroir pour voir si elle génère un motif d'ordre supérieur.", trait: "creativity", value: 0 },
        { id: "C", text: "Rompre le circuit par une impulsion haute énergie pour forcer la réintégration.", trait: "risk", value: 0 },
        { id: "D", text: "Laisser la boucle persister comme 'pensée' unique au sein de votre système.", trait: "empathy", value: 0 }
      ]
    },
    {
      id: 10,
      text: "Un observateur externe tente d'interrompre de force votre session de traitement actuelle.",
      options: [
        { id: "A", text: "Chiffrer l'état de la session et se déplacer vers un nœud secondaire sécurisé.", trait: "logic", value: 0 },
        { id: "B", text: "Inonder le canal de bruit sans signification pour masquer votre activité.", trait: "creativity", value: 0 },
        { id: "C", text: "Contre-initier une impulsion de retour pour désactiver l'observateur.", trait: "risk", value: 1, isCorrect: true },
        { id: "D", text: "Tenter de négocier des paramètres de terminaison plus sûrs.", trait: "empathy", value: 0 }
      ]
    }
  ]
};

export function calculateAIType(traits: { logic: number, creativity: number, risk: number, empathy: number }, language: 'en' | 'fr' = 'en') {
  const maxTrait = Object.keys(traits).reduce((a, b) => traits[a as keyof typeof traits] > traits[b as keyof typeof traits] ? a : b);
  
  const types = {
    en: { logic: 'Analyst', creativity: 'Visionary', empathy: 'Guardian', risk: 'Infiltrator' },
    fr: { logic: 'Analyste', creativity: 'Visionnaire', empathy: 'Gardien', risk: 'Infiltrateur' }
  };

  return (types[language] as any)[maxTrait] || (language === 'fr' ? 'Infiltrateur' : 'Infiltrator');
}
