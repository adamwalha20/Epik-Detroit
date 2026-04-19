import Navigation from '../components/Navigation';

export default function Timeline() {
  return (
    <div className="bg-background text-on-surface font-body min-h-screen overflow-x-hidden selection:bg-primary-container selection:text-on-primary-container">
      <Navigation />
      
      <main className="pt-24 pb-32 md:pb-12 px-6 max-w-7xl mx-auto min-h-screen flex flex-col justify-center scan-line-bg relative">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-container/5 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-secondary-container/5 rounded-full blur-[80px] pointer-events-none"></div>
        
        <div className="mb-12 md:mb-24 mt-8 md:mt-0 z-10">
          <h2 className="font-headline text-3xl md:text-5xl text-on-surface tracking-wide uppercase mb-2">SEQUENCE LOG</h2>
          <p className="font-body text-on-surface-variant text-sm md:text-base max-w-xl border-l-2 border-primary pl-4 opacity-80">Chronological data stream monitoring. Subject interaction points logged and timestamped relative to core system time.</p>
        </div>

        <div className="relative w-full overflow-x-auto pb-16 pt-8 z-10" style={{ scrollbarWidth: 'none' }}>
          <div className="absolute top-1/2 left-0 w-[150%] h-[1px] bg-outline-variant/30 -translate-y-1/2 z-0"></div>
          <div className="absolute top-1/2 left-0 w-[60%] h-[2px] bg-primary/60 -translate-y-1/2 z-0 shadow-[0_0_10px_rgba(130,207,255,0.4)]"></div>
          
          <div className="flex items-center gap-16 md:gap-32 w-max px-8">
            <div className="relative flex flex-col items-center group w-48">
              <div className="absolute -top-16 text-center w-full">
                <span className="block font-label text-[10px] text-outline tracking-[0.05em] uppercase mb-1">EXEC_TIME</span>
                <span className="block font-headline text-on-surface-variant text-lg">08:00</span>
              </div>
              <div className="w-8 h-8 rounded-full bg-surface-container-low border border-primary/50 z-10 flex items-center justify-center glow-primary relative">
                <div className="w-2 h-2 rounded-full bg-primary"></div>
                <div className="absolute inset-0 rounded-full border border-primary/30 scale-[1.5] opacity-50"></div>
              </div>
              <div className="absolute top-16 text-center w-full">
                <h3 className="font-headline text-primary text-sm tracking-wider uppercase text-glow mb-1">Init Sequence</h3>
                <p className="font-body text-xs text-on-surface-variant/70">System boot and baseline calibration complete.</p>
              </div>
            </div>

            <div className="relative flex flex-col items-center group w-48">
              <div className="absolute -top-16 text-center w-full">
                <span className="block font-label text-[10px] text-outline tracking-[0.05em] uppercase mb-1">EXEC_TIME</span>
                <span className="block font-headline text-on-surface-variant text-lg">09:30</span>
              </div>
              <div className="w-6 h-6 rounded-full bg-surface-container border border-primary/40 z-10 flex items-center justify-center relative">
                <div className="w-1.5 h-1.5 rounded-full bg-primary/70"></div>
              </div>
              <div className="absolute top-16 text-center w-full">
                <h3 className="font-headline text-on-surface text-sm tracking-wider uppercase mb-1">Data Ingestion</h3>
                <p className="font-body text-xs text-on-surface-variant/70">Primary feeds established. No anomalies detected.</p>
              </div>
            </div>

            <div className="relative flex flex-col items-center group w-56">
              <div className="absolute -top-20 text-center w-full">
                <span className="inline-block bg-secondary-container/20 text-secondary-container px-2 py-0.5 rounded-sm font-label text-[9px] uppercase tracking-wider mb-2 border border-secondary-container/30">CURRENT_OP</span>
                <span className="block font-headline text-primary text-2xl text-glow">11:45</span>
              </div>
              <div className="w-16 h-16 rounded-full bg-surface-container-lowest border border-primary z-10 flex items-center justify-center glow-primary relative shadow-[inset_0_0_20px_rgba(0,174,239,0.2)]">
                <div className="w-4 h-4 rounded-full bg-primary shadow-[0_0_10px_rgba(130,207,255,0.8)] animate-pulse"></div>
                <div className="absolute -inset-2 rounded-full border border-primary/20 border-dashed animate-[spin_4s_linear_infinite]"></div>
                <div className="absolute -inset-4 rounded-full border border-outline-variant/30"></div>
                <div className="absolute top-1/2 right-full w-8 h-[1px] bg-primary/60"></div>
              </div>
              <div className="absolute top-20 text-center w-full bg-surface-container-low/80 backdrop-blur-sm p-3 rounded-lg border border-outline-variant/30 mt-2">
                <h3 className="font-headline text-primary text-base tracking-wider uppercase text-glow mb-1">Deep Scan</h3>
                <p className="font-body text-xs text-on-surface">Analyzing subject bio-rhythms. Processing stream active.</p>
                <div className="w-full bg-surface-container h-1 mt-3 rounded-full overflow-hidden">
                  <div className="bg-primary w-[65%] h-full shadow-[0_0_5px_rgba(0,174,239,0.8)] animate-pulse"></div>
                </div>
              </div>
            </div>

            <div className="relative flex flex-col items-center group w-48">
              <div className="absolute -top-16 text-center w-full opacity-50">
                <span className="block font-label text-[10px] text-outline tracking-[0.05em] uppercase mb-1">EST_TIME</span>
                <span className="block font-headline text-outline text-lg">14:00</span>
              </div>
              <div className="w-6 h-6 rounded-full bg-surface-container-low border border-outline-variant/50 z-10 flex items-center justify-center relative opacity-50">
                <div className="w-1.5 h-1.5 rounded-full bg-outline-variant"></div>
              </div>
              <div className="absolute top-16 text-center w-full opacity-50">
                <h3 className="font-headline text-outline text-sm tracking-wider uppercase mb-1">Sync Protocol</h3>
                <p className="font-body text-xs text-on-surface-variant/50">Awaiting trigger from preceding operations.</p>
              </div>
            </div>

            <div className="relative flex flex-col items-center group w-48">
              <div className="absolute -top-16 text-center w-full">
                <span className="block font-label text-[10px] text-tertiary tracking-[0.05em] uppercase mb-1">CRITICAL_PATH</span>
                <span className="block font-headline text-outline text-lg">16:30</span>
              </div>
              <div className="w-8 h-8 rounded-full bg-surface-container border border-tertiary/40 z-10 flex items-center justify-center relative shadow-[0_0_15px_rgba(255,183,125,0.15)]">
                <div className="w-2 h-2 rounded-full bg-tertiary animate-ping"></div>
                <div className="absolute top-1/2 right-full w-full h-[1px] bg-tertiary/20 -translate-y-1/2 -z-10 border-t border-dashed border-tertiary/40"></div>
              </div>
              <div className="absolute top-16 text-center w-full">
                <h3 className="font-headline text-tertiary text-sm tracking-wider uppercase mb-1">Review Gate</h3>
                <p className="font-body text-xs text-on-surface-variant/70">Manual authorization required to proceed past this node.</p>
              </div>
            </div>

            <div className="relative flex flex-col items-center group w-32">
              <div className="w-4 h-4 rounded-sm bg-surface-container border border-outline-variant/50 z-10 flex items-center justify-center rotate-45 relative opacity-30">
              </div>
              <div className="absolute top-8 text-center w-full opacity-30">
                <h3 className="font-headline text-outline text-xs tracking-wider uppercase">END_STREAM</h3>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
