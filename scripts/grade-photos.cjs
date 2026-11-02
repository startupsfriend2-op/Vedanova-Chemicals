// Grades raw photography into the shared navy duotone and writes optimized
// JPEGs plus blur placeholders. Usage: node scripts/grade-photos.cjs <rawDir>
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');
const raw = process.argv[2];
const out = path.join(__dirname, '..', 'public', 'images', 'photos');
const DARK = [6, 10, 34], LIGHT = [214, 220, 238], MIX = 0.18; // MIX keeps a hint of original colour
async function grade(file, name, { width = 1600, crop } = {}) {
  let img = sharp(path.join(raw, file)).rotate();
  if (crop) img = img.resize(crop.w, crop.h, { fit: 'cover', position: crop.pos || 'centre' });
  else img = img.resize({ width, withoutEnlargement: true });
  const { data, info } = await img.removeAlpha().raw().toBuffer({ resolveWithObject: true });
  // stretch luminance so every photo shares the same tonal range
  const lum = new Float32Array(info.width * info.height);
  const hist = new Uint32Array(256);
  for (let i = 0, p = 0; i < data.length; i += 3, p++) {
    const l = Math.round(0.2126 * data[i] + 0.7152 * data[i + 1] + 0.0722 * data[i + 2]);
    lum[p] = l; hist[l]++;
  }
  const total = lum.length; let lo = 0, hi = 255, acc = 0;
  for (let i = 0; i < 256; i++) { acc += hist[i]; if (acc > total * 0.01) { lo = i; break; } }
  acc = 0; for (let i = 255; i >= 0; i--) { acc += hist[i]; if (acc > total * 0.01) { hi = i; break; } }
  const buf = Buffer.alloc(data.length);
  for (let i = 0, p = 0; i < data.length; i += 3, p++) {
    let t = Math.min(1, Math.max(0, (lum[p] - lo) / Math.max(1, hi - lo)));
    t = Math.pow(t, 0.95);
    for (let c = 0; c < 3; c++) {
      const duo = DARK[c] + (LIGHT[c] - DARK[c]) * t;
      buf[i + c] = Math.round(duo * (1 - MIX) + data[i + c] * MIX * (0.55 + 0.45 * t));
    }
  }
  const graded = sharp(buf, { raw: { width: info.width, height: info.height, channels: 3 } });
  await graded.clone().jpeg({ quality: 76, mozjpeg: true, progressive: true }).toFile(path.join(out, name + '.jpg'));
  const blur = await graded.clone().resize(16).jpeg({ quality: 50 }).toBuffer();
  const meta = await sharp(path.join(out, name + '.jpg')).metadata();
  return { name, width: meta.width, height: meta.height, blur: 'data:image/jpeg;base64,' + blur.toString('base64') };
}
(async () => {
  const jobs = [
    ['hero.jpg', 'hero', { width: 2400 }],
    ['hero.jpg', 'hero-mobile', { crop: { w: 900, h: 1200, pos: 'attention' } }],
    ['solvents.jpg', 'solvents', { width: 1400 }],
    ['recovered.jpg', 'recovered', { width: 1400 }],
    ['petro.jpg', 'petrochemicals', { width: 1400 }],
    ['drums.jpg', 'drums', { width: 1400 }],
    ['pipes.jpg', 'pipes', { width: 1600 }],
    ['aerial.jpg', 'aerial', { width: 1600 }],
    ['tank.jpg', 'tank', { width: 1400 }],
    ['lab.jpg', 'lab', { width: 1600 }],
    ['beaker.jpg', 'beaker', { width: 1400 }],
  ];
  const meta = {};
  for (const [f, n, o] of jobs) { const r = await grade(f, n, o); meta[n] = r; console.log(n, r.width + 'x' + r.height, Math.round(fs.statSync(path.join(out, n + '.jpg')).size / 1024) + 'KB'); }
  fs.writeFileSync(path.join(__dirname, '..', 'lib', 'photo-meta.json'), JSON.stringify(meta, null, 1));
})();
