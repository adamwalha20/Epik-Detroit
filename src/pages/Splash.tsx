import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';

export default function Splash() {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState('INITIALIZING BOOT SEQUENCE...');

  useEffect(() => {
    const stages = [
      { p: 20, s: 'LOADING NEURAL KERNEL...' },
      { p: 45, s: 'SYNCING KINETIC LENS...' },
      { p: 70, s: 'CALIBRATING HUD OVERLAY...' },
      { p: 100, s: 'CONNECTION SECURE' }
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
        }, 800);
      }
    }, 600);

    return () => clearInterval(interval);
  }, [navigate]);

  return (
    <div className="bg-surface min-h-screen flex items-center justify-center relative font-body antialiased">
      <div className="crt-overlay"></div>
      
      <div className="absolute inset-0 flex items-center justify-center opacity-30 pointer-events-none">
        <div className="w-[80vw] h-[80vw] max-w-[800px] max-h-[800px] rounded-full bg-primary-container blur-[150px]"></div>
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center w-full max-w-2xl px-6">
        <div className="relative w-64 h-64 md:w-80 md:h-80 flex items-center justify-center mb-12">
          {/* Rings */}
          <div className="absolute inset-0 rounded-full border border-outline-variant/20"></div>
          <div className="absolute inset-4 rounded-full border border-outline-variant/30"></div>
          <div
            className="absolute inset-8 rounded-full border-2 border-primary ring-glow opacity-80 animate-[spin_4s_linear_infinite]"
            style={{ borderTopColor: 'transparent', borderRightColor: 'transparent', transform: 'rotate(45deg)' }}
          ></div>
          <div className="absolute inset-8 rounded-full border border-primary/40 ring-glow"></div>
          
          <div className="absolute inset-16 rounded-full border border-surface-tint/50 bg-surface-container-lowest/60 backdrop-blur-[20px] flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-secondary-container shadow-[0_0_8px_#00e3fd]"></div>
          </div>
          
          {/* Crosshairs */}
          <div className="absolute w-full h-[1px] bg-outline-variant/15 top-1/2 -translate-y-1/2"></div>
          <div className="absolute h-full w-[1px] bg-outline-variant/15 left-1/2 -translate-x-1/2"></div>
          
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-3 bg-primary"></div>
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-1.5 h-3 bg-primary"></div>
          <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 w-3 h-1.5 bg-primary"></div>
          <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-3 h-1.5 bg-primary"></div>
        </div>

        <div className="flex flex-col items-center text-center space-y-6">
          <h1 className="font-headline text-5xl md:text-7xl font-light tracking-[0.2em] text-primary glow-text uppercase">
            EPIK AI
          </h1>
          
          <div className="flex flex-col items-center space-y-2 mt-8">
            <div className="flex flex-col items-center space-y-4 mt-8 w-64">
              <div className="w-full h-1 bg-surface-container-highest rounded-full overflow-hidden">
                <div 
                  className="h-full bg-primary shadow-[0_0_10px_#82cfff] transition-all duration-500 ease-out" 
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              <div className="flex items-center space-x-3 bg-surface-container-low px-4 py-1.5 rounded-sm border-b border-primary/30 min-w-[200px] justify-center">
                <span className="material-symbols-outlined text-[14px] text-tertiary animate-spin" style={{ fontVariationSettings: "'FILL' 1" }}>
                  change_circle
                </span>
                <span className="font-label text-[10px] md:text-xs text-on-surface-variant uppercase tracking-[0.1em]">
                  {status}
                </span>
              </div>
              <div className="flex items-center space-x-3 mt-2">
                <span className="w-1.5 h-1.5 rounded-full bg-secondary-container shadow-[0_0_5px_#00e3fd] animate-pulse"></span>
                <span className="font-label text-[11px] md:text-sm text-primary uppercase tracking-[0.1em] glow-text">
                  EPIK AI PROTOCOL {progress === 100 ? 'SYNCHRONIZED' : 'LOADING'}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-10 w-full max-w-md px-8 flex flex-col space-y-1 opacity-40">
          <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
          <div className="w-3/4 mx-auto h-[1px] bg-gradient-to-r from-transparent via-primary/30 to-transparent"></div>
          <div className="flex justify-between w-full px-10 mt-2">
            <span className="font-label text-[8px] text-outline-variant uppercase tracking-widest">SYS.ON</span>
            <span className="font-label text-[8px] text-outline-variant uppercase tracking-widest">V.98.2</span>
            <span className="font-label text-[8px] text-outline-variant uppercase tracking-widest">SEQ.A</span>
          </div>
        </div>
      </div>
    </div>
  );
}
