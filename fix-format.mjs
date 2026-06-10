import fs from 'fs';
import path from 'path';

const dir = 'src/pages';
for (const f of fs.readdirSync(dir)) {
  if (!f.endsWith('.jsx')) continue;
  const p = path.join(dir, f);
  let c = fs.readFileSync(p, 'utf8');
  if (!c.includes('WhatsApp Us')) continue;
  c = c.replace(/<\/a>\s+<a href="https:\/\/wa\.me\/971504654613"/g, '</a>\n          <a href="https://wa.me/971504654613"');
  fs.writeFileSync(p, c);
  console.log('Fixed:', f);
}
