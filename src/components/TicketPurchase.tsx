"use client";

import { useState } from "react";
import { openContractCall } from "@stacks/connect";
import { uintCV, PostConditionMode } from "@stacks/transactions";
import { CONTRACT_ADDRESS, CONTRACT_NAME } from "@/lib/constants";


export default function TicketPurchase() {
    const [ticketCount, setTicketCount] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const TICKET_PRICE = 100; // Hardcoded for MVP display, should fetch from chain

    const handleBuy = async () => {
        setIsLoading(true);
        try {
            // Create conditions for the transaction
            // For MVP we just call buy-ticket functionality

            // In a real app we'd loop for multiple tickets or having a bulk-buy function
            // For this MVP UI, we'll just buy 1 ticket at a time or implementing a loop is complex in UI
            // Let's assume standard buy-ticket buys 1.

            const lotteryId = 1; // Default to first lottery for MVP

            await openContractCall({
                contractAddress: CONTRACT_ADDRESS,
                contractName: CONTRACT_NAME,
                functionName: "buy-ticket",
                functionArgs: [uintCV(lotteryId)],
                postConditionMode: PostConditionMode.Allow, // Simplified for Dev. In production, define rigorous post-conditions.
                onFinish: (data) => {
                    console.log("Transaction submitted:", data.txId);
                    setIsLoading(false);
                    alert(`Transaction submitted! TxId: ${data.txId}`);
                },
                onCancel: () => {
                    setIsLoading(false);
                },
            });
        } catch (e) {
            console.error(e);
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col gap-6 p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xl max-w-md w-full">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Daily Lottery #1</h2>
                <span className="bg-green-100 text-green-800 text-xs font-semibold px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300">
                    Active
                </span>
            </div>

            <div className="flex flex-col gap-2">
                <div className="flex justify-between text-sm text-gray-500">
                    <span>Prize Pool</span>
                    <span className="font-mono font-bold text-foreground">1,000 STX</span>
                </div>
                <div className="flex justify-between text-sm text-gray-500">
                    <span>Draw Block</span>
                    <span className="font-mono text-foreground">#54,321</span>
                </div>
            </div>

            <div className="border-t border-zinc-100 dark:border-zinc-800 my-2"></div>

            <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3 bg-zinc-100 dark:bg-zinc-800 rounded-lg p-1">
                    <button
                        onClick={() => setTicketCount(Math.max(1, ticketCount - 1))}
                        className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-white dark:hover:bg-zinc-700 font-bold"
                    >-
                    </button>
                    <span className="font-mono w-4 text-center">{ticketCount}</span>
                    <button
                        onClick={() => setTicketCount(ticketCount + 1)}
                        className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-white dark:hover:bg-zinc-700 font-bold"
                    >+
                    </button>
                </div>
                <div className="text-right">
                    <div className="text-sm text-gray-500">Total Cost</div>
                    <div className="font-bold text-lg">{ticketCount * TICKET_PRICE} STX</div>
                </div>
            </div>

            <button
                onClick={handleBuy}
                disabled={isLoading}
                className="w-full py-4 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-lg shadow-lg shadow-orange-500/20 transition-all active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
            >
                {isLoading ? "Confirming..." : "Buy Ticket"}
            </button>

            <p className="text-xs text-center text-gray-400">
                Provably fair draw using Bitcoin block hash
            </p>
        </div>
    );
}
