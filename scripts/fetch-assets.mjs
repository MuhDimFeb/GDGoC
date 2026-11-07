// Downloads every static asset used by the Landing and About designs from Figma
// into public/assets. The Figma MCP asset URLs expire after 7 days (generated on
// 5 Nov 2026) – if a download fails with 403/404, re-export them from Figma
// (get_design_context / download_assets) and replace the URLs below.
//
//   npm run assets
import { mkdir, writeFile, access } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const BASE = "https://www.figma.com/api/mcp/asset/";
const out = join(dirname(fileURLToPath(import.meta.url)), "..", "public", "assets");

// [local file name, Figma asset id + extension]
const ASSETS = [
  // Shared chrome
  ["logo-mark.png", "cfceef15-32d8-468d-8d36-7155b441bc22.png"],
  ["logo-mark-footer.png", "3d9ed700-824f-4063-80c2-d2c4672de6ec.png"],
  ["logo-text.svg", "6052a869-23c3-4182-aa47-bf3c5d393d6a.svg"],
  ["logo-text-footer.svg", "7ddfebbb-f29d-4eeb-ac5b-43090ef0919f.svg"],
  ["arrow-white.svg", "95472ec2-eceb-4f87-84bc-fd2cdc416116.svg"],
  ["arrow-blue.svg", "314d1e2a-51f6-42cf-9168-4bfc1ee368b4.svg"],
  ["marker.svg", "d97120b3-eb31-43df-988a-3692c9564d6e.svg"],
  ["instagram.svg", "53599980-e3ec-48ea-ad5b-505931746fdd.svg"],
  ["youtube.svg", "d06b8e1f-870e-4aca-9b27-ba865680cb86.svg"],
  ["warm-glow.svg", "b7a480e3-2d53-4f10-b6c8-b474ee4af15e.svg"],
  ["blue-glow.svg", "a0a8dd2d-96bb-473c-aa24-8b15e276cda7.svg"],

  // Landing – hero
  ["community-colors.svg", "d8dcb335-3a14-46c9-89d5-dfa356a22630.svg"],
  ["status-marker.svg", "137b5963-dadf-4c6d-bb5d-8637a1d5d55e.svg"],
  ["hero-research-1.svg", "405bf200-2dd9-4277-a5ba-f43fa17d0e9f.svg"],
  ["hero-research-2.svg", "a721aeb7-6cfd-46d8-bec1-26420e7597a8.svg"],
  ["hero-research-3.svg", "4a2a82e0-f982-4e66-b018-f6378e083d32.svg"],
  ["hero-dev-1.svg", "cf3ed941-4e8f-4a92-8361-3db0116a2f7c.svg"],
  ["hero-dev-2.svg", "d05c1a62-9a93-491f-82bd-402fac9ae95b.svg"],
  ["hero-dev-3.svg", "841d7716-0063-47a3-839d-ad3ff6e4d25d.svg"],

  // Landing – track cards
  ["track-research-1.svg", "385a4ef3-8be3-4232-ad1a-b9bc0750977d.svg"],
  ["track-research-2.svg", "7e0d5287-22d6-44db-a187-923a22ce20d6.svg"],
  ["track-research-3.svg", "9a884383-4f39-4cc1-9961-5ec84437076a.svg"],
  ["track-design-1.svg", "09d200b6-d8c7-47e9-86c9-bc66bfa63a81.svg"],
  ["track-design-2.svg", "02d35cdc-8b41-4b99-89f8-61b824bfb844.svg"],
  ["track-design-3.svg", "810460c4-d028-41fd-ad77-853632bb5f26.svg"],
  ["track-dev-1.svg", "5d4120d5-48a4-4649-8f34-e1f0395114b5.svg"],
  ["track-dev-2.svg", "b692370e-e8bd-46f0-99d1-e0a5574f4325.svg"],
  ["track-dev-3.svg", "9419fa09-6857-4941-bdde-091076f3f355.svg"],

  // Landing – formats, project preview, belonging, FAQ
  ["format-1.svg", "b043cfb7-ecaa-40d7-9d4d-fc34183450ef.svg"],
  ["format-2.svg", "3e48ef62-f875-4986-9f0e-243994191f2f.svg"],
  ["format-3.svg", "ad71a593-6eaa-4a6a-a79e-125fcc5c4340.svg"],
  ["browser-chrome.svg", "533c4db1-27bb-4961-94a7-c84d0b1e0c33.svg"],
  ["community-spark.svg", "60a2d6c7-a148-45f5-a8b2-929de8d20203.svg"],
  ["disclosure.svg", "66a9daa1-fb10-4947-894d-0f0676d02697.svg"],

  // About
  ["about-gdgoc-mark.png", "8abbc823-165c-4983-ad8b-0891b44cd366.png"],
  ["value-icon-1.svg", "d80290a6-7b47-4437-b474-6247795d8eb5.svg"],
  ["value-icon-2.svg", "ea996f2f-4e25-42f0-9f5a-98c6e551b369.svg"],
  ["value-icon-3.svg", "af8fb0fe-02e5-40c7-9024-2bbd3319f387.svg"],
  ["value-icon-4.svg", "ae0808ba-06e5-4f6e-ad0d-cb1c8b3ebcd2.svg"],
  ["commitment-spark.svg", "084f5754-71eb-4efc-b95b-8b34ffa0a149.svg"],
];

await mkdir(out, { recursive: true });

const exists = (path) => access(path).then(() => true, () => false);
let failed = 0;

for (const [name, id] of ASSETS) {
  const target = join(out, name);
  if (await exists(target)) {
    console.log(`skip     ${name}`);
    continue;
  }
  try {
    const res = await fetch(BASE + id, { redirect: "follow" });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const bytes = Buffer.from(await res.arrayBuffer());
    if (bytes.length === 0) throw new Error("empty file");
    await writeFile(target, bytes);
    console.log(`ok       ${name} (${bytes.length} bytes)`);
  } catch (error) {
    failed += 1;
    console.error(`FAILED   ${name}: ${error.message}`);
  }
}

if (failed > 0) {
  console.error(`\n${failed} asset(s) failed – the Figma links may have expired (see header comment).`);
  process.exit(1);
}
console.log("\nAll assets downloaded to public/assets.");
