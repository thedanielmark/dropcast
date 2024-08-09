/* eslint-disable react/jsx-key */
import { useState } from "react";
import {
  useSendUserOperation,
  useSmartAccountClient,
} from "@account-kit/react";
import uploadToPinata from "../utils/uploadToPinata";
import { CORE_ADDRESS } from "../utils/constants";
import getApproveTokensData from "../utils/getApproveTokensData";
import getCreateAirdropData from "../utils/getCreateAirdropData";
interface Task {
  type: number;
  address: string;
  threshold: number;
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

  const { sendUserOperation, isSendingUserOperation } = useSendUserOperation({
    client,
    waitForTxn: true,
    onSuccess: ({ hash, request }) => {
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
    <div className="max-w-3xl flex-1 p-8 bg-zinc-50 text-zinc-900 shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2 space-y-3">
      <div className="text-3xl font-black">Create An Airdrop</div>

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

      {metadata.tasks.map((task, index) => (
        <div className="flex my-2 space-x-4" key={index}>
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
      <div className="flex items-center justify-end gap-x-2">
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
            const data = getApproveTokensData(
              CORE_ADDRESS,
              tokenAmount.toString()
            );
            console.log("DATA ", data);
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
          onClick={() => {
            const data = getCreateAirdropData(
              contractAddress as `0x${string}`,
              tokenAmount,
              tokensPerClaim,
              metadataUrl
            );
            console.log("DATA ", data);
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
      </div>
      {status.map((s, i) => (
        <p className={s.error ? "text-red-700" : "text-white"}>{`[${i + 1}] ${
          s.message
        }`}</p>
      ))}
    </div>
  );
}
