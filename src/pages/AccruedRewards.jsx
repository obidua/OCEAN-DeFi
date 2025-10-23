import { useState } from 'react';
import { Wallet, TrendingUp, Calendar, Clock, DollarSign, CheckCircle, History, AlertCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { formatUSD } from '../utils/contractData';
import Swal from 'sweetalert2';

const USD_PRECISION = 100000000;

const mockPortfolios = [
  {
    id: 1,
    stakedAmount: 5000,
    startDate: '2025-09-15',
    status: 'Active',
    tier: 'Tier 1',
    booster: false,
    dailyRate: 0.33,
    totalAccrued: 215.50,
    lastClaimed: '2025-10-20',
    daysActive: 38,
    nextClaimable: 18.50,
    maxCap: 10000,
    totalEarned: 197.00,
    remainingCap: 9803.00
  },
  {
    id: 2,
    stakedAmount: 10000,
    startDate: '2025-08-01',
    status: 'Active',
    tier: 'Tier 2',
    booster: true,
    dailyRate: 0.80,
    totalAccrued: 1890.25,
    lastClaimed: '2025-10-19',
    daysActive: 83,
    nextClaimable: 64.00,
    maxCap: 25000,
    totalEarned: 1826.25,
    remainingCap: 23173.75
  },
  {
    id: 3,
    stakedAmount: 2500,
    startDate: '2025-10-01',
    status: 'Active',
    tier: 'Tier 1',
    booster: false,
    dailyRate: 0.33,
    totalAccrued: 60.75,
    lastClaimed: null,
    daysActive: 22,
    nextClaimable: 60.75,
    maxCap: 5000,
    totalEarned: 0,
    remainingCap: 5000
  }
];

const mockClaimHistory = [
  { id: 1, date: '2025-10-20', portfolioId: 1, amount: 18.50, type: 'Portfolio Growth', txHash: '0xabc...123' },
  { id: 2, date: '2025-10-19', portfolioId: 2, amount: 64.00, type: 'Portfolio Growth', txHash: '0xdef...456' },
  { id: 3, date: '2025-10-18', portfolioId: 1, amount: 16.50, type: 'Portfolio Growth', txHash: '0xghi...789' },
  { id: 4, date: '2025-10-17', portfolioId: 2, amount: 64.00, type: 'Portfolio Growth', txHash: '0xjkl...012' },
  { id: 5, date: '2025-10-15', portfolioId: 1, amount: 16.50, type: 'Portfolio Growth', txHash: '0xmno...345' },
];

export default function AccruedRewards() {
  const [selectedPortfolio, setSelectedPortfolio] = useState(null);
  const [claiming, setClaiming] = useState(null);

  const totalAccrued = mockPortfolios.reduce((sum, p) => sum + p.nextClaimable, 0);
  const totalStaked = mockPortfolios.reduce((sum, p) => sum + p.stakedAmount, 0);
  const totalEarned = mockPortfolios.reduce((sum, p) => sum + p.totalEarned, 0);

  const handleClaim = async (portfolio) => {
    if (portfolio.nextClaimable < 10) {
      Swal.fire({
        icon: 'warning',
        title: 'Minimum Claim Amount',
        text: 'Minimum claim amount is $10.00',
        background: '#0a1628',
        color: '#22d3ee',
        confirmButtonColor: '#06b6d4',
      });
      return;
    }

    setClaiming(portfolio.id);

    try {
      await new Promise(resolve => setTimeout(resolve, 2000));

      Swal.fire({
        icon: 'success',
        title: 'Claim Successful!',
        html: `
          <div class="text-left space-y-2">
            <p>Amount Claimed: <strong>$${portfolio.nextClaimable.toFixed(2)}</strong></p>
            <p>Portfolio: <strong>#${portfolio.id}</strong></p>
            <p>Transaction Hash: <strong class="text-xs">0x${Math.random().toString(36).substring(2, 15)}...</strong></p>
          </div>
        `,
        background: '#0a1628',
        color: '#22d3ee',
        confirmButtonColor: '#06b6d4',
      });

      portfolio.totalEarned += portfolio.nextClaimable;
      portfolio.remainingCap -= portfolio.nextClaimable;
      portfolio.lastClaimed = new Date().toISOString().split('T')[0];
      portfolio.nextClaimable = 0;
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Claim Failed',
        text: 'Transaction failed. Please try again.',
        background: '#0a1628',
        color: '#22d3ee',
        confirmButtonColor: '#06b6d4',
      });
    } finally {
      setClaiming(null);
    }
  };

  const handleClaimAll = async () => {
    const claimablePortfolios = mockPortfolios.filter(p => p.nextClaimable >= 10);

    if (claimablePortfolios.length === 0) {
      Swal.fire({
        icon: 'warning',
        title: 'No Claimable Rewards',
        text: 'You need at least $10 in one portfolio to claim.',
        background: '#0a1628',
        color: '#22d3ee',
        confirmButtonColor: '#06b6d4',
      });
      return;
    }

    const totalToClaim = claimablePortfolios.reduce((sum, p) => sum + p.nextClaimable, 0);

    setClaiming('all');

    try {
      await new Promise(resolve => setTimeout(resolve, 2500));

      Swal.fire({
        icon: 'success',
        title: 'Bulk Claim Successful!',
        html: `
          <div class="text-left space-y-2">
            <p>Total Amount: <strong>$${totalToClaim.toFixed(2)}</strong></p>
            <p>Portfolios Claimed: <strong>${claimablePortfolios.length}</strong></p>
            <p>Transaction Hash: <strong class="text-xs">0x${Math.random().toString(36).substring(2, 15)}...</strong></p>
          </div>
        `,
        background: '#0a1628',
        color: '#22d3ee',
        confirmButtonColor: '#06b6d4',
      });

      claimablePortfolios.forEach(portfolio => {
        portfolio.totalEarned += portfolio.nextClaimable;
        portfolio.remainingCap -= portfolio.nextClaimable;
        portfolio.lastClaimed = new Date().toISOString().split('T')[0];
        portfolio.nextClaimable = 0;
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Claim Failed',
        text: 'Transaction failed. Please try again.',
        background: '#0a1628',
        color: '#22d3ee',
        confirmButtonColor: '#06b6d4',
      });
    } finally {
      setClaiming(null);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-neon-green relative inline-block">
          Accrued Rewards
          <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/20 to-neon-green/20 blur-xl -z-10" />
        </h1>
        <p className="text-cyan-300/90 mt-1">Track and claim your daily portfolio growth rewards</p>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <div className="cyber-glass rounded-xl p-6 border border-cyan-500/30 relative overflow-hidden hover-glow-cyan">
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />
          <div className="flex items-center justify-between mb-2">
            <span className="text-cyan-300/90 text-sm uppercase tracking-wide">Total Claimable</span>
            <DollarSign className="text-cyan-400" size={20} />
          </div>
          <div className="text-3xl font-bold text-cyan-300 mb-1">
            ${totalAccrued.toFixed(2)}
          </div>
          <div className="text-xs text-cyan-300/70">Across all portfolios</div>
        </div>

        <div className="cyber-glass rounded-xl p-6 border border-neon-green/30 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-neon-green/50 to-transparent" />
          <div className="flex items-center justify-between mb-2">
            <span className="text-cyan-300/90 text-sm uppercase tracking-wide">Total Staked</span>
            <Wallet className="text-neon-green" size={20} />
          </div>
          <div className="text-3xl font-bold text-neon-green mb-1">
            ${totalStaked.toLocaleString()}
          </div>
          <div className="text-xs text-cyan-300/70">{mockPortfolios.length} active portfolios</div>
        </div>

        <div className="cyber-glass rounded-xl p-6 border border-cyan-500/30 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />
          <div className="flex items-center justify-between mb-2">
            <span className="text-cyan-300/90 text-sm uppercase tracking-wide">Total Claimed</span>
            <CheckCircle className="text-cyan-400" size={20} />
          </div>
          <div className="text-3xl font-bold text-cyan-300 mb-1">
            ${totalEarned.toFixed(2)}
          </div>
          <div className="text-xs text-cyan-300/70">Lifetime earnings</div>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          onClick={handleClaimAll}
          disabled={claiming !== null || totalAccrued < 10}
          className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-neon-green text-dark-950 rounded-xl font-bold hover:shadow-neon-cyan transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.02] uppercase tracking-wide flex items-center gap-2"
        >
          {claiming === 'all' ? (
            <>
              <div className="w-5 h-5 border-2 border-dark-950 border-t-transparent rounded-full animate-spin" />
              Claiming...
            </>
          ) : (
            <>
              <CheckCircle size={20} />
              Claim All Eligible
            </>
          )}
        </button>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-bold text-cyan-300 uppercase tracking-wide">Your Portfolios</h2>

        {mockPortfolios.map((portfolio) => (
          <div
            key={portfolio.id}
            className="cyber-glass rounded-2xl border border-cyan-500/30 overflow-hidden hover-glow-cyan transition-all"
          >
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-bold text-cyan-300">Portfolio #{portfolio.id}</h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${
                      portfolio.status === 'Active'
                        ? 'bg-neon-green/20 text-neon-green border border-neon-green/30'
                        : 'bg-red-500/20 text-red-400 border border-red-500/30'
                    }`}>
                      {portfolio.status}
                    </span>
                    {portfolio.booster && (
                      <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
                        Booster Active
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-4 text-sm text-cyan-300/90">
                    <span className="flex items-center gap-1">
                      <Wallet size={16} />
                      ${portfolio.stakedAmount.toLocaleString()}
                    </span>
                    <span className="flex items-center gap-1">
                      <TrendingUp size={16} />
                      {portfolio.dailyRate}% daily
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar size={16} />
                      {portfolio.daysActive} days
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedPortfolio(selectedPortfolio === portfolio.id ? null : portfolio.id)}
                  className="p-2 hover:bg-cyan-500/10 rounded-lg transition-colors text-cyan-400"
                >
                  {selectedPortfolio === portfolio.id ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
              </div>

              <div className="grid md:grid-cols-4 gap-4 mb-4">
                <div className="cyber-glass border border-cyan-500/30 rounded-lg p-4">
                  <div className="text-xs text-cyan-300/70 mb-1 uppercase tracking-wide">Claimable Now</div>
                  <div className="text-2xl font-bold text-cyan-300">
                    ${portfolio.nextClaimable.toFixed(2)}
                  </div>
                </div>

                <div className="cyber-glass border border-cyan-500/30 rounded-lg p-4">
                  <div className="text-xs text-cyan-300/70 mb-1 uppercase tracking-wide">Total Accrued</div>
                  <div className="text-2xl font-bold text-neon-green">
                    ${portfolio.totalAccrued.toFixed(2)}
                  </div>
                </div>

                <div className="cyber-glass border border-cyan-500/30 rounded-lg p-4">
                  <div className="text-xs text-cyan-300/70 mb-1 uppercase tracking-wide">Total Claimed</div>
                  <div className="text-2xl font-bold text-cyan-300">
                    ${portfolio.totalEarned.toFixed(2)}
                  </div>
                </div>

                <div className="cyber-glass border border-cyan-500/30 rounded-lg p-4">
                  <div className="text-xs text-cyan-300/70 mb-1 uppercase tracking-wide">Remaining Cap</div>
                  <div className="text-2xl font-bold text-cyan-300">
                    ${portfolio.remainingCap.toFixed(2)}
                  </div>
                </div>
              </div>

              {selectedPortfolio === portfolio.id && (
                <div className="mt-4 pt-4 border-t border-cyan-500/30 space-y-3 animate-slide-down">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="cyber-glass border border-cyan-500/20 rounded-lg p-4">
                      <div className="text-sm text-cyan-300/70 mb-2">Start Date</div>
                      <div className="text-cyan-300 font-medium">{new Date(portfolio.startDate).toLocaleDateString()}</div>
                    </div>
                    <div className="cyber-glass border border-cyan-500/20 rounded-lg p-4">
                      <div className="text-sm text-cyan-300/70 mb-2">Last Claimed</div>
                      <div className="text-cyan-300 font-medium">
                        {portfolio.lastClaimed ? new Date(portfolio.lastClaimed).toLocaleDateString() : 'Never'}
                      </div>
                    </div>
                    <div className="cyber-glass border border-cyan-500/20 rounded-lg p-4">
                      <div className="text-sm text-cyan-300/70 mb-2">Tier</div>
                      <div className="text-cyan-300 font-medium">{portfolio.tier}</div>
                    </div>
                    <div className="cyber-glass border border-cyan-500/20 rounded-lg p-4">
                      <div className="text-sm text-cyan-300/70 mb-2">Max Cap</div>
                      <div className="text-cyan-300 font-medium">${portfolio.maxCap.toLocaleString()}</div>
                    </div>
                  </div>

                  <div className="cyber-glass border border-cyan-500/20 rounded-lg p-4">
                    <div className="text-sm text-cyan-300/70 mb-2">Progress to Cap</div>
                    <div className="w-full bg-dark-900/50 rounded-full h-3 overflow-hidden border border-cyan-500/20">
                      <div
                        className="h-full bg-gradient-to-r from-cyan-500 to-neon-green transition-all duration-500"
                        style={{ width: `${((portfolio.maxCap - portfolio.remainingCap) / portfolio.maxCap) * 100}%` }}
                      />
                    </div>
                    <div className="text-xs text-cyan-300/70 mt-1">
                      {(((portfolio.maxCap - portfolio.remainingCap) / portfolio.maxCap) * 100).toFixed(2)}% of max cap reached
                    </div>
                  </div>
                </div>
              )}

              <div className="mt-4 flex gap-3">
                <button
                  onClick={() => handleClaim(portfolio)}
                  disabled={claiming !== null || portfolio.nextClaimable < 10}
                  className="flex-1 py-3 bg-gradient-to-r from-cyan-500 to-neon-green text-dark-950 rounded-xl font-bold hover:shadow-neon-cyan transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.02] uppercase tracking-wide flex items-center justify-center gap-2"
                >
                  {claiming === portfolio.id ? (
                    <>
                      <div className="w-5 h-5 border-2 border-dark-950 border-t-transparent rounded-full animate-spin" />
                      Claiming...
                    </>
                  ) : (
                    <>
                      <CheckCircle size={20} />
                      Claim ${portfolio.nextClaimable.toFixed(2)}
                    </>
                  )}
                </button>
              </div>

              {portfolio.nextClaimable < 10 && (
                <div className="mt-3 cyber-glass border border-yellow-500/30 rounded-lg p-3 flex items-start gap-2">
                  <AlertCircle className="text-yellow-400 flex-shrink-0 mt-0.5" size={16} />
                  <p className="text-xs text-yellow-300">
                    Minimum claim amount is $10.00. Current: ${portfolio.nextClaimable.toFixed(2)}
                  </p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="cyber-glass rounded-2xl border border-cyan-500/30 overflow-hidden">
        <div className="p-6 border-b border-cyan-500/30">
          <div className="flex items-center gap-3">
            <History className="text-cyan-400" size={24} />
            <h2 className="text-xl font-bold text-cyan-300 uppercase tracking-wide">Claim History</h2>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-cyan-500/5 border-b border-cyan-500/30">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-cyan-300 uppercase tracking-wider">Date</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-cyan-300 uppercase tracking-wider">Portfolio</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-cyan-300 uppercase tracking-wider">Type</th>
                <th className="px-6 py-4 text-right text-xs font-semibold text-cyan-300 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-cyan-300 uppercase tracking-wider">Transaction</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-cyan-500/20">
              {mockClaimHistory.map((claim) => (
                <tr key={claim.id} className="hover:bg-cyan-500/5 transition-colors">
                  <td className="px-6 py-4 text-sm text-cyan-300">
                    <div className="flex items-center gap-2">
                      <Clock size={16} className="text-cyan-400" />
                      {new Date(claim.date).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-cyan-300">
                    <span className="font-medium">#{claim.portfolioId}</span>
                  </td>
                  <td className="px-6 py-4 text-sm text-cyan-300">{claim.type}</td>
                  <td className="px-6 py-4 text-sm text-right">
                    <span className="font-bold text-neon-green">${claim.amount.toFixed(2)}</span>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <a
                      href={`https://ramascan.com/tx/${claim.txHash}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-cyan-400 hover:text-neon-green transition-colors font-mono text-xs"
                    >
                      {claim.txHash}
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
