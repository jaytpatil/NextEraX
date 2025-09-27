# NexteraX - Blockchain-Enabled Tourist Guide Platform

A decentralized platform connecting tourists with verified guides and service providers using blockchain technology.

## Features

- **Guide/Service Provider Registration & Verification**
  - Admin adds guides with wallet address and service details
  - Admin verifies guides with blockchain verification
  - Verified guides receive Soulbound NFT certification

- **Digital Certification (Soulbound NFT)**
  - NFT acts as proof of authenticity (non-transferable)
  - Metadata includes guide name, service type, and verification date

- **Secure Payments**
  - Tourists pay guides using ERC-20 tokens on Sepolia ETH testnet
  - Transparent payments directly to guide wallets

- **Frontend Integration**
  - Tourists see only verified guides
  - Payment and NFT verification via MetaMask

## Tech Stack

- **Blockchain**: Sepolia ETH testnet
- **Smart Contracts**: Solidity
- **NFT**: Soulbound NFT for certification
- **Payments**: ERC-20 token (testnet USDC or custom token)
- **Frontend**: React + MetaMask wallet integration

## Project Structure

```
├── contracts/            # Smart contracts
│   ├── GuideRegistry.sol # Guide registration and verification
│   ├── SoulboundNFT.sol  # Non-transferable NFT certificate
│   ├── PaymentToken.sol  # ERC-20 token for payments
│   └── PaymentSystem.sol # Payment handling
├── frontend/            # React frontend application
├── scripts/             # Deployment and testing scripts
└── hardhat.config.js    # Hardhat configuration
```

## Setup and Installation

1. Clone the repository
2. Install dependencies: `npm install`
3. Compile contracts: `npx hardhat compile`
4. Deploy to Sepolia testnet: `npx hardhat run scripts/deploy.js --network sepolia`
5. Start frontend: `cd frontend && npm start`

## Demo Flow

1. Admin logs in and adds guide with wallet and service type
2. Admin verifies guide, triggering NFT certificate minting
3. Tourist logs in and views verified guides
4. Tourist pays guide directly via smart contract
5. Frontend displays guide's verified status and NFT certificate