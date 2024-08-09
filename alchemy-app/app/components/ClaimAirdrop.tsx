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
  useAccount,
  useSendUserOperation,
  useSmartAccountClient,
  useUser,
} from "@account-kit/react";
import { CORE_ABI, CORE_ADDRESS } from "../utils/constants";
import { decodeAbiParameters } from "viem";
import getWorldcoinVerificationData from "../utils/getWorldcoinVerificationData";
export default function ClaimAirdrop() {
  const user = useUser();
  const [airdropId, setAirdrpId] = useState("");
  const [status, setStatus] = useState<Status[]>([]);
  const { client } = useSmartAccountClient({ type: "LightAccount" });
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
      sendUserOperation({
        uo: {
          target: CORE_ADDRESS as `0x${string}`,
          data: data,
          value: BigInt("0"),
        },
      });
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
      <button
        className="block mx-auto btn btn-primary mt-6"
        onClick={async () => {
          const data = await client?.readContract({
            abi: CORE_ABI,
            address: CORE_ADDRESS,
            functionName: "airdrops",
            args: [airdropId],
          });

          console.log(data);
        }}
      >
        Fetch Airdrop
      </button>
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
            onError={(error) => {
              console.log(error);
            }}
            signal={user.address}
            verification_level={VerificationLevel.Orb}
          >
            {({ open }) => (
              // This is the button that will open the IDKit modal
              <button onClick={open}>Verify with World ID</button>
            )}
          </IDKitWidget>
        )
      )}
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
