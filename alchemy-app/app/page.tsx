"use client";

import ContractCalls from "./components/ContractCalls";
import LogIn from "./components/LogIn";
import WorldcoinVerification from "./components/WorldcoinVerification";

// TODO
// 1. Create airdrop
// 2. Claim airdrop

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24 gap-4 justify-center text-center">
      <LogIn />
      <ContractCalls />
      <WorldcoinVerification />
    </main>
  );
}
