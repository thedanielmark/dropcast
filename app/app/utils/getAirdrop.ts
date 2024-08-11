import { baseSepolia, createAlchemyPublicRpcClient } from "@account-kit/infra";
import { CORE_ABI, CORE_ADDRESS } from "./constants";

export default async function getAirdrop(airdropId: string): Promise<{
  metadata: any;
  chain: string;
  claimmableAmount: string;
  attestationId: string;
}> {
  const readClient = createAlchemyPublicRpcClient({
    chain: baseSepolia,
    connectionConfig: {
      apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY || "",
    },
  });

  const data: any = await readClient.readContract({
    abi: CORE_ABI,
    functionName: "airdrops",
    address: CORE_ADDRESS,
    args: [BigInt(airdropId)],
  });
  const response = await fetch(data[8]);
  const metadata = await response.json();
  console.log({
    metadata,
    chain: data[0],
    claimmableAmount: data[5],
    attestationId: data[9],
  });
  return {
    metadata,
    chain: data[0].toString(),
    claimmableAmount: data[5].toString(),
    attestationId: data[9],
  };
}
