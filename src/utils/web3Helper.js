import Web3 from 'web3';
import { NETWORK_CONFIG, CONTRACT_CONFIG, getContractConfig, PRECISION } from '../config/contracts';

let web3Instance = null;

export function getWeb3Instance() {
  if (web3Instance) {
    return web3Instance;
  }

  if (typeof window !== 'undefined' && window.ethereum) {
    web3Instance = new Web3(window.ethereum);
  } else {
    web3Instance = new Web3(new Web3.providers.HttpProvider(NETWORK_CONFIG.rpcUrl));
  }

  return web3Instance;
}

export async function connectWallet() {
  try {
    if (typeof window === 'undefined' || !window.ethereum) {
      throw new Error('MetaMask or compatible wallet not found');
    }

    const accounts = await window.ethereum.request({
      method: 'eth_requestAccounts',
    });

    const chainId = await window.ethereum.request({ method: 'eth_chainId' });
    const expectedChainId = `0x${NETWORK_CONFIG.chainId.toString(16)}`;

    if (chainId !== expectedChainId) {
      await switchNetwork();
    }

    return accounts[0];
  } catch (error) {
    console.error('Error connecting wallet:', error);
    throw error;
  }
}

export async function switchNetwork() {
  try {
    const chainIdHex = `0x${NETWORK_CONFIG.chainId.toString(16)}`;

    await window.ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: chainIdHex }],
    });
  } catch (switchError) {
    if (switchError.code === 4902) {
      try {
        await window.ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [
            {
              chainId: `0x${NETWORK_CONFIG.chainId.toString(16)}`,
              chainName: NETWORK_CONFIG.chainName,
              nativeCurrency: {
                name: NETWORK_CONFIG.currencySymbol,
                symbol: NETWORK_CONFIG.currencySymbol,
                decimals: 18,
              },
              rpcUrls: [NETWORK_CONFIG.rpcUrl],
              blockExplorerUrls: [NETWORK_CONFIG.explorerUrl],
            },
          ],
        });
      } catch (addError) {
        console.error('Error adding network:', addError);
        throw addError;
      }
    } else {
      console.error('Error switching network:', switchError);
      throw switchError;
    }
  }
}

export function getContract(contractName) {
  const web3 = getWeb3Instance();
  const config = getContractConfig(contractName);
  return new web3.eth.Contract(config.abi, config.address);
}

export async function getCurrentAccount() {
  const web3 = getWeb3Instance();
  const accounts = await web3.eth.getAccounts();
  return accounts[0] || null;
}

export async function getBalance(address) {
  const web3 = getWeb3Instance();
  const balance = await web3.eth.getBalance(address);
  return web3.utils.fromWei(balance, 'ether');
}

export function fromWei(value, unit = 'ether') {
  const web3 = getWeb3Instance();
  return web3.utils.fromWei(value.toString(), unit);
}

export function toWei(value, unit = 'ether') {
  const web3 = getWeb3Instance();
  return web3.utils.toWei(value.toString(), unit);
}

export function formatUSD(microUSD) {
  const value = Number(microUSD) / PRECISION.USD_MICRO;
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

export function formatRAMA(weiAmount) {
  const value = Number(weiAmount) / PRECISION.RAMA_WEI;
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 6,
  }).format(value);
}

export function formatPercentage(bps) {
  const value = Number(bps) / 100;
  return `${value}%`;
}

export async function callContractMethod(contractName, methodName, params = [], options = {}) {
  try {
    const contract = getContract(contractName);
    const method = contract.methods[methodName](...params);

    if (options.send) {
      const account = await getCurrentAccount();
      if (!account) {
        throw new Error('No account connected');
      }

      const gasEstimate = await method.estimateGas({ from: account, ...options });
      const gasLimit = Math.floor(gasEstimate * 1.2);

      return await method.send({
        from: account,
        gas: gasLimit,
        ...options,
      });
    } else {
      return await method.call(options);
    }
  } catch (error) {
    console.error(`Error calling ${contractName}.${methodName}:`, error);
    throw error;
  }
}

export async function sendTransaction(to, value, data = '0x') {
  try {
    const web3 = getWeb3Instance();
    const account = await getCurrentAccount();

    if (!account) {
      throw new Error('No account connected');
    }

    const gasPrice = await web3.eth.getGasPrice();
    const gasEstimate = await web3.eth.estimateGas({
      from: account,
      to,
      value,
      data,
    });

    const tx = {
      from: account,
      to,
      value,
      data,
      gas: Math.floor(gasEstimate * 1.2),
      gasPrice,
    };

    return await web3.eth.sendTransaction(tx);
  } catch (error) {
    console.error('Error sending transaction:', error);
    throw error;
  }
}

export function listenToWalletEvents(onAccountsChanged, onChainChanged) {
  if (typeof window !== 'undefined' && window.ethereum) {
    window.ethereum.on('accountsChanged', (accounts) => {
      if (onAccountsChanged) {
        onAccountsChanged(accounts[0] || null);
      }
    });

    window.ethereum.on('chainChanged', (chainId) => {
      if (onChainChanged) {
        onChainChanged(parseInt(chainId, 16));
      }
      window.location.reload();
    });
  }
}

export function removeWalletListeners() {
  if (typeof window !== 'undefined' && window.ethereum) {
    window.ethereum.removeAllListeners('accountsChanged');
    window.ethereum.removeAllListeners('chainChanged');
  }
}

export async function waitForTransaction(txHash, confirmations = 1) {
  const web3 = getWeb3Instance();
  let receipt = null;

  while (receipt === null || receipt.blockNumber === null) {
    try {
      receipt = await web3.eth.getTransactionReceipt(txHash);

      if (receipt === null) {
        await new Promise((resolve) => setTimeout(resolve, 2000));
      }
    } catch (error) {
      console.error('Error getting transaction receipt:', error);
      await new Promise((resolve) => setTimeout(resolve, 2000));
    }
  }

  if (confirmations > 1) {
    const currentBlock = await web3.eth.getBlockNumber();
    const confirmationsReceived = currentBlock - receipt.blockNumber;

    if (confirmationsReceived < confirmations) {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      return waitForTransaction(txHash, confirmations);
    }
  }

  return receipt;
}

export function parseErrorMessage(error) {
  if (error.message) {
    if (error.message.includes('User denied')) {
      return 'Transaction rejected by user';
    }
    if (error.message.includes('insufficient funds')) {
      return 'Insufficient RAMA balance for transaction';
    }
    if (error.message.includes('execution reverted')) {
      const revertReason = error.message.match(/reverted: (.+)/);
      if (revertReason && revertReason[1]) {
        return revertReason[1];
      }
      return 'Transaction failed: execution reverted';
    }
  }
  return error.message || 'Unknown error occurred';
}
