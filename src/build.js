import fs from "fs-extra";
import yaml from "js-yaml";

import { generateCSS } from "./generators/css.js";
import { generateKitty } from "./generators/kitty.js";
import { generateFirefox } from "./generators/firefox.js";

async function loadPalette() {
  const file = await fs.readFile("src/palette/meowllow.yml", "utf8");
  return yaml.load(file);
}

async function main() {
  const palette = await loadPalette();

  console.log("→ Generating CSS...");
  await generateCSS(palette);

  console.log("→ Generating Kitty...");
  await generateKitty(palette);

  console.log("→ Generating Firefox Markdown links...");
  await generateFirefox(palette);

  console.log("✓ All themes generated!");
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
