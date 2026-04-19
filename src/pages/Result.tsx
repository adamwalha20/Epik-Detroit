import { useEffect, useState } from 'react';
import Navigation from '../components/Navigation';
import { supabase, isMock } from '../lib/supabase';

export default function Result() {
  const [profileData, setProfileData] = useState<any>(null);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (isMock) {
          const localStr = localStorage.getItem('epik_result');
          const local = localStr ? JSON.parse(localStr) : null;
          setProfileData({
            ai_type: local?.ai_type || 'ANALYST',
            trust_level: local?.trust_level || 'MEDIUM',
            stability_index: local?.stability_index || 75.3,
            score: local?.score || 88.4,
            name: 'SUBJECT-NULL'
          });
          return;
        }
        
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          const { data } = await supabase.from('quiz_results').select('*, profiles(name)').eq('user_id', user.id).single();
          if (data) setProfileData({ ...data, name: data.profiles?.name || 'SUBJECT-NULL' });
        }
      } catch (e) {
        console.error(e);
      }
    };
    fetchData();
  }, []);

  if (!profileData) return <div className="min-h-screen bg-background flex items-center justify-center text-primary font-headline">SYNCING IDENTITY...</div>;

  return (
    <div className="bg-surface text-on-surface font-body antialiased min-h-screen flex flex-col pt-24 pb-32 md:pb-0 overflow-x-hidden relative scan-line-bg selection:bg-primary-container selection:text-on-primary-container">
      <Navigation />
      
      <main className="flex-grow flex items-center justify-center p-6 md:p-12 relative z-10">
        <div className="w-full max-w-4xl bg-surface-container-lowest/60 backdrop-blur-[20px] rounded-xl border border-outline-variant/15 p-1 relative overflow-hidden ambient-glow">
          <div className="bg-surface-container-low rounded-[15px] p-8 md:p-12 flex flex-col md:flex-row gap-12 relative overflow-hidden">
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary-container/10 rounded-full blur-[60px] pointer-events-none"></div>
            
            <div className="flex-shrink-0 flex flex-col items-center justify-start gap-8 relative z-10 md:w-1/3">
              <div className="relative w-48 h-48 sm:w-56 sm:h-56">
                <div className="absolute inset-0 rounded-full border border-outline-variant/20"></div>
                <div className="absolute inset-0 rounded-full border-2 border-primary border-t-transparent border-l-transparent transform rotate-45 glow-primary"></div>
                <div className="absolute inset-4 rounded-full bg-primary-container/5 glow-primary"></div>
                <div className="absolute inset-6 rounded-full overflow-hidden border border-outline-variant/30 flex items-center justify-center bg-surface-container-highest">
                  <span className="material-symbols-outlined text-8xl text-primary/50" style={{ fontVariationSettings: "'FILL' 1" }}>smart_toy</span>
                </div>
                <div className="absolute bottom-4 right-4 w-4 h-4 bg-secondary-container rounded-full shadow-[0_0_10px_rgba(0,227,253,0.8)]">
                  <div className="absolute inset-0 bg-secondary-container rounded-full animate-ping opacity-75"></div>
                </div>
              </div>
              <div className="text-center font-headline uppercase tracking-[0.05em] flex flex-col gap-2 w-full">
                <h1 className="text-3xl text-on-surface font-semibold">{profileData.ai_type}</h1>
                <p className="text-on-surface-variant text-sm border-b border-primary/20 pb-2 mb-2">AUTONOMOUS CONSTRUCT</p>
                <div className="mt-4 flex flex-col gap-1 items-center">
                  <div className="w-4/5 h-8 opacity-70" style={{ backgroundImage: 'repeating-linear-gradient(90deg, var(--color-on-surface) 0, var(--color-on-surface) 2px, transparent 2px, transparent 4px, var(--color-on-surface) 4px, var(--color-on-surface) 5px, transparent 5px, transparent 8px)' }}></div>
                  <span className="text-xs text-primary mt-1 tracking-widest">ID-8849-{profileData.name.substring(0,3).toUpperCase()}-OMEGA</span>
                </div>
              </div>
            </div>
            
            <div className="flex-grow flex flex-col justify-between gap-8 z-10 relative">
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-surface p-6 border border-outline-variant/15 relative overflow-hidden group">
                  <div className="absolute top-0 left-0 w-full h-[1px] bg-primary/30"></div>
                  <span className="font-label text-xs text-on-surface-variant uppercase tracking-widest block mb-4">Trust Index</span>
                  <div className="flex items-end gap-2">
                    <span className="font-headline text-4xl text-primary font-light">{profileData.score}</span>
                    <span className="text-on-surface-variant text-sm pb-1">%</span>
                  </div>
                  <div className="absolute bottom-4 right-6 w-12 h-[1px] bg-primary/40 group-hover:bg-primary transition-colors"></div>
                </div>
                
                <div className="bg-surface p-6 border border-outline-variant/15 relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-[1px] bg-secondary-container/30"></div>
                  <span className="font-label text-xs text-on-surface-variant uppercase tracking-widest block mb-4">Stability Index</span>
                  <div className="flex items-end gap-2">
                    <span className="font-headline text-4xl text-secondary-container font-light">{profileData.stability_index}</span>
                    <span className="text-on-surface-variant text-sm pb-1">/100</span>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col gap-4 mt-4">
                <h3 className="font-label text-xs text-on-surface-variant uppercase tracking-widest border-b border-outline-variant/20 pb-2">Classifications</h3>
                <div className="flex flex-wrap gap-3">
                  <span className="bg-secondary-container/10 border border-secondary-container/30 text-secondary-container font-label text-xs uppercase px-3 py-1.5 rounded-sm tracking-wider flex items-center gap-2">
                    <span className="material-symbols-outlined text-[14px]">verified</span>
                    {profileData.trust_level}
                  </span>
                  <span className="bg-primary/10 border border-primary/30 text-primary font-label text-xs uppercase px-3 py-1.5 rounded-sm tracking-wider flex items-center gap-2">
                    <span className="material-symbols-outlined text-[14px]">psychology</span>
                    EVOLVING
                  </span>
                  <span className="bg-surface-variant text-on-surface-variant font-label text-xs uppercase px-3 py-1.5 rounded-sm tracking-wider border border-outline-variant/30">
                    CL-4 SECURITY
                  </span>
                </div>
              </div>
              
              <div className="mt-8 pt-6 border-t border-outline-variant/15 flex justify-end">
                <button className="relative group bg-transparent border border-primary/50 text-primary font-label text-sm uppercase px-8 py-3 tracking-widest hover:bg-primary-container/10 transition-all duration-300 overflow-hidden">
                  <span className="relative z-10 flex items-center gap-2">
                    <span className="material-symbols-outlined text-[18px]">download</span>
                    EXPORT IDENTITY
                  </span>
                  <div className="absolute inset-0 bg-primary-container/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-0"></div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
