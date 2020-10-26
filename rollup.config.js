import livereload from "rollup-plugin-livereload";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import { terser } from "rollup-plugin-terser";
import cleaner from "rollup-plugin-cleaner";
// import spawnServer from "./spawnServer";

const watch = process.env.ROLLUP_WATCH;

const inputDir = "client-src";
const publicDir = "app/client";
const outputDir = `${publicDir}/js`;
// const serverPath = "server/index.js";

export default {
  input: `${inputDir}/index.js`,
  output: {
    format: "es",
    dir: outputDir,
    sourcemap: true
  },
  plugins: [
    commonjs(),
    resolve({ browser: true }),
    watch && livereload(publicDir),
    // watch && spawnServer(serverPath),
    !watch && cleaner({ targets: [outputDir] }),
    !watch && terser()
  ]
};
