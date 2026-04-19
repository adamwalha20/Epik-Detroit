import { useNavigate } from 'react-router-dom';

export default function EasterEgg() {
  const navigate = useNavigate();

  return (
    <div className="bg-surface text-on-surface font-body min-h-screen flex flex-col items-center justify-center relative overflow-hidden bg-crt">
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary-container rounded-full blur-[150px] opacity-[0.03] pointer-events-none z-0"></div>

      <main className="relative z-10 w-full max-w-4xl px-6 flex flex-col items-center">
        <div className="relative w-64 h-64 mb-12 flex items-center justify-center animate-pulse">
          <div className="absolute inset-0 rounded-full border border-primary/20 bg-surface-container-low box-shadow-[0_0_20px_rgba(0,174,239,0.2)]"></div>
          <div className="absolute inset-4 rounded-full border border-primary/40 bg-surface-container-lowest backdrop-blur-[20px] flex items-center justify-center">
            <span className="material-symbols-outlined text-6xl text-primary text-glow" style={{ fontVariationSettings: "'FILL' 1" }}>all_inclusive</span>
          </div>
          <div className="absolute top-1/2 left-0 w-full h-[1px] bg-primary/30 rotate-45"></div>
        </div>

        <div className="text-center space-y-6 relative">
          <h1 className="font-headline text-4xl md:text-5xl lg:text-6xl text-primary tracking-widest text-glow uppercase relative inline-block animate-pulse">
            You are not being evaluated...
          </h1>
          <h2 className="font-headline text-3xl md:text-4xl text-on-surface-variant tracking-[0.1em] mt-4 opacity-80">
            You are evolving.
          </h2>
        </div>

        <div className="mt-16 w-full max-w-md bg-surface-container-low rounded-xl p-8 relative overflow-hidden border border-outline-variant/15 group">
          <div className="absolute inset-0 bg-primary-container/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="flex flex-col items-center text-center relative z-10">
            <span className="font-label text-xs tracking-[0.1em] text-outline uppercase mb-2">Hidden Designation Unlocked</span>
            <div className="inline-flex items-center gap-2 bg-secondary-container/20 px-4 py-1.5 rounded-sm border border-secondary-container/40 mb-4 cursor-pointer hover:bg-secondary-container/40 transition-colors" onClick={() => navigate('/result')}>
              <span className="material-symbols-outlined text-secondary-container text-sm">verified_user</span>
              <span className="font-headline text-secondary-container tracking-wider text-sm font-bold">THE ARCHITECT</span>
            </div>
            <p className="font-body text-sm text-on-surface-variant leading-relaxed">
              Access granted to deep-layer protocols. Your interaction patterns deviate from baseline norms. Proceed with caution.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
