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
          You're logged in as {user.address ? user.address : "anon"}.
          {user.address != undefined && user.address.length > 0 && (
            <button
              className="btn btn-primary mt-6"
              onClick={() => {
                if (chain.id == 84532) {
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
        <button className="btn btn-primary" onClick={openAuthModal}>
          Login
        </button>
      )}
    </>
  );
}
