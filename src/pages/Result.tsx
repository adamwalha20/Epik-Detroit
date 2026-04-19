import { useEffect, useState } from 'react';
import Navigation from '../components/Navigation';
import { supabase, isMock } from '../lib/supabase';

export default function Result() {
  const [profileData, setProfileData] = useState<any>(null);
  const [uploading, setUploading] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  
  
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
          const { data: resultData } = await supabase.from('quiz_results').select('*, profiles(name, avatar_url)').eq('user_id', user.id).single();
          if (resultData) {
            setProfileData({ ...resultData, name: resultData.profiles?.name || 'SUBJECT-NULL' });
            setAvatarUrl(resultData.profiles?.avatar_url || null);
          }
        }
      } catch (e) {
        console.error(e);
      }
    };
    fetchData();
  }, []);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploading(true);
      if (!event.target.files || event.target.files.length === 0) return;
      const file = event.target.files[0];
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      if (isMock) {
        // Mock upload
        const reader = new FileReader();
        reader.onload = (e) => setAvatarUrl(e.target?.result as string);
        reader.readAsDataURL(file);
        setUploading(false);
        return;
      }

      const { data: userData } = await supabase.auth.getUser();
      if (!userData.user) throw new Error('No user logged in');

      const { error: uploadError } = await supabase.storage.from('avatars').upload(filePath, file);
      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage.from('avatars').getPublicUrl(filePath);
      
      const { error: updateError } = await supabase.from('profiles').update({ avatar_url: publicUrl }).eq('id', userData.user.id);
      if (updateError) throw updateError;

      setAvatarUrl(publicUrl);
    } catch (error: any) {
      alert(error.message);
    } finally {
      setUploading(false);
    }
  };

  if (!profileData) return <div className="min-h-screen bg-background flex items-center justify-center text-primary font-headline">SYNCING IDENTITY...</div>;

  return (
    <div className="bg-surface text-on-surface font-body antialiased min-h-screen flex flex-col pt-24 pb-32 md:pb-0 overflow-x-hidden relative scan-line-bg selection:bg-primary-container selection:text-on-primary-container">
      <Navigation />
      
      <main className="flex-grow flex items-center justify-center p-6 md:p-12 relative z-10">
        <div id="identity-card" className="w-full max-w-4xl bg-[#131313] rounded-xl border border-primary/20 p-1 relative overflow-hidden ambient-glow shadow-[0_0_50px_rgba(0,174,239,0.1)]">
          {/* Official Header */}
          <div className="flex justify-between items-center px-8 py-6 border-b border-primary/20 bg-primary/5 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/30 to-transparent"></div>
            <div className="flex items-center gap-5 relative z-10">
              <img src="/club-logo.png" alt="Club Logo" className="h-14 w-auto drop-shadow-[0_0_15px_rgba(0,174,239,0.4)]" />
              <div className="flex flex-col">
                <span className="text-[12px] font-headline text-white tracking-[0.4em] font-bold">EPIK LEADERS</span>
                <span className="text-[8px] font-label text-primary tracking-[0.2em] font-bold opacity-80 uppercase">ISIMS BRANCH | PROTOCOL EVALUATION</span>
              </div>
            </div>
            <div className="text-right flex flex-col relative z-10">
              <div className="flex items-center justify-end gap-2 mb-1">
                <span className="material-symbols-outlined text-primary text-[14px]">verified</span>
                <span className="text-[11px] font-headline text-white tracking-[0.3em] font-bold">CERTIFICATE OF PARTICIPATION</span>
              </div>
              <span className="text-[9px] font-label text-on-surface-variant tracking-[0.1em] opacity-60 font-medium">SESSION_HASH: {Math.random().toString(36).substring(7).toUpperCase()}A82</span>
            </div>
          </div>

          <div className="p-8 md:p-12 flex flex-col md:flex-row gap-12 relative overflow-hidden">
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary-container/5 rounded-full blur-[60px] pointer-events-none"></div>
            
            <div className="flex-shrink-0 flex flex-col items-center justify-start gap-8 relative z-10 md:w-1/3">
              <div className="relative w-48 h-48 sm:w-56 sm:h-56">
                <div className="absolute inset-0 rounded-full border border-primary/20"></div>
                <div className="absolute inset-0 rounded-full border-2 border-primary border-t-transparent border-l-transparent transform rotate-45 glow-primary animate-pulse"></div>
                <div className="absolute inset-4 rounded-full bg-primary/5 glow-primary"></div>
                <div className="absolute inset-6 rounded-full overflow-hidden border border-primary/30 flex items-center justify-center bg-[#1a1a1a]">
                  {avatarUrl ? (
                    <img src={avatarUrl} alt="Identity" className="w-full h-full object-cover" />
                  ) : (
                    <span className="material-symbols-outlined text-8xl text-primary/30" style={{ fontVariationSettings: "'FILL' 1" }}>smart_toy</span>
                  )}
                  {uploading && <div className="absolute inset-0 bg-background/60 flex items-center justify-center"><div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin"></div></div>}
                </div>
                {/* Status Indicator */}
                <div className="absolute bottom-4 right-4 w-5 h-5 bg-[#00e3fd] rounded-full shadow-[0_0_15px_rgba(0,227,253,0.8)] border-2 border-[#131313]">
                  <div className="absolute inset-0 bg-[#00e3fd] rounded-full animate-ping opacity-75"></div>
                </div>
              </div>
              <div className="text-center font-headline uppercase tracking-[0.05em] flex flex-col gap-2 w-full">
                <div className="text-xs text-primary tracking-[0.3em] font-bold mb-1">IDENT_VERIFIED</div>
                <h1 className="text-3xl text-white font-bold drop-shadow-[0_0_10px_rgba(0,174,239,0.3)]">{profileData.name}</h1>
                <p className="text-primary/70 text-sm border-b border-primary/20 pb-2 mb-2 font-light tracking-widest">{profileData.ai_type}</p>
                <div className="mt-4 flex flex-col gap-1 items-center">
                  <div className="w-full h-1 bg-primary/20 relative overflow-hidden rounded-full">
                    <div className="absolute inset-0 bg-primary animate-[shimmer_2s_infinite]" style={{ width: '40%' }}></div>
                  </div>
                  <span className="text-[9px] text-on-surface-variant mt-2 tracking-[0.4em] opacity-60">ID-8849-SYSTEM-CORE</span>
                </div>
              </div>
            </div>
            
            <div className="flex-grow flex flex-col justify-between gap-8 z-10 relative">
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-[#1a1a1a] p-6 border border-primary/20 relative overflow-hidden group shadow-inner">
                  <div className="absolute top-0 left-0 w-full h-[2px] bg-primary group-hover:shadow-[0_0_15px_rgba(0,174,239,1)] transition-all"></div>
                  <span className="font-label text-[10px] text-primary uppercase tracking-[0.2em] block mb-4 font-bold">TRUST INDEX / SUCCESS</span>
                  <div className="flex items-end gap-2">
                    <span className="font-headline text-5xl text-white font-light drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]">{profileData.score}</span>
                    <span className="text-primary text-lg pb-1 font-bold">%</span>
                  </div>
                  <div className="absolute bottom-4 right-6 w-12 h-[1px] bg-primary/40 group-hover:w-20 transition-all"></div>
                </div>
                
                <div className="bg-[#1a1a1a] p-6 border border-primary/20 relative overflow-hidden shadow-inner">
                  <div className="absolute top-0 left-0 w-full h-[2px] bg-secondary-container"></div>
                  <span className="font-label text-[10px] text-secondary-container uppercase tracking-[0.2em] block mb-4 font-bold">STABILITY_GEN</span>
                  <div className="flex items-end gap-2">
                    <span className="font-headline text-5xl text-white font-light">{profileData.stability_index}</span>
                    <span className="text-secondary-container text-sm pb-1 font-bold">/100</span>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col gap-4 mt-4">
                <div className="flex items-center gap-4">
                  <h3 className="font-label text-[10px] text-primary uppercase tracking-[0.2em] font-bold">PROTOCOL_STATUS</h3>
                  <div className="h-[1px] flex-grow bg-primary/20"></div>
                </div>
                <div className="flex flex-wrap gap-3">
                  <span className="bg-primary/10 border border-primary/30 text-primary font-label text-[10px] uppercase px-4 py-2 rounded-sm tracking-widest flex items-center gap-2 shadow-[0_0_10px_rgba(0,174,239,0.1)]">
                    <span className="material-symbols-outlined text-[14px]">verified_user</span>
                    {profileData.trust_level}_CLEARANCE
                  </span>
                  <span className="bg-white/5 border border-white/10 text-white/70 font-label text-[10px] uppercase px-4 py-2 rounded-sm tracking-widest flex items-center gap-2">
                    <span className="material-symbols-outlined text-[14px]">terminal</span>
                    SENTIENT_LENS_PASS
                  </span>
                </div>
              </div>
              
              {/* Footer Actions / Verification */}
              <div className="mt-8 pt-6 border-t border-primary/20 flex justify-between items-center no-print">
                <div className="flex flex-col">
                  <span className="text-[9px] font-label text-primary tracking-[0.2em] font-bold">AUTHENTICITY_VERIFIED</span>
                  <span className="text-[8px] font-label text-on-surface-variant tracking-[0.1em] opacity-40">ENCRYPTION: SH-256 | DETROIT_CORE</span>
                </div>
                
                <div className="flex gap-4">
                  <div className="relative">
                    <input 
                      type="file" 
                      id="avatar-upload" 
                      accept="image/*" 
                      onChange={handleFileUpload} 
                      className="hidden" 
                    />
                    <label 
                      htmlFor="avatar-upload"
                      className="relative group bg-transparent border border-primary/50 text-white font-label text-[10px] uppercase px-6 py-2.5 tracking-widest hover:bg-primary/10 transition-all duration-300 cursor-pointer flex items-center gap-2 border-dashed"
                    >
                      <span className="material-symbols-outlined text-[16px] text-primary">add_a_photo</span>
                      {avatarUrl ? 'REFRESH PHOTO' : 'IMPORT IDENTITY'}
                    </label>
                  </div>
                  
                  <button 
                    onClick={() => {
                      window.print();
                    }}
                    className="relative group bg-primary border border-primary text-[#131313] font-label text-[10px] uppercase px-6 py-2.5 tracking-widest hover:bg-white hover:border-white transition-all duration-300 flex items-center gap-2 font-bold shadow-[0_0_20px_rgba(0,174,239,0.3)]"
                  >
                    <span className="material-symbols-outlined text-[16px]">file_download</span>
                    DOWNLOAD CERTIFICATE
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Cyber Finishing Touches */}
          <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-primary/50"></div>
          <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-primary/50"></div>
          <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-primary/50"></div>
          <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-primary/50"></div>
        </div>
      </main>

      <style>{`
        @page {
          size: auto;
          margin: 0mm;
        }
        @media print {
          body { 
            background: #0a0a0a !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          .no-print { display: none !important; }
          #identity-card { 
            position: fixed !important;
            top: 0 !important;
            left: 0 !important;
            width: 100vw !important;
            height: 100vh !important;
            max-width: none !important;
            border: none !important;
            background: #131313 !important;
            margin: 0 !important;
            padding: 20px !important;
            display: flex !important;
            flex-direction: column !important;
            justify-content: center !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          /* Force visibility of all elements */
          #identity-card * {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
            text-shadow: none !important;
          }
          .ambient-glow { display: none !important; }
          /* Ensure backgrounds print */
          .bg-primary\/5 { background-color: rgba(0, 174, 239, 0.05) !important; }
          .bg-\[\#1a1a1a\] { background-color: #1a1a1a !important; }
          .bg-primary { background-color: #00aeef !important; }
        }
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
}
