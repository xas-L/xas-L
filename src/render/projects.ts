type Card = {
  slug: string;   // used for filename
  title: string;  // display name
  url: string;
  desc: string;
  tags: string;
};

export const flagshipCards: Card[] = [
  // Top row
  {
    slug: "options-desk-analytics",
    title: "options-desk-analytics",
    url: "https://github.com/xas-L/options-desk-analytics",
    desc: "Options desk analytics toolkit: barrier MC pricer + Black–Scholes IV/Greeks + chain → risk report scripts.",
    tags: "python • derivatives • risk"
  },
  {
    slug: "Systematic-Commodities",
    title: "Systematic-Commodities",
    url: "https://github.com/xas-L/Systematic-Commodities",
    desc: "Prod-style curve RV research for commodity futures: true curves → calendars/butterflies → cost-aware walk-forwards + attribution.",
    tags: "python • trading (commodity futures) • research"
  },
  // Bottom row
  {
  slug: "weather-commodity-forecasting",
  title: "weather-commodity-forecasting",
  url: "https://github.com/xas-L/weather-commodity-forecasting",
  desc: "Subseasonal NWP post-processing pipeline linking ERA5 atmospheric regime features to TTF gas and power price signals.",
  tags: "python • trading (commodities) • weather forecasting"  
  },
  {
    slug: "mm-sim-engine",
    title: "mm-sim-engine",
    url: "https://github.com/xas-L/mm-sim-engine",
    desc: "Market-making sandbox: LOB matching → inventory-aware quoting → regimes → markout/drawdown diagnostics.",
    tags: "c++ • trading (microstructure) • simulation"
  }
];

// Single card SVG (clickability will come from wrapping <img> with <a> in README)
export function projectCardSvg(card: Card) {
  const W = 567;
  const H = 227;

  const titleY = 54;
  const descY = 88;
  const tagsY = H - 22;

  return `
<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${escapeXml(card.title)} card">
  <rect x="0" y="0" width="${W}" height="${H}" rx="16" fill="#0d1117" stroke="#30363d"/>

  <text x="22" y="${titleY}" font-size="22" fill="#58a6ff" font-weight="700"
        font-family="ui-sans-serif, system-ui, -apple-system, Segoe UI">${escapeXml(card.title)}</text>

  ${wrapText(22, descY, W - 44, 14, "#8b949e", card.desc)}

  <text x="22" y="${tagsY}" font-size="13" fill="#c9d1d9" font-weight="600"
        font-family="ui-monospace, SFMono-Regular, Menlo, Consolas">${escapeXml(card.tags)}</text>
</svg>
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
function wrapText(x: number, y: number, maxW: number, size: number, color: string, content: string) {
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
