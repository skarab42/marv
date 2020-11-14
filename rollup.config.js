import livereload from "rollup-plugin-livereload";
import resolve from "@rollup/plugin-node-resolve";
import svelteSVG from "rollup-plugin-svelte-svg";
import commonjs from "@rollup/plugin-commonjs";
import { terser } from "rollup-plugin-terser";
import cleaner from "rollup-plugin-cleaner";
import svelte from "rollup-plugin-svelte";
import alias from "@rollup/plugin-alias";
import css from "rollup-plugin-css-only";

const watch = process.env.ROLLUP_WATCH;

const clientDir = "client-src";
const overlayDir = "overlay-src";
const publicDir = "app/client";
const jsDir = `${publicDir}/js`;
const cssDir = `${publicDir}/css`;

export default {
  input: [`${clientDir}/index.js`, `${overlayDir}/overlay.js`],
  output: {
    format: "es",
    dir: jsDir,
    sourcemap: true,
  },
  plugins: [
    alias({
      entries: [{ find: "@", replacement: `${__dirname}/${clientDir}` }],
    }),
    resolve({ browser: true, dedupe: ["svelte"] }),
    commonjs(),
    svelteSVG(),
    svelte({ dev: watch }),
    css({ output: `${cssDir}/index.css` }),
    watch && livereload(publicDir),
    !watch && cleaner({ targets: [jsDir] }),
    !watch && terser(),
  ],
};
