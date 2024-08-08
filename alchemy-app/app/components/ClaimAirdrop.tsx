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

export default function ClaimAirdrop() {
  const [contractAddress, setContractAddress] = useState("");
  const [tokenAmount, setTokenAmount] = useState<number | "">("");
  const [tokensPerClaim, setTokensPerClaim] = useState<number | "">("");

  const [metadata, setMetadata] = useState<Metadata>({
    title: "",
    description: "",
    tasks: [],
  });
  const [metadataUrl, setMetadataUrl] = useState<string>("");
  return (
    <div>
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
      <div className="flex space-x-8">
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
      <button className="btn btn-primary mt-6" onClick={() => {}}>
        Approve Tokens
      </button>
      <button className="btn btn-primary mt-6" onClick={() => {}}>
        Create Airdrop
      </button>
    </div>
  );
}
