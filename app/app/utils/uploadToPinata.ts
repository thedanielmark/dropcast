import { PinataSDK } from "pinata";

export default async function uploadToPinata(metadata: any) {
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

  return upload.IpfsHash;
}
