// Converts screenshots to WebP project covers (1200×750, 16:10, center-cropped).
// Usage: npm run images                     → every .jpg/.jpeg/.png/.webp in ./images-src
//        npm run images -- path/to/file.png → specific files
// Output: public/projects/<file-name>.webp (1200px) + <file-name>-640.webp (640px).
// Reference only <file-name>.webp in src/data/projects.ts; the 640px one is picked automatically.
import { mkdir, readdir } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const OUT_DIR = path.resolve("public/projects");
const SRC_DIR = path.resolve("images-src");
const WIDTH = 1200;
const HEIGHT = 750;

const args = process.argv.slice(2);
const files = args.length
  ? args.map((f) => path.resolve(f))
  : (await readdir(SRC_DIR).catch(() => []))
      .filter((f) => /\.(jpe?g|png|webp)$/i.test(f))
      .map((f) => path.join(SRC_DIR, f));

if (!files.length) {
  console.log("No images found. Put screenshots in ./images-src or pass file paths.");
  process.exit(0);
}

await mkdir(OUT_DIR, { recursive: true });
for (const file of files) {
  const name = path.basename(file).replace(/\.[^.]+$/, "").toLowerCase().replace(/[^a-z0-9-]+/g, "-");
  const out = path.join(OUT_DIR, `${name}.webp`);
  const info = await sharp(file)
    .resize(WIDTH, HEIGHT, { fit: "cover", position: "attention" })
    .webp({ quality: 78, effort: 6 })
    .toFile(out);
  const small = out.replace(/\.webp$/, "-640.webp");
  const smallInfo = await sharp(out).resize(640).webp({ quality: 78, effort: 6 }).toFile(small);
  console.log(`${path.relative(process.cwd(), out)}  ${(info.size / 1024).toFixed(0)} KB (640px: ${(smallInfo.size / 1024).toFixed(0)} KB)`);
}
