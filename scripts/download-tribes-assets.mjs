/**
 * Tribes carousel assets: Figma "light CTA 9" component set (599:320), as placed on
 * Desktop - 1 (599:664) — instance 599:747. No full-bleed overlay; cream border in section CSS.
 * https://www.figma.com/design/L4ZUibazk0jRqKlNCE4Jg8/SNOWBOUND?node-id=599-664
 * Run: node scripts/download-tribes-assets.mjs
 */
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(__dirname, "..", "public", "images", "figma", "tribes");

const shared = {
	parchment:
		"https://www.figma.com/api/mcp/asset/1df887f1-47a9-4e35-81c0-d0980bd05033",
	chevron:
		"https://www.figma.com/api/mcp/asset/636948b7-1300-4983-908e-af8308fa5776",
};

const slides = [
	{
		character:
			"https://www.figma.com/api/mcp/asset/bc47adc7-49b3-48c5-aae9-f53d70e97de6",
		border:
			"https://www.figma.com/api/mcp/asset/8244eb8f-222b-4af5-91e4-4c19fcd54b1c",
	},
	{
		character:
			"https://www.figma.com/api/mcp/asset/124e2fd7-fc3a-430f-93e2-1471c48bd893",
		border:
			"https://www.figma.com/api/mcp/asset/11c3071f-b8af-4006-b2f7-77dcdb24e7d7",
	},
	{
		character:
			"https://www.figma.com/api/mcp/asset/e412a86a-53a3-4af6-88f8-a953d3ffdd9f",
		border:
			"https://www.figma.com/api/mcp/asset/62f8004a-cca2-41a3-a128-afee83644511",
	},
	{
		character:
			"https://www.figma.com/api/mcp/asset/d6b7c63d-a695-4ff2-aabf-ad69f7922e4e",
		border:
			"https://www.figma.com/api/mcp/asset/fc6bbd3e-a289-4741-9f61-d60e6c1501f1",
	},
	{
		character:
			"https://www.figma.com/api/mcp/asset/c5cabf4b-6165-421f-b3d1-dccf845e629f",
		border:
			"https://www.figma.com/api/mcp/asset/9e67d481-ddaa-439c-9e3e-a242ae58eea7",
	},
	{
		character:
			"https://www.figma.com/api/mcp/asset/dec60e00-27da-4911-8f92-75fcf24fd7dd",
		border:
			"https://www.figma.com/api/mcp/asset/db201d58-0974-4074-91cb-fbffa89cceef",
	},
];

function extFromType(ct) {
	if (!ct) return "png";
	if (ct.includes("png")) return "png";
	if (ct.includes("jpeg") || ct.includes("jpg")) return "jpg";
	if (ct.includes("webp")) return "webp";
	if (ct.includes("svg")) return "svg";
	return "png";
}

async function fetchToFile(url, dest) {
	const res = await fetch(url);
	if (!res.ok) throw new Error(`${res.status} ${url}`);
	const ext = extFromType(res.headers.get("content-type"));
	const finalDest = dest.replace(/\.(png|jpg|webp|svg)$/i, "") + "." + ext;
	const buf = Buffer.from(await res.arrayBuffer());
	await fs.writeFile(finalDest, buf);
	return finalDest;
}

await fs.mkdir(outDir, { recursive: true });

for (const [key, url] of Object.entries(shared)) {
	const base = path.join(outDir, `shared-${key}`);
	const dest = await fetchToFile(url, base + ".png");
	console.log("OK", path.relative(outDir, dest));
}

for (let i = 0; i < slides.length; i++) {
	const n = String(i + 1).padStart(2, "0");
	const s = slides[i];
	for (const part of ["character", "border"]) {
		const url = s[part];
		const dest = path.join(outDir, `${n}-${part}.png`);
		try {
			const written = await fetchToFile(url, dest);
			console.log("OK", path.relative(outDir, written));
		} catch (e) {
			console.error(`FAIL slide ${n} ${part}:`, e.message);
			process.exitCode = 1;
		}
	}
}

console.log("Done:", outDir);
