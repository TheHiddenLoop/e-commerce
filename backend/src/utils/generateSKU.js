export function generateSKU(name, category) {
  const prefix = (category?.split(" ")[0] || "GEN")
    .toUpperCase()
    .slice(0, 3);
  const namePart = (name || "PRD")
    .replace(/[^a-zA-Z0-9]/g, "")
    .toUpperCase()
    .slice(0, 4);
  const unique = Date.now()
    .toString(36)
    .toUpperCase()
    .slice(-4);
  return `${prefix}-${namePart}-${unique}`;
}
