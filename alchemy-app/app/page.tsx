"use client";

import { useUser } from "@account-kit/react";
import CreateAirdrop from "./components/CreateAirdrop";
import ClaimAirdrop from "./components/ClaimAirdrop";
import LogIn from "./components/LogIn";
import WorldcoinVerification from "./components/WorldcoinVerification";

// TODO
// 1. Create airdrop
// 2. Claim airdrop

export default function Home() {
  const user = useUser();

  return (
    <main className="flex items-center justify-center min-h-screen">
      {/* <p className="text-3xl font-bold">DROPIFY</p> */}
      {/* <LogIn /> */}
      {user ? <CreateAirdrop /> : <p>Log in to get started</p>}
      <WorldcoinVerification />
    </main>
  );
}
