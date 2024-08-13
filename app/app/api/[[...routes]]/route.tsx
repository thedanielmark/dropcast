/** eslint-disable react/jsx-key */
/** @jsxImportSource frog/jsx */

import getAirdrop from "@/app/utils/getAirdrop";
import { Button, Frog } from "frog";
import { devtools } from "frog/dev";
import { pinata } from "frog/hubs";
import { handle } from "frog/next";
import { serveStatic } from "frog/serve-static";
import { formatEther } from "viem";

const app = new Frog({
  title: "DropCast",
  assetsPath: "/",
  basePath: "/api",
  hub: pinata(),
  imageOptions: {
    fonts: [{ name: "Krona One", source: "google" }],
  },
});

app.frame("/claim/:id", async (c) => {
  const params = c.req.param();
  const airdropId = params["id"];

  const airdrop = await getAirdrop(airdropId);
  console.log(airdrop);
  return c.res({
    image: (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          backgroundColor: "rgb(39 39 42)",
          fontSize: 32,
          fontWeight: 600,
          color: "white",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
            padding: "20px 20px",
            boxSizing: "border-box",
          }}
        >
          {/* Left Logo and Text */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <img width={80} height={80} src="/logo.png" />
            <div style={{ marginLeft: 20 }}>DropCast</div>
          </div>

          {/* Right Image */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <img width={80} height={80} src="/base.png" />
          </div>
        </div>

        {/* Center Content: Title, Description, and Claim Now */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            flexGrow: 1,
          }}
        >
          <h3>Title</h3>
          <p style={{ margin: "0 0", fontSize: 24 }}>
            {airdrop.metadata.title}
          </p>
          <h3>Description</h3>
          <p style={{ margin: "0 0", fontSize: 24 }}>
            {airdrop.metadata.description}
          </p>
          <h3>Claim Now</h3>
          <p style={{ margin: "0 0", fontSize: 24 }}>
            {formatEther(BigInt(airdrop.claimmableAmount))} ETH
          </p>
        </div>
      </div>
    ),
    intents: [
      <Button.Link
        href={`https://dropcast.thedanielmark.app/claim/${airdropId}`}
      >
        Claim now
      </Button.Link>,
      <Button.Link
        href={`https://base-sepolia.easscan.org/attestation/view/${airdrop.attestationId}`}
      >
        Verify Attestation
      </Button.Link>,
    ],
  });
});

app.composerAction(
  "/composer",
  (c) => {
    return c.res({
      title: "DropCast",
      url: "https://dropcast.thedanielmark.app/create",
    });
  },
  {
    name: "DropCast Composer action",
    description:
      "Cross-chain and sybil-proof airdrop protocol in Farcaster using Composer Actions.",
    icon: "image",
    imageUrl: "https://dropcast.thedanielmark.app/logo.png",
  }
);

devtools(app, { serveStatic });

export const GET = handle(app);
export const POST = handle(app);
