"use client";
import { arbitrumSepolia, baseSepolia } from "@account-kit/infra";
import {
  useAuthModal,
  useChain,
  useLogout,
  useSignerStatus,
  useUser,
} from "@account-kit/react";
export default function LogIn() {
  const user = useUser();
  const { chain, setChain } = useChain();
  const { openAuthModal } = useAuthModal();
  const signerStatus = useSignerStatus();
  const { logout } = useLogout();
  return (
    <>
      {signerStatus.isInitializing ? (
        <>Loading...</>
      ) : user ? (
        <div className="flex flex-col gap-2 p-2">
          <p className="text-xl font-bold">Success!</p>
          You&apos;re logged in as {user.address ? user.address : "anon"}.
          {user.address != undefined && user.address.length > 0 && (
            <button
              className="btn btn-primary mt-6"
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
          <button className="btn btn-primary mt-6" onClick={() => logout()}>
            Log out
          </button>
        </div>
      ) : (
        <button
          className="mt-5 block w-full max-w-[200px] rounded-md bg-purple-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-purple-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600"
          onClick={openAuthModal}
        >
          Login
        </button>
      )}
    </>
  );
}
