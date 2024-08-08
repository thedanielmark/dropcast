import { encodeFunctionData, erc20Abi } from "viem";
import { CORE_ABI } from "./constants";

export default function getCreateAirdropData(
  tokenAddress: `0x${string}`,
  tokenAmount: string,
  tokensPerClaim: string,
  metadata: string
) {
  return encodeFunctionData({
    abi: CORE_ABI,
    functionName: "createAirdrop",
    args: [
      [tokenAddress, BigInt(tokenAmount), BigInt(tokensPerClaim), metadata],
      [BigInt("1"), "0x0429A2Da7884CA14E53142988D5845952fE4DF6a"],
    ],
  });
}
