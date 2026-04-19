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
          <span className="material-symbols-outlined text-primary-container text-2xl">lens</span>
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

      <nav className="md:hidden fixed bottom-0 left-0 w-full z-50 flex justify-around items-center pb-8 bg-[#131313]/80 backdrop-blur-xl rounded-full mx-6 mb-6 h-16 ring-1 ring-[#00aeef]/20 shadow-[0_0_30px_rgba(0,174,239,0.15)] bg-[#1c1b1b]/50" style={{ width: 'calc(100% - 3rem)' }}>
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.name}
              to={item.path}
              className={`flex flex-col items-center justify-center transition-transform w-[25%] ${
                isActive
                  ? 'bg-[#00aeef]/20 text-[#00aeef] rounded-full px-5 py-2 ring-1 ring-[#00aeef]/40 shadow-[0_0_12px_rgba(0,174,239,0.3)] scale-105'
                  : 'text-[#3e4850] opacity-70 hover:text-[#82cfff] hover:opacity-100 scale-100 hover:scale-105'
              }`}
            >
              <span className="material-symbols-outlined text-xl mb-1">{item.icon}</span>
              <span className="font-label uppercase tracking-[0.05em] text-[10px] sm:text-[10px] xs:text-[8px] truncate max-w-full">{item.name}</span>
            </Link>
          );
        })}
      </nav>
    </>
  );
}
