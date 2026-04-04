/**
 * One-off: downloads raster/SVG exports from Figma MCP asset URLs into public/images/figma.
 * Re-run after re-exporting from Figma MCP if URLs expire (~7 days) or assets change.
 */
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const outDir = path.join(root, "public", "images", "figma");

/** Fresh URLs from Figma MCP get_design_context (file SNOWBOUND, node 0:3519). */
const map = {
	"home-hero": "https://www.figma.com/api/mcp/asset/e2318ec6-ab5f-4997-a535-f8cea21d12ea",
	"nav-logo": "https://www.figma.com/api/mcp/asset/98d7e9a0-dcbc-41fa-a2ae-6ece04ef0f1d",
	"hero-logo": "https://www.figma.com/api/mcp/asset/0fad2e50-c5a0-4fb9-9f3e-c0a4cb97addd",
	"pj-sil": "https://www.figma.com/api/mcp/asset/76e0c990-7b77-48aa-97fb-84ffcb4393c4",
	"pj-sil-2": "https://www.figma.com/api/mcp/asset/b2784289-eb93-4ca9-bec3-8bcd8e97fff1",
	"pattern-ice": "https://www.figma.com/api/mcp/asset/7f28c32b-180c-4fdc-9c14-2f3256c965b4",
	"tree": "https://www.figma.com/api/mcp/asset/d1c04752-92c9-480a-b4ca-a90aef45c1df",
	"hex-board": "https://www.figma.com/api/mcp/asset/38ce4e5f-2bba-4872-aa14-0b1b2289511b",
	"chevron": "https://www.figma.com/api/mcp/asset/121de263-f544-4b64-aa2d-078e998774cf",
	"tribe-character": "https://www.figma.com/api/mcp/asset/f2230e86-bb32-4bd8-8432-b176b6be7821",
	"parchment": "https://www.figma.com/api/mcp/asset/bbbdb534-15ff-4e38-9dd6-3eb9805c5b34",
	"altar": "https://www.figma.com/api/mcp/asset/d170322a-1861-4ac6-89d4-889e703a2193",
	"campfire": "https://www.figma.com/api/mcp/asset/2a4edb67-a5ca-46ae-8190-ac0c17593ad8",
	"igloo": "https://www.figma.com/api/mcp/asset/6969cdf4-6941-436a-8fa1-2c5a0788474f",
	"player-board": "https://www.figma.com/api/mcp/asset/34c1b31c-d0d9-4ff7-921e-ad663c0e3d12",
	// FINDING PETALS card art (Figma node 517:644); refresh URL via MCP if expired.
	"finding-petals": "https://www.figma.com/api/mcp/asset/e140c7ad-8a19-45b4-b34c-83a974253578",
	"character": "https://www.figma.com/api/mcp/asset/029dd268-945a-4889-af87-60f5d51db68f",
	"event-card": "https://www.figma.com/api/mcp/asset/96ee8395-aea5-4060-bc09-98a03d18410c",
	"footer-logo": "https://www.figma.com/api/mcp/asset/5a662aeb-e803-4b0a-9e0e-6f1c923d78b7",
	"kickstarter-hex": "https://www.figma.com/api/mcp/asset/86d6055c-f870-44cf-beef-3a0bf1aefe8e",
	"hourglass": "https://www.figma.com/api/mcp/asset/2bcbf4e2-72cb-4f77-80ee-4a163f60abe3",
	"tribe-dots": "https://www.figma.com/api/mcp/asset/c98d24ff-ae8e-4cfa-8620-f5c225b7b7a6",
	"about-placeholder": "https://www.figma.com/api/mcp/asset/4fb76758-8b6f-40d5-98f2-b105cba75516",
	"icon-mail": "https://www.figma.com/api/mcp/asset/ac72b3c2-1403-471b-85de-d7d97131a8dc",
	"icon-facebook": "https://www.figma.com/api/mcp/asset/252537f5-946c-49d9-82ba-669be65e27f5",
	"icon-instagram": "https://www.figma.com/api/mcp/asset/b0d89638-ff84-405a-a39b-1fe24437e0da",
};

function extFromType(ct) {
	if (!ct) return "bin";
	if (ct.includes("png")) return "png";
	if (ct.includes("jpeg") || ct.includes("jpg")) return "jpg";
	if (ct.includes("webp")) return "webp";
	if (ct.includes("svg")) return "svg";
	if (ct.includes("gif")) return "gif";
	return "bin";
}

await fs.mkdir(outDir, { recursive: true });

const manifest = {};

for (const [slug, url] of Object.entries(map)) {
	const res = await fetch(url);
	if (!res.ok) {
		console.error(`FAIL ${slug}: ${res.status} ${res.statusText}`);
		process.exitCode = 1;
		continue;
	}
	const ext = extFromType(res.headers.get("content-type"));
	const filename = `${slug}.${ext}`;
	const dest = path.join(outDir, filename);
	const buf = Buffer.from(await res.arrayBuffer());
	await fs.writeFile(dest, buf);
	manifest[slug] = `/images/figma/${filename}`;
	console.log(`OK ${filename} (${buf.length} bytes)`);
}

const manifestPath = path.join(outDir, "manifest.json");
await fs.writeFile(manifestPath, JSON.stringify(manifest, null, 2));
console.log(`Wrote ${manifestPath}`);
