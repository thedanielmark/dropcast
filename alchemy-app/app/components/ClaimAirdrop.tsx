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
import { decodeAbiParameters, hexToBigInt } from "viem";
import getWorldcoinVerificationData from "../utils/getWorldcoinVerificationData";
import { baseSepolia, createAlchemyPublicRpcClient } from "@account-kit/infra";
import { CheckCircleIcon } from "@heroicons/react/24/outline";

export default function ClaimAirdrop() {
  const user = useUser();
  const { client } = useSmartAccountClient({ type: "LightAccount" });
  const readClient = createAlchemyPublicRpcClient({
    chain: baseSepolia,
    connectionConfig: {
      apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY as string,
    },
  });

  const [airdropId, setAirdrpId] = useState("");
  const [airdropDetails, setAirdropDetails] = useState<any>();
  const [airdropTasks, setAirdropTasks] = useState<any>([]);
  const [status, setStatus] = useState<Status[]>([]);
  const [worldcoin, setWorldCoin] = useState<any>(null);
  const [worldVerified, setWorldVerified] = useState<boolean>(false);

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

  return (
    <div className="max-w-3xl flex-1 p-8 bg-zinc-50 text-zinc-900 shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2 space-y-3">
      <div className="text-3xl font-black">Claim Your Airdrop</div>
      <p>Airdrop Id</p>
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
      <button
        className="block mx-auto btn btn-primary mt-6"
        onClick={async () => {
          // TODO: This will send a transaction using our EOA wallet to release the tokens to the claimer once he satisfied all the criteria
        }}
      >
        Claim Airdrop
      </button>
      {/*  <p>Description</p>
      <textarea
        className="input"
        value={metadata.description}
        onChange={(e) =>
          setMetadata({ ...metadata, description: e.target.value })
        }
      />
      <div className="flex justify-around">
        <div>
          <p>Contract Address</p>
          <input
            type="text"
            className="input"
            value={contractAddress}
            onChange={(e) => setContractAddress(e.target.value)}
          />
        </div>
        <div>
          <p>Token Amount</p>
          <input
            type="number"
            className="input"
            value={tokenAmount}
            onChange={(e) => setTokenAmount(parseInt(e.target.value))}
          />
        </div>
      </div>
      {metadata.tasks.map((task, index) => (
        <div className="flex my-2 space-x-4">
          <div>
            <p>Type</p>
            <input
              type="number"
              className="input"
              value={task.type}
              onChange={(e) => {
                const tasks = metadata.tasks;
                tasks[index].type = parseInt(e.target.value);
                setMetadata({ ...metadata, tasks });
              }}
            />
          </div>
          <div>
            <p>Address</p>
            <input
              type="text"
              className="input"
              value={task.address}
              onChange={(e) => {
                const tasks = metadata.tasks;
                tasks[index].address = e.target.value;
                setMetadata({ ...metadata, tasks });
              }}
            ></input>
          </div>
          <div>
            <p>Threshold</p>
            <input
              type="text"
              className="input"
              value={task.threshold}
              onChange={(e) => {
                const tasks = metadata.tasks;
                tasks[index].threshold = parseInt(e.target.value);
                setMetadata({ ...metadata, tasks });
              }}
            ></input>
          </div>
        </div>
      ))}
      <button
        className="btn btn-secondary mt-6"
        onClick={() => {
          const tasks = metadata.tasks;
          tasks.push({
            type: 0,
            address: "",
            threshold: 0,
          });
          setMetadata({ ...metadata, tasks });
        }}
      >
        Add Task
      </button>
      <button
        className="btn btn-link mt-6 ml-4"
        onClick={() => {
          const tasks = metadata.tasks;
          if (tasks.length > 0) {
            tasks.pop();
            setMetadata({ ...metadata, tasks });
          }
        }}
      >
        Remove Task
      </button>
      <button className="block mx-auto btn btn-primary mt-6" onClick={() => {}}>
        Approve Tokens
      </button>
      <button className="block mx-auto btn btn-primary mt-6" onClick={() => {}}>
        Create Airdrop
      </button> */}
    </div>
  );
}
