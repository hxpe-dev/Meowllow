export function toCssVars(obj, prefix = "") {
  let out = "";

  for (const [key, value] of Object.entries(obj)) {
    const name = prefix ? `${prefix}-${key}` : key;

    if (typeof value === "object") {
      out += toCssVars(value, name);
    } else {
      out += `  --${name}: ${value};\n`;
    }
  }

  return out;
}