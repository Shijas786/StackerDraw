import Image from "next/image";
import ConnectWallet from "@/components/ConnectWallet";
import TicketPurchase from "@/components/TicketPurchase";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start w-full max-w-4xl mx-auto">
        <div className="flex flex-col items-center sm:items-start gap-4">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">
            StackerDraw 🎰
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Bitcoin-Backed Provably Fair Lottery
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-12 w-full items-start">
          <div className="flex-1 flex flex-col gap-6">
            <div className="p-6 bg-zinc-50 dark:bg-zinc-900 rounded-2xl">
              <h3 className="font-bold text-lg mb-2">How it works</h3>
              <ul className="list-disc list-inside space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li>Buy tickets with STX</li>
                <li>Winner drawn using Bitcoin block hash</li>
                <li>Verifiable on-chain randomness</li>
                <li>Instant payouts</li>
              </ul>
            </div>

            <div className="flex gap-4 items-center">
              <ConnectWallet />
            </div>
          </div>

          <div className="flex-1 w-full flex justify-center">
            <TicketPurchase />
          </div>
        </div>
      </main>
    </div>
  );
}
