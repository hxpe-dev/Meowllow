// meowllow-rofi-generator.js
// Preview image (local path): /mnt/data/c48bb1d1-9712-4e76-a225-c18ef9ea2271.png

import fs from "fs-extra";
import path from "path";

/**
 * Generate Rofi themes from a Meowllow palette.
 * Produces: ../rofi/meowllow-<flavor>.rasi
 *
 * This generator uses a Catppuccin-like variable block and a complete,
 * Rasi-valid body that mirrors Catppuccin's structure.
 */
export async function generateRofiThemes(palette) {
  const outDir = path.join("../rofi");
  const themesOutDir = path.join("../rofi/themes");
  await fs.ensureDir(outDir);
  await fs.ensureDir(themesOutDir);

  const themeBasePath = path.join(outDir, "meowllow-base.rasi");
  await fs.writeFile(themeBasePath, buildBaseTheme(), "utf8");
  console.log(`✓ Generated ${themeBasePath}`)

  for (const [flavor, colors] of Object.entries(palette)) {
    const rasi = buildRofiTheme(flavor, colors);
    const filePath = path.join(themesOutDir, `meowllow-${flavor}.rasi`);
    await fs.writeFile(filePath, rasi, "utf8");
    console.log(`✓ Generated ${filePath}`);
  }
}

function buildBaseTheme() {
  const body = `
// @import "meowllow-purr"
// @import "meowllow-slumber"
// @import "meowllow-sunbeam"

* {
  selected-active-foreground:  @base;
  lightfg:                     @text;
  separatorcolor:              @overlay0;
  urgent-foreground:           @red;
  alternate-urgent-background: @surface0;
  lightbg:                     @mantle;
  background-color:            transparent;
  border-color:                @overlay0;
  normal-background:           @base;
  selected-urgent-background:  @red;
  alternate-active-background: @mantle;
  spacing:                     2;
  alternate-normal-foreground: @overlay0;
  urgent-background:           @base;
  selected-normal-foreground:  @blue;
  active-foreground:           @blue;
  background:                  @base;
  selected-active-background:  @blue;
  active-background:           @base;
  selected-normal-background:  @surface1;
  alternate-normal-background: @mantle;
  foreground:                  @text;
  selected-urgent-foreground:  @base;
  normal-foreground:           @overlay0;
  alternate-urgent-foreground: @red;
  alternate-active-foreground: @blue;
}

/* Elements & states */
element {
  padding: 1px;
  cursor: pointer;
  spacing: 5px;
  border: 0;
}

element normal.normal {
  background-color: @normal-background;
  text-color:       @normal-foreground;
}

element normal.urgent {
  background-color: @urgent-background;
  text-color:       @urgent-foreground;
}

element normal.active {
  background-color: @active-background;
  text-color:       @active-foreground;
}

element selected.normal {
  background-color: @selected-normal-background;
  text-color:       @selected-normal-foreground;
}

element selected.urgent {
  background-color: @selected-urgent-background;
  text-color:       @selected-urgent-foreground;
}

element selected.active {
  background-color: @selected-active-background;
  text-color:       @selected-active-foreground;
}

element alternate.normal {
  background-color: @alternate-normal-background;
  text-color:       @alternate-normal-foreground;
}

element alternate.urgent {
  background-color: @alternate-urgent-background;
  text-color:       @alternate-urgent-foreground;
}

element alternate.active {
  background-color: @alternate-active-background;
  text-color:       @alternate-active-foreground;
}

element-text {
  background-color: transparent;
  cursor: inherit;
  highlight: inherit;
  text-color: inherit;
}

element-icon {
  background-color: transparent;
  size: 1.0000em;
  cursor: inherit;
  text-color: inherit;
}

/* Window & boxes */
window {
  padding: 5;
  background-color: @background;
  border: 1;
  border-color: @border-color;
  border-radius: 6px;
}

mainbox {
  padding: 0;
  border: 0;
}

message {
  padding: 1px;
  border-color: @separatorcolor;
  border: 2px dash 0px 0px;
}

textbox {
  text-color: @foreground;
}

listview {
  padding: 2px 0px 0px;
  scrollbar: true;
  border-color: @separatorcolor;
  spacing: 2px;
  fixed-height: 0;
  border: 2px dash 0px 0px;
}

scrollbar {
  width: 4px;
  padding: 0;
  handle-width: 8px;
  border: 0;
  handle-color: @normal-foreground;
}

sidebar {
  border-color: @separatorcolor;
  border: 2px dash 0px 0px;
}

button {
  cursor: pointer;
  spacing: 0;
  text-color: @normal-foreground;
}

button selected {
  background-color: @selected-normal-background;
  text-color: @selected-normal-foreground;
}

num-filtered-rows {
  expand: false;
  text-color: Gray;
}

num-rows {
  expand: false;
  text-color: Gray;
}

textbox-num-sep {
  expand: false;
  str: "/";
  text-color: Gray;
}

inputbar {
  padding: 1px;
  spacing: 0px;
  text-color: @normal-foreground;
  children: [ "prompt","textbox-prompt-colon","entry","num-filtered-rows","textbox-num-sep","num-rows","case-indicator" ];
}

case-indicator {
  spacing: 0;
  text-color: @normal-foreground;
}

entry {
  text-color: @normal-foreground;
  cursor: text;
  spacing: 0;
  placeholder-color: Gray;
  placeholder: "Type to filter";
}

prompt {
  spacing: 0;
  text-color: @normal-foreground;
}

textbox-prompt-colon {
  margin: 0px 0.3000em 0.0000em 0.0000em;
  expand: false;
  str: ":";
  text-color: inherit;
}
`.trim();

  return body;
}

