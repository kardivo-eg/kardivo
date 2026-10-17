// Minify the storefront. Run from the project folder before you deploy:   npm install   then   npm run build
// Edit the readable files in src/ (src/app.js, src/styles.css). This script writes the small versions that the site really serves
// (public/app.js, public/styles.css) and puts a fresh ?v=<hash> on their tags in public/index.html, so browsers never show a stale copy.
import { transform } from "esbuild";
import { readFile, writeFile } from "node:fs/promises";
import { createHash } from "node:crypto";

const hash = (s) => createHash("sha256").update(s).digest("hex").slice(0, 8);
const kb = (n) => (n / 1024).toFixed(0) + " KB";
const js = await readFile("src/app.js", "utf8");
const css = await readFile("src/styles.css", "utf8");
const outJs = (await transform(js, { loader: "js", minify: true, target: "es2020", legalComments: "none" })).code;
const outCss = (await transform(css, { loader: "css", minify: true, target: "chrome90", legalComments: "none" })).code;
await writeFile("public/app.js", outJs);
await writeFile("public/styles.css", outCss);

let html = await readFile("public/index.html", "utf8");
html = html
  .replace(/\/app\.js\?v=[\w.-]+/, `/app.js?v=${hash(outJs)}`)
  .replace(/\/styles\.css\?v=[\w.-]+/, `/styles.css?v=${hash(outCss)}`);
await writeFile("public/index.html", html);
console.log(`app.js ${kb(js.length)} -> ${kb(outJs.length)}   styles.css ${kb(css.length)} -> ${kb(outCss.length)}`);
