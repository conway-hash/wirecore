// Re-runnable: drop new raw photos into references-raw/, then `node scripts/optimize-references.mjs`.
// Reads raw reference photos, renames them by embedded capture timestamp, and writes
// resized/compressed webp versions (full + gallery thumb) into static/references/.
import { readdir, mkdir, rm } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const rawDir = path.resolve('references-raw');
const outDir = path.resolve('static/references');

const FULL_WIDTH = 1920;
const THUMB_WIDTH = 640;
const FULL_QUALITY = 75;
const THUMB_QUALITY = 65;

function extractTimestamp(filename) {
	const match = filename.match(/(\d{4})(\d{2})(\d{2})[_-](\d{2})(\d{2})(\d{2})/);
	if (!match) return null;
	const [, y, mo, d, h, mi, s] = match;
	return `${y}${mo}${d}-${h}${mi}${s}`;
}

async function main() {
	if (!existsSync(rawDir)) {
		console.error(`No raw source folder found at ${rawDir}. Put original photos there first.`);
		process.exit(1);
	}

	const files = (await readdir(rawDir)).filter((f) => /\.(jpe?g|png)$/i.test(f));
	if (files.length === 0) {
		console.error(`No images found in ${rawDir}.`);
		process.exit(1);
	}

	await mkdir(outDir, { recursive: true });
	await rm(outDir, { recursive: true, force: true });
	await mkdir(outDir, { recursive: true });

	const seen = new Set();
	for (const file of files) {
		const ts = extractTimestamp(file) ?? 'unknown';
		let slug = ts;
		let i = 2;
		while (seen.has(slug)) {
			slug = `${ts}-${i++}`;
		}
		seen.add(slug);

		const input = path.join(rawDir, file);
		const fullOut = path.join(outDir, `reference-${slug}.webp`);
		const thumbOut = path.join(outDir, `reference-${slug}-thumb.webp`);

		const image = sharp(input).rotate();

		await image
			.clone()
			.resize({ width: FULL_WIDTH, withoutEnlargement: true })
			.webp({ quality: FULL_QUALITY })
			.toFile(fullOut);

		await image
			.clone()
			.resize({ width: THUMB_WIDTH, withoutEnlargement: true })
			.webp({ quality: THUMB_QUALITY })
			.toFile(thumbOut);

		console.log(`${file} -> reference-${slug}.webp`);
	}

	console.log(`Done. Optimized ${files.length} photos into ${outDir}`);
}

main();
