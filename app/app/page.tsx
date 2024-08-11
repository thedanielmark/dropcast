/* eslint-disable @next/next/no-img-element */
"use client";

import { useChain, useLogout, useUser } from "@account-kit/react";
import LogIn from "./components/LogIn";
import Link from "next/link";
import { arbitrumSepolia, baseSepolia } from "@account-kit/infra";
import BlockiesSvg from "blockies-react-svg";

export default function Home() {
  const user = useUser();
  const { chain, setChain } = useChain();
  const { logout } = useLogout();

  return (
    <main className="flex min-h-screen flex-col items-center p-24 gap-4 justify-center">
      {user ? (
        <div className="p-8 bg-zinc-50 text-zinc-900 shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2">
          <div className="flex items-center justify-center gap-x-2 pb-5">
            <img src="/logo.png" alt="Logo" className="h-10 w-10" />
            <div className="text-3xl font-black">DropCast</div>
          </div>

          <div className="mt-5 p-2 flex min-w-0 items-center justify-center space-x-3 border border-gray-200 shadow-sm rounded-lg">
            <BlockiesSvg
              address={user.address}
              size={8}
              scale={10}
              caseSensitive={false}
              className="h-10 w-10 rounded-md"
            />
            <span className="flex min-w-0 flex-1 flex-col">
              <span className="truncate text-xs text-gray-500">
                You are logged in as
              </span>
              <span className="truncate text-sm font-medium text-gray-900">
                {user.address}
              </span>
            </span>
          </div>

          <div className="mt-5 grid grid-cols-2 gap-3">
            <Link
              href="/create"
              className="rounded-md bg-purple-600 px-3 py-2 text-sm text-center font-semibold text-white shadow-sm hover:bg-purple-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600"
            >
              Create Airdrop
            </Link>

            <Link
              href="/claim"
              className="rounded-md bg-purple-600 px-3 py-2 text-sm text-center font-semibold text-white shadow-sm hover:bg-purple-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600"
            >
              Claim Airdrop
            </Link>

            {user.address != undefined && user.address.length > 0 && (
              <button
                className="rounded-md bg-purple-100 px-3 py-2 text-sm text-center font-semibold text-purple-600 border border-purple-200 shadow-sm hover:bg-purple-200"
                onClick={() => {
                  console.log(chain.id);
                  if (chain.id == 84532) {
                    console.log("setting chain to arbitrum");
                    setChain({ chain: arbitrumSepolia });
                  } else {
                    setChain({ chain: baseSepolia });
                  }
                }}
              >
                Toggle Chain
              </button>
            )}

            <button
              className="rounded-md bg-red-100 px-3 py-2 text-sm text-center font-semibold text-red-600 border border-red-200 shadow-sm hover:bg-red-200"
              onClick={() => logout()}
            >
              Disconnect Wallet
            </button>
          </div>
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
