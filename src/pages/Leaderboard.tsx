import { useEffect, useState } from 'react';
import Navigation from '../components/Navigation';
import { supabase, isMock } from '../lib/supabase';
import { useLanguage } from '../context/LanguageContext';

export default function Leaderboard() {
  const { t } = useLanguage();
  const [leaders, setLeaders] = useState<any[]>([]);
  const [totalUsers, setTotalUsers] = useState<number>(0);
  const [topThree, setTopThree] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchLeaderboardData = async () => {
      setIsLoading(true);
      try {
        if (isMock) {
          const mockLeaders = [
            { id: '1', profiles: { name: 'J.K. ROWLAND', avatar_url: null }, ai_type: 'APEX ENTITY', score: 99.8 },
            { id: '2', profiles: { name: 'E. VANCE', avatar_url: null }, ai_type: 'STABLE', score: 98.4 },
            { id: '3', profiles: { name: 'M. CHEN', avatar_url: null }, ai_type: 'STABLE', score: 97.9 },
            { id: '4', profiles: { name: 'S. RIVERA', avatar_url: null }, ai_type: 'DEGRADING', score: 96.5 },
            { id: '5', profiles: { name: 'L. KOWALSKI', avatar_url: null }, ai_type: 'EVOLVING', score: 95.2 },
          ];
          setLeaders(mockLeaders);
          setTopThree(mockLeaders.slice(0, 3));
          setTotalUsers(14289);
          setIsLoading(false);
          return;
        }

        // Fetch Total Users
        const { count, error: countError } = await supabase
          .from('profiles')
          .select('*', { count: 'exact', head: true });
        
        if (!countError) setTotalUsers(count || 0);

        // Fetch Leaders
        const { data, error: leaderError } = await supabase
          .from('quiz_results')
          .select(`
            id,
            score,
            ai_type,
            profiles (
              name,
              avatar_url
            )
          `)
          .order('score', { ascending: false })
          .limit(10);

        if (!leaderError && data) {
          const transformedData = data.map((item: any) => ({
            ...item,
            profiles: Array.isArray(item.profiles) ? item.profiles[0] : item.profiles
          }));
          setLeaders(transformedData);
          setTopThree(transformedData.slice(0, 3));
        }
      } catch (err) {
        console.error('Error fetching leaderboard data:', err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchLeaderboardData();
  }, []);

  return (
    <div className="font-body min-h-screen relative overflow-x-hidden selection:bg-primary-container selection:text-on-primary-container bg-background">
      <Navigation />
      
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden flex justify-center items-center opacity-30">
        <div className="absolute w-[800px] h-[800px] bg-primary-container rounded-full blur-[150px] opacity-10 top-[-20%] left-[-10%]"></div>
        <div className="absolute w-[600px] h-[600px] bg-secondary-container rounded-full blur-[120px] opacity-5 bottom-[-10%] right-[-10%]"></div>
      </div>

      <main className="relative z-10 pt-32 pb-32 px-4 md:px-8 max-w-7xl mx-auto space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-3 mb-2 opacity-70">
              <span className="w-8 h-[1px] bg-primary"></span>
              <span className="font-label text-sm tracking-[0.05em] uppercase text-primary">MODULE 04</span>
            </div>
            <h2 className="font-headline text-4xl md:text-5xl font-bold tracking-tight text-on-surface">{t('global_rank')}</h2>
          </div>
          
          <div className="flex gap-4 bg-surface-container-low/60 backdrop-blur-[20px] p-4 rounded-xl border border-outline-variant/20">
            <div className="flex flex-col">
              <span className="font-label text-xs text-on-surface-variant tracking-[0.05em] uppercase mb-1">{t('total_entities')}</span>
              <span className="font-headline text-xl text-primary font-bold">{totalUsers.toLocaleString()}</span>
            </div>
            <div className="w-[1px] bg-outline-variant/30"></div>
            <div className="flex flex-col">
              <span className="font-label text-xs text-on-surface-variant tracking-[0.05em] uppercase mb-1">{t('network_load')}</span>
              <div className="flex items-center gap-2">
                <span className="font-headline text-xl text-secondary-container font-bold">87%</span>
                <div className="w-2 h-2 rounded-full bg-secondary-container animate-pulse shadow-[0_0_8px_rgba(0,227,253,0.5)]"></div>
              </div>
            </div>
          </div>
        </div>

        {/* TOP 3 PODIUM SECTION */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
          {/* Rank 2 */}
          {topThree[1] && (
            <div className="order-2 md:order-1 bg-surface-container-low/40 backdrop-blur-md border border-outline-variant/20 p-6 rounded-2xl relative overflow-hidden group hover:bg-surface-container-low/60 transition-all">
              <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-secondary-container/50 to-transparent scan-line-horizontal opacity-0 group-hover:opacity-100"></div>
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="relative w-24 h-24 rounded-full border-2 border-secondary-container/30 p-1">
                  <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-surface-container border border-outline-variant flex items-center justify-center font-headline font-bold text-secondary-container shadow-lg">2</div>
                  <div className="w-full h-full rounded-full overflow-hidden bg-surface-container-highest flex items-center justify-center">
                    {topThree[1].profiles?.avatar_url ? (
                      <img src={topThree[1].profiles.avatar_url} alt="" className="w-full h-full object-cover" />
                    ) : (
                      <span className="material-symbols-outlined text-4xl text-on-surface-variant">person</span>
                    )}
                  </div>
                </div>
                <div>
                  <h3 className="font-headline text-xl font-bold text-on-surface uppercase truncate max-w-[200px]">
                    {topThree[1].profiles?.name || t('subject_pending')}
                  </h3>
                  <span className="font-label text-[10px] text-secondary-container tracking-widest uppercase">{t('stability_secure')}</span>
                </div>
                <div className="w-full pt-4 border-t border-outline-variant/20">
                  <span className="block font-label text-[10px] text-on-surface-variant tracking-[0.1em] uppercase mb-2">{t('success_rate')}</span>
                  <div className="h-1 w-full bg-surface-container-highest rounded-full overflow-hidden">
                    <div className="h-full bg-secondary-container shadow-[0_0_10px_rgba(0,227,253,0.5)]" style={{ width: `${topThree[1].score}%` }}></div>
                  </div>
                  <span className="block mt-2 font-headline text-2xl font-bold text-secondary-container">{topThree[1].score}%</span>
                </div>
              </div>
            </div>
          )}

          {/* Rank 1 - APEX */}
          {topThree[0] && (
            <div className="order-1 md:order-2 bg-primary/5 backdrop-blur-xl border-2 border-primary/30 p-8 rounded-3xl relative overflow-hidden group hover:bg-primary/10 transition-all md:scale-105 shadow-[0_0_30px_rgba(0,174,239,0.1)]">
              <div className="absolute inset-0 scan-line-bg pointer-events-none opacity-20"></div>
              <div className="absolute top-0 left-0 w-full h-[4px] bg-gradient-to-r from-transparent via-primary to-transparent scan-line-horizontal"></div>
              
              <div className="flex flex-col items-center text-center space-y-6">
                <div className="relative">
                  {/* Holographic Rings */}
                  <div className="absolute inset-[-20px] border border-primary/20 rounded-full animate-[spin_10s_linear_infinite]"></div>
                  <div className="absolute inset-[-10px] border border-primary/40 rounded-full border-t-transparent animate-[spin_4s_linear_infinite_reverse]"></div>
                  
                  <div className="relative w-32 h-32 rounded-full border-4 border-primary p-1 shadow-[0_0_20px_rgba(0,174,239,0.3)]">
                    <div className="absolute -top-3 -right-3 w-12 h-12 rounded-full bg-primary text-on-primary border-4 border-surface-container flex items-center justify-center font-headline font-bold text-2xl shadow-xl">1</div>
                    <div className="w-full h-full rounded-full overflow-hidden bg-surface-container-highest flex items-center justify-center">
                      {topThree[0].profiles?.avatar_url ? (
                        <img src={topThree[0].profiles.avatar_url} alt="" className="w-full h-full object-cover" />
                      ) : (
                        <span className="material-symbols-outlined text-6xl text-primary">person</span>
                      )}
                    </div>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                    <span className="font-label text-xs text-primary tracking-[0.2em] uppercase">{t('apex_entity')}</span>
                  </div>
                  <h3 className="font-headline text-3xl font-bold text-on-surface tracking-tight uppercase truncate max-w-[280px]">
                    {topThree[0].profiles?.name || t('subject_pending')}
                  </h3>
                </div>

                <div className="w-full pt-6 border-t border-primary/20">
                  <div className="flex justify-between items-end mb-2 px-2">
                    <span className="font-label text-[10px] text-on-surface-variant tracking-[0.1em] uppercase">{t('eval_completion')}</span>
                    <span className="font-headline text-3xl font-bold text-primary">{topThree[0].score}%</span>
                  </div>
                  <div className="h-2 w-full bg-surface-container-highest rounded-full overflow-hidden">
                    <div className="h-full bg-primary shadow-[0_0_15px_rgba(0,174,239,0.8)]" style={{ width: `${topThree[0].score}%` }}></div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Rank 3 */}
          {topThree[2] && (
            <div className="order-3 bg-surface-container-low/40 backdrop-blur-md border border-outline-variant/20 p-6 rounded-2xl relative overflow-hidden group hover:bg-surface-container-low/60 transition-all">
              <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-outline/50 to-transparent scan-line-horizontal opacity-0 group-hover:opacity-100"></div>
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="relative w-24 h-24 rounded-full border-2 border-outline/30 p-1">
                  <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-surface-container border border-outline-variant flex items-center justify-center font-headline font-bold text-on-surface-variant shadow-lg">3</div>
                  <div className="w-full h-full rounded-full overflow-hidden bg-surface-container-highest flex items-center justify-center">
                    {topThree[2].profiles?.avatar_url ? (
                      <img src={topThree[2].profiles.avatar_url} alt="" className="w-full h-full object-cover" />
                    ) : (
                      <span className="material-symbols-outlined text-4xl text-on-surface-variant">person</span>
                    )}
                  </div>
                </div>
                <div>
                  <h3 className="font-headline text-xl font-bold text-on-surface uppercase truncate max-w-[200px]">
                    {topThree[2].profiles?.name || t('subject_pending')}
                  </h3>
                  <span className="font-label text-[10px] text-on-surface-variant tracking-widest uppercase">{t('evaluation_secure')}</span>
                </div>
                <div className="w-full pt-4 border-t border-outline-variant/20">
                  <span className="block font-label text-[10px] text-on-surface-variant tracking-[0.1em] uppercase mb-2">{t('success_rate')}</span>
                  <div className="h-1 w-full bg-surface-container-highest rounded-full overflow-hidden">
                    <div className="h-full bg-on-surface-variant/40" style={{ width: `${topThree[2].score}%` }}></div>
                  </div>
                  <span className="block mt-2 font-headline text-2xl font-bold text-on-surface-variant">{topThree[2].score}%</span>
                </div>
              </div>
            </div>
          )}
        </div>

          <div className="lg:col-span-12 bg-surface-container-low rounded-2xl border border-outline-variant/20 p-6 overflow-hidden relative">
            <div className="absolute inset-0 scan-line pointer-events-none opacity-30"></div>
            <div className="flex items-center justify-between mb-6 relative z-10">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-primary shadow-[0_0_10px_rgba(130,207,255,0.6)] animate-pulse"></div>
                <h3 className="font-label text-sm text-on-surface tracking-[0.05em] uppercase">{t('live_stream')}</h3>
              </div>
              <div className="font-label text-xs text-outline-variant tracking-[0.05em] uppercase">{t('auto_refresh')} ON</div>
            </div>
            
            <div className="overflow-x-auto relative z-10">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-outline-variant/30">
                    <th className="py-3 px-4 font-label text-xs text-on-surface-variant tracking-[0.05em] uppercase font-normal">{t('rank_col')}</th>
                    <th className="py-3 px-4 font-label text-xs text-on-surface-variant tracking-[0.05em] uppercase font-normal">{t('entity_id_col')}</th>
                    <th className="py-3 px-4 font-label text-xs text-on-surface-variant tracking-[0.05em] uppercase font-normal">{t('designation_col')}</th>
                    <th className="py-3 px-4 font-label text-xs text-on-surface-variant tracking-[0.05em] uppercase font-normal text-right">{t('eval_pct_col')}</th>
                  </tr>
                </thead>
                <tbody className="font-body text-sm">
                  {leaders.slice(3).map((leader, index) => (
                    <tr key={index} className="border-b border-outline-variant/10 hover:bg-surface-container transition-colors">
                      <td className="py-4 px-4 font-headline font-bold text-on-surface-variant">{String(index + 4).padStart(2, '0')}</td>
                      <td className="py-4 px-4 text-on-surface-variant font-mono">#{leader.id?.substring(0,6).toUpperCase() || 'XXX'}</td>
                      <td className="py-4 px-4 text-on-surface uppercase whitespace-nowrap">
                        {leader.profiles?.name || t('subject_pending')}
                      </td>
                      <td className="py-4 px-4 text-right text-secondary-container font-headline">{leader.score}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
      </main>
    </div>
  );
}
