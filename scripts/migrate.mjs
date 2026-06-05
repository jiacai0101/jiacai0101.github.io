// One-off migration: TermHub (content/) -> academic-portfolio-astro (src/content/)
// Bilingual: EN -> collection root, ZH -> collection/zh/. Run: node scripts/migrate.mjs
import fs from "node:fs";
import path from "node:path";
import yaml from "js-yaml";

const ROOT = process.cwd();
const OLD = path.resolve(ROOT, "../academic-home/content");
const NEW = path.resolve(ROOT, "src/content");
const PUBLIC = path.resolve(ROOT, "public");
const AUTHOR = "Jiacai Yi";

const MONTHS = { jan: "01", feb: "02", mar: "03", apr: "04", may: "05", jun: "06", jul: "07", aug: "08", sep: "09", oct: "10", nov: "11", dec: "12" };

const pad = (s) => String(s).padStart(2, "0");
function toISO(val, day = "01") {
  if (val == null) return undefined;
  if (val instanceof Date) return val.toISOString().slice(0, 10);
  const s = String(val).trim();
  const iso = s.match(/^(\d{4})-(\d{1,2})(?:-(\d{1,2}))?/);
  if (iso) return `${iso[1]}-${pad(iso[2])}-${pad(iso[3] || day)}`;
  const mon = s.match(/^([A-Za-z]{3})[a-z]*\s+(\d{4})$/);
  if (mon) return `${mon[2]}-${MONTHS[mon[1].toLowerCase()] || "01"}-${day}`;
  const yr = s.match(/^(\d{4})$/);
  if (yr) return `${yr[1]}-01-${day}`;
  return s;
}
function parseFM(raw) {
  const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!m) return { data: {}, body: raw };
  return { data: yaml.load(m[1]) || {}, body: m[2] };
}
function buildMd(data, body) {
  const clean = Object.fromEntries(Object.entries(data).filter(([, v]) => v !== undefined && v !== null && !(Array.isArray(v) && v.length === 0)));
  const fm = yaml.dump(clean, { lineWidth: 1000, quotingType: '"', forceQuotes: false }).trimEnd();
  return `---\n${fm}\n---\n\n${(body || "").trim()}\n`;
}
function descFromBody(body, n = 220) {
  const text = (body || "").replace(/```[\s\S]*?```/g, " ").split(/\r?\n/).map((l) => l.trim())
    .filter((l) => l && !l.startsWith("#") && !l.startsWith("![") && !l.startsWith("---")).join(" ")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, "").replace(/\[([^\]]+)\]\([^)]*\)/g, "$1").replace(/[*_`>]/g, "").replace(/\s+/g, " ").trim();
  return text.length <= n ? text : text.slice(0, n).replace(/\s+\S*$/, "") + "…";
}
const mdFiles = (dir) => (fs.existsSync(dir) ? fs.readdirSync(dir).filter((f) => f.endsWith(".md")) : []);
function clear(dir) {
  fs.mkdirSync(dir, { recursive: true });
  for (const f of fs.readdirSync(dir, { withFileTypes: true })) {
    if (f.isDirectory()) { fs.rmSync(path.join(dir, f.name), { recursive: true, force: true }); }
    else if (f.name.endsWith(".md")) fs.unlinkSync(path.join(dir, f.name));
  }
}
function copyDir(src, dst) {
  if (!fs.existsSync(src)) return;
  fs.mkdirSync(dst, { recursive: true });
  for (const e of fs.readdirSync(src, { withFileTypes: true })) {
    const s = path.join(src, e.name), d = path.join(dst, e.name);
    if (e.isDirectory()) copyDir(s, d); else fs.copyFileSync(s, d);
  }
}

const counts = {};
// Clear all collection dirs (incl. zh subdirs)
for (const c of ["publications", "projects", "posts", "talks"]) clear(path.join(NEW, c));

function migrateLocale(srcRoot, sub) {
  const outDir = (c) => { const d = path.join(NEW, c, sub); fs.mkdirSync(d, { recursive: true }); return d; };
  const tag = sub || "en";

  // Publications
  let n = 0; const pubDir = outDir("publications");
  for (const f of mdFiles(path.join(srcRoot, "publications"))) {
    const { data, body } = parseFM(fs.readFileSync(path.join(srcRoot, "publications", f), "utf8"));
    const links = data.links || {};
    fs.writeFileSync(path.join(pubDir, f), buildMd({
      title: String(data.title || "").replace(/\s+/g, " ").trim(),
      author: Array.isArray(data.authors) ? data.authors.join(", ") : data.author,
      date: toISO(data.year && data.month ? `${data.month} ${data.year}` : data.year),
      journal: data.venue,
      external_url: links.paper || links.projectPage || links.code || Object.values(links)[0],
      image: data.featuredImage,
      description: descFromBody(body),
      tags: data.keywords || data.tags,
    }, body)); n++;
  }
  counts[`publications:${tag}`] = n;

  // Projects
  n = 0; const projDir = outDir("projects");
  for (const f of mdFiles(path.join(srcRoot, "projects"))) {
    const { data, body } = parseFM(fs.readFileSync(path.join(srcRoot, "projects", f), "utf8"));
    let bodyOut = body;
    const extra = Array.isArray(data.extraLinks) ? data.extraLinks.filter((l) => l && l.url) : [];
    if (extra.length) bodyOut = `${body.trim()}\n\n**Links:** ${extra.map((l) => `[${l.label || "Link"}](${l.url})`).join(" · ")}`;
    fs.writeFileSync(path.join(projDir, f), buildMd({
      title: data.title, description: descFromBody(body), external_url: data.link, image: data.image, tags: data.tags,
    }, bodyOut)); n++;
  }
  counts[`projects:${tag}`] = n;

  // Posts (articles)
  n = 0; const postDir = outDir("posts");
  for (const f of mdFiles(path.join(srcRoot, "articles"))) {
    const { data, body } = parseFM(fs.readFileSync(path.join(srcRoot, "articles", f), "utf8"));
    fs.writeFileSync(path.join(postDir, f), buildMd({
      title: data.title, date: toISO(data.date), description: data.summary || descFromBody(body), author: AUTHOR, tags: data.tags,
    }, body)); n++;
  }
  counts[`posts:${tag}`] = n;

  // Talks (json)
  n = 0; const talkDir = outDir("talks"); const talksFile = path.join(srcRoot, "talks.json");
  if (fs.existsSync(talksFile)) {
    for (const t of JSON.parse(fs.readFileSync(talksFile, "utf8"))) {
      fs.writeFileSync(path.join(talkDir, `${t.id}.md`), buildMd({
        title: t.title, date: toISO(t.date), event: t.event, external_url: t.url, description: t.description, tags: t.type ? [t.type] : undefined,
      }, [t.location ? `**Location:** ${t.location}` : "", t.description || ""].filter(Boolean).join("\n\n"))); n++;
    }
  }
  counts[`talks:${tag}`] = n;
}

// CV (en cv.md + zh cv-zh.md)
function migrateCV(srcRoot, outName, title) {
  const exp = fs.existsSync(path.join(srcRoot, "experience.json")) ? JSON.parse(fs.readFileSync(path.join(srcRoot, "experience.json"), "utf8")) : {};
  const awards = fs.existsSync(path.join(srcRoot, "awards.json")) ? JSON.parse(fs.readFileSync(path.join(srcRoot, "awards.json"), "utf8")) : [];
  const about = parseFM(fs.readFileSync(path.join(srcRoot, "about.md"), "utf8")).data;
  const phases = Array.isArray(about.journeyPhases) ? about.journeyPhases : [];
  const experience = (exp.timeline || []).map((t) => ({
    role: t.title, institution: t.company,
    period: `${(t.start || "").slice(0, 7)}${t.end ? " – " + t.end.slice(0, 7) : " – Present"}`,
    description: t.summary,
  }));
  const education = phases.filter((p) => /M\.S\.|Ph\.D\.|B\.S\.|Bachelor|Master|硕士|博士|学士/i.test(p.title))
    .map((p) => ({ degree: p.title, institution: p.org, period: p.period, description: p.description }));
  const awardsMd = awards.map((a) => `- **${a.title}** — ${a.org} *(${a.date})*`).join("\n");
  const reviewingMd = (exp.reviewing || []).map((r) => `- ${r.venue} — ${r.role} *(${r.year})*`).join("\n");
  fs.writeFileSync(path.join(NEW, outName), buildMd({ name: AUTHOR, title, experience, education }, `## Awards & Honors\n\n${awardsMd}\n\n## Professional Service\n\n${reviewingMd}\n`));
  counts[outName] = `${experience.length} exp / ${education.length} edu / ${awards.length} awards`;
}

// ZH bio (bio-zh.md) from zh/about.md body
function migrateBioZh() {
  const about = parseFM(fs.readFileSync(path.join(OLD, "zh/about.md"), "utf8"));
  fs.writeFileSync(path.join(NEW, "bio-zh.md"), buildMd({
    name: "蚁佳才",
    avatar: "avatar.jpg",
    shortBio: "博士后研究员，专注 AI 药物设计与生物医学 AI 平台。",
    institution: "香港浸会大学中医药学院",
  }, about.body));
  counts["bio-zh"] = "ok";
}

migrateLocale(OLD, "");
migrateLocale(path.join(OLD, "zh"), "zh");
migrateCV(OLD, "cv.md", "Postdoctoral Researcher, Hong Kong Baptist University");
migrateCV(path.join(OLD, "zh"), "cv-zh.md", "香港浸会大学中医药学院 博士后研究员");
migrateBioZh();
clear(path.join(NEW, "teaching"));
copyDir(path.join(OLD, "images"), path.join(PUBLIC, "images"));

console.log("Migration complete:", JSON.stringify(counts, null, 2));
