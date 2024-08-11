/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useState } from "react";
import {
  IDKitWidget,
  VerificationLevel,
  ISuccessResult,
} from "@worldcoin/idkit";

interface Status {
  error: boolean;
  message: string;
}

import {
  useSendUserOperation,
  useSmartAccountClient,
  useUser,
} from "@account-kit/react";
import { CORE_ABI, CORE_ADDRESS } from "../utils/constants";
import {
  createPublicClient,
  createWalletClient,
  decodeAbiParameters,
  hexToBigInt,
  http,
} from "viem";
import getWorldcoinVerificationData from "../utils/getWorldcoinVerificationData";
import { baseSepolia, createAlchemyPublicRpcClient } from "@account-kit/infra";
import { baseSepolia as baseSepoliaViem } from "viem/chains";
import { CheckCircleIcon } from "@heroicons/react/24/outline";
import {
  getFarcasterFollowers,
  getFarcasterFollowings,
} from "../utils/airstackQueries";
import { init, useQuery } from "@airstack/airstack-react";
import { privateKeyToAccount } from "viem/accounts";
import Link from "next/link";

init(process.env.NEXT_PUBLIC_AIRSTACK_API_KEY as string);

export default function ClaimAirdrop() {
  const user = useUser();
  const { client } = useSmartAccountClient({ type: "LightAccount" });
  const readClient = createAlchemyPublicRpcClient({
    chain: baseSepolia,
    connectionConfig: {
      apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY as string,
    },
  });
  const [txHash, setTxHash] = useState("");

  const publicClient = createPublicClient({
    chain: baseSepoliaViem,
    transport: http(),
  });

  const [airdropId, setAirdrpId] = useState("");
  const [airdropDetails, setAirdropDetails] = useState<any>();
  const [airdropTasks, setAirdropTasks] = useState<any>([]);
  const [status, setStatus] = useState<Status[]>([]);
  const [worldcoin, setWorldCoin] = useState<any>(null);
  const [worldVerified, setWorldVerified] = useState<boolean>(false);
  const [activateClaimButton, setActivateClaimButton] =
    useState<boolean>(false);

  // Get farcaster followings
  const {
    data: farcasterFollowingsData,
    loading: farcasterFollowingsLoading,
    error: farcasterFollowingsError,
  } = useQuery(getFarcasterFollowings(user?.address || ""));

  // Get farcaster follower count
  const {
    data: farcasterFollowersData,
    loading: farcasterFollowersLoading,
    error: farcasterFollowersError,
  } = useQuery(getFarcasterFollowers(user?.address || ""));

  useEffect(() => {
    if (!farcasterFollowingsLoading && farcasterFollowingsData) {
      console.log(farcasterFollowingsData);
    }
  }, [farcasterFollowingsData, farcasterFollowingsLoading]);

  useEffect(() => {
    if (!farcasterFollowersLoading && farcasterFollowersData) {
      console.log(farcasterFollowersData);
    }
  }, [farcasterFollowersData, farcasterFollowersLoading]);

  function isProfileNamePresent(data: any, profileName: string) {
    for (let following of data.SocialFollowings.Following) {
      // Check in followingAddress socials
      for (let social of following.followingAddress.socials) {
        if (social.profileName === profileName) {
          return true;
        }
      }

      // Check in followerAddress socials
      for (let social of following.followerAddress.socials) {
        if (social.profileName === profileName) {
          return true;
        }
      }
    }
    return false;
  }

  function countFollowers(data: any) {
    return data.SocialFollowers.Follower.length;
  }

  const { sendUserOperation, isSendingUserOperation } = useSendUserOperation({
    client,
    waitForTxn: true,
    onSuccess: (out) => {
      console.log("Response");
      console.log(out);
      setStatus([
        ...status,
        {
          error: false,
          message: `Transaction ${out.hash} sent successfully`,
        },
      ]);
    },
    onError: (error) => {
      setStatus([
        ...status,
        {
          error: true,
          message: `Error sending transaction: ${error}`,
        },
      ]);
    },
  });

  useEffect(() => {
    console.log("WORLDCOIN");
    console.log(worldcoin);
    if (worldcoin != null) {
      let data = getWorldcoinVerificationData(
        "0x0429A2Da7884CA14E53142988D5845952fE4DF6a",
        worldcoin
      );
      (async function () {
        console.log(user?.address);
        const response = await readClient.readContract({
          abi: CORE_ABI,
          functionName: "verifyWorldProof",
          address: CORE_ADDRESS,
          args: [
            [
              user?.address,
              hexToBigInt(worldcoin.merkle_root),
              hexToBigInt(worldcoin.nullifier_hash),
              worldcoin.proofs,
            ],
          ],
        });
        console.log(response);
      })();
    }
  }, [worldcoin]);

  const unpack = (proof: `0x${string}`) => {
    return decodeAbiParameters([{ type: "uint256[8]" }], proof)[0];
  };

  const onSuccess = (result: ISuccessResult) => {
    const bigNumProofs = unpack((result as any).proof);
    setWorldCoin({ ...result, proofs: bigNumProofs });
    console.log("Success");
    console.log(result);
    setWorldVerified(true);
  };

  // function to get the airdrop details from the contract
  const getAirdropDetails = async (airdropId: string) => {
    const data = await client?.readContract({
      abi: CORE_ABI,
      address: CORE_ADDRESS,
      functionName: "airdrops",
      args: [airdropId],
    });

    // Fetching tasks from Pinata and setting it in state
    // Get request
    console.log("Fetching pinata data");
    // const response = await fetch(data[8]);
    // const tasks = await response.json();
    // console.log("Tasks: ", response);
    // setAirdropDetails(tasks);

    console.log("Airdrop data: ", data);
  };

  useEffect(() => {
    if (airdropId) {
      console.log("Getting Airdrop Details");
      getAirdropDetails(airdropId);
    }
  }, [airdropId]);

  // function to get tasks from airdrop details
  useEffect(() => {
    if (airdropDetails) {
      fetch(airdropDetails[8])
        .then((response) => response.json())
        .then((json) => setAirdropTasks(json.tasks));
    }
  }, [airdropDetails]);

  // function to complete the challenge
  const completeChallenge = () => {
    airdropTasks.forEach(async (task: any) => {
      console.log("Task: ", task);
      // Check if user holds required NFTs
      if (task.type === 1) {
        const options = {
          method: "GET",
          headers: {
            accept: "application/json",
            "x-api-key": process.env.OPENSEA_API_KEY || "",
          },
        };

        fetch(
          `https://api.opensea.io/api/v2/chain/ethereum/account/${user?.address}/nfts`,
          options
        )
          .then((response) => response.json())
          .then((response) => {
            if (response.nfts.length < task.threshold) {
              console.log("Task verification failed");
              return;
            } else {
              console.log("Task verification success");
              setActivateClaimButton(true);
            }
          })
          .catch((err) => console.error(err));
      }
      // Check if the user holds required ERC20 tokens
      if (task.type === 2) {
        const balance = await publicClient.getBalance({
          address: user?.address || "0xblahblahblah",
        });

        console.log("Balance: ", balance);

        if (balance < task.threshold) {
          console.log("Task verification failed");
          // TODO - Show error message
          return;
        } else {
          console.log("Task verification success");
          setActivateClaimButton(true);

          // TODO - GABRIEL: Transfer assets to user
        }
      }
      // Check if the user follows the required Farcaster ID using airstack
      if (task.type === 3) {
        const response = isProfileNamePresent(
          farcasterFollowingsData,
          task.farcasterID
        );
        if (!response) {
          console.log("Task verification failed");
          // TODO - Show error message
          return;
        } else {
          console.log("Task verification success");
          setActivateClaimButton(true);

          // TODO - GABRIEL: Transfer assets to user
        }
      }
      // Check if the user has the required number of followers on Farcaster
      if (task.type === 4) {
        const response = countFollowers(farcasterFollowersData);
        console.log("Followers: ", response);
        if (response < task.threshold) {
          console.log("Task verification failed");
          // TODO - Show error message
          return;
        } else {
          console.log("Task verification success");
          setActivateClaimButton(true);

          // TODO - GABRIEL: Transfer assets to user
        }
      }
    });
  };

  return (
    <div className="max-w-3xl flex-1 p-8 bg-zinc-50 text-zinc-900 shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2 space-y-3">
      <div className="flex items-center justify-start gap-x-2 pb-5">
        <img src="/logo.png" alt="Logo" className="h-10 w-10" />
        <div className="text-3xl font-black">
          Claim Your Airdrop on DropCast
        </div>
      </div>

      <label
        htmlFor="airdropId"
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        Airdrop ID
      </label>
      <input
        id="airdropId"
        name="airdropId"
        type="text"
        placeholder="69"
        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-600 sm:text-sm sm:leading-6"
        value={airdropId}
        onChange={(e) => setAirdrpId(e.target.value)}
      />
      <button
        className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
        onClick={async () => {
          const response = await readClient.readContract({
            abi: CORE_ABI,
            functionName: "airdrops",
            address: CORE_ADDRESS,
            args: [airdropId],
          });
          console.log(response);
          setAirdropDetails(response);
        }}
      >
        Get Airdrop Details
      </button>

      <div>
        {airdropDetails && (
          <div>
            {airdropTasks.length > 0 &&
              airdropTasks.map((task: any, index: any) => (
                <div
                  key={index}
                  className="border-l-4 border-orange-400 bg-orange-50 p-4"
                >
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <CheckCircleIcon
                        aria-hidden="true"
                        className="h-5 w-5 text-orange-400"
                      />
                    </div>
                    <div className="ml-3">
                      {task.type === 1 && (
                        <p className="text-sm text-orange-700">
                          You have to hold at least{" "}
                          <span className="font-bold text-orange-800">
                            {task.threshold} NFTs
                          </span>{" "}
                          that belong to the contract address -{" "}
                          <span className="font-bold text-orange-800">
                            {task.address}
                          </span>{" "}
                          to claim this airdrop .
                        </p>
                      )}
                      {task.type === 2 && (
                        <p className="text-sm text-orange-700">
                          You have to hold at least{" "}
                          <span className="font-bold text-orange-800">
                            {task.threshold} ERC20 tokens
                          </span>{" "}
                          that belong to the contract address -{" "}
                          <span className="font-bold text-orange-800">
                            {task.address}
                          </span>{" "}
                          to claim this airdrop .
                        </p>
                      )}
                      {task.type === 3 && (
                        <p className="text-sm text-orange-700">
                          You have to follow{" "}
                          <span className="font-bold text-orange-800">
                            {task.farcasterID}
                          </span>{" "}
                          on Farcaster to claim this airdrop.
                        </p>
                      )}
                      {task.type === 4 && (
                        <p className="text-sm text-orange-700">
                          You have to have at least{" "}
                          <span className="font-bold text-orange-800">
                            {task.threshold} followers
                          </span>{" "}
                          on Farcaster to claim this airdrop.
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            {/* Tasks end */}
          </div>
        )}
      </div>

      <div>
        {worldVerified ? (
          <p className="mt-4">WORLDCOIN VERIFIED 🥰</p>
        ) : (
          user != null && (
            <IDKitWidget
              app_id={
                (process.env.NEXT_PUBLIC_WORLDCOIN_APP_ID as `app_${string}`) ||
                "app_"
              }
              action="unique-human-airdrop"
              onSuccess={onSuccess}
              onError={(error: any) => {
                console.log(error);
              }}
              signal={user.address}
              verification_level={VerificationLevel.Orb}
            >
              {({ open }: any) => (
                // This is the button that will open the IDKit modal
                <button
                  type="button"
                  onClick={open}
                  className="rounded-md bg-purple-100 px-3 py-2 text-sm font-semibold text-purple-600 border border-purple-200 shadow-sm hover:bg-purple-200"
                >
                  Verify with World ID
                </button>
              )}
            </IDKitWidget>
          )
        )}
      </div>

      <div>
        <button
          className="rounded-md bg-purple-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-purple-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600"
          onClick={completeChallenge}
        >
          Complete Challenge
        </button>
      </div>

      <div>
        <button
          className={`rounded-md bg-purple-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-purple-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600 ${
            activateClaimButton ? "" : "cursor-not-allowed opacity-50"
          }`}
          disabled={!activateClaimButton}
          onClick={async () => {
            const publicClient = createPublicClient({
              chain: baseSepoliaViem,
              transport: http(),
            });
            const account = privateKeyToAccount(
              process.env.NEXT_PUBLIC_PRIVATE_KEY as `0x{string}`
            );

            const client = createWalletClient({
              account,
              chain: baseSepoliaViem,
              transport: http(),
            });

            const { request } = await publicClient.simulateContract({
              address: CORE_ADDRESS,
              abi: CORE_ABI,
              functionName: "claimAirdrop",
              args: [
                airdropId,
                [
                  user?.address,
                  hexToBigInt(worldcoin.merkle_root),
                  hexToBigInt(worldcoin.nullifier_hash),
                  worldcoin.proofs,
                ],
              ],
              account,
            });

            const tx = await client.writeContract(request);
            setTxHash(tx);
          }}
        >
          Claim Airdrop
        </button>
      </div>
      {txHash != "" && (
        <Link
          target="_blank"
          href={"https://base-sepolia.blockscout.com/tx/" + txHash}
          className="mx-auto w-full"
        >
          Airdrop claimed Successfully ✅
        </Link>
      )}
    </div>
  );
}
