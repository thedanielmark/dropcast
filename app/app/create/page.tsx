/* eslint-disable @next/next/no-img-element */
"use client";

import CreateAirdrop from "../components/CreateAirdrop";
import { useUser } from "@account-kit/react";
import LogIn from "../components/LogIn";

function CreatePage() {
  const user = useUser();

  return (
    <main className="flex min-h-screen flex-col items-center p-24 gap-4 justify-center">
      {user ? (
        <div className="flex justify-center w-full">
          <CreateAirdrop />
        </div>
      ) : (
        <>
          <div className="flex items-center justify-center gap-x-2">
            <img src="/logo.png" alt="Logo" className="h-10 w-10" />
            <div className="text-3xl font-bold">DropCast</div>
          </div>
          <LogIn />
        </>
      )}
    </main>
  );
}

export default CreatePage;
