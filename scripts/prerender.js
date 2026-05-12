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
const templatePath = path.resolve(distDir, 'index.html');

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

async function getRoutesFromSitemap() {
  const sitemapPath = path.resolve(rootDir, 'sitemap.xml');
  const sitemap = await fs.readFile(sitemapPath, 'utf-8');
  const siteOrigin = 'https://edugrowth.tn';
  const locMatches = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)];

  return locMatches
    .map((match) => match[1]?.trim())
    .filter(Boolean)
    .map((url) => url.replace(new RegExp(`^${escapeRegExp(siteOrigin)}`), ''))
    .map((route) => (route === '' ? '/' : route));
}

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

function extractHeadTags(html) {
  const extracted = [];
  const headTagPattern =
    /<title\b[^>]*>[\s\S]*?<\/title>|<meta\b[^>]*>|<link\b(?=[^>]*(?:rel="canonical"|rel="alternate"))[^>]*>|<script\b(?=[^>]*type="application\/ld\+json")[^>]*>[\s\S]*?<\/script>/gi;

  const bodyHtml = html.replace(headTagPattern, (tag) => {
    extracted.push(tag);
    return '';
  }).replace(/<link\b(?=[^>]*rel="preload")[^>]*>/gi, '');

  return {
    bodyHtml,
    headTags: extracted.join(''),
  };
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
  const routes = await getRoutesFromSitemap();

  const vite = await createViteServer({
    configFile: path.resolve(rootDir, 'vite.config.js'),
    server: {
      middlewareMode: true,
      hmr: false,
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
    const extracted = extractHeadTags(appHtml);
    const headTags = `${serializeHelmet(helmet)}${extracted.headTags}`;
    const htmlAttributes = helmet.htmlAttributes?.toString() || 'lang="en"';

    let rendered = template
      .replace(/<html[^>]*>/, `<html ${htmlAttributes}>`)
      .replace('<!-- ssr-meta -->', headTags)
      .replace('<div id="root"></div>', `<div id="root">${extracted.bodyHtml}</div>`);

    const outputPath = route === '/'
      ? path.join(distDir, 'index.html')
      : path.join(distDir, route.slice(1), 'index.html');
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
