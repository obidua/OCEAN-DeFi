import CoreConfigABI from '../../store/Contract_ABI/CoreConfig.json';
import UserRegistryABI from '../../store/Contract_ABI/UserRegistry.json';
import PortfolioManagerABI from '../../store/Contract_ABI/PortFolioManager.json';
import IncomeDistributorABI from '../../store/Contract_ABI/IncomeDistributor.json';
import SlabManagerABI from '../../store/Contract_ABI/SlabManager.json';
import RoyaltyManagerABI from '../../store/Contract_ABI/RoyaltyManager.json';
import RewardVaultABI from '../../store/Contract_ABI/RewardVault.json';
import SafeWalletABI from '../../store/Contract_ABI/SafeWallet.json';
import FreezePolicyABI from '../../store/Contract_ABI/FreezePolicy.json';
import AdminControlABI from '../../store/Contract_ABI/AdminControl.json';
import PriceOracleABI from '../../store/Contract_ABI/PriceOracle.json';
import RamaABI from '../../store/Contract_ABI/Rama.json';
import OceanViewABI from '../../store/Contract_ABI/OceanView.json';
import OceanView2ABI from '../../store/Contract_ABI/OceanView2.json';
import OceanQueryUpgradeableABI from '../../store/Contract_ABI/OceanQueryUpgradeableABI.json';
import ROIDistributorABI from '../../store/Contract_ABI/ROIDistributor.json';

export const NETWORK_CONFIG = {
  chainId: parseInt(import.meta.env.VITE_CHAIN_ID || '1370'),
  chainName: import.meta.env.VITE_CHAIN_NAME || 'Ramestta Mainnet',
  rpcUrl: import.meta.env.VITE_RPC_URL || 'https://blockchain.ramestta.com',
  currencySymbol: import.meta.env.VITE_CURRENCY_SYMBOL || 'RAMA',
  explorerUrl: import.meta.env.VITE_EXPLORER_URL || 'https://ramascan.com',
  explorerApiUrl: import.meta.env.VITE_EXPLORER_API_URL || 'https://latest-backendapi.ramascan.com/api/v2/',
  explorerApiKey: import.meta.env.VITE_EXPLORER_API_KEY || '',
  bridgeUrl: import.meta.env.VITE_BRIDGE_URL || 'https://ramabridge.com',
  swapUrl: import.meta.env.VITE_SWAP_URL || 'https://ramaswap.com',
};

export const CONTRACT_ADDRESSES = {
  ROOT: import.meta.env.VITE_ROOT_ADDRESS,
  CORECONFIG: import.meta.env.VITE_CORECONFIG,
  OWNER: import.meta.env.VITE_OWNER,
  TREASURY: import.meta.env.VITE_TREASURY,
  RAMA: import.meta.env.VITE_RAMA,
  ADMINCONTROL: import.meta.env.VITE_ADMINCONTROL,
  FREEZEPOLICY: import.meta.env.VITE_FREEZEPOLICY,
  PORTFOLIOMANAGER: import.meta.env.VITE_PORTFOLIOMANAGER,
  PRICEORACLE: import.meta.env.VITE_PRICEORACLE,
  REWARDVAULT: import.meta.env.VITE_REWARDVAULT,
  ROYALTYMANAGER: import.meta.env.VITE_ROYALTYMANAGER,
  SLABMANAGER: import.meta.env.VITE_SLABMANAGER,
  USERREGISTRY: import.meta.env.VITE_USERREGISTRY,
  INCOMEDISTRIBUTOR: import.meta.env.VITE_INCOMEDISTRIBUTOR,
  SAFEWALLET: import.meta.env.VITE_SAFEWALLET,
  OCEANQUERYUPGRADEABLE: import.meta.env.VITE_OCEANQUERYUPGRADEABLE,
  ROIDISTRIBUTOR: import.meta.env.VITE_ROIDISTRIBUTOR,
  OCEANVIEW: import.meta.env.VITE_OCEANVIEW,
  OCEANVIEWV2: import.meta.env.VITE_OCEANVIEWV2,
};

export const CONTRACT_ABIS = {
  CORECONFIG: CoreConfigABI,
  USERREGISTRY: UserRegistryABI,
  PORTFOLIOMANAGER: PortfolioManagerABI,
  INCOMEDISTRIBUTOR: IncomeDistributorABI,
  SLABMANAGER: SlabManagerABI,
  ROYALTYMANAGER: RoyaltyManagerABI,
  REWARDVAULT: RewardVaultABI,
  SAFEWALLET: SafeWalletABI,
  FREEZEPOLICY: FreezePolicyABI,
  ADMINCONTROL: AdminControlABI,
  PRICEORACLE: PriceOracleABI,
  RAMA: RamaABI,
  OCEANVIEW: OceanViewABI,
  OCEANVIEW2: OceanView2ABI,
  OCEANQUERYUPGRADEABLE: OceanQueryUpgradeableABI,
  ROIDISTRIBUTOR: ROIDistributorABI,
};

