import { encodeFunctionData } from "viem";
import { CORE_ABI } from "./constants";

export default function getWorldcoinVerificationData(
  address: `0x${string}`,
  worldcoin: any
) {
  return encodeFunctionData({
    abi: CORE_ABI,
    functionName: "verifyWorldProof",
    args: [
      [
        address,
        worldcoin.merkle_root,
        worldcoin.nullifier_hash,
        worldcoin.proofs,
      ],
    ],
  });
}
