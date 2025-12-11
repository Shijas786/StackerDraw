# StackerDraw 🎰

A provably fair Bitcoin-backed lottery built on Stacks blockchain.

## Overview

StackerDraw is a decentralized lottery platform that uses Bitcoin block hashes for verifiable randomness and sBTC for prizes. Every draw is provably fair and can be independently verified by anyone.

## Features

- **Provably Fair** - Uses Bitcoin block hashes for randomness
- **Bitcoin-Native** - Prizes paid in sBTC
- **Transparent** - All draws verifiable on-chain
- **Low Cost** - Leverages Stacks' low transaction fees

## Development Status

**Current**: MVP with Clarity 2 syntax (compiles in Clarinet)  
**Planned**: Upgrade to Clarity 4 with automatic Bitcoin block hash randomness

## Getting Started

### Prerequisites

- [Clarinet](https://docs.stacks.co/clarinet/overview) installed
- [Leather Wallet](https://leather.io/) for testing

### Installation

```bash
# Clone the repository
git clone https://github.com/Shijas786/StackerDraw.git
cd StackerDraw

# Check contracts
clarinet check
```

## Contract Functions

### contract: lottery.clar

**Read-Only**
- `get-lottery` - Get lottery details
- `get-ticket-owner` - Get owner of specific ticket
- `get-current-lottery-id` - Get latest lottery ID

**Public**
- `create-lottery` - Create new lottery
- `buy-ticket` - Purchase lottery ticket
- `draw-winner` - Execute draw (creator selects winning ticket)
- `claim-prize` - Winner claims their prize

## Roadmap

- [x] Core lottery contract (Clarity 2)
- [ ] Clarity 4 upgrade with Bitcoin block hash randomness
- [ ] Frontend application
- [ ] sBTC integration
- [ ] Testnet deployment
- [ ] Mainnet deployment

## Contributing

This project is part of the Stacks Builder Challenge and Talent Protocol.

## License

MIT

---

**Note**: Currently in development. MVP uses manual winner selection. Clarity 4 upgrade will add automatic Bitcoin block hash randomness.