export const CONTRACT_CONFIG = {
  CoreConfig: {
    address: CONTRACT_ADDRESSES.CORECONFIG,
    abi: CONTRACT_ABIS.CORECONFIG,
  },
  UserRegistry: {
    address: CONTRACT_ADDRESSES.USERREGISTRY,
    abi: CONTRACT_ABIS.USERREGISTRY,
  },
  PortfolioManager: {
    address: CONTRACT_ADDRESSES.PORTFOLIOMANAGER,
    abi: CONTRACT_ABIS.PORTFOLIOMANAGER,
  },
  IncomeDistributor: {
    address: CONTRACT_ADDRESSES.INCOMEDISTRIBUTOR,
    abi: CONTRACT_ABIS.INCOMEDISTRIBUTOR,
  },
  SlabManager: {
    address: CONTRACT_ADDRESSES.SLABMANAGER,
    abi: CONTRACT_ABIS.SLABMANAGER,
  },
  RoyaltyManager: {
    address: CONTRACT_ADDRESSES.ROYALTYMANAGER,
    abi: CONTRACT_ABIS.ROYALTYMANAGER,
  },
  RewardVault: {
    address: CONTRACT_ADDRESSES.REWARDVAULT,
    abi: CONTRACT_ABIS.REWARDVAULT,
  },
  SafeWallet: {
    address: CONTRACT_ADDRESSES.SAFEWALLET,
    abi: CONTRACT_ABIS.SAFEWALLET,
  },
  FreezePolicy: {
    address: CONTRACT_ADDRESSES.FREEZEPOLICY,
    abi: CONTRACT_ABIS.FREEZEPOLICY,
  },
  AdminControl: {
    address: CONTRACT_ADDRESSES.ADMINCONTROL,
    abi: CONTRACT_ABIS.ADMINCONTROL,
  },
  PriceOracle: {
    address: CONTRACT_ADDRESSES.PRICEORACLE,
    abi: CONTRACT_ABIS.PRICEORACLE,
  },
  Rama: {
    address: CONTRACT_ADDRESSES.RAMA,
    abi: CONTRACT_ABIS.RAMA,
  },
  OceanView: {
    address: CONTRACT_ADDRESSES.OCEANVIEW,
    abi: CONTRACT_ABIS.OCEANVIEW,
  },
  OceanViewV2: {
    address: CONTRACT_ADDRESSES.OCEANVIEWV2,
    abi: CONTRACT_ABIS.OCEANVIEW2,
  },
  OceanQueryUpgradeable: {
    address: CONTRACT_ADDRESSES.OCEANQUERYUPGRADEABLE,
    abi: CONTRACT_ABIS.OCEANQUERYUPGRADEABLE,
  },
  ROIDistributor: {
    address: CONTRACT_ADDRESSES.ROIDISTRIBUTOR,
    abi: CONTRACT_ABIS.ROIDISTRIBUTOR,
  },
};

export function validateContractAddresses() {
  const missing = [];

  Object.entries(CONTRACT_ADDRESSES).forEach(([key, address]) => {
    if (!address || address === 'undefined') {
      missing.push(key);
    }
  });

  if (missing.length > 0) {
    console.warn('Missing contract addresses:', missing);
  }

  return missing.length === 0;
}

export function getContractConfig(contractName) {
  const config = CONTRACT_CONFIG[contractName];

  if (!config) {
    throw new Error(`Contract configuration not found for: ${contractName}`);
  }

  if (!config.address) {
    throw new Error(`Contract address not configured for: ${contractName}`);
  }

  return config;
}

export function getExplorerAddressUrl(address) {
  return `${NETWORK_CONFIG.explorerUrl}/address/${address}`;
}

export function getExplorerTxUrl(txHash) {
  return `${NETWORK_CONFIG.explorerUrl}/tx/${txHash}`;
}

export const PRECISION = {
  USD_MICRO: 1e6,
  RAMA_WEI: 1e18,
  WAD: 1e18,
  BPS: 10000,
};

export const TIER_THRESHOLDS = {
  TIER_0: 50,
  TIER_1: 5010,
};

export const RATES = {
  DIRECT_INCOME: 5,
  CLAIM_FEE: 5,
  EXIT_FEE: 20,
  CAP_NORMAL: 200,
  CAP_BOOSTER: 250,
};

export const TIMEFRAMES = {
  FREEZE_PERIOD: 72 * 60 * 60,
  BOOSTER_WINDOW: 10 * 24 * 60 * 60,
  SLAB_COOLDOWN: 24 * 60 * 60,
};
