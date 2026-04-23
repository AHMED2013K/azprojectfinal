process.env.NODE_ENV = 'production';

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import React from 'react';
import { PassThrough } from 'stream';
import { renderToPipeableStream } from 'react-dom/server';
import { HelmetProvider } from 'react-helmet-async';
import { MemoryRouter } from 'react-router-dom';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const distDir = path.resolve(rootDir, 'dist');
const templatePath = path.resolve(rootDir, 'index.html');

const routes = [
  '/alternance-en-france-pour-tunisiens',
  '/campus-france-tunisie-guide',
  '/etudier-en-france-depuis-tunisie',
  '/etudier-en-allemagne-depuis-tunisie',
  '/etudier-au-canada-depuis-tunisie',
  '/agence-etude-etranger-tunis',
  '/agence-etude-etranger-sousse',
  '/agence-etude-etranger-sfax',
  '/programmes/alternance-france',
  '/blog/campus-france-tunisie-etapes',
  '/blog/refus-visa-etudiant-france-erreurs',
  '/blog/alternance-france-pour-tunisiens',
  '/blog/comment-etudier-en-france-depuis-la-tunisie',
  '/blog/master-france-apres-licence-tunisie',
  '/blog/quel-pays-etudier-petit-budget',
];

function serializeHelmet(helmet) {
  const safeHelmet = {
    title: { toString: () => '' },
    meta: { toString: () => '' },
    link: { toString: () => '' },
    script: { toString: () => '' },
    style: { toString: () => '' },
    noscript: { toString: () => '' },
    ...helmet,
  };

  return [
    safeHelmet.title.toString(),
    safeHelmet.meta.toString(),
    safeHelmet.link.toString(),
    safeHelmet.script.toString(),
    safeHelmet.style.toString(),
    safeHelmet.noscript.toString(),
  ].join('');
}

async function renderToStringWithSuspense(element) {
  return new Promise((resolve, reject) => {
    const stream = new PassThrough();
    const chunks = [];

    stream.on('data', (chunk) => chunks.push(chunk.toString()));
    stream.on('end', () => resolve(chunks.join('')));
    stream.on('error', reject);

    const pipeable = renderToPipeableStream(element, {
      onShellError: reject,
      onAllReady() {
        pipeable.pipe(stream);
      },
      onError(error) {
        console.error('SSR render error:', error);
      },
    });
  });
}

async function main() {
  console.log('Starting prerender...');
  const template = await fs.readFile(templatePath, 'utf-8');

  const vite = await createViteServer({
    configFile: path.resolve(rootDir, 'vite.config.js'),
    server: {
      middlewareMode: true,
      fs: {
        allow: [rootDir],
      },
    },
  });

  const appModule = await vite.ssrLoadModule('/src/App.jsx');
  const languageModule = await vite.ssrLoadModule('/src/context/LanguageContext.jsx');
  const App = appModule.default;
  const { LanguageProvider } = languageModule;

  for (const route of routes) {
    const helmetContext = {};
    const appHtml = await renderToStringWithSuspense(
      React.createElement(
        HelmetProvider,
        { context: helmetContext },
        React.createElement(
          LanguageProvider,
          null,
          React.createElement(
            MemoryRouter,
            { initialEntries: [route] },
            React.createElement(App, null),
          ),
        ),
      ),
    );

    const helmet = helmetContext.helmet || {};
    const headTags = serializeHelmet(helmet);
    const htmlAttributes = helmet.htmlAttributes?.toString() || 'lang="en"';

    let rendered = template
      .replace(/<html[^>]*>/, `<html ${htmlAttributes}>`)
      .replace('<!-- ssr-meta -->', headTags)
      .replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`);

    const outputPath = path.join(distDir, route.slice(1), 'index.html');
    await fs.mkdir(path.dirname(outputPath), { recursive: true });
    await fs.writeFile(outputPath, rendered, 'utf-8');
    console.log(`Prerendered ${route} -> ${path.relative(rootDir, outputPath)}`);
  }

  await vite.close();
  console.log('Prerender complete.');
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
