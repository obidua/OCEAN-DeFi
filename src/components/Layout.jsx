import { useState, useEffect } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Wallet,
  TrendingUp,
  Users,
  Award,
  Trophy,
  Gift,
  Vault,
  Settings,
  Menu,
  X,
  ChevronRight,
  Info,
  LogOut,
  FileDown,
  Presentation,
  BookOpen,
  History
} from 'lucide-react';
import { generateOceanDefiPDF } from '../utils/generatePDF';

const navItems = [
  { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/dashboard/stake', label: 'Stake & Invest', icon: Wallet },
  { path: '/dashboard/portfolio', label: 'Portfolio Overview', icon: Wallet },
  { path: '/dashboard/slab', label: 'Slab Income', icon: Award },
   { path: '/dashboard/royalty', label: 'Royalty Program', icon: Trophy },
   { path: '/dashboard/rewards', label: 'One-Time Rewards', icon: Gift },
  { path: '/dashboard/earnings', label: 'Claim Earnings', icon: TrendingUp },
  { path: '/dashboard/team', label: 'Team Network', icon: Users },
  { path: '/dashboard/safe-wallet', label: 'Safe Wallet', icon: Vault },
  { path: '/dashboard/transaction-history', label: 'Transaction History', icon: History },
  { path: '/dashboard/presentation', label: 'Presentation', icon: Presentation },
  { path: '/dashboard/analytics', label: 'Analytics', icon: TrendingUp },
  { path: '/dashboard/about', label: 'About & Vision', icon: Info },
  { path: '/dashboard/ocean-defi-guide', label: 'About Ocean DeFi', icon: BookOpen },
  { path: '/dashboard/settings', label: 'Settings & Rules', icon: Settings },
];

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const ramaPrice = 0.0245;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const handleDisconnect = () => {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('isAuthenticated');
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-dark-950 cyber-grid-bg relative overflow-hidden">
      <div className="fixed inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-neon-green/5 pointer-events-none" />

      <div className="fixed top-0 left-0 right-0 h-16 cyber-glass border-b border-cyan-500/30 z-40 shadow-neon-blue">
        <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />
        <div className="h-full px-4 flex items-center justify-between relative">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 hover:bg-cyan-500/10 rounded-lg transition-all border border-cyan-500/20 hover:border-cyan-500/40 text-cyan-400"
            >
              {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <Link to="/dashboard" className="flex items-center gap-3 hover:opacity-80 transition-opacity group">
              <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-neon-green rounded-lg flex items-center justify-center shadow-neon-cyan relative animate-glow-pulse">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500 to-neon-green rounded-lg blur-md opacity-50" />
                <Wallet className="text-dark-950 relative z-10" size={22} />
              </div>
              <div>
                <h1 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-neon-green text-neon-glow">
                  OCEAN DeFi
                </h1>
                <p className="text-xs text-cyan-400/70 tracking-wider">BUILT ON RAMESTTA</p>
              </div>
            </Link>
          </div>

          <div className="hidden lg:flex items-center gap-4">
            <div className="flex items-center gap-3 px-4 py-2 cyber-glass rounded-lg border-glow">
              <div className="w-2 h-2 bg-neon-green rounded-full animate-pulse shadow-neon-green" />
              <span className="text-xs font-medium text-cyan-300 uppercase tracking-wider">RAMA:</span>
              <span className="text-sm font-bold text-neon-green">${ramaPrice.toFixed(4)}</span>
            </div>

            <div className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-neon-green text-dark-950 rounded-lg text-sm font-bold ">
              0x1234...5678
            </div>
          </div>
        </div>
      </div>

      <aside className={`
        fixed top-16 left-0 bottom-0 w-64 cyber-glass border-r border-cyan-500/30 z-30
        transition-transform duration-300 lg:translate-x-0 shadow-2xl
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="absolute inset-y-0 right-0 w-[1px] bg-gradient-to-b from-transparent via-cyan-500/50 to-transparent" />

        <div className="p-4 pb-2">
          <div className="text-xs text-cyan-400/70 text-center mb-2 uppercase tracking-widest font-medium">
            Validator-Backed Ecosystem
          </div>
        </div>

        <nav className="px-4 pb-4 space-y-1 flex flex-col h-[calc(100vh-8rem)]">
          <div className="flex-1 space-y-1 overflow-y-auto pr-2 hide-scrollbar">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setSidebarOpen(false)}
                  className={`
                    flex items-center gap-3 px-4 py-3 rounded-lg transition-all group relative overflow-hidden
                    ${isActive
                      ? 'bg-gradient-to-r from-cyan-500/20 to-neon-green/20 text-cyan-300 border border-cyan-500/50 '
                      : 'hover:bg-cyan-500/10 text-slate-400 hover:text-cyan-300 border border-transparent hover:border-cyan-500/20'
                    }
                  `}
                >
                  {isActive && (
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-neon-green/10 animate-pulse" />
                  )}
                  <Icon size={20} className="relative z-10" />
                  <span className="text-sm font-medium flex-1 relative z-10">{item.label}</span>
                  {isActive && <ChevronRight size={16} className="relative z-10 text-neon-green" />}
                </Link>
              );
            })}
          </div>

          <div className="space-y-2 border-t border-cyan-500/30 pt-3">
            <div className="lg:hidden flex items-center gap-2 px-4 py-2 cyber-glass rounded-lg border border-cyan-500/30">
              <div className="w-2 h-2 bg-neon-green rounded-full animate-pulse shadow-neon-green flex-shrink-0" />
              <span className="text-xs font-medium text-cyan-400 uppercase">RAMA:</span>
              <span className="text-xs font-bold text-neon-green">${ramaPrice.toFixed(4)}</span>
            </div>

            <div className="lg:hidden px-4 py-2 bg-gradient-to-r from-cyan-500 to-neon-green text-dark-950 rounded-lg text-xs font-bold text-center shadow-neon-cyan">
              0x1234...5678
            </div>

            <button
              onClick={handleDisconnect}
              className="w-full flex items-center gap-3 px-4 py-3 mt-2 rounded-lg transition-all hover:bg-red-500/10 text-red-400 border border-transparent hover:border-red-500/30 group"
            >
              <LogOut size={20} className="group-hover:animate-pulse" />
              <span className="text-sm font-medium flex-1">Disconnect</span>
            </button>

            <button
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all bg-green-500/10 text-green-400 border  border-green-500/30 group"
            >
              <span className="text-sm font-medium flex-1">Version :1.03</span>
            </button>


          </div>
        </nav>
      </aside>

      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <main className="lg:ml-64 pt-16 relative z-10">
        <div className="p-4 lg:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
