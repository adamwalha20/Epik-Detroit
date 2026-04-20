export interface TimelineEvent {
  time: string;
  label: string;
  title: string;
  description: string;
  status: 'upcoming' | 'current' | 'completed';
  type: 'INIT' | 'SESSION' | 'REST' | 'MISSION';
  speaker?: {
    name: string;
    role: string;
    avatar_url?: string;
  };
}

export const TIMELINE_EVENTS: Record<'en' | 'fr', TimelineEvent[]> = {
  en: [
    {
      time: '10:00',
      label: 'EXEC_TIME',
      title: 'INITIAL UPLINK',
      description: 'Subject arrival and registration. Network initialization and baseline calibration.',
      status: 'upcoming',
      type: 'INIT',
      speaker: {
        name: 'EPIK SUPPORT',
        role: 'Logistics Liaison',
        avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=support'
      }
    },
    {
      time: '11:00',
      label: 'PRIMARY_FEED',
      title: 'GEN-AI PROTOCOL',
      description: 'Core architecture deep dive. Exploring the neural horizons of Generative AI.',
      status: 'upcoming',
      type: 'SESSION',
      speaker: {
        name: 'ADAM WALHA',
        role: 'Core Architect',
        avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Adam'
      }
    },
    {
      time: '12:30',
      label: 'RESOURCE_DEPOT',
      title: 'SYNTHESIS BUFFER',
      description: 'Energy replenishment and peer-to-peer synchronization (Lunch Break).',
      status: 'upcoming',
      type: 'REST'
    },
    {
      time: '14:00',
      label: 'TACTICAL_DEPLOY',
      title: 'APPLICATIVE WORKSHOP',
      description: 'Hands-on mission deployment. Building the future in real-time environments.',
      status: 'upcoming',
      type: 'MISSION',
      speaker: {
        name: 'SYSTEMS LEAD',
        role: 'Tactical Engineer',
        avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=engineer'
      }
    }
  ],
  fr: [
    {
      time: '10:00',
      label: 'TEMPS_EXEC',
      title: 'LIAISON INITIALE',
      description: 'Arrivée et enregistrement des sujets. Initialisation du réseau et étalonnage de base.',
      status: 'upcoming',
      type: 'INIT',
      speaker: {
        name: 'SUPPORT EPIK',
        role: 'Liaison Logistique',
        avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=support'
      }
    },
    {
      time: '11:00',
      label: 'FLUX_PRINCIPAL',
      title: 'PROTOCOLE GEN-IA',
      description: 'Plongée profonde dans l\'architecture centrale. Exploration des horizons neuraux de l\'IA Générative.',
      status: 'upcoming',
      type: 'SESSION',
      speaker: {
        name: 'ADAM WALHA',
        role: 'Architecte Principal',
        avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Adam'
      }
    },
    {
      time: '12:30',
      label: 'DÉPÔT_RESSOURCES',
      title: 'TAMPON DE SYNTHÈSE',
      description: 'Réapprovisionnement énergétique et synchronisation pair à pair (Pause Déjeuner).',
      status: 'upcoming',
      type: 'REST'
    },
    {
      time: '14:00',
      label: 'DÉPLOIEMENT_TACTIQUE',
      title: 'ATELIER APPLICATIF',
      description: 'Déploiement de mission pratique. Construire le futur dans des environnements en temps réel.',
      status: 'upcoming',
      type: 'MISSION',
      speaker: {
        name: 'LEAD SYSTÈMES',
        role: 'Ingénieur Tactique',
        avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=engineer'
      }
    }
  ]
};
