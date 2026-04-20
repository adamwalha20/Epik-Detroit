import { useState } from 'react';
import { supabase, isMock } from '../lib/supabase';
import Navigation from '../components/Navigation';
import { useLanguage } from '../context/LanguageContext';

export default function Feedback() {
  const { t } = useLanguage();
  const [satisfaction, setSatisfaction] = useState(75);
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async () => {
    if (!isMock) {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        await supabase.from('feedback').insert({
          user_id: user.id,
          rating: satisfaction,
          suggestion: notes
        });
      }
    }
    setSubmitted(true);
  };

  return (
    <div className="bg-background text-on-background font-body min-h-screen relative overflow-x-hidden">
      <Navigation />
      
      <main className="pt-24 pb-32 px-4 md:px-8 max-w-4xl mx-auto scan-lines min-h-screen">
        <div className="mb-12 relative flex items-center justify-between">
          <div>
            <h1 className="font-headline text-4xl md:text-5xl text-on-surface glowing-text mb-2 tracking-tight text-glow">{t('system_debrief')}</h1>
            <p className="font-body text-on-surface-variant text-sm tracking-wide">{t('post_op_analysis')}</p>
          </div>
          <div className="hidden md:flex relative w-16 h-16 items-center justify-center">
            <div className="absolute inset-0 rounded-full border border-outline-variant/20 animate-[spin_10s_linear_infinite]"></div>
            <div className="absolute inset-2 rounded-full border-t border-r border-primary/60 hud-glow animate-[spin_4s_linear_infinite]"></div>
            <span className="material-symbols-outlined text-primary text-xl animate-pulse">radar</span>
          </div>
        </div>

        {submitted ? (
          <div className="bg-surface-container-low rounded-xl p-6 md:p-8 relative overflow-hidden border border-primary/30 text-center">
            <h2 className="text-primary font-headline text-2xl mb-2">{t('log_transmitted')}</h2>
            <p className="text-on-surface-variant text-sm">{t('thank_you_evolve')}</p>
          </div>
        ) : (
          <div className="space-y-8 relative z-10">
            <section className="bg-surface-container-low rounded-xl p-6 md:p-8 relative overflow-hidden group border border-outline-variant/10">
              <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent"></div>
              <h2 className="font-label text-primary uppercase tracking-[0.05em] text-sm mb-6 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-primary hud-glow"></span>
                {t('satisfaction_level')}
              </h2>
              <div className="space-y-6">
                <div className="relative pt-4">
                  <div className="flex justify-between text-xs font-label text-outline mb-2 uppercase">
                    <span>{t('critical_failure')}</span>
                    <span className="text-primary">{t('optimal')}</span>
                  </div>
                  <div className="relative w-full h-2 bg-surface-container-highest rounded-full overflow-hidden">
                    <div className="absolute top-0 left-0 h-full bg-primary shadow-[0_0_12px_rgba(130,207,255,0.4)]" style={{ width: `${satisfaction}%` }}></div>
                  </div>
                  <input 
                    type="range" 
                    min="1" 
                    max="100" 
                    value={satisfaction}
                    onChange={(e) => setSatisfaction(parseInt(e.target.value))}
                    className="absolute top-4 w-full h-2 opacity-0 cursor-pointer" 
                  />
                </div>
                <div className="flex items-center gap-4 border-l-2 border-primary/40 pl-4">
                  <span className="font-headline text-3xl text-on-surface">{satisfaction.toFixed(1)}</span>
                  <span className="font-label text-[10px] text-primary/60 tracking-wider">{t('efficiency_metric')}<br/>{t('recorded')}</span>
                </div>
              </div>
            </section>

            <section className="bg-surface-container-low rounded-xl p-6 md:p-8 relative border border-outline-variant/10 shadow-[inset_0_0_20px_rgba(0,0,0,0.5)]">
              <h2 className="font-label text-primary uppercase tracking-[0.05em] text-sm mb-6 flex items-center gap-2">
                <span className="material-symbols-outlined text-sm text-primary">terminal</span>
                {t('operator_notes')}
              </h2>
              <div className="relative">
                <div className="absolute left-0 top-3 bottom-0 w-px bg-outline-variant/30"></div>
                <textarea 
                  value={notes}
                  onChange={e => setNotes(e.target.value)}
                  className="w-full bg-transparent border-0 border-b-2 border-primary/50 text-on-surface font-body text-sm focus:ring-0 focus:border-primary focus:outline-none pl-4 resize-none transition-colors placeholder:text-outline/50" 
                  placeholder={t('manual_obs_placeholder')} 
                  rows={4}
                ></textarea>
                <div className="absolute bottom-1 right-2 w-2 h-4 bg-primary animate-pulse"></div>
              </div>
            </section>

            <div className="flex justify-end pt-4">
              <button onClick={handleSubmit} className="relative group px-8 py-3 bg-transparent border border-primary text-primary font-label uppercase tracking-widest text-sm overflow-hidden hover:text-on-primary-container transition-colors rounded-none outline-none">
                <span className="relative z-10 flex items-center gap-2">
                  {t('transmit_log')}
                  <span className="material-symbols-outlined text-sm">upload</span>
                </span>
                <div className="absolute inset-0 bg-primary/20 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300 ease-out"></div>
                <div className="absolute inset-0 shadow-[0_0_15px_rgba(0,174,239,0.5)] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
