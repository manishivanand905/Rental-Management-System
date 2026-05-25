const fs = require('node:fs');
const path = require('node:path');

const tr46Path = path.join(__dirname, '..', 'node_modules', 'tr46', 'index.js');

if (!fs.existsSync(tr46Path)) {
  process.exit(0);
}

const source = fs.readFileSync(tr46Path, 'utf8');

if (source.includes('require("punycode/")')) {
  process.exit(0);
}

const updated = source.replace('require("punycode")', 'require("punycode/")');

if (updated !== source) {
  fs.writeFileSync(tr46Path, updated, 'utf8');
}
