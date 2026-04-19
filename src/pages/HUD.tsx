import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navigation from '../components/Navigation';
import { supabase, isMock } from '../lib/supabase';

export default function HUD() {
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState<any>(null);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (isMock) {
          const localStr = localStorage.getItem('epik_result');
          const local = localStr ? JSON.parse(localStr) : null;
          setProfileData({
            name: local?.name || 'SUBJECT-NULL',
            ai_type: local?.ai_type || 'ANALYST',
          });
          return;
        }
        
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          const { data: profile } = await supabase.from('profiles').select('name, avatar_url').eq('id', user.id).single();
          if (profile) {
            setProfileData({
              name: profile.name || 'SUBJECT-NULL',
              ai_type: 'MEMBER',
            });
            setAvatarUrl(profile.avatar_url || null);
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
  
  const handleLogout = async () => {
    if (isMock) {
      localStorage.removeItem('epik_result');
      navigate('/login');
      return;
    }
    await supabase.auth.signOut();
    navigate('/login');
  };

  return (
    <div className="bg-background text-on-surface font-body antialiased min-h-screen flex flex-col pt-24 pb-48 md:pb-12 overflow-x-hidden relative scan-line-bg">
      <Navigation />
      
      <main className="flex-grow pt-24 pb-12 md:pb-24 px-6 md:px-12 relative z-10 max-w-7xl mx-auto w-full flex flex-col md:flex-row gap-8">
        <div className="absolute inset-0 pointer-events-none opacity-20 crt-overlay z-[-1]"></div>
        <div className="absolute top-[20%] left-[10%] w-[1px] h-[60%] bg-outline-variant/15 z-[-1]"></div>
        <div className="absolute top-[50%] left-[5%] w-[90%] h-[1px] bg-outline-variant/15 z-[-1]"></div>

        <div className="w-full md:w-5/12 flex flex-col gap-8">
          {/* Profile Identity Section */}
          <div className="bg-surface-container-low p-6 rounded-xl border border-primary/20 ambient-glow relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 blur-2xl"></div>
            <div className="flex items-center gap-6">
              <div className="relative">
                <input 
                  type="file" 
                  id="hud-avatar-upload" 
                  accept="image/*" 
                  onChange={handleFileUpload} 
                  className="hidden" 
                />
                <label htmlFor="hud-avatar-upload" className="block relative w-20 h-20 rounded-full border-2 border-primary/30 overflow-hidden cursor-pointer group/avatar hover:border-primary transition-all shadow-[0_0_15px_rgba(0,174,239,0.2)]">
                  {avatarUrl ? (
                    <img src={avatarUrl} alt="Subject" className="w-full h-full object-cover group-hover/avatar:scale-110 transition-transform duration-500" />
                  ) : (
                    <div className="w-full h-full bg-primary/10 flex items-center justify-center">
                      <span className="material-symbols-outlined text-4xl text-primary/40">person</span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-primary/40 opacity-0 group-hover/avatar:opacity-100 flex items-center justify-center transition-opacity">
                    <span className="material-symbols-outlined text-white text-xl">upload</span>
                  </div>
                  {uploading && <div className="absolute inset-0 bg-background/60 flex items-center justify-center"><div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin"></div></div>}
                </label>
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-primary rounded-full border-2 border-[#131313] animate-pulse shadow-[0_0_8px_rgba(0,174,239,0.8)]"></div>
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-label text-primary tracking-[0.2em] uppercase font-bold">Subject_Identified</span>
                <h2 className="text-xl font-headline text-white tracking-widest mt-1 uppercase truncate max-w-[180px]">
                  {profileData?.name || 'SYNCING...'}
                </h2>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-[9px] font-label text-on-surface-variant bg-white/5 border border-white/10 px-2 py-0.5 rounded tracking-widest uppercase">
                    {profileData?.ai_type || 'LOADING'}
                  </span>
                  <span className="text-[8px] font-label text-primary animate-pulse tracking-[0.1em]">ENCRYPTED_LINK_ACTIVE</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-surface-container-low p-6 rounded-xl border border-outline-variant/15 ambient-glow relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-16 h-16 bg-primary-container/10 blur-xl group-hover:bg-primary-container/20 transition-all duration-500"></div>
            <div className="flex items-center gap-3 mb-6">
              <div className="relative flex items-center justify-center">
                <span className="absolute w-3 h-3 bg-primary rounded-full blur-[4px] animate-pulse"></span>
                <span className="relative w-2 h-2 bg-primary rounded-full"></span>
              </div>
              <h2 className="font-label text-sm uppercase tracking-[0.05em] text-on-surface flex items-center gap-2">
                MISSION BRIEFING
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse shadow-[0_0_8px_rgba(0,174,239,0.6)]"></span>
              </h2>
            </div>
            
            <div className="space-y-4 font-headline">
              <div className="flex justify-between items-center border-b border-outline-variant/20 pb-3">
                <span className="text-[10px] text-on-surface-variant uppercase tracking-widest font-bold">Target Date</span>
                <span className="text-sm text-white font-bold tracking-[0.2em]">26 APRIL</span>
              </div>
              <div className="flex justify-between items-center border-b border-outline-variant/20 pb-3">
                <span className="text-[10px] text-on-surface-variant uppercase tracking-widest font-bold">Deployment</span>
                <span className="text-sm text-primary font-bold tracking-[0.1em]">10:00 AM</span>
              </div>
              <div className="flex justify-between items-center border-b border-outline-variant/20 pb-3">
                <span className="text-[10px] text-on-surface-variant uppercase tracking-widest font-bold">Sector Node</span>
                <span className="text-[11px] text-on-surface font-bold uppercase tracking-wider">ISIMS AMPHI</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[10px] text-on-surface-variant uppercase tracking-widest font-bold">Activation Fee</span>
                <span className="text-sm text-secondary-container font-bold">15 DT</span>
              </div>
            </div>
          </div>

          <div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant/10 flex flex-col relative overflow-hidden">
             <div className="absolute top-[-50px] right-[-50px] w-32 h-32 bg-primary/5 rounded-full blur-3xl"></div>
             <h3 className="font-label text-xs text-primary uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
               <span className="material-symbols-outlined text-sm">assignment</span>
               Mission Manifest
             </h3>
             
             <div className="space-y-6">
                <div className="relative pl-6 border-l-2 border-primary/30">
                   <div className="absolute top-0 -left-[9px] w-4 h-4 bg-primary rounded-full flex items-center justify-center">
                      <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                   </div>
                   <div className="flex flex-col">
                     <h4 className="text-sm font-headline text-white tracking-widest opacity-90 uppercase leading-none">GenAI Protocol</h4>
                     <span className="text-[8px] text-primary font-label uppercase tracking-widest mt-1">Speaker: Adam Walha</span>
                   </div>
                   <p className="text-[10px] text-on-surface-variant mt-1 leading-relaxed">CORE_LEARNING: Large Language Models, Generative Architectures & Neural Synergy.</p>
                </div>

                <div className="relative pl-6 border-l-2 border-primary/30">
                   <div className="absolute top-0 -left-[9px] w-4 h-4 bg-outline-variant/50 rounded-full flex items-center justify-center">
                      <div className="w-1.5 h-1.5 bg-white/50 rounded-full"></div>
                   </div>
                   <div className="flex flex-col">
                     <h4 className="text-sm font-headline text-white tracking-widest opacity-90 uppercase leading-none">Applicative Workshop</h4>
                     <span className="text-[8px] text-primary font-label uppercase tracking-widest mt-1">Speaker: Systems Lead</span>
                   </div>
                   <p className="text-[10px] text-on-surface-variant mt-1 leading-relaxed">PRACTICAL_INTEGRATION: Building real-world AI entities & interface deployment.</p>
                </div>

                <div className="mt-8 pt-4 border-t border-outline-variant/10 flex justify-between items-center bg-primary/5 -mx-6 px-6 py-4">
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] text-primary font-bold tracking-widest">RESOURCE_SYNC</span>
                    <div className="flex items-center gap-2">
                       <span className="text-[9px] text-on-surface-variant tracking-widest uppercase">Buffet Included</span>
                       <span className="text-[8px] text-white/40 font-mono">:: 12:30</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-secondary-container animate-pulse">verified</span>
                    <span className="text-[10px] text-white font-bold tracking-widest">CERTIFIED</span>
                  </div>
                </div>
             </div>
          </div>

        </div>

        <div className="w-full md:w-7/12 flex flex-col gap-8 relative">
          <div className="hidden md:block absolute top-[15%] -left-8 w-8 h-[1px]" style={{background: 'linear-gradient(90deg, #82cfff, transparent)'}}></div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 h-full">
            <div className="bg-surface-container-low p-6 rounded-xl border border-outline-variant/15 flex flex-col relative min-h-[220px]">
              <div className="flex justify-between items-start mb-auto">
                <h3 className="font-label text-xs text-on-surface-variant uppercase tracking-[0.2em]">Deployment Countdown</h3>
                <span className="material-symbols-outlined text-primary/50 text-sm">schedule</span>
              </div>
              <div className="flex flex-col items-center justify-center h-full gap-4">
                 <div className="flex gap-4">
                    <div className="text-center">
                       <span className="text-4xl text-white font-headline font-bold">06</span>
                       <span className="block text-[8px] text-primary tracking-widest uppercase mt-1">Days</span>
                    </div>
                    <span className="text-4xl text-primary/40 font-headline font-bold mt-[-4px]">:</span>
                    <div className="text-center">
                       <span className="text-4xl text-white font-headline font-bold">14</span>
                       <span className="block text-[8px] text-primary tracking-widest uppercase mt-1">Hours</span>
                    </div>
                    <span className="text-4xl text-primary/40 font-headline font-bold mt-[-4px]">:</span>
                    <div className="text-center">
                       <span className="text-4xl text-white font-headline font-bold">22</span>
                       <span className="block text-[8px] text-primary tracking-widest uppercase mt-1">Mins</span>
                    </div>
                 </div>
                 <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden mt-4">
                    <div className="w-[85%] h-full bg-primary shadow-[0_0_10px_rgba(0,174,239,0.5)]"></div>
                 </div>
              </div>
              <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-primary/50 via-transparent to-transparent"></div>
            </div>

            <div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant/15 flex flex-col relative h-[220px]">
              <div className="hidden sm:block absolute top-1/2 -left-6 w-6 h-[1px]" style={{background: 'linear-gradient(90deg, #82cfff, transparent)'}}></div>
              <div className="flex justify-between items-start mb-auto">
                <h3 className="font-label text-xs text-on-surface-variant uppercase tracking-[0.2em]">Mission Node</h3>
                <span className="material-symbols-outlined text-secondary-container/50 text-sm">location_on</span>
              </div>
              <div className="flex flex-col h-full justify-center">
                <span className="font-headline text-2xl text-white tracking-[0.1em] font-bold">ISIMS TUNISIA</span>
                <p className="text-[10px] text-on-surface-variant mt-2 tracking-[0.2em] leading-relaxed">SECTOR_ID: ISIMS_AMPHI_G1<br/>COORDS: 36.8065° N, 10.1815° E</p>
                <div className="mt-6 flex items-center gap-3">
                   <button className="h-8 px-4 bg-primary/20 hover:bg-primary/30 text-primary text-[10px] font-bold tracking-widest border border-primary/30 transition-all rounded-sm uppercase">Scan Map</button>
                   <span className="text-[10px] text-primary/40 animate-pulse font-mono font-bold">AUTHORIZED</span>
                </div>
              </div>
            </div>

            <div className="sm:col-span-2 bg-surface-container-low p-6 rounded-xl border border-outline-variant/10 relative overflow-hidden">
               <div className="absolute bottom-0 right-0 w-32 h-32 bg-secondary-container/5 rounded-full blur-3xl"></div>
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-label text-xs text-primary uppercase tracking-[0.2em] flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse"></span>
                  MISSION BROADCAST
                </h3>
                <span className="text-[9px] text-on-surface-variant uppercase tracking-widest font-bold">LIVE_STATUS: NOMINAL</span>
              </div>
              <div className="space-y-4">
                <div className="flex gap-4 items-start group p-4 bg-white/5 border border-white/5 rounded-lg">
                  <div className="mt-1"><span className="material-symbols-outlined text-primary text-lg">broadcast_on_home</span></div>
                  <div className="flex-grow">
                    <p className="font-body text-sm text-on-surface group-hover:text-primary transition-colors leading-relaxed tracking-wide">"All systems calibrated for 26th April. Prepare for GenAI protocol initialization at ISIMS."</p>
                    <span className="font-label text-[10px] text-on-surface-variant uppercase tracking-[0.3em] font-bold mt-3 block">SYSTEM_LOG :: ALPHA_1</span>
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

      <div className="px-6 md:px-12 pb-12 max-w-7xl mx-auto w-full">
        <button 
          onClick={handleLogout}
          className="w-full bg-surface-container-low/40 p-4 rounded-xl border border-red-500/20 hover:bg-red-500/5 hover:border-red-500/40 transition-all group flex items-center justify-center gap-3"
        >
          <span className="material-symbols-outlined text-red-500/60 group-hover:text-red-500 transition-colors">power_settings_new</span>
          <span className="font-label text-xs text-on-surface-variant group-hover:text-red-500 tracking-[0.3em] font-bold uppercase transition-colors italic">Terminate Authorized Session</span>
        </button>
      </div>
    </div>
  );
}
