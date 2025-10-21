import { callContractMethod, getCurrentAccount, toWei, formatUSD, formatRAMA } from './web3Helper';
import { CONTRACT_ADDRESSES, PRECISION } from '../config/contracts';

export async function checkUserRegistration(address) {
  try {
    const isRegistered = await callContractMethod('UserRegistry', 'isRegistered', [address]);
    return isRegistered;
  } catch (error) {
    console.error('Error checking user registration:', error);
    return false;
  }
}

export async function getUserInfo(address) {
  try {
    const userInfo = await callContractMethod('UserRegistry', 'getUser', [address]);
    return {
      registered: userInfo.registered,
      id: Number(userInfo.id),
      referrer: userInfo.referrer,
      directsCount: Number(userInfo.directsCount),
      createdAt: Number(userInfo.createdAt),
    };
  } catch (error) {
    console.error('Error getting user info:', error);
    return null;
  }
}

export async function getUserDirects(address) {
  try {
    const directs = await callContractMethod('UserRegistry', 'getDirects', [address]);
    return directs;
  } catch (error) {
    console.error('Error getting user directs:', error);
    return [];
  }
}

export async function getPortfoliosOf(address) {
  try {
    const portfolios = await callContractMethod('PortfolioManager', 'portfoliosOf', [address]);
    return portfolios.map(pid => Number(pid));
  } catch (error) {
    console.error('Error getting portfolios:', error);
    return [];
  }
}

export async function getPortfolioDetails(pid) {
  try {
    const portfolio = await callContractMethod('PortfolioManager', 'getPortfolio', [pid]);
    return {
      principal: portfolio.principal,
      principalUsd: portfolio.principalUsd,
      credited: portfolio.credited,
      createdAt: Number(portfolio.createdAt),
      lastAccrual: Number(portfolio.lastAccrual),
      frozenUntil: Number(portfolio.frozenUntil),
      booster: portfolio.booster,
      tier: Number(portfolio.tier),
      capPct: Number(portfolio.capPct),
      owner: portfolio.owner,
      activatedBy: portfolio.activatedBy,
      isActivatedFromSafeWallet: portfolio.isActivatedFromSafeWallet,
    };
  } catch (error) {
    console.error('Error getting portfolio details:', error);
    return null;
  }
}

export async function getRamaPrice() {
  try {
    const priceMicroUSD = await callContractMethod('PriceOracle', 'ramaPriceInUSD', []);
    return Number(priceMicroUSD) / PRECISION.USD_MICRO;
  } catch (error) {
    console.error('Error getting RAMA price:', error);
    return 0;
  }
}

export async function convertRamaToUSD(ramaWei) {
  try {
    const usdMicro = await callContractMethod('PriceOracle', 'ramaToUSD', [ramaWei]);
    return Number(usdMicro);
  } catch (error) {
    console.error('Error converting RAMA to USD:', error);
    return 0;
  }
}

export async function convertUSDToRama(usdMicro) {
  try {
    const ramaWei = await callContractMethod('PriceOracle', 'usdToRama', [usdMicro]);
    return ramaWei;
  } catch (error) {
    console.error('Error converting USD to RAMA:', error);
    return '0';
  }
}

export async function getSafeWalletBalance(address) {
  try {
    const balance = await callContractMethod('SafeWallet', 'ramaBalance', [address]);
    return balance;
  } catch (error) {
    console.error('Error getting SafeWallet balance:', error);
    return '0';
  }
}

export async function getSlabInfo(address) {
  try {
    const slabIdx = await callContractMethod('SlabManager', 'slabIdx', [address]);
    const qualifiedVol = await callContractMethod('SlabManager', 'qualifiedVolumeUSD', [address]);

    return {
      slabIndex: Number(slabIdx),
      qualifiedVolumeUSD: qualifiedVol,
    };
  } catch (error) {
    console.error('Error getting slab info:', error);
    return { slabIndex: 0, qualifiedVolumeUSD: '0' };
  }
}

export async function createPortfolio(referrerAddress, ramaAmount) {
  try {
    const account = await getCurrentAccount();
    if (!account) {
      throw new Error('No wallet connected');
    }

    const result = await callContractMethod(
      'PortfolioManager',
      'RegisterAndActivate',
      [referrerAddress],
      {
        send: true,
        value: ramaAmount,
      }
    );

    return result;
  } catch (error) {
    console.error('Error creating portfolio:', error);
    throw error;
  }
}

