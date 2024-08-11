/** @jsxImportSource frog/jsx */
import { Frog } from "frog";
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
    description: "Create airdrops like a pro",
    icon: "image",
    imageUrl: "https://dropify.thedanielmark.app/logo.png",
  }
);

devtools(app, { serveStatic });

export const GET = handle(app);
export const POST = handle(app);
