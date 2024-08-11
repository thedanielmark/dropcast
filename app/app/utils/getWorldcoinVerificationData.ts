import { encodeFunctionData, hexToBigInt } from "viem";
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
        hexToBigInt(worldcoin.merkle_root),
        hexToBigInt(worldcoin.nullifier_hash),
        worldcoin.proofs,
      ],
    ],
  });
}
