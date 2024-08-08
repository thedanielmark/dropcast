import { useState } from "react";

interface Status {
  error: boolean;
  message: string;
}

export default function ClaimAirdrop() {
  const [airdropId, setAirdrpId] = useState("");
  const [contractAddress, setContractAddress] = useState("");
  const [tokenAmount, setTokenAmount] = useState<number | "">("");
  const [tokensPerClaim, setTokensPerClaim] = useState<number | "">("");

  const [metadataUrl, setMetadataUrl] = useState<string>("");
  const [status, setStatus] = useState<Status>({
    error: false,
    message: "",
  });
  return (
    <div>
      <p className="text-2xl font-semibold pb-12">Claim Airdrop</p>
      <p>Airdrop Id</p>
      <input
        type="string"
        className="input"
        value={airdropId}
        onChange={(e) => setAirdrpId(e.target.value)}
      />
      <button className="block mx-auto btn btn-primary mt-6" onClick={() => {}}>
        Fetch Airdrop
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
