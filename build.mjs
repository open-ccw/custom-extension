import * as esbuild from "esbuild";

await esbuild.build({
  entryPoints: ["./entry/index"],
  bundle: true,
  outdir: "dist",
  loader: {
    ".svg": "base64",
    ".png": "base64",
  },
  minify: true,
  format: "esm",
  splitting: true,
});
