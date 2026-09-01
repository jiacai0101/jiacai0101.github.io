// Add author-role / impact-factor / quartile / citation-highlight to first/co-first
// author publications (data from CV). Run: node scripts/enrich-pubs.mjs
import fs from "node:fs";
import path from "node:path";
import yaml from "js-yaml";

const DIR = path.resolve(process.cwd(), "src/content/publications");

// id -> metadata (first/co-first author papers from the CV)
const META = {
    "natprotoc2024-optadmet": { authorRole: "First author", impactFactor: 16, quartile: "JCR Q1" },
    "nar2024-admetlab3": { authorRole: "Co-first author", impactFactor: 13.1, quartile: "JCR Q1", highlight: "Cited 1,300+" },
    "nar2024-ddinter2": { authorRole: "Co-first author", impactFactor: 13.1, quartile: "JCR Q1" },
    "nar2022-admetlab2": { authorRole: "Co-first author", impactFactor: 13.1, quartile: "JCR Q1", highlight: "Cited 3,100+" },
    "nar2024-chemfh": { authorRole: "Co-first author", impactFactor: 13.1, quartile: "JCR Q1" },
    "nar2022-ddinter": { authorRole: "Co-first author", impactFactor: 13.1, quartile: "JCR Q1" },
    "bib2024-chemmort": { authorRole: "First author", impactFactor: 7.7, quartile: "JCR Q1" },
    "bib2025-fewshot-bayesian": { authorRole: "First author", impactFactor: 7.7, quartile: "JCR Q1" },
    "chemsci2025-docking-limits": { authorRole: "Co-first author", impactFactor: 7.4, quartile: "JCR Q1" },
    "bioinfo2022-micer": { authorRole: "First author", impactFactor: 5.4, quartile: "JCR Q1" },
};

function parseFM(raw) {
    const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
    if (!m) return { data: {}, body: raw };
    return { data: yaml.load(m[1]) || {}, body: m[2] };
}
function buildMd(data, body) {
    const fm = yaml.dump(data, { lineWidth: 1000, quotingType: '"', forceQuotes: false }).trimEnd();
    return `---\n${fm}\n---\n\n${(body || "").trim()}\n`;
}

let n = 0;
for (const [id, meta] of Object.entries(META)) {
    const file = path.join(DIR, `${id}.md`);
    if (!fs.existsSync(file)) { console.warn("MISSING:", id); continue; }
    const { data, body } = parseFM(fs.readFileSync(file, "utf8"));
    Object.assign(data, meta);
    fs.writeFileSync(file, buildMd(data, body));
    n++;
}
console.log(`Enriched ${n} publications.`);
