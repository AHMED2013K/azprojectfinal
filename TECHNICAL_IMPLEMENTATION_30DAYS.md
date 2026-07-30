# 🔧 PLAN D'EXÉCUTION TECHNIQUE - 30 JOURS

## PHASE 1: DIAGNOSTIC (Jours 1-2)

### Tâche 1.1: Exporter Data GSC
```bash
1. Ouvrir: https://search.google.com/search-console
2. Aller à: Performance > Queries
3. Filtrer: "Country: Tunisia"
4. Exporter: CSV avec Impressions, Clics, CTR, Position
5. Trier: Par Impressions DESC
6. Garder: Top 50 pages
```

**Résultat espéré:** Fichier avec structure:
```
Page URL | Impressions | Clics | CTR | Avg. Position
/ | 500 | 15 | 3.0% | 5.2
/etudier-en-france-depuis-tunisie | 400 | 20 | 5.0% | 4.8
```

### Tâche 1.2: Audit Current Meta
```bash
1. Pour CHAQUE page dans top 50:
   - Vérifier title actual (Search Console > Inspect)
   - Copier meta description
   - Vérifier schema.org valide
   - Noter si emoji présent
```

**Outil:** Google Sheets avec colonnes:
```
| URL | Current Title | Current Desc | Title Length | Desc Length | Missing Schema? |
```

### Tâche 1.3: Competitive Landscape
```bash
1. Pour chaque keyword principal, Google:
   "site:*.tn étudier à l'étranger" 
   
2. Noter:
   - Top 3 competing sites
   - Leurs titles (CTR winner)
   - Leurs descriptions
   - Si utilisation d'emoji/chiffres
```

**Competitive titles à study:**
```
Exemple: "🎓 Étudier à l'Étranger: Guide 2024+Agences Tunisie"
vs
"How to Study Abroad from Tunisia - Complete Guide"
```

---

## PHASE 2: OPTIMIZATION METAS (Jours 3-4)

### Tâche 2.1: Créer Master List
```bash
Spreadsheet avec colonnes:

URL | Priority (1-50) | New Title (60c max) | New Description (160c max) | Schema Type | Emoji/Number |
```

**Remplir pour les 20 TOP URLs prioritaires:**

Voir fichier `/META_OPTIMIZATION_TEMPLATE.md` pour exact wording.

### Tâche 2.2: Ajouter Schema Structuré

Pour chaque page, ajouter JSON-LD:

```javascript
// /etudier-en-france-depuis-tunisie
const schemaFAQ = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Comment étudier en France depuis la Tunisie?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Voici étapes principales: 1) Détermine tes objectifs...",
      }
    },
    {
      "@type": "Question",
      "name": "Combien coûte étudier en France?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Budget moyen annuel: 12,000-20,000€...",
      }
    }
    // ... Add 3-5 more FAQs
  ]
};

// Add Breadcrumb
const schemaBreadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {"@type": "ListItem", "position": 1, "name": "Accueil", "item": "https://edugrowth.tn"},
    {"@type": "ListItem", "position": 2, "name": "Étudier à l'Étranger", "item": "https://edugrowth.tn/abroad-zone"},
    {"@type": "ListItem", "position": 3, "name": "Étudier en France", "item": "https://edugrowth.tn/etudier-en-france-depuis-tunisie"}
  ]
};

// Add Organization (Home page only)
const schemaOrg = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "EduGrowth Tunisia",
  "url": "https://edugrowth.tn",
  "logo": "https://edugrowth.tn/logo.png",
  "description": "Guide étude à l'étranger pour étudiants tunisiens",
  "founded": "2023",
  "foundingLocation": "Tunis, Tunisia",
  "sameAs": ["https://facebook.com/edugrowth", "https://twitter.com/edugrowth"],
  "contactPoint": {
    "@type": "ContactPoint",
    "contactType": "Customer Service",
    "telephone": "+216-XXXXXXX"
  }
};
```

