import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase, isMock } from '../lib/supabase';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleAuth = async (type: 'login' | 'register') => {
    setLoading(true);
    setError(null);
    try {
      if (isMock) {
        // Mock login
        setTimeout(() => navigate('/quiz'), 500);
        return;
      }
      
      if (type === 'register') {
        const { error, data } = await supabase.auth.signUp({ email, password });
        if (error) throw error;
        if (data.user) {
          await supabase.from('profiles').upsert({ id: data.user.id, email, name: email.split('@')[0] });
          navigate('/quiz');
        }
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        navigate('/hud');
      }
    } catch (err: any) {
      setError(err.message || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-surface text-on-surface font-body min-h-screen overflow-hidden relative selection:bg-primary-container selection:text-on-primary-container">
      <div className="absolute inset-0 crt-overlay z-50 pointer-events-none"></div>
      
      <div className="absolute top-1/4 left-1/4 w-[40vw] h-[40vw] rounded-full bg-primary-container opacity-[0.03] blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-[30vw] h-[30vw] rounded-full bg-secondary-container opacity-[0.02] blur-[80px] pointer-events-none"></div>
      
      <header className="fixed top-0 left-0 w-full p-6 flex justify-between items-center z-40 hidden md:flex">
        <div className="flex items-center gap-2 text-primary font-headline text-xs tracking-[0.1em] uppercase drop-shadow-[0_0_10px_rgba(0,174,239,0.5)]">
          <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>lens</span>
          <span>SYSTEM STATUS: ACTIVE</span>
        </div>
        <span className="material-symbols-outlined text-outline-variant text-sm">settings_input_antenna</span>
      </header>
      
      <main className="relative z-10 flex flex-col items-center justify-center min-h-screen p-6">
        <div className="relative w-full max-w-md bg-surface-container-low rounded-lg p-8 shadow-[0_0_40px_rgba(0,0,0,0.8)] overflow-hidden">
          <div className="absolute inset-0 bg-surface-container-lowest/60 backdrop-blur-[20px] -z-10"></div>
          <div className="scan-line h-px w-full absolute top-0 left-0 animate-[scan_4s_linear_infinite]" style={{background: 'linear-gradient(to right, transparent, rgba(0, 174, 239, 0.5), transparent)'}}></div>
          
          <div className="mb-10 text-center relative z-20">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-surface-container-highest mb-6 relative">
              <div className="absolute inset-0 rounded-full border border-outline-variant/20"></div>
              <div className="absolute inset-0 rounded-full border border-t-primary shadow-[0_0_12px_rgba(0,174,239,0.4)] animate-[spin_4s_linear_infinite]"></div>
              <span className="material-symbols-outlined text-primary text-3xl">memory</span>
            </div>
            <h1 className="font-headline text-3xl font-bold tracking-tight text-on-surface">SYSTEM ACCESS</h1>
            <p className="font-body text-on-surface-variant text-sm mt-2">AUTHENTICATION PROTOCOL REQUIRED</p>
          </div>
          
          <form 
            onSubmit={(e) => {
              e.preventDefault();
              // Default to login on enter
              handleAuth('login');
            }} 
            className="space-y-8 relative z-20"
          >
            <div className="space-y-6">
              <div className="space-y-4">
                <div className="relative group">
                  <label className="block font-label text-xs uppercase tracking-[0.05em] text-outline-variant mb-1 group-focus-within:text-primary transition-colors">SUBJECT_ID</label>
                  <div className="relative flex items-center">
                    <span className="material-symbols-outlined absolute left-0 text-outline-variant text-sm group-focus-within:text-primary transition-colors">badge</span>
                    <input 
                      type="email" 
                      autoComplete="username"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      className="w-full bg-transparent border-0 border-b-2 border-outline-variant/30 text-on-surface font-body text-base pl-8 pb-2 focus:ring-0 focus:border-primary transition-all placeholder-outline-variant/50" 
                      placeholder="Enter identifier (email)..." 
                    />
                  </div>
                </div>
                
                <div className="relative group">
                  <label className="block font-label text-xs uppercase tracking-[0.05em] text-outline-variant mb-1 group-focus-within:text-primary transition-colors">PASSKEY_HASH</label>
                  <div className="relative flex items-center">
                    <span className="material-symbols-outlined absolute left-0 text-outline-variant text-sm group-focus-within:text-primary transition-colors">key</span>
                    <input 
                      type="password" 
                      autoComplete="current-password"
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      className="w-full bg-transparent border-0 border-b-2 border-outline-variant/30 text-on-surface font-body text-base pl-8 pb-2 focus:ring-0 focus:border-primary transition-all placeholder-outline-variant/50" 
                      placeholder="Enter hash sequence..." 
                    />
                  </div>
                </div>
              </div>
              
              {error && <div className="text-error text-xs font-label uppercase tracking-wider">{error}</div>}
              
              <div className="pt-4 flex flex-col gap-4">
                <button 
                  type="submit"
                  disabled={loading}
                  className="relative w-full py-3 px-6 rounded border border-primary/50 text-primary font-label text-sm uppercase tracking-[0.05em] hover:bg-primary-container/10 hover:shadow-[0_0_12px_rgba(0,174,239,0.4)] transition-all duration-300 group overflow-hidden"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    INIT: Access System <span className="terminal-cursor group-hover:bg-on-surface hidden md:inline-block"></span>
                  </span>
                </button>
                
                <div className="text-center">
                  <span className="font-body text-xs text-outline-variant">OR</span>
                </div>
                
                <Link 
                  to="/signup"
                  className="relative w-full py-3 px-6 rounded border border-outline-variant/30 text-on-surface-variant font-label text-sm uppercase tracking-[0.05em] hover:border-secondary/50 hover:text-secondary hover:bg-secondary-container/5 transition-all duration-300 flex items-center justify-center"
                >
                  EXEC: Register Subject
                </Link>
              </div>
            </div>
          </form>
          
          <div className="mt-8 pt-4 border-t border-outline-variant/10 text-left">
            <p className="font-label text-[10px] text-outline-variant uppercase tracking-[0.05em] opacity-50">&gt; CONNECTION_SECURE</p>
            <p className="font-label text-[10px] text-outline-variant uppercase tracking-[0.05em] opacity-50">&gt; AWAITING_INPUT...</p>
          </div>
        </div>
      </main>
    </div>
  );
}
