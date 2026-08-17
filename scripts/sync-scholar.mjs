// Pull citation metrics and the profile photo from Google Scholar.
// Run: npm run sync:scholar
import { spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const USER = "jkrVys8AAAAJ";
const PROFILE_URL = `https://scholar.google.com/citations?user=${USER}&hl=en&cstart=0&pagesize=100`;
const ROOT = path.resolve(process.cwd());
const JSON_PATH = path.join(ROOT, "src/data/scholar.json");
const AVATAR_PATH = path.join(ROOT, "public/avatar.jpg");

const HEADERS = {
    "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36",
    Accept: "text/html,application/xhtml+xml",
    "Accept-Language": "en-US,en;q=0.9",
};

function decode(value) {
    return value
        .replace(/&amp;/g, "&")
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'")
        .replace(/&ndash;/g, "-");
}

function parseNumber(value) {
    return Number(String(value).replace(/,/g, ""));
}

function parseScholar(html) {
    if (
        /sorry\/index|unusual traffic|not a robot|gs_captcha/i.test(html) ||
        !html.includes('id="gsc_rsb_st"')
    ) {
        throw new Error("Google Scholar returned a block page or unexpected HTML.");
    }

    const nums = [...html.matchAll(/class="gsc_rsb_std">([\d,]+)</g)].map((match) =>
        parseNumber(match[1]),
    );
    if (nums.length < 6 || !nums[0] || !nums[2]) {
        throw new Error("Could not parse the citation table.");
    }

    const articlesLabel = html.match(
        /id="gsc_a_nn"[^>]*>Articles\s+1(?:&ndash;|–|-)\s*(\d+)/i,
    );
    const rowCount = (html.match(/class="gsc_a_tr"/g) || []).length;
    const articles = articlesLabel ? Number(articlesLabel[1]) : rowCount;

    const ogImage = html.match(/property="og:image" content="([^"]+)"/);
    const imgSrc = html.match(/id="gsc_prf_pup-img"[^>]*src="([^"]+)"/);
    const srcset = html.match(/id="gsc_prf_pup-img"[^>]*srcset="([^"]+)"/);
    let photoUrl = "";
    if (srcset?.[1]) {
        const medium = srcset[1].split(",").find((part) => part.includes("medium_photo"));
        photoUrl = decode((medium || srcset[1].split(",")[0]).trim().split(/\s+/)[0]);
    }
    if (!photoUrl) {
        photoUrl = decode(ogImage?.[1] || imgSrc?.[1] || "");
    }
    if (photoUrl && !photoUrl.includes(USER)) {
        photoUrl = "";
    }

    return {
        citations: nums[0],
        citationsRecent: nums[1],
        hIndex: nums[2],
        i10Index: nums[4],
        articles,
        photoUrl,
    };
}

function curlBin() {
    return process.platform === "win32" ? "curl.exe" : "curl";
}

function curl(url, { binary = false, extraHeaders = {} } = {}) {
    const args = ["-sS", "-L", "--fail", "--max-time", "45", "-A", HEADERS["User-Agent"]];
    const headers = { ...HEADERS, ...extraHeaders };
    for (const [key, value] of Object.entries(headers)) {
        if (key === "User-Agent") continue;
        args.push("-H", `${key}: ${value}`);
    }
    args.push(url);
    const result = spawnSync(curlBin(), args, {
        encoding: binary ? "buffer" : "utf8",
        maxBuffer: 12 * 1024 * 1024,
    });
    if (result.status !== 0) {
        const detail = binary
            ? result.stderr?.toString("utf8")
            : result.stderr || result.error?.message;
        throw new Error(String(detail || `curl exit ${result.status}`).trim());
    }
    return result.stdout;
}

function isJpeg(buffer) {
    return buffer.length > 2000 && buffer[0] === 0xff && buffer[1] === 0xd8;
}

try {
    const html = curl(PROFILE_URL);
    const metrics = parseScholar(html);
    const payload = {
        user: USER,
        url: `https://scholar.google.com/citations?user=${USER}`,
        citations: metrics.citations,
        citationsRecent: metrics.citationsRecent,
        hIndex: metrics.hIndex,
        i10Index: metrics.i10Index,
        articles: metrics.articles,
        updatedAt: new Date().toISOString().slice(0, 10),
    };

    fs.mkdirSync(path.dirname(JSON_PATH), { recursive: true });
    fs.writeFileSync(JSON_PATH, `${JSON.stringify(payload, null, 4)}\n`);
    console.log(
        `Scholar metrics: ${payload.citations} citations, h-index ${payload.hIndex}, ${payload.articles} papers`,
    );

    if (metrics.photoUrl) {
        const photo = curl(metrics.photoUrl, {
            binary: true,
            extraHeaders: {
                Accept: "image/avif,image/webp,image/apng,image/*,*/*;q=0.8",
                Referer: PROFILE_URL,
            },
        });
        if (!isJpeg(photo)) {
            console.warn("Scholar photo was not a usable JPEG; left the existing avatar in place.");
        } else {
            fs.writeFileSync(AVATAR_PATH, photo);
            console.log(`Wrote ${AVATAR_PATH} (${photo.length} bytes)`);
        }
    } else {
        console.warn("No Scholar profile photo found.");
    }
} catch (error) {
    console.warn(`Scholar sync skipped: ${error.message}`);
    process.exit(0);
}
