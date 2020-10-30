import livereload from "rollup-plugin-livereload";
import resolve from "@rollup/plugin-node-resolve";
import svelteSVG from "rollup-plugin-svelte-svg";
import commonjs from "@rollup/plugin-commonjs";
import { terser } from "rollup-plugin-terser";
import cleaner from "rollup-plugin-cleaner";
import svelte from "rollup-plugin-svelte";
import alias from "@rollup/plugin-alias";

const watch = process.env.ROLLUP_WATCH;

const inputDir = "client-src";
const publicDir = "app/client";
const outputDir = `${publicDir}/js`;

export default {
  input: `${inputDir}/index.js`,
  output: {
    format: "es",
    dir: outputDir,
    sourcemap: true
  },
  plugins: [
    alias({
      entries: [{ find: "@", replacement: `${__dirname}/client-src` }]
    }),
    resolve({ browser: true, dedupe: ["svelte"] }),
    commonjs(),
    svelteSVG(),
    svelte({ dev: watch }),
    watch && livereload(publicDir),
    !watch && cleaner({ targets: [outputDir] }),
    !watch && terser()
  ]
};
