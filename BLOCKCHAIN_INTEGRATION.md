# OCEAN DeFi Blockchain Integration

This document provides a comprehensive guide to the blockchain integration setup for the OCEAN DeFi platform on Ramestta Mainnet.

## Table of Contents

1. [Overview](#overview)
2. [Environment Configuration](#environment-configuration)
3. [Contract Architecture](#contract-architecture)
4. [Integration Files](#integration-files)
5. [Usage Examples](#usage-examples)
6. [System Flow](#system-flow)
7. [Troubleshooting](#troubleshooting)

---

## Overview

The OCEAN DeFi platform is built on the Ramestta blockchain (Chain ID: 1370) and consists of multiple upgradeable smart contracts that work together to provide:

- User registration and referral tree management
- Multi-tier portfolio staking with booster optimization
- Multiple income streams (Growth, Direct, Slab, Royalty, One-time)
- Internal SafeWallet for fee-free operations
- Freeze mechanism for principal withdrawals

### Key Technologies

- **Blockchain**: Ramestta Mainnet
- **Smart Contracts**: Solidity 0.8.24, UUPS Upgradeable pattern
- **Frontend**: React + Vite
- **Web3 Library**: web3.js v4.16.0
- **Database**: Supabase (for off-chain data and analytics)

---

## Environment Configuration

All blockchain configuration is stored in the `.env` file with the `VITE_` prefix for frontend access.

### Network Configuration

```env
VITE_RPC_URL=https://blockchain.ramestta.com
VITE_CHAIN_ID=1370
VITE_CHAIN_NAME=Ramestta Mainnet
VITE_CURRENCY_SYMBOL=RAMA
```

### Core Contract Addresses

```env
VITE_CORECONFIG=0x88feEF32db83e79BbD69c222851e45cD681D6a62
VITE_USERREGISTRY=0x71Ce2E2Af312e856b17d901aCDbE4ea39831C961
VITE_PORTFOLIOMANAGER=0xc9Fb0f8EAE5b98cd914f23dd66e277eeC5993a66
VITE_SAFEWALLET=0x58514DE6CCd50CF33d2bD90547847E212Ae93f11
```

See `.env.example` for complete configuration with documentation.

---

## Contract Architecture

### 1. CoreConfig (Central Registry)

**Address**: `0x88feEF32db83e79BbD69c222851e45cD681D6a62`

The CoreConfig contract serves as the central configuration hub for all other contracts. It stores:
- Contract addresses for all system components
- System parameters (min stake, fees, cap multiplier)
- RAMA token and PriceOracle references

### 2. UserRegistry (Referral Management)

**Address**: `0x71Ce2E2Af312e856b17d901aCDbE4ea39831C961`

Manages the referral tree structure:
- Root-based unlimited-width binary/unlimited tree
- Direct children tracking for each user
- Team hierarchy queries (by level, by leg)
- User registration with referrer validation

**Key Functions**:
- `isRegistered(address)`: Check if user is registered
- `getUser(address)`: Get user info (ID, referrer, directs count)
- `getDirects(address)`: Get all direct referrals
- `getLevelTeamCounts(address, depth)`: Get team counts per level

### 3. PortfolioManager (Staking & Growth)

**Address**: `0xc9Fb0f8EAE5b98cd914f23dd66e277eeC5993a66`

Handles all portfolio operations:
- Portfolio creation (with/without registration)
- Daily growth accrual (0.33%-0.80%)
- Booster system (10-day window, 5+ directs)
- Freeze/unfreeze mechanism
- Tier detection ($50 T0, $5,010+ T1)

**Portfolio Structure**:
```solidity
struct Portfolio {
    uint128 principal;           // RAMA wei
    uint128 principalUsd;        // USD micro (1e6)
    uint128 credited;            // Total earned RAMA wei
    uint64 createdAt;
    uint64 lastAccrual;
    uint64 frozenUntil;          // 0 = not frozen
    bool booster;                // Booster active
    uint8 tier;                  // 0 or 1
    uint16 capPct;               // 200 or 250
    address owner;
    address activatedBy;
    bool isActivatedFromSafeWallet;
}
```

**Key Functions**:
- `RegisterAndActivate(referrer)`: Register + create portfolio
- `createPortfolio()`: Create portfolio (already registered)
- `accrue(pid)`: Claim growth income
- `applyExit(pid)`: Start 72-hour freeze
- `cancelExit(pid)`: Cancel freeze and resume
- `portfoliosOf(address)`: Get user's portfolio IDs
- `getPortfolio(pid)`: Get portfolio details

### 4. IncomeDistributor (Direct Income)

**Address**: `0xBdbA28a842e3c48f039b7f390aa90AEB000E352e`

Manages direct income (5% of referral stakes):
- Records direct income events with full details
- Tracks lifetime USD and RAMA totals
- Provides detailed ledger with timestamps

**Key Functions**:
- `directIncome(address)`: Get claimable RAMA balance
- `totalDirectUsd(address)`: Lifetime direct income in USD
- `totalDirectRama(address)`: Lifetime direct income in RAMA

### 5. SlabManager (Team Volume Bonuses)

**Address**: `0x631a0381473f9bC9B43Df75D67fd36E6bd3E3685`

Calculates team business volume for slab income:
- 11 slab levels (5%-60% rates)
- Qualified volume calculation (40:30:30 for 3 legs, 100% for 4+)
- New $50 direct tracking for claim gates
- 24-hour cooldown between claims

**Slab Thresholds**:
```
Level 0:  $500      → 5%
Level 1:  $2,500    → 10%
Level 2:  $10,000   → 15%
Level 3:  $25,000   → 20%
Level 4:  $50,000   → 25%
Level 5:  $100,000  → 30%
Level 6:  $500,000  → 35%
Level 7:  $1M       → 45%
Level 8:  $2.5M     → 50%
Level 9:  $5M       → 55%
Level 10: $20M      → 60%
```

### 6. SafeWallet (Internal Balance)

**Address**: `0x58514DE6CCd50CF33d2bD90547847E212Ae93f11`

Internal ledger for fee-free operations:
- Stores RAMA balance for each user
- Records all credits/debits with typed purposes
- Can be used to create portfolios (no external fees)
- 5% fee on withdrawal to external wallet

**Transaction Types** (`TxKind`):
- Credits: ROI, Growth, Royalty, Slab, Reward, DirectIncome
- Debits: StakeSpend, PortfolioCreate, PortfolioTopUp, ExternalWithdraw

**Key Functions**:
- `ramaBalance(address)`: Get SafeWallet balance
- `withdrawToExternal(amount)`: Withdraw to external wallet (5% fee)
- `createPortfolioFromSafe(amount, referrer)`: Create portfolio from balance

### 7. PriceOracle (RAMA/USD Conversion)

**Address**: `0xda2ad06b05Eb1b12F41bBd78724ea13cA710f4e0`

Provides real-time RAMA to USD conversion:
- Returns prices in micro-USD (1e6 = $1.000000)
- Used for all USD calculations in the system

**Key Functions**:
- `ramaPriceInUSD()`: Get current RAMA price (micro-USD)
- `ramaToUSD(ramaWei)`: Convert RAMA amount to USD
- `usdToRama(usdMicro)`: Convert USD amount to RAMA

### 8. Query Contracts

**OceanView** (`0xB1dA6010aCf502daaDD0aE40D03c40A686EE27c9`):
- Aggregated data queries for dashboard

**OceanViewV2** (`0x8f93fdf9A72574F9bbD40437EA1a88559082CaDD`):
- Enhanced queries with additional metrics

**OceanQueryUpgradeable** (`0x6bF2Fdcd0D0A79Ba65289d8d5EE17d4a6C2EC3e5`):
- Team structure and hierarchy queries

---

## Integration Files

### 1. Contract Configuration (`src/config/contracts.js`)

Central configuration file that exports:
- `NETWORK_CONFIG`: Network settings (RPC, Chain ID, Explorer URLs)
- `CONTRACT_ADDRESSES`: All contract addresses from environment
- `CONTRACT_ABIS`: Imported ABI JSON files
- `CONTRACT_CONFIG`: Combined address + ABI mappings
- Helper functions: `validateContractAddresses()`, `getContractConfig()`, `getExplorerAddressUrl()`, `getExplorerTxUrl()`
- Constants: `PRECISION`, `TIER_THRESHOLDS`, `RATES`, `TIMEFRAMES`

### 2. Web3 Helpers (`src/utils/web3Helper.js`)

Low-level Web3 utilities:
- `getWeb3Instance()`: Get Web3 instance
- `connectWallet()`: Connect MetaMask/compatible wallet
- `switchNetwork()`: Switch to Ramestta network
- `getContract(contractName)`: Get contract instance
- `getCurrentAccount()`: Get connected account
- `callContractMethod(contractName, methodName, params, options)`: Generic contract call
- `sendTransaction(to, value, data)`: Send raw transaction
- `listenToWalletEvents(onAccountsChanged, onChainChanged)`: Event listeners
- `waitForTransaction(txHash, confirmations)`: Wait for tx confirmation
- Format helpers: `formatUSD()`, `formatRAMA()`, `formatPercentage()`
- `parseErrorMessage(error)`: Parse contract errors

### 3. Contract Helpers (`src/utils/contractHelpers.js`)

High-level contract interaction functions:

**User Management**:
- `checkUserRegistration(address)`
- `getUserInfo(address)`
- `getUserDirects(address)`
- `getLevelTeamCounts(address, maxDepth)`

**Portfolio Operations**:
- `getPortfoliosOf(address)`
- `getPortfolioDetails(pid)`
- `createPortfolio(referrer, ramaAmount)`
- `createPortfolioRegistered(ramaAmount)`
- `accruePortfolio(pid)`
- `applyExitPortfolio(pid)`
- `cancelExitPortfolio(pid)`
- `getTotalPortfolioValue(address)`

**Price & Conversion**:
- `getRamaPrice()`
- `convertRamaToUSD(ramaWei)`
- `convertUSDToRama(usdMicro)`

**SafeWallet**:
- `getSafeWalletBalance(address)`
- `withdrawFromSafeWallet(ramaAmount)`
- `createPortfolioFromSafeWallet(ramaAmount, referrer)`

**Income & Slab**:
- `getDirectIncomeBalance(address)`
- `getSlabInfo(address)`
- `hasActiveMin50(address)`

**Calculation Utilities**:
- `calculateDailyIncome(principal, tier, isBooster)`
- `calculateMaxEarnings(principal, capPct)`
- `calculateRemainingEarnings(principal, credited, capPct)`
- `isPortfolioFrozen(frozenUntil)`
- `isPortfolioCapped(credited, principal, capPct)`

---

## Usage Examples

### 1. Connect Wallet and Check Registration

```javascript
import { connectWallet } from './utils/web3Helper';
import { checkUserRegistration, getUserInfo } from './utils/contractHelpers';

// Connect wallet
const address = await connectWallet();

// Check if registered
const isRegistered = await checkUserRegistration(address);

if (isRegistered) {
  const userInfo = await getUserInfo(address);
  console.log('User ID:', userInfo.id);
  console.log('Referrer:', userInfo.referrer);
  console.log('Direct Count:', userInfo.directsCount);
}
```

### 2. Create Portfolio (Register + Activate)

```javascript
import { createPortfolio, getRamaPrice, convertUSDToRama } from './utils/contractHelpers';
import { toWei } from './utils/web3Helper';

// Get referrer address (from URL or form)
const referrerAddress = '0x...';

// Convert $100 to RAMA
const usdAmount = 100 * 1e6; // micro-USD
const ramaWei = await convertUSDToRama(usdAmount);

// Create portfolio
const result = await createPortfolio(referrerAddress, ramaWei);
console.log('Portfolio created:', result);
```

### 3. View Portfolios and Accrue Growth

```javascript
import { getPortfoliosOf, getPortfolioDetails, accruePortfolio } from './utils/contractHelpers';

// Get user's portfolios
const portfolioIds = await getPortfoliosOf(userAddress);

// Check each portfolio
for (const pid of portfolioIds) {
  const portfolio = await getPortfolioDetails(pid);

  console.log('Portfolio', pid);
  console.log('Principal USD:', formatUSD(portfolio.principalUsd));
  console.log('Credited:', formatRAMA(portfolio.credited));
  console.log('Tier:', portfolio.tier);
  console.log('Booster:', portfolio.booster);
  console.log('Frozen:', isPortfolioFrozen(portfolio.frozenUntil));

  // Accrue if not frozen
  if (!isPortfolioFrozen(portfolio.frozenUntil)) {
    await accruePortfolio(pid);
  }
}
```

### 4. SafeWallet Operations

```javascript
import { getSafeWalletBalance, createPortfolioFromSafeWallet } from './utils/contractHelpers';

// Check SafeWallet balance
const balance = await getSafeWalletBalance(userAddress);
console.log('SafeWallet Balance:', formatRAMA(balance));

// Create portfolio from SafeWallet (no external fees)
const ramaAmount = toWei('100'); // 100 RAMA
await createPortfolioFromSafeWallet(ramaAmount, referrerAddress);
```

### 5. Team and Income Tracking

```javascript
import { getUserDirects, getLevelTeamCounts, getDirectIncomeBalance, getSlabInfo } from './utils/contractHelpers';

// Get direct referrals
const directs = await getUserDirects(userAddress);
console.log('Direct Count:', directs.length);

// Get team counts per level (up to 10 levels)
const teamCounts = await getLevelTeamCounts(userAddress, 10);
console.log('Level 1:', teamCounts[0]);
console.log('Level 2:', teamCounts[1]);

// Check direct income
const directIncome = await getDirectIncomeBalance(userAddress);
console.log('Direct Income:', formatRAMA(directIncome));

// Check slab info
const slabInfo = await getSlabInfo(userAddress);
console.log('Slab Index:', slabInfo.slabIndex);
console.log('Qualified Volume:', formatUSD(slabInfo.qualifiedVolumeUSD));
```

---

## System Flow

### User Registration & First Portfolio

```
1. User visits platform with referrer link
2. Connect wallet (MetaMask)
3. Enter stake amount (minimum $50)
4. Call: PortfolioManager.RegisterAndActivate(referrer)
   → UserRegistry.registerUser() - Creates user in tree
   → Portfolio created with RAMA sent
   → IncomeDistributor.recordDirectIncome() - 5% to referrer
   → SlabManager.noteNew50Direct() - Track for slab gate
   → SlabManager.onBusinessDelta() - Bubble business up tree
   → Booster recomputed for user + referrer
5. User now has portfolio ID and can earn growth
```

### Daily Growth Accrual

```
1. User calls: PortfolioManager.accrue(pid)
2. Contract calculates elapsed time since lastAccrual
3. Income = principal × rate × elapsed / 1 day
   - Rates: 0.33%, 0.40%, 0.66%, 0.80% (based on tier + booster)
4. Check cap: credited + income ≤ principal × capPct / 100
5. Credit to SafeWallet.creditGrowth()
6. Update lastAccrual timestamp
```

### Booster System

```
Qualification (automatic):
1. User creates first portfolio → 10-day window starts
2. 5+ direct referrals create portfolios within window
3. Capacity T = min(best portfolio USD of top-5 directs)
4. 0/1 knapsack: select user's portfolios with sum ≤ T
5. Selected portfolios: booster=true, capPct=250
6. Others: booster=false, capPct=200

Recomputation triggers:
- User creates new portfolio
- Direct creates new portfolio (affects capacity)
```

### Freeze & Exit Flow

```
Apply Exit:
1. User calls: PortfolioManager.applyExit(pid)
2. frozenUntil = now + 72 hours
3. No income accrues during freeze
4. FreezePolicy.onFreeze() notified

Options within 72 hours:
A) Cancel: PortfolioManager.cancelExit(pid)
   → frozenUntil = 0
   → Resume earning immediately

B) Complete (after 72h): PortfolioManager.completeExit(pid)
   → 80% of principal refunded (20% exit fee)
   → Business removed from upline volumes
```

---

## Troubleshooting

### Common Issues

**1. Transaction Fails: "User denied transaction"**
- User rejected in wallet
- Solution: Try again

**2. Transaction Fails: "Insufficient funds"**
- Not enough RAMA for transaction + gas
- Solution: Add more RAMA to wallet

**3. Transaction Fails: "below min stake"**
- Stake amount below $50 USD
- Solution: Increase stake amount

**4. Transaction Fails: "NotRegistered"**
- User not registered yet
- Solution: Use `RegisterAndActivate()` instead of `createPortfolio()`

**5. Transaction Fails: "InvalidReferrer"**
- Referrer address not registered or invalid
- Solution: Verify referrer is registered user

**6. Wrong Network**
- Wallet on different chain
- Solution: Call `switchNetwork()` to switch to Ramestta

**7. Contract Call Returns Unexpected Data**
- Check contract address is correct
- Verify ABI matches deployed contract
- Check network RPC is responsive

### Debug Tips

```javascript
// 1. Validate configuration
import { validateContractAddresses } from './config/contracts';
validateContractAddresses(); // Check for missing addresses

// 2. Test RPC connection
import { getWeb3Instance } from './utils/web3Helper';
const web3 = getWeb3Instance();
const blockNumber = await web3.eth.getBlockNumber();
console.log('Current block:', blockNumber);

// 3. Check wallet connection
import { getCurrentAccount } from './utils/web3Helper';
const account = await getCurrentAccount();
console.log('Connected:', account);

// 4. Verify contract accessibility
import { getContract } from './utils/web3Helper';
const userRegistry = getContract('UserRegistry');
const root = await userRegistry.methods.root().call();
console.log('Root address:', root);

// 5. Monitor events
const contract = getContract('PortfolioManager');
contract.events.PortfolioCreated({
  fromBlock: 'latest'
})
.on('data', (event) => {
  console.log('New portfolio:', event.returnValues);
});
```

### Performance Optimization

1. **Batch Queries**: Use OceanView contracts for aggregated data
2. **Cache Results**: Store frequently accessed data in Supabase
3. **Event Indexing**: Use block explorer API for historical events
4. **RPC Limits**: Implement rate limiting and fallback RPCs
5. **Gas Optimization**: Batch multiple operations when possible

---

## Next Steps

1. **Test on Testnet**: Deploy and test all flows on testnet first
2. **Error Handling**: Implement comprehensive error UI feedback
3. **Event Listening**: Set up real-time event listeners for updates
4. **Analytics**: Use Supabase to cache and analyze blockchain data
5. **UI Integration**: Connect contract helpers to React components
6. **Wallet Integration**: Support multiple wallet types (MetaMask, WalletConnect, etc.)

---

## Support & Resources

- **Block Explorer**: https://ramascan.com
- **Bridge**: https://ramabridge.com
- **Swap**: https://ramaswap.com
- **RPC Endpoint**: https://blockchain.ramestta.com

For technical support or questions about the integration, refer to the smart contract documentation in `store/contracts/`.