### Tâche 2.3: Implémentation dans React
```jsx
// src/components/SEOHelmet.jsx - Modifier
import { Helmet } from 'react-helmet-async';

export function FranceStudyPage() {
  const schemaFAQ = {...}; // From above
  const schemaBreadcrumb = {...};

  return (
    <>
      <Helmet>
        <title>🇫🇷 Étudier en France Tunisie: Visa+Campus France+Budget 2026</title>
        <meta name="description" 
          content="1,850€/mois moyen. Campus France, Visa Schengen. 8,000+ étudiants tunisiens en France. Guide complet." />
        
        {/* Add structured data */}
        <script type="application/ld+json">
          {JSON.stringify(schemaFAQ)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(schemaBreadcrumb)}
        </script>
      </Helmet>
      
      {/* Page content */}
    </>
  );
}
```

### Tâche 2.4: Validation
```bash
1. Pour chaque page:
   - Visite: https://validator.schema.org/
   - Copie le code source HTML
   - Valider - zéro erreurs
   
2. Checker pour duplicates:
   - GSC > Optimisation > Balisage
   - Assurer pas d'erreurs de schema
```

---

## PHASE 3: CRÉATION CONTENU (Jours 5-10)

### Tâche 3.1: Identifier Gaps de Pages

**Pages CRITIQUES manquantes:**
```
Priorité 1 (URGENT):
- /etudier-a-l-etranger/comparatif - "Quel pays choisir?"
- /etudier-a-l-etranger/budget-realiste - "Combien ça coûte?"
- /agence-etude-etranger-guide - "Quelle est la meilleure agence?"
- /france/calendrier-admission - "Quand commencer?"
- /france/bourses-etudiants - "Bourses françaises"

Priorité 2 (IMPORTANT):
- /allemagne/ausbildung - "Ausbildung tunisie"
- /canada/provinces - "Quelle province choisir?"
- /logement/- "Où vivre?"
- /tests-langue/ - "DELF TOEFL scores"
- /after-studies/ - "Rester ou retourner?"
```

### Tâche 3.2: Content Template

**Structure minimale par page (SEO-first):**

```markdown
---
title: "PAGE TITLE - 50-60 chars"
description: "Page description - 150-160 chars"
keywords: ["kw1", "kw2"]
schemas: ["FAQPage", "BreadcrumbList"]
---

# [H1 - Include Main Keyword]

## Quick Facts Box
- 📊 Stat 1
- 💰 Stat 2
- 📅 Stat 3

## The Problem (What reader wants to solve)
Paragraph 1-2 connecting reader problem to solution

## The Solution (Main content sections)

### Section 2.1: [Subtopic including LSI keyword]
- Data point
- Data point
- Data point

### Section 2.2: [Subtopic]
[Continue similar pattern]

## FAQ (Minimum 5 questions)
```
Q: "Question 1?"
A: "Answer 1..." [Internal link to related page]

Q: "Question 2?"
A: "Answer 2..." [Internal link]

Q: "Question 3?"
A: "Answer 3..."
```
```

### Section: CTA
[Consultation Button] [WhatsApp Button] [Email form]
```

### Tâche 3.3: Write 5 Priority Pages
```
1. /budget-realiste-etudes-etranger (2,000 words)
2. /comparatif-pays-etudier (2,500 words)
3. /meilleures-agences-tunisie (1,500 words)
4. /calendrier-admission-france (1,200 words)
5. /bourses-tunis-etudiants (2,000 words)
```

**Timeline:** 3-4 hours per deep-research page

---

## PHASE 4: PERFORMANCE (Jours 11-14)

### Tâche 4.1: Image Optimization

```bash
# Convert all images to WebP + AVIF
# Install tool
npm install -g convert-multiple-image-format

# Script batch conversion
find ./public -name "*.jpg" -o -name "*.png" | \
  xargs -I {} convert {} -quality 80 {}.webp

