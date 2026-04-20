import { useLanguage } from '../context/LanguageContext';

export default function LanguageToggle() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center bg-[#1a1a1a]/80 backdrop-blur-md rounded-full p-1 border border-primary/20 shadow-[0_0_15px_rgba(0,174,239,0.1)]">
      <button
        onClick={() => setLanguage('en')}
        className={`px-3 py-1 rounded-full text-[10px] font-headline tracking-widest transition-all duration-300 ${
          language === 'en' 
            ? 'bg-primary text-[#131313] shadow-[0_0_10px_rgba(0,174,239,0.5)]' 
            : 'text-white/40 hover:text-white/70'
        }`}
      >
        EN
      </button>
      <button
        onClick={() => setLanguage('fr')}
        className={`px-3 py-1 rounded-full text-[10px] font-headline tracking-widest transition-all duration-300 ${
          language === 'fr' 
            ? 'bg-primary text-[#131313] shadow-[0_0_10px_rgba(0,174,239,0.5)]' 
            : 'text-white/40 hover:text-white/70'
        }`}
      >
        FR
      </button>
    </div>
  );
}
