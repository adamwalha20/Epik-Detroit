import { useEffect, useState } from 'react';
import Navigation from '../components/Navigation';
import { supabase, isMock } from '../lib/supabase';

export default function Result() {
  const [profileData, setProfileData] = useState<any>(null);
  const [uploading, setUploading] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [exporting, setExporting] = useState(false);

  const downloadCertificate = async () => {
    if (exporting || !profileData) return;
    setExporting(true);
    try {
      const element = document.getElementById('identity-card');
      if (!element) return;

      // Ensure we are at the top to avoid capture issues with scroll
      window.scrollTo(0, 0);

      // Clone the element to manipulate it for export
      const clonedElement = element.cloneNode(true) as HTMLElement;
      
      // Force landscape/desktop layout regardless of current viewport
      clonedElement.style.width = '1200px';
      clonedElement.style.maxWidth = 'none';
      clonedElement.style.height = 'auto';
      clonedElement.style.margin = '0 auto';
      
      // Promote responsive Tailwind classes to base classes
      clonedElement.querySelectorAll('*').forEach(el => {
        if (el instanceof HTMLElement) {
          const classList = el.classList;
          const originalClasses = Array.from(classList);
          originalClasses.forEach(cls => {
            if (cls.startsWith('md:') || cls.startsWith('lg:') || cls.startsWith('sm:')) {
              const baseClass = cls.split(':')[1];
              classList.add(baseClass);
              if (baseClass === 'flex-row') classList.remove('flex-col');
              if (baseClass === 'grid-cols-2') classList.remove('grid-cols-1');
            }
          });
        }
      });

      // Convert all images in the cloned element to Base64
      const images = Array.from(clonedElement.getElementsByTagName('img'));
      await Promise.all(images.map(async (img) => {
        try {
          const response = await fetch(img.src, { mode: 'cors' });
          const blob = await response.blob();
          const reader = new FileReader();
          const base64 = await new Promise<string>((resolve) => {
            reader.onloadend = () => resolve(reader.result as string);
            reader.readAsDataURL(blob);
          });
          img.src = base64;
        } catch (e) {
          console.warn('Failed to inline image:', img.src, e);
          // Keep original src if fetch fails (e.g. CORS)
        }
      }));

      // Gather all active styles from the document
      const styles = Array.from(document.styleSheets)
        .map(sheet => {
          try {
            return Array.from(sheet.cssRules).map(rule => rule.cssText).join('\n');
          } catch (e) {
            console.warn('Could not read stylesheet', e);
            return '';
          }
        }).join('\n');

      // Assemble the final HTML file
      const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=1200">
  <title>EPIK DETROIT | CERTIFICATE - ${profileData.name.toUpperCase()}</title>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Manrope:wght@200;300;400;500;600;700&display=swap">
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap">
  <style>
    ${styles}
    body { 
      background: #131313; 
      margin: 0; 
      padding: 40px; 
      display: flex; 
      justify-content: center; 
      align-items: center; 
      min-height: 100vh; 
      font-family: 'Manrope', sans-serif;
      color: #e5e2e1;
    }
    #identity-card { 
      width: 1200px !important; 
      max-width: none !important; 
      box-shadow: 0 0 50px rgba(0,0,0,0.8);
      border: 1px solid rgba(0, 174, 239, 0.2);
    }
    @media print {
      body { padding: 0; background: #000; }
      #identity-card { box-shadow: none; border: none; }
    }
  </style>
</head>
<body>
  ${clonedElement.outerHTML}
</body>
</html>`;

      // Trigger the download
      const blob = new Blob([htmlContent], { type: 'text/html' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `EPIK_DETROIT_CERTIFICATE_${profileData.name.replace(/\s+/g, '_').toUpperCase()}.html`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

    } catch (err) {
      console.error('Certificate Export failed:', err);
      alert('Could not export certificate. Please try again.');
    } finally {
      setExporting(false);
    }
  };
  
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (isMock) {
          const localStr = localStorage.getItem('epik_result');
          const local = localStr ? JSON.parse(localStr) : null;
          const mockData = {
            ai_type: local?.ai_type || 'ANALYST',
            trust_level: local?.trust_level || 'MEDIUM',
            stability_index: local?.stability_index || 75.3,
            score: local?.score || 88.4,
            name: 'SUBJECT-NULL'
          };
          setProfileData(mockData);
          document.title = `EPIK_DETROIT_CERTIFICATE_${mockData.name.replace(/\s+/g, '_').toUpperCase()}`;
          return;
        }
        
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          const { data: resultData } = await supabase.from('quiz_results').select('*, profiles(name, avatar_url)').eq('user_id', user.id).single();
          if (resultData) {
            const data = { ...resultData, name: resultData.profiles?.name || 'SUBJECT-NULL' };
            setProfileData(data);
            setAvatarUrl(resultData.profiles?.avatar_url || null);
            document.title = `EPIK_DETROIT_CERTIFICATE_${data.name.replace(/\s+/g, '_').toUpperCase()}`;
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
    <div className="bg-surface text-on-surface font-body antialiased min-h-screen flex flex-col pt-24 pb-64 md:pb-12 overflow-x-hidden relative scan-line-bg selection:bg-primary-container selection:text-on-primary-container">
      <Navigation />
      
      <main className="flex-grow flex items-center justify-center p-6 md:p-12 pb-80 md:pb-12 relative z-10">
        <div id="identity-card" className="w-full max-w-4xl bg-[#131313] rounded-xl border border-primary/20 p-1 relative overflow-hidden ambient-glow shadow-[0_0_50px_rgba(0,174,239,0.1)]">
          {/* Official Header */}
          <div className="flex flex-col md:flex-row justify-between items-center px-6 py-10 md:px-10 border-b border-primary/20 bg-primary/5 relative overflow-hidden gap-8 text-center md:text-left">
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/30 to-transparent"></div>
            <div className="absolute inset-0 scan-line opacity-10 pointer-events-none"></div>
            
              <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6 relative z-10 w-full md:w-auto">
                <div className="relative group shrink-0">
                  <div className="absolute -inset-3 bg-primary/20 rounded-lg blur-lg opacity-60 animate-pulse"></div>
                  <img src="/club-logo.png" alt="Club Logo" className="h-10 md:h-16 w-auto drop-shadow-[0_0_15px_rgba(0,174,239,0.6)] relative z-10" />
                </div>
                <div className="flex flex-col items-center md:items-start mt-2 md:mt-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[12px] md:text-lg font-headline text-white tracking-[0.2em] md:tracking-[0.4em] font-bold whitespace-nowrap">EPIK LEADERS</span>
                    <span className="material-symbols-outlined text-primary text-sm md:text-lg animate-pulse" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
                  </div>
                  <span className="text-[7px] md:text-[10px] font-label text-primary tracking-[0.1em] md:tracking-[0.2em] font-bold opacity-80 uppercase bg-primary/10 px-2 md:px-3 py-0.5 md:py-1 rounded-sm border border-primary/20 whitespace-nowrap">ISIMS BRANCH | PROTOCOL EVALUATION</span>
                </div>
              </div>

            <div className="flex flex-col relative z-10 w-full md:w-auto items-center md:items-end gap-2 border-t md:border-t-0 md:border-l border-primary/20 pt-6 md:pt-0 md:pl-8">
              <span className="text-xs md:text-sm font-headline text-white tracking-[0.3em] font-bold uppercase">CERTIFICATE OF PARTICIPATION</span>
              <div className="flex items-center gap-3">
                <div className="h-[1px] w-8 bg-primary/40 hidden md:block"></div>
                <span className="text-[10px] font-label text-on-surface-variant tracking-[0.2em] opacity-80 font-bold font-mono">HASH: 26042026_DETROIT</span>
              </div>
            </div>
          </div>

          <div className="p-8 md:p-12 flex flex-col md:flex-row gap-12 relative overflow-hidden">
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary-container/5 rounded-full blur-[60px] pointer-events-none"></div>
            
            <div className="flex-shrink-0 flex flex-col items-center justify-start gap-8 relative z-10 md:w-1/3">
              <div className="relative w-48 h-48 sm:w-56 sm:h-56">
                <div className="absolute inset-0 rounded-full border border-primary/20"></div>
                <div className="absolute inset-0 rounded-full border-2 border-primary border-t-transparent border-l-transparent transform rotate-45 glow-primary animate-pulse"></div>
                <div className="absolute inset-4 rounded-full bg-primary/5 glow-primary"></div>
                <label htmlFor="result-avatar-upload" className="absolute inset-6 rounded-full overflow-hidden border border-primary/30 flex items-center justify-center bg-[#1a1a1a] cursor-pointer group hover:border-primary transition-all">
                  {avatarUrl ? (
                    <img src={avatarUrl} alt="Identity" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  ) : (
                    <span className="material-symbols-outlined text-8xl text-primary/30 group-hover:text-primary/50" style={{ fontVariationSettings: "'FILL' 1" }}>smart_toy</span>
                  )}
                  <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity flex-col">
                    <span className="material-symbols-outlined text-white text-3xl">add_a_photo</span>
                    <span className="text-[8px] text-white font-bold tracking-[0.2em] mt-1">UPDATE PHOTON</span>
                  </div>
                  {uploading && <div className="absolute inset-0 bg-background/60 flex items-center justify-center"><div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin"></div></div>}
                </label>
                {/* Status Indicator */}
                <div className="absolute bottom-4 right-4 w-5 h-5 bg-[#00e3fd] rounded-full shadow-[0_0_15px_rgba(0,227,253,0.8)] border-2 border-[#131313]">
                  <div className="absolute inset-0 bg-[#00e3fd] rounded-full animate-ping opacity-75"></div>
                </div>
              </div>
              <div className="text-center font-headline uppercase tracking-[0.05em] flex flex-col gap-2 w-full">
                <div className="text-xs text-primary tracking-[0.3em] font-bold mb-1">IDENT_VERIFIED</div>
                <h1 className="text-3xl text-white font-bold drop-shadow-[0_0_10px_rgba(0,174,239,0.3)]">{profileData.name}</h1>
                <p className="text-primary text-[12px] border-b border-primary/20 pb-2 mb-4 font-bold tracking-[0.4em] uppercase opacity-90">{profileData.ai_type}</p>
                <div className="mt-6 flex flex-col gap-2 items-center px-6 w-full max-w-[240px]">
                  <div className="w-full h-[2px] bg-primary/20 relative overflow-hidden rounded-full shadow-[0_0_10px_rgba(0,174,239,0.1)]">
                    <div className="absolute inset-0 bg-primary animate-[shimmer_2.5s_infinite]" style={{ width: '75%' }}></div>
                  </div>
                  <span className="text-[10px] text-on-surface-variant mt-3 tracking-[0.5em] opacity-40 font-bold">DEVICE_ID: CORE-8849</span>
                </div>
              </div>
            </div>
            
            <div className="flex-grow flex flex-col justify-center gap-10 z-10 relative">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 px-4 sm:px-0">
                <div className="bg-[#1a1a1a] p-6 border border-primary/20 relative overflow-hidden group shadow-inner">
                  <div className="absolute top-0 left-0 w-full h-[2px] bg-primary group-hover:shadow-[0_0_15px_rgba(0,174,239,1)] transition-all"></div>
                  <span className="font-label text-[10px] text-primary uppercase tracking-[0.2em] block mb-4 font-bold">TRUST INDEX / SUCCESS</span>
                  <div className="flex items-end gap-2">
                    <span className="font-headline text-5xl text-white font-light drop-shadow-[0_0_15px_rgba(255,183,125,0.2)]">{profileData.score}</span>
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
              
              <div className="flex flex-col gap-4 mt-2">
                <div className="flex items-center gap-4">
                  <h3 className="font-label text-[9px] text-primary uppercase tracking-[0.2em] font-bold">PROTOCOL_STATUS</h3>
                  <div className="h-[1px] flex-grow bg-primary/20"></div>
                </div>
                <div className="flex flex-wrap gap-2">
                  <span className="bg-primary/10 border border-primary/30 text-primary font-label text-[9px] uppercase px-3 py-1.5 rounded-sm tracking-widest flex items-center gap-2 shadow-[0_0_10px_rgba(0,174,239,0.1)]">
                    <span className="material-symbols-outlined text-[12px]">verified_user</span>
                    {profileData.trust_level}_CLEARANCE
                  </span>
                  <span className="bg-white/5 border border-white/10 text-white/70 font-label text-[9px] uppercase px-3 py-1.5 rounded-sm tracking-widest flex items-center gap-2">
                    <span className="material-symbols-outlined text-[12px]">terminal</span>
                    SENTIENT_LENS_PASS
                  </span>
                </div>
              </div>

              {/* Mission Timeline Section */}
              <div className="mt-4 flex flex-col gap-4 mb-8 sm:mb-0">
                <div className="flex items-center gap-4">
                  <h3 className="font-label text-[9px] text-primary uppercase tracking-[0.2em] font-bold">MISSION_CHECKPOINTS</h3>
                  <div className="h-[1px] flex-grow bg-primary/20"></div>
                </div>
                <div className="grid grid-cols-1 gap-4">
                  {[
                    { time: '10:00', title: 'INITIAL UPLINK', speaker: 'EPIK SUPPORT' },
                    { time: '11:00', title: 'GEN-AI PROTOCOL', speaker: 'ADAM WALHA' },
                    { time: '14:00', title: 'APPLICATIVE WORKSHOP', speaker: 'SYSTEMS LEAD' }
                  ].map((item, idx) => (
                    <div key={idx} className="bg-[#1a1a1a] border border-primary/10 p-4 flex items-center justify-between group hover:border-primary/30 transition-all rounded-sm shadow-md">
                      <div className="flex items-center gap-5">
                        <div className="flex flex-col items-center">
                          <span className="text-xs font-headline text-white">{item.time}</span>
                          <div className="w-[1px] h-4 bg-primary/20 mt-1"></div>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-[11px] font-bold text-white tracking-widest uppercase mb-1">{item.title}</span>
                          <div className="flex items-center gap-2">
                            <span className="text-[9px] text-primary font-label uppercase opacity-60">Identity:</span>
                            <span className="text-[9px] text-white/90 font-bold uppercase tracking-tight">{item.speaker}</span>
                          </div>
                        </div>
                      </div>
                      <span className="material-symbols-outlined text-primary/30 text-[20px] group-hover:text-primary transition-colors">check_circle</span>
                    </div>
                  ))}
                </div>
              </div>
              
              
              {/* Footer Actions / Verification */}
              <div className="mt-8 pt-10 border-t border-primary/20 flex flex-col sm:flex-row justify-between items-center no-print gap-6">
                <div className="flex flex-col items-center sm:items-start opacity-70">
                  <span className="text-[9px] font-label text-primary tracking-[0.2em] font-bold">AUTHENTICITY_VERIFIED</span>
                  <span className="text-[8px] font-label text-on-surface-variant tracking-[0.1em] opacity-40">ENCRYPTION: SH-256 | DETROIT_CORE</span>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                  <div className="relative w-full sm:w-auto">
                    <input 
                      type="file" 
                      id="result-avatar-upload" 
                      accept="image/*" 
                      onChange={handleFileUpload} 
                      className="hidden" 
                    />
                    <label 
                      htmlFor="result-avatar-upload"
                      className="relative group bg-transparent border border-primary/40 text-white font-label text-[10px] uppercase px-6 py-3 tracking-widest hover:bg-primary/10 transition-all duration-300 cursor-pointer flex items-center justify-center gap-2 border-dashed w-full sm:w-auto"
                    >
                      <span className="material-symbols-outlined text-[16px] text-primary">add_a_photo</span>
                      {avatarUrl ? 'REFRESH PHOTO' : 'IMPORT IDENTITY'}
                    </label>
                  </div>
                  
                  <button
                    onClick={downloadCertificate}
                    disabled={exporting}
                    className="relative group bg-primary border border-primary text-[#131313] font-label text-[11px] uppercase px-8 py-3 tracking-widest hover:bg-white hover:border-white transition-all duration-300 flex items-center justify-center gap-3 font-bold shadow-[0_0_25px_rgba(0,174,239,0.4)] w-full sm:w-auto active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {exporting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-[#131313] border-t-transparent rounded-full animate-spin"></div>
                        PREPARING EXPORT...
                      </>
                    ) : (
                      <>
                        <span className="material-symbols-outlined text-[18px]">file_download</span>
                        DOWNLOAD CERTIFICATE (HTML)
                      </>
                    )}
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
          size: landscape;
          margin: 0;
        }
        @media print {
          html, body {
            margin: 0 !important;
            padding: 0 !important;
            height: 100vh !important;
            width: 100vw !important;
            overflow: hidden !important;
            background: #131313 !important;
          }
          .no-print { display: none !important; }
          #identity-card { 
            position: absolute !important;
            top: 0 !important;
            left: 0 !important;
            width: 100vw !important;
            height: 100vh !important;
            max-width: none !important;
            border: none !important;
            border-radius: 0 !important;
            background: #131313 !important;
            margin: 0 !important;
            padding: 40px !important;
            display: flex !important;
            flex-direction: column !important;
            justify-content: center !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
            box-shadow: none !important;
          }
          /* Ensure all backgrounds and colors print precisely */
          #identity-card * {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          .bg-primary\/5 { background-color: rgba(0, 174, 239, 0.05) !important; }
          .bg-\[\#1a1a1a\] { background-color: #1a1a1a !important; }
          .bg-primary { background-color: #00aeef !important; }
          .border-primary\/20 { border-color: rgba(0, 174, 239, 0.2) !important; }
          .text-primary { color: #00aeef !important; }
          .text-white { color: #ffffff !important; }
          .ambient-glow { box-shadow: none !important; }
        }
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>

  );
}