# Then update HTML:
<picture>
  <source srcset="img.avif" type="image/avif">
  <source srcset="img.webp" type="image/webp">
  <img src="img.jpg" alt="descriptive text">
</picture>
```

**Sizes to reduce:**
```
- Hero images: 100KB max (currently probably 500KB+)
- Blog images: 50KB max
- Thumbnails: 20KB max
```

### Tâche 4.2: Code Splitting Optimization

Modify `vite.config.js`:

```javascript
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'routing': ['react-router-dom'],
          'seo': ['react-helmet-async'],
          'ui': ['lucide-react'],
          'three-vendor': ['three', 'vanta'], // If using 3D
        },
      },
    },
    // Inline small images as data URIs
    assetsInlineLimit: 4096,
    chunkSizeWarningLimit: 500,
  },
});
```

### Tâche 4.3: CSS Optimization

```javascript
// In package.json, add:
"scripts": {
  "optimize:css": "purgecss --css src/index.css --content src/**/*.jsx --out dist"
}

// Run after build
npm run build && npm run optimize:css
```

### Tâche 4.4: Lazy Load Images

```jsx
// Convert all images to lazy loading
<img 
  src="placeholder.jpg"
  data-src="real-image.webp"
  loading="lazy"
  alt="description"
/>

// Or use library:
import { LazyLoadImage } from 'react-lazy-load-image-component';
```

### Tâche 4.5: GTM/Analytics Optimization

Move Google Tag Manager script to non-blocking:

```html
<!-- In index.html, modify to: -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-ID"></script>
<script async>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-ID');
</script>
```

### Tâche 4.6: Test Lighthouse

```bash
# Install lighthouse CLI
npm install -g lighthouse

# Run test
lighthouse https://edugrowth.tn --output=json --output-path=./lighthouse-report-final.json

# Check scores
# Target: Performance > 80, CLS > 95, FCP < 2s, LCP < 3s
```

---

## PHASE 5: INTERNAL LINKING (Jours 15-17)

### Linking Strategy

**Each page should have:**
- ✅ 2-3 inbound links from pillar pages
- ✅ 5-8 contextual outbound links to related content
- ✅ 1 CTA link (consultation/form)

**Linking Pattern:**

```jsx
// In page content:
<p>
  Quand tu es admis à l'université, l'étape suivante est obtenir 
  <Link to="/visa-etudiant-tunisie">ton visa étudiant</Link>. 
  Voici ce que tu dois savoir...
</p>

// Near CTA:
<p>
  Besoin d'aide pour {' '}
  <Link to="/agence-etude-etranger-tunis">
    trouver la meilleure agence?
  </Link>
  {' '} Voir notre comparatif.
</p>
```

**Linking Map (Auto-generated):**

```
HOME (Hub)
├─ /abroad-zone (Pillar 1: Study Abroad)
│  ├─ /etudier-en-france-depuis-tunisie (Cluster France)
│  │  ├─ /france/visa-schengen
│  │  ├─ /france/universites-top
│  │  ├─ /france/bourses
│  │  └─ /france/calendrier
│  ├─ /etudier-au-canada-depuis-tunisie (Cluster Canada)
│  ├─ /etudier-en-allemagne-depuis-tunisie (Cluster Germany)
│  └─ /agence-etude-etranger-tunis (Cluster Services)
├─ /outsourcing (Pillar 2: B2B)
│  └─ [other content]
```

---

## PHASE 6: MONITORING & ITERATION (Jours 18-30)

### Tâche 6.1: Setup Monitoring

```bash
# Create monitoring script
cat > scripts/seo-monitor.js << 'EOF'
// Track Google Search Console metrics weekly
const trackMetrics = () => {
  const weeks = [];
  
  // Manual check weekly:
  // 1. GSC > Performance > Compare to last week
  // 2. Lighthouse scores
  // 3. Heatmap click patterns
};

