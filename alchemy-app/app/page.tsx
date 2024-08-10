"use client";

import { useUser } from "@account-kit/react";
import CreateAirdrop from "./components/CreateAirdrop";
import ClaimAirdrop from "./components/ClaimAirdrop";
import LogIn from "./components/LogIn";

// TODO
// 1. Create airdrop
// 2. Claim airdrop

export default function Home() {
  const user = useUser();

  return (
    <main className="flex min-h-screen flex-col items-center p-24 gap-4 justify-center w-screen">
      {/* <p className="text-3xl font-bold">DROPIFY</p>
      <LogIn /> */}
      {user ? (
        <div className="flex justify-center w-full">
          {/* <CreateAirdrop /> */}
          <ClaimAirdrop />
        </div>
      ) : (
        <p>Log in to get started</p>
      )}
    </main>
  );
}
