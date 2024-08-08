import { PinataSDK } from "pinata";
import { title } from "process";
import { useState } from "react";
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
  const [tokenAmount, setTokenAmount] = useState<number | "">("");
  const [tokensPerClaim, setTokensPerClaim] = useState<number | "">("");

  const [metadata, setMetadata] = useState<Metadata>({
    title: "",
    description: "",
    tasks: [],
  });
  const [metadataUrl, setMetadataUrl] = useState<string>("");
  const [status, setStatus] = useState<Status[]>([]);
  return (
    <div>
      <p className="text-2xl font-semibold pb-12">Create Airdrop</p>
      <p>Title</p>
      <input
        type="string"
        className="input"
        value={metadata.title}
        onChange={(e) => setMetadata({ ...metadata, title: e.target.value })}
      />
      <p>Description</p>
      <textarea
        className="input"
        value={metadata.description}
        onChange={(e) =>
          setMetadata({ ...metadata, description: e.target.value })
        }
      />
      <div className="flex space-x-4 my-2">
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
        <div>
          <p>Tokens Per Claim</p>
          <input
            type="number"
            className="input"
            value={tokensPerClaim}
            onChange={(e) => setTokensPerClaim(parseInt(e.target.value))}
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
      <button
        className="block mx-auto btn btn-primary mt-6"
        onClick={async () => {
          const pinata = new PinataSDK({
            pinataJwt: process.env.NEXT_PUBLIC_PINATA_JWT!,
            pinataGateway: "amethyst-impossible-ptarmigan-368.mypinata.cloud",
          });
          console.log("METADATA");
          console.log(metadata);
          const upload = await pinata.upload.json(metadata);
          console.log("METADATA URL");
          console.log(
            "https://amethyst-impossible-ptarmigan-368.mypinata.cloud/ipfs/" +
              upload.IpfsHash +
              "?pinataGatewayToken=" +
              process.env.NEXT_PUBLIC_PINATA_GATEWAY_KEY
          );
          setMetadataUrl(
            "https://amethyst-impossible-ptarmigan-368.mypinata.cloud/ipfs/" +
              upload.IpfsHash +
              "?pinataGatewayToken=" +
              process.env.NEXT_PUBLIC_PINATA_GATEWAY_KEY
          );
          setStatus([
            {
              error: false,
              message:
                "Metadata uploaded successfully to IPFS: " + upload.IpfsHash,
            },
          ]);
        }}
      >
        Approve Tokens
      </button>
      <button className="block mx-auto btn btn-primary my-6" onClick={() => {}}>
        Create Airdrop
      </button>
      {status.map((s, i) => (
        <p className={s.error ? "text-red-700" : "text-white"}>{`[${i + 1}] ${
          s.message
        }`}</p>
      ))}
    </div>
  );
}