export async function createPortfolioRegistered(ramaAmount) {
  try {
    const account = await getCurrentAccount();
    if (!account) {
      throw new Error('No wallet connected');
    }

    const result = await callContractMethod(
      'PortfolioManager',
      'createPortfolio',
      [],
      {
        send: true,
        value: ramaAmount,
      }
    );

    return result;
  } catch (error) {
    console.error('Error creating portfolio:', error);
    throw error;
  }
}

export async function accruePortfolio(pid) {
  try {
    const result = await callContractMethod(
      'PortfolioManager',
      'accrue',
      [pid],
      { send: true }
    );

    return result;
  } catch (error) {
    console.error('Error accruing portfolio:', error);
    throw error;
  }
}

export async function applyExitPortfolio(pid) {
  try {
    const result = await callContractMethod(
      'PortfolioManager',
      'applyExit',
      [pid],
      { send: true }
    );

    return result;
  } catch (error) {
    console.error('Error applying exit:', error);
    throw error;
  }
}

export async function cancelExitPortfolio(pid) {
  try {
    const result = await callContractMethod(
      'PortfolioManager',
      'cancelExit',
      [pid],
      { send: true }
    );

    return result;
  } catch (error) {
    console.error('Error canceling exit:', error);
    throw error;
  }
}

export async function withdrawFromSafeWallet(ramaAmount) {
  try {
    const result = await callContractMethod(
      'SafeWallet',
      'withdrawToExternal',
      [ramaAmount],
      { send: true }
    );

    return result;
  } catch (error) {
    console.error('Error withdrawing from SafeWallet:', error);
    throw error;
  }
}

export async function createPortfolioFromSafeWallet(ramaAmount, referrerAddress) {
  try {
    const result = await callContractMethod(
      'SafeWallet',
      'createPortfolioFromSafe',
      [ramaAmount, referrerAddress],
      { send: true }
    );

    return result;
  } catch (error) {
    console.error('Error creating portfolio from SafeWallet:', error);
    throw error;
  }
}

export async function getTotalPortfolioValue(address) {
  try {
    const result = await callContractMethod('PortfolioManager', 'getTotalPortfolioValue', [address]);
    return {
      totalRamaWei: result.totalRamaWei,
      totalUsdMicro: result.totalUsdMicro,
    };
  } catch (error) {
    console.error('Error getting total portfolio value:', error);
    return {
      totalRamaWei: '0',
      totalUsdMicro: '0',
    };
  }
}

export async function getDirectIncomeBalance(address) {
  try {
    const balance = await callContractMethod('IncomeDistributor', 'directIncome', [address]);
    return balance;
  } catch (error) {
    console.error('Error getting direct income balance:', error);
    return '0';
  }
}

export async function getLevelTeamCounts(address, maxDepth = 10) {
  try {
    const counts = await callContractMethod('UserRegistry', 'getLevelTeamCounts', [address, maxDepth]);
    return counts.map(count => Number(count));
  } catch (error) {
    console.error('Error getting level team counts:', error);
    return [];
  }
}

export async function hasActiveMin50(address) {
  try {
    const hasActive = await callContractMethod('PortfolioManager', 'hasActiveMin50', [address]);
    return hasActive;
  } catch (error) {
    console.error('Error checking active min50:', error);
    return false;
  }
}

export function calculateDailyIncome(principal, tier, isBooster) {
  const rates = {
    tier0Normal: 0.0033,
    tier1Normal: 0.004,
    tier0Booster: 0.0066,
    tier1Booster: 0.008,
  };

  let rate;
  if (tier === 1) {
    rate = isBooster ? rates.tier1Booster : rates.tier1Normal;
  } else {
    rate = isBooster ? rates.tier0Booster : rates.tier0Normal;
  }

  return Number(principal) * rate;
}

export function calculateMaxEarnings(principal, capPct) {
  return (Number(principal) * Number(capPct)) / 100;
}

export function calculateRemainingEarnings(principal, credited, capPct) {
  const maxEarnings = calculateMaxEarnings(principal, capPct);
  const remaining = maxEarnings - Number(credited);
  return Math.max(0, remaining);
}

export function isPortfolioFrozen(frozenUntil) {
  const now = Math.floor(Date.now() / 1000);
  return Number(frozenUntil) > 0 && Number(frozenUntil) > now;
}

export function isPortfolioCapped(credited, principal, capPct) {
  const maxEarnings = calculateMaxEarnings(principal, capPct);
  return Number(credited) >= maxEarnings;
}