// Log changes
console.log("Week 1 Baseline:", baseline);
console.log("Week 2 Improvement:", improvement);
EOF
```

### Tâche 6.2: Weekly Review Checklist

```
Every Monday:
[ ] Check GSC - Impressions trend
[ ] Check GSC - CTR trend
[ ] Check Google Analytics - Traffic
[ ] Run Lighthouse on 3 key pages
[ ] Check ranking for top 5 keywords
[ ] Monitor bounce rate by landing page
```

### Tâche 6.3: A/B Testing Framework

```javascript
// Simple A/B test for titles
const AB_TEST = {
  page: '/etudier-en-france-depuis-tunisie',
  original: 'How to Study in France',
  variant: '🇫🇷 Étudier en France: Visa+Budget+Top Universités',
  testPeriod: '2 weeks',
  metrics: ['CTR', 'Bounce Rate', 'Time on Page']
};

// Track via GA4 custom events
gtag('event', 'title_variant_shown', {
  page: AB_TEST.page,
  variant: 'emoji_optimized'
});
```

### Tâche 6.4: Content Expansion

**After 2 weeks, identify:**
- ✅ Pages with high impressions but low CTR (need better titles)
- ✅ Pages with good CTR but low conversions (need better CTA)
- ✅ Pages with low traffic (need more internal links)

**Actions:**
1. High impressions + low CTR → Rewrite title/description
2. OK traffic + low conversions → Audit form/CTA placement
3. Low traffic → Add 3-5 internal links from pillar pages

---

## 📊 SUCCESS METRICS

### Week 1 Baseline
```
- Impressions: 2,200
- Clics: 83
- CTR: 3.77%
- Avg Position: 4.8
```

### Target Week 2 (After Meta Optimization)
```
- Impressions: 2,400 (+9%)
- Clics: 140 (+68%)
- CTR: 5.8% (+54%)
- Avg Position: 4.2 (-0.6)
```

### Target Week 4 (After Content + Performance)
```
- Impressions: 3,200 (+45%)
- Clics: 280 (+237%)
- CTR: 8.75% (+132%)
- Avg Position: 3.8 (-1.0)
```

### Target Month 2 (Full Strategy)
```
- Impressions: 4,500 (+104%)
- Clics: 450 (+441%)
- CTR: 10% (+165%)
- Avg Position: 3.2 (-1.6)
```

---

## ⚠️ COMMON MISTAKES TO AVOID

❌ **DON'T:**
- Stuff keywords (> 2% density)
- Duplicate content across pages
- Misleading snippets (reduce CTR long-term)
- Hide content from Google
- Buy backlinks

✅ **DO:**
- Write for humans first, SEO second
- Update old content regularly
- Use numbers/data in descriptions
- Create unique value per page
- Build organic backlinks through content quality

---

## 🎯 FINAL CHECKLIST (Before Launch)

**Pre-Launch (Before each week):**
- [ ] All titles <= 60 characters
- [ ] All descriptions <= 160 characters
- [ ] No keyword stuffing (< 2% density)
- [ ] Schema validation: 0 errors
- [ ] All images in WebP format
- [ ] Lighthouse Performance > 70
- [ ] No 404 errors on internal links
- [ ] Mobile responsive tested
- [ ] Meta robots configured correctly
- [ ] Hreflang implemented if multilingual

**Post-Launch (Monitor after deployment):**
- [ ] GSC shows new pages indexed
- [ ] URLs showing up in SERP preview
- [ ] CTR trending up (first 7 days)
- [ ] No unexpected crawl errors
- [ ] Analytics tracking firing correctly
- [ ] CTA conversions being tracked

---

## 📞 Quick Support

**GSC Issues?** https://support.google.com/webmasters
**Lighthouse Training?** https://developers.google.com/web/tools/lighthouse
**Schema Validation?** https://schema.org/docs/
**Still stuck?** Run: `npm run build` → Check console for errors
