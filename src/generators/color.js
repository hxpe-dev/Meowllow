export function hexToRgb(hex) {
  const clean = hex.replace("#", "");
  return {
    r: parseInt(clean.substring(0, 2), 16),
    g: parseInt(clean.substring(2, 4), 16),
    b: parseInt(clean.substring(4, 6), 16)
  };
}

export function rgbToHex({ r, g, b }) {
  const toHex = v => v.toString(16).padStart(2, "0");
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

// Lighten by mixing with white
export function lighten(hex, amount = 0.25) {
  const rgb = hexToRgb(hex);
  const w = 255;

  return rgbToHex({
    r: Math.round(rgb.r + (w - rgb.r) * amount),
    g: Math.round(rgb.g + (w - rgb.g) * amount),
    b: Math.round(rgb.b + (w - rgb.b) * amount)
  });
}
