import { mkdirSync, writeFileSync } from "node:fs";
import { headerSvg } from "../src/render/header";
import { flagshipCards, projectCardSvg } from "../src/render/projects";

mkdirSync("dist", { recursive: true });
mkdirSync("dist/cards", { recursive: true });

writeFileSync("dist/header.svg", headerSvg(), "utf8");

for (const c of flagshipCards) {
  writeFileSync(`dist/cards/${c.slug}.svg`, projectCardSvg(c), "utf8");
}

console.log("Wrote dist/header.svg and dist/cards/*.svg");
