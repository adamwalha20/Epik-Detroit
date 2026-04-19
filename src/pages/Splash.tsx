import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';

export default function Splash() {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState('SYNCING EVENT PROTOCOLS...');

  useEffect(() => {
    const stages = [
      { p: 15, s: 'INITIALIZING GEN-AI CORE...' },
      { p: 35, s: 'ESTABLISHING ISIMS UPLINK...' },
      { p: 60, s: 'LOADING EVENT MANIFEST...' },
      { p: 85, s: 'CONFIGURING WORKSHOP MODULES...' },
      { p: 100, s: 'DETROIT PROTOCOL READY' }
    ];

    let currentStage = 0;
    const interval = setInterval(() => {
      if (currentStage < stages.length) {
        setProgress(stages[currentStage].p);
        setStatus(stages[currentStage].s);
        currentStage++;
      } else {
        clearInterval(interval);
        setTimeout(async () => {
          const { data: { session } } = await supabase.auth.getSession();
          if (session) {
            navigate('/hud');
          } else {
            navigate('/login');
          }
        }, 1000);
      }
    }, 500);

    return () => clearInterval(interval);
  }, [navigate]);

  return (
    <div className="bg-[#0a192f] min-h-screen flex items-center justify-center relative font-body antialiased overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a192f] via-[#0d2a4a] to-[#0a192f]"></div>
      <div className="crt-overlay opacity-20"></div>
      
      {/* HUD Atmosphere Elements */}
      <div className="absolute top-[10%] left-[5%] w-[40%] h-[1px] bg-primary/20"></div>
      <div className="absolute bottom-[10%] right-[5%] w-[40%] h-[1px] bg-primary/20"></div>
      <div className="absolute top-1/2 left-4 -translate-y-1/2 flex flex-col gap-8 opacity-20">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="w-1 h-1 bg-primary rounded-full"></div>
        ))}
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center w-full max-w-4xl px-8">
        {/* Top Logos */}
        <div className="absolute top-[-150px] w-full flex justify-between items-center opacity-80">
          <div className="flex items-center gap-3">
            <img src="/club-logo.png" alt="EPIK Tunisia" className="h-10 w-auto" />
            <div className="flex flex-col">
              <span className="text-[10px] text-white font-bold tracking-[0.2em]">TUNISIA</span>
              <span className="text-[8px] text-primary tracking-[0.1em]">EPIK LEADERS</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex flex-col text-right">
              <span className="text-[10px] text-white font-bold tracking-[0.2em]">ISIMS</span>
              <span className="text-[8px] text-primary tracking-[0.1em]">BRANCH</span>
            </div>
            <div className="w-10 h-10 rounded-full border border-primary/40 flex items-center justify-center">
              <div className="w-6 h-6 border-2 border-primary rounded-sm rotate-45"></div>
            </div>
          </div>
        </div>

        {/* Main Branding */}
        <div className="text-center mb-16 relative">
          <div className="flex flex-col items-center">
            <div className="relative">
              <h1 className="font-headline text-7xl md:text-9xl font-bold text-white tracking-[0.15em] leading-none mb-2">
                DETR<span className="relative inline-block">
                  O
                  <span className="absolute inset-0 flex items-center justify-center">
                    <span className="w-[0.8em] h-[0.8em] rounded-full border-[6px] md:border-[8px] border-primary shadow-[0_0_20px_rgba(0,174,239,0.5)]"></span>
                  </span>
                </span>IT
              </h1>
            </div>
            <div className="flex items-center gap-4 mt-2">
              <span className="text-2xl md:text-4xl font-headline text-white/60 tracking-[0.6em] font-light">BECOME</span>
              <span className="text-2xl md:text-4xl font-headline text-primary tracking-[0.4em] font-bold glow-text">EPIK</span>
            </div>
          </div>
          
          <div className="mt-12 space-y-2">
            <div className="h-px w-32 bg-gradient-to-r from-transparent via-primary/50 to-transparent mx-auto"></div>
            <h2 className="text-sm md:text-base text-primary/80 font-headline tracking-[0.3em] uppercase">AI Development Conference</h2>
            <div className="h-px w-32 bg-gradient-to-r from-transparent via-primary/50 to-transparent mx-auto"></div>
          </div>
        </div>

        {/* Progress System */}
        <div className="w-full max-w-sm space-y-6 mt-8">
          <div className="relative pt-1 px-4">
            <div className="flex mb-2 items-center justify-between">
              <div>
                <span className="text-[10px] font-label font-bold inline-block py-1 px-2 uppercase rounded-sm text-primary bg-primary/10 border border-primary/20">
                  {status}
                </span>
              </div>
              <div className="text-right">
                <span className="text-xs font-headline font-bold inline-block text-primary">
                  {progress}%
                </span>
              </div>
            </div>
            <div className="overflow-hidden h-1.5 mb-4 text-xs flex rounded-full bg-white/5 border border-white/10">
              <div 
                style={{ width: `${progress}%` }}
                className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-primary transition-all duration-500 relative"
              >
                <div className="absolute top-0 right-0 h-full w-4 bg-white/30 blur-sm"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Slogans */}
        <div className="mt-16 flex flex-col items-center gap-4 text-center opacity-70 group hover:opacity-100 transition-opacity duration-700">
          <p className="text-[10px] md:text-sm text-white font-headline tracking-[0.4em] uppercase">Learn AI • Shape Tomorrow</p>
          <p className="text-[9px] md:text-xs text-primary font-body tracking-[0.2em] font-bold uppercase border-t border-primary/20 pt-4">
            Unlock The Power Of Artificial Intelligence
          </p>
        </div>

        {/* Event Stats Preview */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 w-full max-w-2xl px-12 flex justify-between items-end opacity-40">
           <div className="flex flex-col">
              <span className="text-[10px] text-white font-bold tracking-widest">26 APRIL</span>
              <span className="text-[8px] text-primary tracking-widest uppercase">SYST_DATE</span>
           </div>
           <div className="flex flex-col items-center">
              <span className="material-symbols-outlined text-primary text-xl mb-1">radar</span>
              <span className="text-[8px] text-white/60 tracking-widest uppercase">ISIMS_AMPHI</span>
           </div>
           <div className="flex flex-col items-end">
              <span className="text-[10px] text-white font-bold tracking-widest">10:00 AM</span>
              <span className="text-[8px] text-primary tracking-widest uppercase">UPLINK_TIME</span>
           </div>
        </div>
      </div>
    </div>
  );
}

