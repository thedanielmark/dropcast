import { useState } from "react";

export default function ContractCalls() {
  const [contractAddress, setContractAddress] = useState("");
  const [tokenAmount, setTokenAmount] = useState(0);
  return (
    <>
      <input
        type="text"
        className="input"
        placeholder="Contract address"
        value={contractAddress}
        onChange={(e) => setContractAddress(e.target.value)}
      />
      <input
        type="number"
        className="input"
        placeholder="Token Amount"
        value={tokenAmount}
        onChange={(e) => setTokenAmount(parseInt(e.target.value))}
      />
      <button className="btn btn-primary mt-6" onClick={() => {}}>
        Create airdrop
      </button>
    </>
  );
}
