import { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import BottomNav from './BottomNav';
import MoreMenu from './MoreMenu';

export default function Layout() {
  const [moreMenuOpen, setMoreMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="h-full bg-dark-950 cyber-grid-bg relative flex flex-col overflow-hidden">
      <div className="fixed inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-neon-green/5 pointer-events-none" />

      <main className="flex-1 relative z-10 overflow-y-auto overflow-x-hidden pb-24" style={{ WebkitOverflowScrolling: 'touch', overscrollBehavior: 'none' }}>
        <div className="p-4 lg:p-8">
          <Outlet />
        </div>
      </main>

      <BottomNav onMoreClick={() => setMoreMenuOpen(true)} />
      <MoreMenu isOpen={moreMenuOpen} onClose={() => setMoreMenuOpen(false)} />
    </div>
  );
}
