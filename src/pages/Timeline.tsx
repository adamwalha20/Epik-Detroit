import Navigation from '../components/Navigation';
import { TIMELINE_EVENTS } from '../lib/timelineData';

export default function Timeline() {
  return (
    <div className="bg-[#131313] text-on-surface font-body antialiased min-h-screen flex flex-col pt-24 pb-48 md:pb-12 overflow-x-hidden relative scan-line-bg">
      <Navigation />
      
      <main className="flex-grow flex flex-col px-6 md:px-12 relative z-10 w-full max-w-7xl mx-auto">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-container/5 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-secondary-container/5 rounded-full blur-[80px] pointer-events-none"></div>
        
        <div className="mb-12 md:mb-24 mt-8 md:mt-0 z-10">
          <h2 className="font-headline text-3xl md:text-5xl text-on-surface tracking-wide uppercase mb-2">MISSION TIMELINE</h2>
          <p className="font-body text-on-surface-variant text-sm md:text-base max-w-xl border-l-2 border-primary pl-4 opacity-80 uppercase tracking-widest">
            Chronological deployment sequence for April 26. Maintain synchronization at all checkpoints.
          </p>
        </div>

        <div className="relative w-full overflow-x-auto pb-24 pt-12 z-10 no-scrollbar" style={{ scrollbarWidth: 'none' }}>
          <div className="absolute top-1/2 left-0 w-[200%] h-[1px] bg-outline-variant/20 -translate-y-1/2 z-0"></div>
          
          <div className="flex items-start gap-16 md:gap-32 w-max px-8">
            {TIMELINE_EVENTS.map((event, index) => (
              <div key={index} className="relative flex flex-col items-center group w-64 md:w-72">
                {/* Time Label */}
                <div className="absolute -top-20 text-center w-full group-hover:scale-110 transition-transform duration-300">
                  <span className="block font-label text-[10px] text-primary tracking-[0.2em] uppercase mb-1">{event.label}</span>
                  <span className="block font-headline text-on-surface text-2xl md:text-3xl text-glow">{event.time}</span>
                </div>

                {/* Node Dot */}
                <div className="w-10 h-10 rounded-full bg-surface-container-low border border-primary/40 z-10 flex items-center justify-center glow-primary relative group-hover:border-primary transition-colors">
                  <div className="w-3 h-3 rounded-full bg-primary/80 group-hover:bg-primary group-hover:scale-125 transition-all animate-pulse"></div>
                  <div className="absolute inset-0 rounded-full border border-primary/20 scale-[1.6] opacity-40 group-hover:scale-[1.8] group-hover:opacity-60 transition-all"></div>
                  
                  {/* Connection Line Indicator */}
                  {index < TIMELINE_EVENTS.length - 1 && (
                    <div className="absolute left-full w-16 md:w-32 h-[2px] bg-gradient-to-r from-primary/60 to-transparent"></div>
                  )}
                </div>

                {/* Content Card */}
                <div className="absolute top-16 text-center w-full opacity-90 group-hover:opacity-100 transition-opacity">
                  <div className="bg-surface-container-low/40 backdrop-blur-md p-5 rounded-xl border border-outline-variant/20 group-hover:border-primary/30 transition-all hover:bg-surface-container-low/60 shadow-lg">
                    <span className="inline-block text-[9px] font-label text-primary/70 tracking-widest mb-1">[{event.type}]</span>
                    <h3 className="font-headline text-on-surface text-sm md:text-base tracking-wider uppercase mb-3 leading-tight">{event.title}</h3>
                    <p className="font-body text-[10px] md:text-xs text-on-surface-variant leading-relaxed mb-4">{event.description}</p>
                    
                    {event.speaker && (
                      <div className="mt-4 pt-4 border-t border-outline-variant/10 flex items-center gap-3 text-left">
                        <div className="w-8 h-8 rounded-full border border-primary/20 overflow-hidden bg-primary/5 shrink-0">
                          <img src={event.speaker.avatar_url} alt={event.speaker.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex flex-col">
                          <span className="text-[10px] font-bold text-white tracking-wider uppercase">{event.speaker.name}</span>
                          <span className="text-[8px] text-primary uppercase font-label tracking-widest">{event.speaker.role}</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}

            {/* End Stream Node */}
            <div className="relative flex flex-col items-center group w-32 opacity-30">
              <div className="w-6 h-6 rounded-sm bg-surface-container border border-outline-variant/50 z-10 flex items-center justify-center rotate-45 relative">
              </div>
              <div className="absolute top-12 text-center w-full">
                <h3 className="font-headline text-outline text-[10px] tracking-[0.3em] uppercase">END_STREAM</h3>
              </div>
            </div>
          </div>
        </div>

        {/* Global HUD Elements */}
        <div className="mt-24 mb-12 grid grid-cols-2 md:grid-cols-4 gap-4 z-10 opacity-60">
          <div className="border border-outline-variant/20 p-2 text-[9px] font-label uppercase tracking-widest text-on-surface-variant">
            Stream Status: <span className="text-primary">Operational</span>
          </div>
          <div className="border border-outline-variant/20 p-2 text-[9px] font-label uppercase tracking-widest text-on-surface-variant">
            Temporal Sync: <span className="text-primary">Valid</span>
          </div>
          <div className="border border-outline-variant/20 p-2 text-[9px] font-label uppercase tracking-widest text-on-surface-variant">
            Event Node: <span className="text-primary">Detroit_2604</span>
          </div>
          <div className="border border-outline-variant/20 p-2 text-[9px] font-label uppercase tracking-widest text-on-surface-variant">
            Sequence ID: <span className="text-primary">EPIK_BT_02</span>
          </div>
        </div>
      </main>
    </div>
  );
}

