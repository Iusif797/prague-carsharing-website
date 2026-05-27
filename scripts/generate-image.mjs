import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";

const args = process.argv.slice(2);

if (args.length < 2 || args.includes("--help") || args.includes("-h")) {
  console.log(`Usage: node scripts/generate-image.mjs "<prompt>" <output-path> [options]

Options:
  --width=1024
  --height=1024
  --model=flux
  --seed=12345
  --enhance=true

Free API: Pollinations (no key). Rate limit ~1 req / 15s anonymous.
Example:
  node scripts/generate-image.mjs "luxury BMW sedan" public/fleet/bmw-i4.jpg --width=1600 --height=1000
`);
  process.exit(args.includes("--help") || args.includes("-h") ? 0 : 1);
}

const positional = [];
const options = {
  width: "1024",
  height: "1024",
  model: "flux",
  nologo: "true",
  enhance: "true",
};

for (const arg of args) {
  if (arg.startsWith("--")) {
    const [key, value] = arg.slice(2).split("=");
    if (key && value !== undefined) options[key] = value;
    continue;
  }
  positional.push(arg);
}

const [prompt, outputPath] = positional;

if (!prompt || !outputPath) {
  console.error("Missing prompt or output path.");
  process.exit(1);
}

const params = new URLSearchParams(options);
const url = `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?${params.toString()}`;

console.log(`Generating: ${outputPath}`);
console.log(`Model: ${options.model} · ${options.width}x${options.height}`);

const response = await fetch(url, {
  headers: { Accept: "image/*" },
});

if (!response.ok) {
  console.error(`Failed (${response.status}): ${response.statusText}`);
  process.exit(1);
}

const bytes = Buffer.from(await response.arrayBuffer());
const absoluteOutput = resolve(outputPath);
mkdirSync(dirname(absoluteOutput), { recursive: true });
writeFileSync(absoluteOutput, bytes);

console.log(`Saved ${bytes.length} bytes → ${absoluteOutput}`);
