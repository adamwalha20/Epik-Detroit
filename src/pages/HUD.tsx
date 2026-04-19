import Navigation from '../components/Navigation';

export default function HUD() {
  return (
    <div className="bg-background text-on-background font-body min-h-screen overflow-x-hidden flex flex-col relative selection:bg-primary-container selection:text-on-primary-container">
      <Navigation />
      
      <main className="flex-grow pt-24 pb-32 md:pb-24 px-6 md:px-12 relative z-10 max-w-7xl mx-auto w-full flex flex-col md:flex-row gap-8">
        <div className="absolute inset-0 pointer-events-none opacity-20 crt-overlay z-[-1]"></div>
        <div className="absolute top-[20%] left-[10%] w-[1px] h-[60%] bg-outline-variant/15 z-[-1]"></div>
        <div className="absolute top-[50%] left-[5%] w-[90%] h-[1px] bg-outline-variant/15 z-[-1]"></div>

        <div className="w-full md:w-5/12 flex flex-col gap-8">
          <div className="bg-surface-container-low p-6 rounded-DEFAULT border border-outline-variant/15 ambient-glow relative overflow-hidden group rounded-xl">
            <div className="absolute top-0 right-0 w-16 h-16 bg-primary-container/10 blur-xl group-hover:bg-primary-container/20 transition-all duration-500"></div>
            <div className="flex items-center gap-3 mb-6">
              <div className="relative flex items-center justify-center">
                <span className="absolute w-3 h-3 bg-tertiary rounded-full blur-[4px]"></span>
                <span className="relative w-2 h-2 bg-tertiary rounded-full"></span>
              </div>
              <h2 className="font-label text-sm uppercase tracking-[0.05em] text-on-surface">Live Feed</h2>
            </div>
            
            <div className="space-y-4 font-headline">
              <div className="flex justify-between items-end border-b border-outline-variant/20 pb-2">
                <span className="text-xs text-on-surface-variant uppercase tracking-widest">Network</span>
                <span className="text-lg text-primary">SECURE_LINK</span>
              </div>
              <div className="flex justify-between items-end border-b border-outline-variant/20 pb-2">
                <span className="text-xs text-on-surface-variant uppercase tracking-widest">Participants Connected</span>
                <span className="text-2xl text-secondary-container">100+</span>
              </div>
              <div className="flex justify-between items-end">
                <span className="text-xs text-on-surface-variant uppercase tracking-widest">Uplink</span>
                <span className="text-sm text-on-surface font-body">98.2 Mbps</span>
              </div>
            </div>
          </div>

          <div className="bg-surface-container-lowest p-8 rounded-xl border border-outline-variant/10 flex flex-col items-center justify-center relative min-h-[350px]">
             <h3 className="absolute top-6 left-6 font-label text-sm text-primary uppercase tracking-[0.05em]">Experience</h3>
             <div className="absolute top-1/2 left-0 w-8 h-[1px]" style={{background: 'linear-gradient(90deg, #82cfff, transparent)'}}></div>
             <div className="absolute top-1/2 right-0 w-8 h-[1px]" style={{background: 'linear-gradient(270deg, #82cfff, transparent)'}}></div>
             
             <div className="relative w-48 h-48 rounded-full border-2 border-outline-variant/20 flex items-center justify-center">
               <svg className="absolute inset-0 w-full h-full transform -rotate-90 animate-[spin_4s_linear_infinite]" viewBox="0 0 100 100">
                 <circle className="hud-glow opacity-80" cx="50" cy="50" fill="none" r="48" stroke="#82cfff" strokeDasharray="250" strokeDashoffset="60" strokeWidth="2"></circle>
               </svg>
               <div className="w-36 h-36 rounded-full border border-primary-container/30 flex items-center justify-center bg-surface-container/50 backdrop-blur-sm">
                 <div className="text-center font-headline">
                   <span className="block text-4xl text-primary font-bold">Lvl.42</span>
                   <span className="block text-xs text-on-surface-variant uppercase tracking-widest mt-1">Prime</span>
                 </div>
               </div>
             </div>
          </div>
        </div>

        <div className="w-full md:w-7/12 flex flex-col gap-8 relative">
          <div className="hidden md:block absolute top-[15%] -left-8 w-8 h-[1px]" style={{background: 'linear-gradient(90deg, #82cfff, transparent)'}}></div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 h-full">
            <div className="bg-surface-container p-6 rounded-xl border border-outline-variant/15 flex flex-col relative h-[200px]">
              <div className="flex justify-between items-start mb-auto">
                <h3 className="font-label text-xs text-on-surface-variant uppercase tracking-[0.05em]">Sessions</h3>
                <span className="material-symbols-outlined text-primary/50 text-sm">history</span>
              </div>
              <div className="flex items-end justify-between relative z-10">
                <div>
                  <span className="font-headline text-5xl text-on-surface block">3,402</span>
                  <span className="font-body text-xs text-secondary-container mt-1 block">+12% Delta</span>
                </div>
                <div className="flex items-end gap-1 h-12 opacity-70">
                  <div className="w-2 bg-outline-variant/40 h-[30%]"></div>
                  <div className="w-2 bg-outline-variant/40 h-[50%]"></div>
                  <div className="w-2 bg-primary/40 h-[80%]"></div>
                  <div className="w-2 bg-primary h-[100%] hud-glow"></div>
                  <div className="w-2 bg-outline-variant/40 h-[60%]"></div>
                </div>
              </div>
              <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-primary/50 via-transparent to-transparent"></div>
            </div>

            <div className="bg-surface-container-low p-6 rounded-xl border border-outline-variant/15 flex flex-col relative h-[200px] mt-0 sm:mt-8">
              <div className="hidden sm:block absolute top-1/2 -left-6 w-6 h-[1px]" style={{background: 'linear-gradient(90deg, #82cfff, transparent)'}}></div>
              <div className="flex justify-between items-start mb-auto">
                <h3 className="font-label text-xs text-on-surface-variant uppercase tracking-[0.05em]">Ranking</h3>
                <span className="material-symbols-outlined text-secondary-container/50 text-sm">leaderboard</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full border border-secondary-container/40 flex items-center justify-center relative">
                  <div className="absolute inset-1 border border-dashed border-outline-variant/50 rounded-full"></div>
                  <span className="font-headline text-xl text-secondary-container font-bold">#4</span>
                </div>
                <div>
                  <span className="font-body text-sm text-on-surface block">Global Sector</span>
                  <span className="font-label text-[10px] text-on-surface-variant uppercase tracking-widest mt-1 block">Top 0.5%</span>
                </div>
              </div>
            </div>

            <div className="sm:col-span-2 bg-surface-container-lowest p-6 rounded-xl border border-outline-variant/10 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-[40%] h-[1px] bg-gradient-to-r from-transparent to-primary/40"></div>
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-label text-xs text-primary uppercase tracking-[0.05em] flex items-center gap-2">
                  <span className="w-1 h-1 bg-primary rounded-full"></span>
                  Feedback Stream
                </h3>
                <button className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant hover:text-primary transition-colors border-b border-outline-variant/30 pb-1">View All Logs</button>
              </div>
              <div className="space-y-4">
                <div className="flex gap-4 items-start group">
                  <div className="mt-1"><span className="material-symbols-outlined text-secondary-container text-sm">chat_bubble</span></div>
                  <div className="flex-grow border-b border-outline-variant/10 pb-3">
                    <p className="font-body text-sm text-on-surface line-clamp-2 group-hover:text-primary-container transition-colors">"System integration sequence complete. Latency levels within optimal parameters."</p>
                    <span className="font-label text-[10px] text-on-surface-variant uppercase tracking-widest mt-2 block">ID: 884-A • 2m ago</span>
                  </div>
                </div>
                <div className="flex gap-4 items-start group">
                  <div className="mt-1"><span className="material-symbols-outlined text-outline-variant text-sm group-hover:text-tertiary transition-colors">warning</span></div>
                  <div className="flex-grow">
                    <p className="font-body text-sm text-on-surface-variant line-clamp-2">"Minor fluctuation in sector 7 power routing. Compensating automatically."</p>
                    <span className="font-label text-[10px] text-outline-variant uppercase tracking-widest mt-2 block">ID: 102-X • 15m ago</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
