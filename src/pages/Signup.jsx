import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Wallet, User, Mail, Hash, ArrowRight, Check, AlertCircle, Wallet2 } from 'lucide-react';
// import { mockConnectWallet, registerUser } from '../utils/walletAuth';

export default function Signup() {
  const navigate = useNavigate();
  const location = useLocation();
  const walletFromState = location.state?.walletAddress || '';

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    userId: '',
    walletAddress: walletFromState,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [needsWalletConnection, setNeedsWalletConnection] = useState(!walletFromState);
  const [error, setError] = useState('');

  const handleConnectWallet = async () => {
    try {
      // const walletAddress = await mockConnectWallet();
      const walletAddress = ""
      setFormData(prev => ({ ...prev, walletAddress }));
      setNeedsWalletConnection(false);
    } catch (error) {
      console.error('Wallet connection failed:', error);
      setError('Failed to connect wallet. Please try again.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      // const result = await registerUser({
      //   user_id: formData.userId,
      //   wallet_address: formData.walletAddress,
      //   name: formData.name,
      //   email: formData.email,
      // });

      const result =""

      if (result.success && result.user) {
        localStorage.setItem('currentUser', JSON.stringify(result.user));
        navigate('/');
      } else {
        setError(result.error || 'Registration failed. Please try again.');
      }
    } catch (error) {
      console.error('Registration failed:', error);
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const isFormValid = formData.name && formData.email && formData.userId && formData.walletAddress;

  return (
    <div className="min-h-screen bg-dark-950 cyber-grid-bg relative flex items-center justify-center p-4 overflow-hidden">
      <div className="fixed inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-neon-green/10 pointer-events-none" />
      <div className="fixed inset-0 scan-lines pointer-events-none opacity-30" />
      <div className="w-full max-w-lg relative z-10">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-14 h-14 bg-gradient-to-br from-cyan-500 to-neon-green rounded-xl flex items-center justify-center shadow-neon-cyan animate-glow-pulse relative">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500 to-neon-green rounded-xl blur-xl opacity-60" />
              <Wallet className="text-dark-950 relative z-10" size={32} />
            </div>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-neon-green bg-clip-text text-transparent mb-2 text-neon-glow">
            OCEAN DeFi
          </h1>
          <p className="text-cyan-300/90 uppercase tracking-widest text-sm">Join the Validator-Backed Ecosystem</p>
        </div>

        <div className="cyber-glass rounded-2xl shadow-neon-cyan border border-cyan-500/30 p-8 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-500/70 to-transparent" />
          <h2 className="text-2xl font-bold text-cyan-300 mb-6 uppercase tracking-wide">Create Account</h2>

          {error && (
            <div className="mb-4 p-4 cyber-glass border border-red-500/50 rounded-xl flex items-start gap-3 shadow-lg">
              <AlertCircle className="text-red-400 flex-shrink-0 mt-0.5 animate-pulse" size={20} />
              <p className="text-sm text-red-300">{error}</p>
            </div>
          )}

          {needsWalletConnection ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 cyber-glass border border-cyan-500/30 rounded-full flex items-center justify-center mx-auto mb-4 shadow-neon-cyan">
                <Wallet className="text-cyan-400" size={32} />
              </div>
              <h3 className="text-lg font-semibold text-cyan-300 mb-2 uppercase tracking-wide">Connect Your Wallet</h3>
              <p className="text-cyan-300/90 mb-6">
                Connect your wallet to continue with registration
              </p>
              <button
                onClick={handleConnectWallet}
                className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-neon-green text-dark-950 rounded-xl font-bold hover:shadow-neon-cyan transition-all inline-flex items-center gap-2 hover:scale-[1.02] uppercase"
              >
                <Wallet size={20} />
                Connect Wallet
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="p-4 cyber-glass border border-neon-green/50 rounded-xl flex items-center gap-3 shadow-neon-green">
                <div className="w-8 h-8 bg-neon-green rounded-full flex items-center justify-center flex-shrink-0 shadow-neon-green animate-pulse">
                  <Check className="text-dark-950" size={18} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-neon-green font-medium mb-1 uppercase tracking-wide">Wallet Connected</p>
                  <p className="text-sm text-cyan-300 font-mono truncate">{formData.walletAddress}</p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-cyan-400 mb-2 uppercase tracking-wide">
                  Sponser Address/Id
                </label>
                <div className="relative">
                  <Wallet2 className="absolute left-3 top-1/2 -translate-y-1/2 text-cyan-400/50" size={20} />
                  <input
                    type="text"
                    name="userId"
                    value={formData.userId}
                    onChange={handleInputChange}
                    placeholder="Enter the Sponser Id/Address"
                    required
                    className="w-full pl-10 pr-4 py-3 bg-dark-900/50 border border-cyan-500/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 text-cyan-300 placeholder-cyan-400/30 transition-all"
                  />
                </div>
                <p className="text-xs text-cyan-400/50 mt-1">This will be your unique identifier</p>
              </div>

              <button
                type="submit"
                disabled={!isFormValid || isSubmitting}
                className="w-full py-4 px-6 bg-gradient-to-r from-cyan-500 to-neon-green text-dark-950 rounded-xl font-bold hover:shadow-neon-cyan transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.02] uppercase tracking-wide relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-neon-green opacity-0 group-hover:opacity-100 transition-opacity" />
                <span className="relative z-10">{isSubmitting ? 'Creating Account...' : 'Create Account'}</span>
                <ArrowRight size={20} className="relative z-10" />
              </button>
            </form>
          )}

          <p className="text-center text-sm text-cyan-300/90 mt-6">
            Already have an account?{' '}
            <button
              onClick={() => navigate('/login')}
              className="text-neon-green hover:text-cyan-400 font-bold transition-colors"
            >
              Sign In
            </button>
          </p>
        </div>

        <p className="text-center text-xs text-cyan-400/50 mt-6 uppercase tracking-widest">
          By creating an account, you agree to our Terms of Service
        </p>
      </div>
    </div>
  );
}