/* ---------------------
   Theme builder
   --------------------- */
function buildRofiTheme(flavor, c) {
  // Basic groups
  const bg = c.bg || {};
  const text = c.text || {};
  const acc = c.accents || {};

  const isLightTheme = isLight(bg.base || bg.crust || "#000000");

  // Map Meowllow colors to Catppuccin variable names.
  // These mappings are opinionated but sensible; adjust if you prefer different pairings.
  const map = {
    // accents -> catppuccin names
    rosewater: acc.peach || acc.pink || "#f4dbd6",
    flamingo: acc.peach || acc.ember || "#f0c6c6",
    pink: acc.pink || acc.peach || "#f5bde6",
    mauve: acc.lilac || acc.peri || "#c6a0f6",
    red: acc.ember || "#ed8796",
    maroon: acc.ember || "#ee99a0",
    peach: acc.peach || "#f5a97f",
    yellow: acc.cream || acc.honey || "#eed49f",
    green: acc.mint || acc.leaflight || "#a6da95",
    teal: acc.aqua || "#8bd5ca",
    sky: acc.skybell || acc.peri || "#91d7e3",
    sapphire: acc.peri || acc.skybell || "#7dc4e4",
    blue: acc.peri || acc.skybell || "#8aadf4",
    lavender: acc.lilac || "#b7bdf8",

    // primary text and surfaces
    text: text.main || "#cad3f5",
    subtext1: text.sub0 || text.sub1 || "#b8c0e0",
    subtext0: text.sub1 || text.overlay0 || "#a5adcb",
    overlay2: text.overlay0 || "#939ab7",
    overlay1: text.overlay0 || "#8087a2",
    overlay0: text.overlay0 || "#6e738d",
    surface2: bg.surface2 || "#5b6078",
    surface1: bg.surface1 || "#494d64",
    surface0: bg.surface0 || "#363a4f",
    base: bg.base || "#24273a",
    mantle: bg.mantle || "#1e2030",
    crust: bg.crust || "#181926",
  };

  // If light theme, prefer lighter assignments for some catppuccin keys.
  if (isLightTheme) {
    map.base = bg.base || "#fdfbf8";
    map.mantle = bg.mantle || "#f9f6f2";
    map.crust = bg.crust || "#f8f4f0";
    // swap text -> darker
    map.text = text.main || "#423F3A";
    map.subtext1 = text.sub0 || "#6D6863";
    map.subtext0 = text.sub1 || "#8E8982";
  }

  // Build the Catppuccin-style variable block
  const varBlock = [
    "* {",
    `  rosewater: ${map.rosewater};`,
    `  flamingo: ${map.flamingo};`,
    `  pink: ${map.pink};`,
    `  mauve: ${map.mauve};`,
    `  red: ${map.red};`,
    `  maroon: ${map.maroon};`,
    `  peach: ${map.peach};`,
    `  yellow: ${map.yellow};`,
    `  green: ${map.green};`,
    `  teal: ${map.teal};`,
    `  sky: ${map.sky};`,
    `  sapphire: ${map.sapphire};`,
    `  blue: ${map.blue};`,
    `  lavender: ${map.lavender};`,

    `  text: ${map.text};`,
    `  subtext1: ${map.subtext1};`,
    `  subtext0: ${map.subtext0};`,
    `  overlay2: ${map.overlay2};`,
    `  overlay1: ${map.overlay1};`,
    `  overlay0: ${map.overlay0};`,

    `  surface2: ${map.surface2};`,
    `  surface1: ${map.surface1};`,
    `  surface0: ${map.surface0};`,
    `  base: ${map.base};`,
    `  mantle: ${map.mantle};`,
    `  crust: ${map.crust};`,
    "}"
  ].join("\n");

  // Compose final content
  const header = `/* Meowllow ${capitalize(flavor)} — catppuccin-structure */\n\n`;
  return header + varBlock + "\n";
}

/* ---------------------
   Helpers
   --------------------- */
function isLight(hex) {
  const { r, g, b } = hexToRgb(hex);
  const yiq = (r * 299 + g * 587 + b * 114) / 1000;
  return yiq >= 128;
}

function hexToRgb(hex) {
  const h = (hex || "#000000").replace("#", "");
  const r = parseInt(h.substring(0, 2), 16) || 0;
  const g = parseInt(h.substring(2, 4), 16) || 0;
  const b = parseInt(h.substring(4, 6), 16) || 0;
  return { r, g, b };
}

function capitalize(s) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}
