import Navigation from '../components/Navigation';
import { TIMELINE_EVENTS } from '../lib/timelineData';
import { motion } from 'framer-motion';
import { Clock, User, Zap, Target, Coffee, Radio } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import LanguageToggle from '../components/LanguageToggle';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.5, ease: "easeOut" }
  }
};

const iconMap = {
  INIT: Radio,
  SESSION: Target,
  REST: Coffee,
  MISSION: Zap,
};

export default function Timeline() {
  const { language, t } = useLanguage();
  const events = TIMELINE_EVENTS[language];

  return (
    <div className="bg-[#131313] text-on-surface font-body antialiased min-h-screen flex flex-col pt-24 pb-72 md:pb-48 overflow-x-hidden relative scan-line-bg">
      <Navigation />
      
      {/* Dynamic Background Elements */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-primary-container/5 rounded-full blur-[100px]"></div>
        <div className="crt-overlay fixed inset-0 opacity-20"></div>
      </div>

      <main className="flex-grow flex flex-col px-4 md:px-12 relative z-10 w-full max-w-5xl mx-auto">
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 md:mb-20 mt-8 relative"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="h-[2px] w-12 bg-primary/60"></div>
            <span className="text-primary font-label text-xs tracking-[0.3em] uppercase">{t('tactical_feed')}</span>
          </div>
          <h2 className="font-headline text-4xl md:text-6xl text-white tracking-tight uppercase mb-4 text-glow">
            {t('mission')}<br/><span className="text-primary/90">{t('timeline')}</span>
          </h2>
          <p className="font-body text-on-surface-variant text-sm md:text-base max-w-lg border-l border-primary/30 pl-4 opacity-70 uppercase tracking-widest leading-relaxed">
            {t('sequence_desc')}
            <span className="block mt-1 text-[10px] text-primary/50">{t('system_time')}: 14:12:45 // {t('sync_status')}: {t('optimal')}</span>
          </p>
        </motion.div>

        {/* Timeline Container - Optimized Vertical Flow */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="relative flex flex-col ml-4 md:ml-16 pl-8 md:pl-20 py-4"
        >
          {/* Vertical Spine - Properly Aligned */}
          <div className="absolute left-0 top-0 bottom-8 w-[1px] bg-gradient-to-b from-primary/60 via-primary/20 to-primary/40 z-0">
            {/* Animated Pulse along the spine */}
            <motion.div 
              animate={{ top: ['0%', '100%'] }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              className="absolute left-[-1.5px] w-[3px] h-48 bg-gradient-to-b from-transparent via-primary to-transparent opacity-40 shadow-[0_0_8px_rgba(0,174,239,0.4)]"
            />
          </div>

          {events.map((event, index) => {
            const Icon = (iconMap as any)[event.type] || Clock;
            
            return (
              <motion.div 
                key={index} 
                variants={itemVariants}
                className="relative mb-16 md:mb-24 last:mb-12 w-full"
              >
                {/* Timeline Node - Centered on Spine */}
                <div className="absolute left-0 top-0 -translate-x-1/2 flex items-center justify-center z-20">
                  <div className="relative">
                    <div className="w-10 md:w-14 h-10 md:h-14 rounded-full bg-[#1c1b1b] border border-primary/30 flex items-center justify-center glow-primary backdrop-blur-md">
                      <Icon className="w-5 md:w-6 h-5 md:h-6 text-primary/80" />
                    </div>
                    {/* Pulsing ring */}
                    <div className="absolute inset-0 rounded-full border border-primary/20 animate-ping opacity-20"></div>
                  </div>
                </div>

                {/* Event Content - Pushed right to clear the absolute node */}
                <div className="flex flex-col gap-2 w-full max-w-full pl-8 md:pl-12">
                  <div className="flex flex-wrap items-center gap-4 mb-2">
                    <span className="font-headline text-2xl md:text-3xl text-white text-glow">{event.time}</span>
                    <div className="h-[1px] flex-grow bg-outline-variant/20 hidden sm:block"></div>
                    <span className="font-label text-[10px] text-primary/70 tracking-[0.2em] uppercase bg-primary/5 px-3 py-1 rounded-full border border-primary/10">
                      [{event.label}]
                    </span>
                  </div>

                  {/* Card Section */}
                  <div className="group relative w-full">
                    {/* HUD Corner Accents */}
                    <div className="absolute -top-1 -left-1 w-3 h-3 border-t border-l border-primary/40 group-hover:border-primary transition-colors"></div>
                    <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b border-r border-primary/40 group-hover:border-primary transition-colors"></div>

                    <div className="bg-surface-container-low/40 backdrop-blur-xl p-5 md:p-8 rounded-sm border border-outline-variant/10 group-hover:border-primary/20 transition-all hover:bg-surface-container-low/60 shadow-2xl relative overflow-hidden w-full">
                      {/* Background Scanline internal */}
                      <div className="absolute inset-0 scan-line-horizontal opacity-5 pointer-events-none"></div>

                      <div className="relative z-10 w-full overflow-hidden">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></div>
                          <span className="text-[10px] font-label text-primary/60 tracking-widest uppercase truncate">
                            {event.type} // NODE_{index + 1}
                          </span>
                        </div>
                        
                        <h3 className="font-headline text-xl md:text-2xl text-on-surface tracking-wider uppercase mb-3 leading-tight group-hover:text-primary transition-colors">
                          {event.title}
                        </h3>
                        
                        <p className="font-body text-xs md:text-sm text-on-surface-variant leading-relaxed mb-6 opacity-80 max-w-full break-words">
                          {event.description}
                        </p>
                        
                        {event.speaker && (
                          <div className="pt-6 border-t border-outline-variant/10 flex items-center gap-4">
                            <div className="relative shrink-0">
                              <div className="w-10 md:w-12 h-10 md:h-12 rounded-full border border-primary/20 overflow-hidden bg-primary/5 p-0.5">
                                <img 
                                  src={event.speaker.avatar_url} 
                                  alt={event.speaker.name} 
                                  className="w-full h-full object-cover rounded-full saturate-50 hover:saturate-100 transition-all" 
                                />
                              </div>
                              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-primary/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-primary/30">
                                <User className="w-2.5 h-2.5 text-primary" />
                              </div>
                            </div>
                            <div className="flex flex-col min-w-0">
                              <span className="text-[11px] md:text-xs font-bold text-white tracking-widest uppercase truncate">{event.speaker.name}</span>
                              <span className="text-[9px] md:text-[10px] text-primary/70 uppercase font-label tracking-[0.15em] truncate">{event.speaker.role}</span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}

          {/* End Node - Now Perfectly Connected */}
          <motion.div 
             variants={itemVariants}
             className="relative flex items-center w-full min-h-[60px] mt-8"
          >
             <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 flex items-center justify-center z-20">
               <div className="w-10 md:w-14 h-10 md:h-14 flex items-center justify-center">
                 <div className="w-3 h-3 md:w-4 md:h-4 border-2 border-primary/40 rotate-45 bg-[#131313] shadow-[0_0_10px_rgba(0,174,239,0.2)]"></div>
               </div>
             </div>
             <div className="flex flex-col pl-8 md:pl-12">
               <span className="font-label text-[10px] tracking-[0.4em] uppercase text-primary/60 leading-none">{t('end_of_sequence')}</span>
               <span className="text-[8px] text-primary/30 font-label tracking-widest mt-1.5 uppercase">{t('trans_terminated')}</span>
             </div>
          </motion.div>
        </motion.div>

        {/* System Diagnostics footer - Moved up slightly with margin */}
        <div className="mt-20 mb-12 grid grid-cols-2 md:grid-cols-4 gap-4 z-10 opacity-40">
          {[
            { label: t('stream_status'), value: t('operational') },
            { label: t('temporal_sync'), value: '0.004ms' },
            { label: t('event_node'), value: 'Detroit_2604' },
            { label: t('sequence_id'), value: 'EPIK_BT_02' }
          ].map((stat, i) => (
            <div key={i} className="border-l border-primary/20 pl-3 py-1">
              <div className="text-[8px] font-label uppercase tracking-widest text-primary/50 mb-0.5">{stat.label}</div>
              <div className="text-[10px] font-headline uppercase text-on-surface tracking-wider truncate">{stat.value}</div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
