import { mkdirSync, writeFileSync } from "node:fs";
import { headerSvg } from "../src/render/header.ts";
import { projectsSvg } from "../src/render/projects.ts";

mkdirSync("dist", { recursive: true });

writeFileSync("dist/header.svg", headerSvg(), "utf8");
writeFileSync("dist/projects.svg", projectsSvg(), "utf8");

console.log("Wrote dist/header.svg and dist/projects.svg");
