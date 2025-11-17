import fs from "fs-extra";
import { toCssVars } from "./utils.js";

export async function generateCSS(palette) {
  let css = `/* Meowllow CSS */\n\n`;

  for (const [flavor, values] of Object.entries(palette)) {
    css += `html[data-theme="${flavor}"] {\n`;
    css += toCssVars(values);
    css += `}\n\n`;
  }

  // const outputPath = "flavors.css"; // Used for testing, generates in the root
  const outputPath = "docs/assets/css/flavors.css";
  await fs.ensureFile(outputPath);
  await fs.writeFile(outputPath, css);
}
