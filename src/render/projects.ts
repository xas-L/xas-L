type Card = {
  title: string;
  url: string;
  desc: string;
  tags: string;
};

const cards: Card[] = [
  // Top row
  {
    title: "options-desk-analytics",
    url: "https://github.com/xas-L/options-desk-analytics",
    desc: "Options desk analytics toolkit: barrier MC pricer + Black–Scholes IV/Greeks + chain → risk report scripts.",
    tags: "python • derivatives • risk"
  },
  {
    title: "Systematic-Commodities",
    url: "https://github.com/xas-L/Systematic-Commodities",
    desc: "Prod-style curve RV research for commodity futures: true curves → calendars/butterflies → cost-aware walk-forwards + attribution.",
    tags: "research • futures • portfolio"
  },
  // Bottom row
  {
    title: "tinyML",
    url: "https://github.com/xas-L/tinyML",
    desc: "C++ CPU NN library: 2D tensors + arena allocators + DAG autograd + SGD/Adam + MNIST loader + save/load weights.",
    tags: "c++ • autograd • ml"
  },
  {
    title: "mm-sim-engine",
    url: "https://github.com/xas-L/mm-sim-engine",
    desc: "Market-making sandbox: LOB matching → inventory-aware quoting → regimes → markout/drawdown diagnostics.",
    tags: "c++ • microstructure • sim"
  }
];

export function projectsSvg() {
  const W = 1200;
  const H = 520;

  const pad = 24;
  const gap = 18;

  const cardW = (W - 2 * pad - gap) / 2;
  const cardH = (H - 2 * pad - gap) / 2;

  const slots = [
    { x: pad, y: pad },                              // top-left
    { x: pad + cardW + gap, y: pad },                // top-right
    { x: pad, y: pad + cardH + gap },                // bottom-left
    { x: pad + cardW + gap, y: pad + cardH + gap }   // bottom-right
  ];

  return `
<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Flagship projects">
  <rect x="0" y="0" width="${W}" height="${H}" rx="18" fill="#0b0f14" stroke="#30363d"/>
  ${cards.map((c, i) => card(slots[i].x, slots[i].y, cardW, cardH, c)).join("\n")}
</svg>
`.trim();
}

function card(x: number, y: number, w: number, h: number, c: Card) {
  const titleY = y + 48;
  const descY = y + 82;
  const tagsY = y + h - 22;

  return `
<a href="${c.url}">
  <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="16" fill="#0d1117" stroke="#30363d"/>
  <text x="${x + 22}" y="${titleY}" font-size="22" fill="#58a6ff" font-weight="700"
        font-family="ui-sans-serif, system-ui, -apple-system, Segoe UI">${escapeXml(c.title)}</text>

  ${wrapText(x + 22, descY, w - 44, 14, "#8b949e", c.desc)}

  <text x="${x + 22}" y="${tagsY}" font-size="13" fill="#c9d1d9" font-weight="600"
        font-family="ui-monospace, SFMono-Regular, Menlo, Consolas">${escapeXml(c.tags)}</text>
</a>
`.trim();
}

function escapeXml(s: string) {
  return s
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

// Tiny SVG word-wrap: crude width estimate + tspans.
function wrapText(
  x: number,
  y: number,
  maxW: number,
  size: number,
  color: string,
  content: string
) {
  const words = content.split(/\s+/);
  const lines: string[] = [];
  let line: string[] = [];

  const est = (txt: string) => txt.length * size * 0.55;

  for (const w of words) {
    const next = [...line, w].join(" ");
    if (est(next) > maxW && line.length) {
      lines.push(line.join(" "));
      line = [w];
    } else {
      line.push(w);
    }
  }
  if (line.length) lines.push(line.join(" "));

  const fam = "ui-sans-serif, system-ui, -apple-system, Segoe UI";

  return `
<text x="${x}" y="${y}" font-size="${size}" fill="${color}" font-family="${fam}">
  ${lines.slice(0, 5).map((ln, i) =>
    `<tspan x="${x}" dy="${i === 0 ? 0 : size + 8}">${escapeXml(ln)}</tspan>`
  ).join("")}
</text>
`.trim();
}
