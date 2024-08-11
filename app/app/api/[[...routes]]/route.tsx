/** @jsxImportSource frog/jsx */
import { Button, Frog } from "frog";
import { devtools } from "frog/dev";
import { handle } from "frog/next";
import { serveStatic } from "frog/serve-static";

const app = new Frog({
  title: "Dropfify",
  assetsPath: "/",
  basePath: "/api",
  imageOptions: {
    fonts: [{ name: "Krona One", source: "google" }],
  },
});
app.composerAction(
  "/composer",
  (c) => {
    return c.res({
      title: "Dropify",
      url: "https://dropify.thedanielmark.app/",
    });
  },
  {
    name: "Dropify Composer action",
    description:
      "Cross-chain and sybil-proof airdrop protocol in Farcaster using Composer Actions.",
    icon: "image",
    imageUrl: "https://dropify.thedanielmark.app/logo.png",
  }
);

app.frame("/airdrop/:id", (c) => {
  const params = c.req.param();
  const airdropId = params["id"];
  return c.res({
    image: <div></div>,
    intents: [
      <Button.Link
        href={`https://dropcast.thedanielmark.app/claim/${airdropId}`}
      >
        Claim Airdrop
      </Button.Link>,
    ],
  });
});

devtools(app, { serveStatic });

export const GET = handle(app);
export const POST = handle(app);
