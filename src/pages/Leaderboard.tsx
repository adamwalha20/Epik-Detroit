import { useEffect, useState } from 'react';
import Navigation from '../components/Navigation';
import { supabase, isMock } from '../lib/supabase';

export default function Leaderboard() {
  const [leaders, setLeaders] = useState<any[]>([]);

  useEffect(() => {
    const fetchLeaders = async () => {
      if (isMock) {
        setLeaders([
          { id: '1', profiles: { name: 'J.K. ROWLAND' }, ai_type: 'APEX ENTITY', score: 99.8 },
          { id: '2', profiles: { name: 'E. VANCE' }, ai_type: 'STABLE', score: 98.4 },
          { id: '3', profiles: { name: 'M. CHEN' }, ai_type: 'STABLE', score: 97.9 },
          { id: '4', profiles: { name: 'S. RIVERA' }, ai_type: 'DEGRADING', score: 96.5 },
          { id: '5', profiles: { name: 'L. KOWALSKI' }, ai_type: 'EVOLVING', score: 95.2 },
        ]);
        return;
      }
      
      const { data } = await supabase
        .from('quiz_results')
        .select('*, profiles(name)')
        .order('score', { ascending: false })
        .limit(10);
      
      if (data) setLeaders(data);
    };
    fetchLeaders();
  }, []);

  return (
    <div className="font-body min-h-screen relative overflow-x-hidden selection:bg-primary-container selection:text-on-primary-container bg-background">
      <Navigation />
      
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden flex justify-center items-center opacity-30">
        <div className="absolute w-[800px] h-[800px] bg-primary-container rounded-full blur-[150px] opacity-10 top-[-20%] left-[-10%]"></div>
        <div className="absolute w-[600px] h-[600px] bg-secondary-container rounded-full blur-[120px] opacity-5 bottom-[-10%] right-[-10%]"></div>
      </div>

      <main className="relative z-10 pt-28 pb-32 px-4 md:px-8 max-w-7xl mx-auto space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-3 mb-2 opacity-70">
              <span className="w-8 h-[1px] bg-primary"></span>
              <span className="font-label text-sm tracking-[0.05em] uppercase text-primary">MODULE 04</span>
            </div>
            <h2 className="font-headline text-4xl md:text-5xl font-bold tracking-tight text-on-surface">GLOBAL EVALUATION RANKING</h2>
          </div>
          
          <div className="flex gap-4 bg-surface-container-low/60 backdrop-blur-[20px] p-4 rounded-xl border border-outline-variant/20">
            <div className="flex flex-col">
              <span className="font-label text-xs text-on-surface-variant tracking-[0.05em] uppercase mb-1">TOTAL ENTITIES</span>
              <span className="font-headline text-xl text-primary font-bold">14,289</span>
            </div>
            <div className="w-[1px] bg-outline-variant/30"></div>
            <div className="flex flex-col">
              <span className="font-label text-xs text-on-surface-variant tracking-[0.05em] uppercase mb-1">NETWORK LOAD</span>
              <div className="flex items-center gap-2">
                <span className="font-headline text-xl text-secondary-container font-bold">87%</span>
                <div className="w-2 h-2 rounded-full bg-secondary-container animate-pulse shadow-[0_0_8px_rgba(0,227,253,0.5)]"></div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-8 bg-surface-container-low/60 backdrop-blur-[20px] rounded-2xl relative overflow-hidden group border border-outline-variant/20">
            <div className="absolute inset-0 scan-line-bg pointer-events-none opacity-50"></div>
            <div className="p-8 relative z-10 flex flex-col md:flex-row items-center gap-8 h-full">
              <div className="relative w-48 h-48 flex-shrink-0 flex items-center justify-center">
                <div className="absolute inset-0 border-[2px] border-outline-variant/20 rounded-full"></div>
                <div className="absolute inset-2 border-[1px] border-primary/30 rounded-full border-t-primary animate-[spin_4s_linear_infinite]"></div>
                <div className="absolute inset-6 border-[1px] border-secondary-container/20 rounded-full border-b-secondary-container animate-[spin_3s_linear_infinite_reverse]"></div>
                <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-primary shadow-[0_0_15px_rgba(130,207,255,0.3)] flex items-center justify-center bg-surface-container-highest">
                  <span className="material-symbols-outlined text-textColor text-5xl">person</span>
                </div>
                <div className="absolute -bottom-2 -right-2 bg-primary-container text-on-primary-container font-headline font-bold text-xl w-12 h-12 rounded-full flex items-center justify-center border-4 border-surface-container shadow-[0_0_15px_rgba(0,174,239,0.5)]">1</div>
              </div>
              <div className="flex-1 w-full space-y-4">
                <div className="flex items-center justify-between border-b border-outline-variant/30 pb-2">
                  <span className="font-label text-sm text-primary tracking-[0.05em] uppercase">APEX ENTITY</span>
                  <span className="font-label text-xs text-on-surface-variant tracking-[0.05em] uppercase">UPLINK SECURE</span>
                </div>
                <div>
                  <h3 className="font-headline text-3xl font-bold text-on-surface">{leaders[0]?.profiles?.name || 'SYNCING...'}</h3>
                  <p className="font-body text-on-surface-variant text-sm mt-1">ID: #892-ALPHA-77</p>
                </div>
                <div className="grid grid-cols-2 gap-4 pt-2">
                  <div className="bg-surface-container-low p-3 rounded-lg border border-outline-variant/20">
                    <span className="block font-label text-xs text-on-surface-variant tracking-[0.05em] uppercase mb-1">EVAL SCORE</span>
                    <span className="font-headline text-2xl text-primary font-bold">{leaders[0]?.score || 0}<span className="text-sm text-primary/60">%</span></span>
                  </div>
                  <div className="bg-surface-container-low p-3 rounded-lg border border-outline-variant/20">
                    <span className="block font-label text-xs text-on-surface-variant tracking-[0.05em] uppercase mb-1">CYCLES</span>
                    <span className="font-headline text-2xl text-secondary-container font-bold">1,402</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 bg-surface-container-low rounded-2xl border border-outline-variant/20 p-6 flex flex-col h-full">
            <div className="flex items-center gap-2 mb-6 border-b border-outline-variant/20 pb-4">
              <span className="material-symbols-outlined text-primary text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>military_tech</span>
              <h3 className="font-label text-sm text-on-surface tracking-[0.05em] uppercase">TOP PROFILES</h3>
            </div>
            <div className="space-y-4 flex-1">
              {leaders.slice(1, 4).map((leader, index) => (
                <div key={index} className="flex items-center gap-4 p-3 rounded-xl bg-surface hover:bg-surface-container-high transition-colors border border-transparent hover:border-outline-variant/30 group">
                  <div className="w-8 font-headline font-bold text-lg text-on-surface-variant group-hover:text-primary transition-colors text-center">{index + 2}</div>
                  <div className="flex-1">
                    <div className="font-headline text-sm font-bold text-on-surface">{leader.profiles?.name || 'ANONYMOUS'}</div>
                    <div className="font-body text-xs text-on-surface-variant">{leader.score}% EVAL</div>
                  </div>
                </div>
              ))}
            </div>
            <button className="mt-4 w-full py-3 border border-primary/50 rounded-lg text-primary font-label text-xs tracking-[0.05em] uppercase hover:bg-primary/10 transition-colors flex items-center justify-center gap-2">
              VIEW FULL MATRIX <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </button>
          </div>

          <div className="lg:col-span-12 bg-surface-container-low rounded-2xl border border-outline-variant/20 p-6 overflow-hidden relative">
            <div className="absolute inset-0 scan-line pointer-events-none opacity-30"></div>
            <div className="flex items-center justify-between mb-6 relative z-10">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-primary shadow-[0_0_10px_rgba(130,207,255,0.6)] animate-pulse"></div>
                <h3 className="font-label text-sm text-on-surface tracking-[0.05em] uppercase">LIVE DATA STREAM</h3>
              </div>
              <div className="font-label text-xs text-outline-variant tracking-[0.05em] uppercase">AUTO-REFRESH: ON</div>
            </div>
            
            <div className="overflow-x-auto relative z-10">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-outline-variant/30">
                    <th className="py-3 px-4 font-label text-xs text-on-surface-variant tracking-[0.05em] uppercase font-normal">RANK</th>
                    <th className="py-3 px-4 font-label text-xs text-on-surface-variant tracking-[0.05em] uppercase font-normal">ENTITY ID</th>
                    <th className="py-3 px-4 font-label text-xs text-on-surface-variant tracking-[0.05em] uppercase font-normal">DESIGNATION</th>
                    <th className="py-3 px-4 font-label text-xs text-on-surface-variant tracking-[0.05em] uppercase font-normal text-right">EVAL %</th>
                  </tr>
                </thead>
                <tbody className="font-body text-sm">
                  {leaders.slice(4).map((leader, index) => (
                    <tr key={index} className="border-b border-outline-variant/10 hover:bg-surface-container transition-colors">
                      <td className="py-4 px-4 font-headline font-bold text-on-surface-variant">{String(index + 5).padStart(2, '0')}</td>
                      <td className="py-4 px-4 text-on-surface-variant font-mono">#{leader.id?.substring(0,6).toUpperCase() || 'XXX'}</td>
                      <td className="py-4 px-4 text-on-surface">{leader.profiles?.name || 'ANONYMOUS'}</td>
                      <td className="py-4 px-4 text-right text-secondary-container font-headline">{leader.score}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
