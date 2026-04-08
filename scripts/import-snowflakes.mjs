import fs from "node:fs";
import path from "node:path";

const srcDir = "C:/Users/devogs/Downloads";
const outDir = path.join(process.cwd(), "src/assets/snowflakes");

/** Same 10 files as in Downloads (numeric sort order). */
const files = [
	"38114.svg",
	"153108.svg",
	"160877.svg",
	"304509.svg",
	"1925893.svg",
	"2029364.svg",
	"2029369.svg",
	"2029371.svg",
	"2910087.svg",
	"2948484.svg",
];

fs.mkdirSync(outDir, { recursive: true });

for (let i = 0; i < files.length; i++) {
	const name = files[i];
	let s = fs.readFileSync(path.join(srcDir, name), "utf8");
	s = s.replace(/<\?xml[^?]*\?>\s*/i, "");
	s = s.replace(/<!DOCTYPE[^>]*>\s*/i, "");
	s = s.replace(/fill="#000000"/gi, 'fill="currentColor"');
	s = s.replace(/fill='#000000'/gi, "fill='currentColor'");
	s = s.replace(/fill="black"/gi, 'fill="currentColor"');
	s = s.replace(/stroke="#000000"/gi, 'stroke="currentColor"');
	s = s.replace(/\s+width="[^"]+"\s+height="[^"]+"/, ' width="100%" height="100%"');
	s = s.replace(/<svg\s/, '<svg class="hero-snowfield-flake" aria-hidden="true" focusable="false" ');
	const out = path.join(outDir, `snowflake-${i}.svg`);
	fs.writeFileSync(out, `${s.trim()}\n`);
	console.log("wrote", out);
}
