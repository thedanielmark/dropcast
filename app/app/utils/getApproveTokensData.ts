import { encodeFunctionData, erc20Abi } from "viem";
import { CORE_ABI } from "./constants";

export default function getApproveTokensData(
  spender: `0x${string}`,
  amount: string
) {
  return encodeFunctionData({
    abi: erc20Abi,
    functionName: "approve",
    args: [spender, BigInt(amount)],
  });
}
