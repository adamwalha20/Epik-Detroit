import { Link, useLocation } from 'react-router-dom';

export default function Navigation() {
  const location = useLocation();

  const navItems = [
    { name: 'SUBJECT FILE', path: '/result', icon: 'folder_shared' },
    { name: 'DATA NODE', path: '/timeline', icon: 'hub' },
    { name: 'SCANNER', path: '/leaderboard', icon: 'radar' },
    { name: 'CORE', path: '/hud', icon: 'memory' },
  ];

  return (
    <>
      <header className="hidden md:flex fixed top-0 left-0 w-full z-50 items-center justify-between px-6 py-4 bg-[#131313]/60 backdrop-blur-md shadow-[0_0_20px_rgba(0,0,0,0.5)] border-b border-[#3e4850]/20">
        <div className="flex items-center gap-4">
          <img src="/club-logo.png" alt="Club Logo" className="h-10 w-auto opacity-90 drop-shadow-[0_0_8px_rgba(255,255,255,0.2)]" />
          <div className="h-6 w-[1px] bg-primary/20 mx-1"></div>
          <h1 className="font-headline font-bold text-primary-container tracking-tighter drop-shadow-[0_0_10px_rgba(0,174,239,0.5)] text-xl">
            SYSTEM STATUS: ACTIVE
          </h1>
        </div>
        <nav className="flex gap-8">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`font-label uppercase tracking-[0.1em] text-xs transition-all duration-300 ${
                  isActive
                    ? 'text-[#00aeef] bg-primary/10'
                    : 'text-[#3e4850] hover:bg-[#00aeef]/10 hover:text-[#82cfff]'
                } px-3 py-2 rounded-md`}
              >
                {item.name}
              </Link>
            );
          })}
        </nav>
        <button className="text-[#3e4850] hover:text-[#82cfff] transition-colors">
          <span className="material-symbols-outlined text-2xl">settings_input_antenna</span>
        </button>
      </header>

      <header className="md:hidden fixed top-0 left-0 w-full z-50 flex items-center justify-between px-4 py-3 bg-[#131313]/80 backdrop-blur-xl border-b border-primary/20">
        <div className="flex items-center gap-3">
          <img src="/club-logo.png" alt="Club Logo" className="h-8 w-auto opacity-90 drop-shadow-[0_0_8px_rgba(255,255,255,0.2)]" />
          <div className="h-4 w-[1px] bg-primary/20 mx-1"></div>
          <span className="font-headline font-bold text-primary tracking-tighter text-sm uppercase">DETROIT: CORE</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></div>
          <span className="text-[8px] font-label text-primary/70 tracking-widest uppercase">ACTIVE</span>
        </div>
      </header>

      <nav className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 w-[92%] z-50 flex justify-between items-center h-14 bg-[#131313]/90 backdrop-blur-2xl rounded-2xl border border-primary/30 shadow-[0_0_30px_rgba(0,0,0,0.8)] px-1.5">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.name}
              to={item.path}
              className={`flex flex-col items-center justify-center transition-all duration-300 w-[23%] h-[85%] rounded-xl ${
                isActive
                  ? 'bg-primary/20 text-primary border border-primary/40 shadow-[0_0_15px_rgba(0,174,239,0.3)] scale-105'
                  : 'text-outline-variant hover:text-primary hover:bg-primary/5'
              }`}
            >
              <span className="material-symbols-outlined text-base">{item.icon}</span>
              <span className="font-label uppercase tracking-[0.05em] text-[7px] mt-0.5 font-bold">{item.name.split(' ')[0]}</span>
            </Link>
          );
        })}
      </nav>
    </>
  );
}
