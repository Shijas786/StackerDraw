# Provably Fair: Bitcoin-Backed Randomness

This document explains how StackerDraw achieves **Provable Fairness** by leveraging the Stacks blockchain's unique connection to Bitcoin (Proof of Transfer - PoX).

## The Randomness Problem

Traditional lotteries rely on centralized servers to generate random numbers. This creates a "black box" where users must trust the operator not to manipulate the results.

On-chain lotteries often struggle with randomness because everything on a blockchain is deterministic. Miners can potentially manipulate the block timestamp or seed if the incentive is high enough.

## Our Solution: Bitcoin Block Hashes

StackerDraw uses the **Bitcoin Block Hash** as the seed for randomness.

### How it Works

1.  **Commitment**: When a lottery is created, a future `draw-block-height` (Stacks block height) is set.
2.  **The Draw**: Once that block height is reached, the contract calls the `draw-winner` function.
3.  **The Seed**: The contract retrieves the hash of the Stacks block at that height using `(get-block-info? id-header-hash draw-block)`.
    *   *Crucially*: Stacks blocks are anchored to Bitcoin blocks. The hash of a Stacks block is cryptographically dependent on the Bitcoin block hash mined at that time.
    *   For a miner to manipulate this hash to favor a specific ticket, they would need to **reorg the Bitcoin blockchain**, which is economically impossible for the value of a lottery ticket.
4.  **The Calculation**:
    ```clarity
    (random-byte (element-at? block-hash u0))
    (random-uint (buff-to-uint-8 random-byte))
    (winning-ticket (mod random-uint total-tickets))
    ```
    We take the first byte of the hash (effectively a random number between 0-255) and use the modulo operator to select a winning ticket index between `0` and `total-tickets - 1`.

## Verification Guide

You can verify the fairness of any past lottery yourself:

1.  **Get the Draw Block**: Look up the `draw-block-height` for the lottery ID.
2.  **Get the Hash**: Use a Stacks Explorer (like Hiro Explorer) to find the block hash for that height.
3.  **Calculate**:
    *   Take the first byte of the hash (e.g., if hash is `0xab12...`, the byte is `0xab` which is `171` in decimal).
    *   Calculate `171 % total_tickets`.
    *   The result MUST match the `winner-ticket-id` stored in the contract.

## Security Notes (MVP)

*   **Modulo Bias**: Using a single byte (0-255) with a ticket pool that isn't a power of 2 introduces a slight modulo bias. For the MVP, this is acceptable. For production, we would use `vrf` (Verifiable Random Functions) or sample more bytes to reduce bias to negligible levels.
*   **Miner Influence**: While a Stacks miner *technically* chooses which Bitcoin block commit to build on, they cannot predict the Bitcoin block hash ahead of time. Therefore, they cannot manipulate the outcome.

---
**StackerDraw is built on Stacks, secured by Bitcoin.**
