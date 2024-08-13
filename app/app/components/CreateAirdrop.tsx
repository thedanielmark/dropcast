/* eslint-disable @next/next/no-img-element */
"use client";

/* eslint-disable react/jsx-key */
import { useEffect, useState } from "react";
import {
  useChain,
  useSendUserOperation,
  useSmartAccountClient,
} from "@account-kit/react";
import uploadToPinata from "../utils/uploadToPinata";
import { CORE_ADDRESS } from "../utils/constants";
import getApproveTokensData from "../utils/getApproveTokensData";
import getCreateAirdropData from "../utils/getCreateAirdropData";
import {
  Label,
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { CheckCircleIcon } from "@heroicons/react/24/outline";
import { createPublicClient, decodeAbiParameters, http } from "viem";
import { baseSepolia as baseSepoliaViem } from "viem/chains";
import Link from "next/link";
import { baseSepolia } from "@account-kit/infra";

const tasks = [
  { id: 1, name: "Hold NFTs" },
  { id: 2, name: "Hold ERC20 Tokens" },
  { id: 3, name: "Follow Farcaster Account" },
  { id: 4, name: "Followers Count" },
];

interface Task {
  type: number;
  title: string;
  address?: string;
  threshold?: number;
  farcasterID?: string;
}
interface Metadata {
  title: string;
  description: string;
  tasks: Task[];
}

interface Status {
  error: boolean;
  message: string;
}

export default function CreateAirdrop() {
  const { chain, setChain } = useChain();
  const [contractAddress, setContractAddress] = useState("");
  const [tokenAmount, setTokenAmount] = useState<string>("");
  const [tokensPerClaim, setTokensPerClaim] = useState<string>("");
  const { client } = useSmartAccountClient({ type: "LightAccount" });
  const [metadata, setMetadata] = useState<Metadata>({
    title: "",
    description: "",
    tasks: [],
  });
  const [metadataUrl, setMetadataUrl] = useState<string>("");
  const [status, setStatus] = useState<Status[]>([]);
  const [selectedTask, setSelectedTask] = useState(tasks[0]);
  const [taskAddress, setTaskAddress] = useState<string>("");
  const [taskThreshold, setTaskThreshold] = useState<string>("");
  const [taskFarcasterID, setTaskFarcasterID] = useState<string>("");
  const [warpcastUrl, setWarpcastUrl] = useState<string>("");

  const publicClient = createPublicClient({
    chain: baseSepoliaViem,
    transport: http(),
  });

  // Function to create task and add it to tasks array
  const createTask = () => {
    return () => {
      const tasks = metadata.tasks;

      // Get the selected task
      if (selectedTask.id === 1 || selectedTask.id === 2) {
        tasks.push({
          type: selectedTask.id,
          title: selectedTask.name,
          address: taskAddress,
          threshold: parseInt(taskThreshold),
        });
      } else if (selectedTask.id === 3) {
        tasks.push({
          type: selectedTask.id,
          title: selectedTask.name,
          farcasterID: taskFarcasterID,
        });
      } else {
        tasks.push({
          type: selectedTask.id,
          title: selectedTask.name,
          threshold: parseInt(taskThreshold),
        });
      }
      setMetadata({ ...metadata, tasks });
      setTaskAddress("");
      setTaskThreshold("");
      setTaskFarcasterID("");
    };
  };

  const { sendUserOperation, isSendingUserOperation } = useSendUserOperation({
    client,
    waitForTxn: true,
    onSuccess: async ({ hash, request }) => {
      if (metadataUrl !== "") {
        const transaction = await publicClient.waitForTransactionReceipt({
          hash: hash,
        });

        console.log("Transaction", transaction);

        const values = decodeAbiParameters(
          [
            { name: "airdropId", type: "uint256" },
            { name: "localAirdropId", type: "uint256" },
            { name: "chain", type: "uint64" },
            { name: "attestationId", type: "bytes32" },
            { name: "vaultAddress", type: "address" },
            { name: "tokenAmount", type: "uint256" },
            { name: "tokensPerClaim", type: "uint256" },
            { name: "metadata", type: "string" },
          ],
          transaction.logs[3].data
        );

        console.log("Values", values[0].toString());

        const url = `https://warpcast.com/~/compose?text=https://dropcast.thedanielmark.app/api/claim/${values[0].toString()}`;

        setWarpcastUrl(url);
      }
      setStatus([
        ...status,
        {
          error: false,
          message: `Transaction ${hash} sent successfully`,
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

  return (
    <div className="p-8 bg-zinc-50 text-zinc-900 shadow-sm ring-1 ring-gray-900/5 rounded-xl md:col-span-2 space-y-3">
      <div className="flex items-center justify-start gap-x-2 pb-5">
        <img src="/logo.png" alt="Logo" className="h-8 w-8" />
        <div className="text-2xl font-black">Create An Airdrop on DropCast</div>
      </div>

      {/* Title start */}
      <div className="sm:col-span-4">
        <label
          htmlFor="title"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          Name of the Airdrop
        </label>
        <div className="mt-2">
          <input
            id="title"
            name="title"
            type="text"
            value={metadata.title}
            onChange={(e) =>
              setMetadata({ ...metadata, title: e.target.value })
            }
            placeholder="MrLeast Giveaway"
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-600 sm:text-sm sm:leading-6"
          />
        </div>
      </div>
      {/* Title end */}

      {/* Description start */}
      <div className="col-span-full">
        <label
          htmlFor="about"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          Message
        </label>
        <div className="mt-2">
          <textarea
            id="about"
            name="about"
            rows={3}
            value={metadata.description}
            onChange={(e) =>
              setMetadata({ ...metadata, description: e.target.value })
            }
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-600 sm:text-sm sm:leading-6"
            placeholder="Hi, I am sending you some tokens. Enjoy!"
          />
        </div>
        <p className="mt-3 text-sm leading-6 text-gray-600">
          Write a small message explaining why you&apos;re sending them the
          drop.
        </p>
      </div>
      {/* Description end */}

      {/* Contract Address start */}
      <div className="sm:col-span-4">
        <label
          htmlFor="contractAddress"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          Contract Address
        </label>
        <div className="mt-2">
          <input
            id="contractAddress"
            name="contractAddress"
            type="text"
            value={contractAddress}
            onChange={(e) => setContractAddress(e.target.value)}
            placeholder="0x2170Ed0880ac9A755fd29B2688956BD959F933F8"
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-600 sm:text-sm sm:leading-6"
          />
        </div>
      </div>
      {/* Contract Address end */}

      <div className="sm:col-span-4 grid grid-cols-2 gap-x-5">
        {/* Token Amount start */}
        <div>
          <label
            htmlFor="tokenAmount"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Token Amount
          </label>
          <div className="mt-2">
            <input
              id="tokenAmount"
              name="tokenAmount"
              type="text"
              value={tokenAmount}
              onChange={(e) => setTokenAmount(e.target.value)}
              placeholder="100"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        {/* Token Amount end */}

        {/* Tokens Per Claim start */}
        <div>
          <label
            htmlFor="tokensPerClaim"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Token Amount
          </label>
          <div className="mt-2">
            <input
              id="tokensPerClaim"
              name="tokensPerClaim"
              type="text"
              value={tokensPerClaim}
              onChange={(e) => setTokensPerClaim(e.target.value)}
              placeholder="3"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        {/* Tokens Per Claim end */}
      </div>

      <div className="w-full pt-4" />
      <div className="w-full pb-5 border-t border-gray-200" />

      {/* Tasklist start */}
      <Listbox value={selectedTask} onChange={setSelectedTask}>
        <Label className="block text-sm font-medium leading-6 text-gray-900">
          What tasks does the user have to complete to claim the airdrop?
        </Label>
        <div className="relative mt-2">
          <ListboxButton className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-600 sm:text-sm sm:leading-6">
            <span className="block truncate">{selectedTask.name}</span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronUpDownIcon
                aria-hidden="true"
                className="h-5 w-5 text-gray-400"
              />
            </span>
          </ListboxButton>

          <ListboxOptions
            transition
            className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none data-[closed]:data-[leave]:opacity-0 data-[leave]:transition data-[leave]:duration-100 data-[leave]:ease-in sm:text-sm"
          >
            {tasks.map((task) => (
              <ListboxOption
                key={task.id}
                value={task}
                className="group relative cursor-default select-none py-2 pl-3 pr-9 text-gray-900 data-[focus]:bg-purple-600 data-[focus]:text-white"
              >
                <span className="block truncate font-normal group-data-[selected]:font-semibold">
                  {task.name}
                </span>

                <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-purple-600 group-data-[focus]:text-white [.group:not([data-selected])_&]:hidden">
                  <CheckIcon aria-hidden="true" className="h-5 w-5" />
                </span>
              </ListboxOption>
            ))}
          </ListboxOptions>
        </div>
      </Listbox>
      {/* Tasklist end */}

      <div className="sm:col-span-4 grid grid-cols-2 gap-x-5">
        {/* Task Address start */}
        {(selectedTask.id === 1 || selectedTask.id === 2) && (
          <div>
            <label
              htmlFor="taskAddress"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Address
            </label>
            <div className="mt-2">
              <input
                id="taskAddress"
                name="taskAddress"
                type="text"
                value={taskAddress}
                onChange={(e) => setTaskAddress(e.target.value)}
                placeholder="100"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
        )}
        {/* Task Address end */}

        {/* Task threshold start */}
        {(selectedTask.id === 1 ||
          selectedTask.id === 2 ||
          selectedTask.id === 4) && (
          <div>
            <label
              htmlFor="taskThreshold"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Threshold
            </label>
            <div className="mt-2">
              <input
                id="taskThreshold"
                name="taskThreshold"
                type="text"
                value={taskThreshold}
                onChange={(e) => setTaskThreshold(e.target.value)}
                placeholder="3"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
        )}
        {/* Task threshold end */}

        {/* Task Farcaster ID */}
        {selectedTask.id === 3 && (
          <div className="sm:col-span-4">
            <label
              htmlFor="taskFarcasterID"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Farcaster ID
            </label>
            <div className="mt-2">
              <input
                id="taskFarcasterID"
                name="taskFarcasterID"
                type="text"
                value={taskFarcasterID}
                onChange={(e) => setTaskFarcasterID(e.target.value)}
                placeholder="mrleast"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
        )}
        {/* Task Farcaster ID */}
      </div>

      {/* Button to add task to array */}
      <button
        type="button"
        className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
        onClick={createTask()}
      >
        Create task
      </button>

      {metadata.tasks.map((task, index) => (
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
                  Users will have to hold at least{" "}
                  <span className="font-bold text-orange-800">
                    {task.threshold} NFTs
                  </span>{" "}
                  that belong to the contract address -{" "}
                  <span className="font-bold text-orange-800">
                    {task.address}
                  </span>
                  .
                </p>
              )}
              {task.type === 2 && (
                <p className="text-sm text-orange-700">
                  Users will have to hold at least{" "}
                  <span className="font-bold text-orange-800">
                    {task.threshold} ERC20 tokens
                  </span>{" "}
                  that belong to the contract address -{" "}
                  <span className="font-bold text-orange-800">
                    {task.address}
                  </span>
                  .
                </p>
              )}
              {task.type === 3 && (
                <p className="text-sm text-orange-700">
                  Users will have to follow{" "}
                  <span className="font-bold text-orange-800">
                    {task.farcasterID}
                  </span>{" "}
                  on Farcaster.
                </p>
              )}
              {task.type === 4 && (
                <p className="text-sm text-orange-700">
                  Users will have to have at least{" "}
                  <span className="font-bold text-orange-800">
                    {task.threshold} followers
                  </span>{" "}
                  on Farcaster.
                </p>
              )}
            </div>
          </div>
        </div>
      ))}

      <div className="w-full pt-4" />
      <div className="w-full pb-5 border-t border-gray-200" />

      {/* Main actions buttons start */}
      <div className="flex items-center justify-end gap-x-2">
        <button
          className="rounded-md bg-purple-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-purple-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600"
          onClick={async () => {
            const data = getApproveTokensData(
              CORE_ADDRESS,
              tokenAmount.toString()
            );
            console.log("DATA ", data);
            if (chain.id != 84532) {
              setChain({
                chain: baseSepolia,
              });
            }
            sendUserOperation({
              uo: {
                target: contractAddress as `0x${string}`,
                data: data,
                value: BigInt("0"),
              },
            });
          }}
          disabled={isSendingUserOperation}
        >
          Approve Tokens
        </button>
        <button
          className="rounded-md bg-purple-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-purple-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600"
          onClick={async () => {
            const ipfsHash = await uploadToPinata(metadata);
            setMetadataUrl(
              "https://amethyst-impossible-ptarmigan-368.mypinata.cloud/ipfs/" +
                ipfsHash +
                "?pinataGatewayToken=" +
                process.env.NEXT_PUBLIC_PINATA_GATEWAY_KEY
            );
            setStatus([
              {
                error: false,
                message: "Metadata uploaded successfully to IPFS: " + ipfsHash,
              },
            ]);
            console.log(
              "Metadata URL",
              "https://amethyst-impossible-ptarmigan-368.mypinata.cloud/ipfs/" +
                ipfsHash +
                "?pinataGatewayToken=" +
                process.env.NEXT_PUBLIC_PINATA_GATEWAY_KEY
            );
            console.log(
              contractAddress as `0x${string}`,
              tokenAmount,
              tokensPerClaim,
              "https://amethyst-impossible-ptarmigan-368.mypinata.cloud/ipfs/" +
                ipfsHash +
                "?pinataGatewayToken=" +
                process.env.NEXT_PUBLIC_PINATA_GATEWAY_KEY
            );
            const data = getCreateAirdropData(
              contractAddress as `0x${string}`,
              tokenAmount,
              tokensPerClaim,
              "https://amethyst-impossible-ptarmigan-368.mypinata.cloud/ipfs/" +
                ipfsHash +
                "?pinataGatewayToken=" +
                process.env.NEXT_PUBLIC_PINATA_GATEWAY_KEY
            );
            console.log("DATA ", data);
            if (chain.id != 84532) {
              setChain({
                chain: baseSepolia,
              });
            }

            sendUserOperation({
              uo: {
                target: CORE_ADDRESS as `0x${string}`,
                data: data,
                value: BigInt("0"),
              },
            });
          }}
          disabled={isSendingUserOperation}
        >
          Create Airdrop
        </button>

        {warpcastUrl && (
          <Link
            className="rounded-md bg-purple-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-purple-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600"
            href={warpcastUrl}
            target="_blank"
          >
            Cast on WarpCast
          </Link>
        )}
      </div>
      {/* Main action buttons end */}
      {status.map((s, index) => (
        <div key={index} className="p-5 break-all">
          <div
            className={
              s.error ? "break-all text-red-700" : "break-all text-gray-900"
            }
          >{`[${index + 1}] ${s.message}`}</div>
        </div>
      ))}
    </div>
  );
}
