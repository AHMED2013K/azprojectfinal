import fs from 'fs';
import path from 'path';

const root = process.cwd();
const distDir = path.join(root, 'dist');
const sitemapPath = path.join(root, 'sitemap.xml');

const requiredRoutes = [
  '/etudier-en-grece-depuis-tunisie/',
  '/stage-hotellerie-tourisme-grece/',
  '/etudier-en-pologne-depuis-tunisie/',
  '/parcoursup-tunisie-accompagnement/',
  '/nos-recrutements/',
  '/stage-hotellerie-grece-salaire-logement-repas/',
  '/internship-grece-hospitality-tunisie/',
  '/etudier-en-pologne-budget-tunisie/',
  '/visa-etudiant-pologne-tunisie/',
  '/etudier-tourisme-hotellerie-grece/',
  '/comparer-france-pologne-tunisie/',
  '/comparer-grece-chypre-nord-hospitality/',
  '/comparer-campus-france-parcoursup-tunisie/',
  '/comparer-russie-novembre-chypre-fevrier/',
  '/methode-edugrowth/',
  '/mentions-legales/',
  '/politique-confidentialite/',
  '/conditions-utilisation/',
];

const errors = [];
const warnings = [];

function read(file) {
  return fs.existsSync(file) ? fs.readFileSync(file, 'utf8') : '';
}

function walk(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    return entry.isDirectory() ? walk(full) : [full];
  });
}

if (!fs.existsSync(distDir)) {
  errors.push('dist/ missing. Run npm run build:prerender first.');
}

const sitemap = read(sitemapPath);
if (!sitemap) {
  errors.push('sitemap.xml missing.');
}

for (const route of requiredRoutes) {
  if (!sitemap.includes('https://edugrowth.tn' + route)) {
    errors.push('Missing in sitemap.xml: ' + route);
  }

  const htmlPath = route === '/'
    ? path.join(distDir, 'index.html')
    : path.join(distDir, route.replace(/^\//, ''), 'index.html');

  if (!fs.existsSync(htmlPath)) {
    errors.push('Missing prerendered HTML: ' + route);
  }
}

for (const file of walk(distDir).filter((item) => item.endsWith('.html'))) {
  const html = read(file);
  const rel = path.relative(root, file);

  if (rel !== 'dist/404.html' && !/<title>[^<]{10,}<\/title>/i.test(html)) {
    errors.push('Missing or weak title: ' + rel);
  }

  if (rel !== 'dist/404.html' && !/<meta\s+name=["']description["']\s+content=["'][^"']{50,}["']/i.test(html)) {
    warnings.push('Missing or short meta description: ' + rel);
  }

  if (rel !== 'dist/404.html' && !/<link\s+rel=["']canonical["']\s+href=["']https:\/\/edugrowth\.tn\//i.test(html)) {
    warnings.push('Missing canonical: ' + rel);
  }

  if (/noindex/i.test(html) && !['dist/404.html', 'dist/avis-google/index.html'].includes(rel)) {
    errors.push('Possible accidental noindex: ' + rel);
  }

  const jsonLd = [...html.matchAll(/<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)];
  for (const match of jsonLd) {
    try {
      JSON.parse(match[1]);
    } catch {
      errors.push('Invalid JSON-LD: ' + rel);
    }
  }
}

const llms = read(path.join(root, 'public', 'llms.txt'));
for (const term of ['Grèce', 'Pologne', 'Parcoursup', 'Campus France', 'internship', 'nos-recrutements']) {
  if (!llms.toLowerCase().includes(term.toLowerCase())) {
    warnings.push('llms.txt should mention: ' + term);
  }
}

const kb = read(path.join(root, 'public', 'ai-knowledge-base.json'));
if (kb) {
  try {
    JSON.parse(kb);
  } catch {
    errors.push('public/ai-knowledge-base.json is not valid JSON.');
  }
} else {
  warnings.push('public/ai-knowledge-base.json missing.');
}

console.log('\nSEO audit');
console.log('Errors:', errors.length);
console.log('Warnings:', warnings.length);

for (const error of errors) console.error('ERROR:', error);
for (const warning of warnings) console.warn('WARN:', warning);

if (errors.length) process.exit(1);
