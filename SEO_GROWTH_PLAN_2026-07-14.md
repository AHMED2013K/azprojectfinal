# EduGrowth — plan de croissance SEO

Date de référence : 14 juillet 2026. Objectif : faire d'EduGrowth la source tunisienne la plus utile et la plus fiable pour l'orientation et les études à l'étranger, sans produire de pages interchangeables.

## Décision stratégique

Le site doit avoir un sujet principal clair : **étudier à l'étranger depuis la Tunisie**. Les services B2B d'outsourcing sont une activité légitime, mais forment un second univers sémantique. À moyen terme, les isoler sur `business.edugrowth.tn` (ou une marque/domaine séparé) rendra la promesse du domaine principal plus lisible. Ne pas migrer avant inventaire des liens, des conversions et plan de redirections 301.

La cible de 10 000 impressions est réaliste avec les pages existantes, 12 à 18 contenus experts et une meilleure couverture des requêtes déjà apparues. Le CTR global supérieur à 5 % dépendra de la position moyenne : il faut viser les requêtes de problème et de décision, plutôt que publier des centaines de variantes ville × pays sans valeur propre.

## État des lieux vérifié

| Domaine | Constat | Priorité |
| --- | --- | --- |
| Crawl/indexation | `robots.txt` autorise le site public, exclut les pages transactionnelles et expose le sitemap. Le sitemap est valide et les pages SEO sont pré-rendues en HTML. | ★★★★☆ |
| Canonicals | Les pages principales déclarent un canonical ; `/home`, `/ousourcing` et `/outourcing` étaient toutefois des entrées concurrentes. Les redirections 301 sont maintenant prévues dans Nginx. | ★★★★★ |
| Performance | Le rapport Lighthouse local indique performance 53/100, FCP 8,7 s, LCP 21,6 s, CLS 0,00 et TBT 230 ms. La lenteur est surtout un délai de rendu, pas le JS bloquant. | ★★★★★ |
| Poids | Le rapport chargeait notamment `Submark.png` (1,16 Mo) pour un logo de 36 px. Le portail utilise désormais les versions WebP (40/28 Ko). | ★★★★★ |
| Données structurées | Organization, Service, WebSite, WebPage, Breadcrumb/Article/FAQ sur plusieurs gabarits sont déjà présents. Il faut valider les données visibles et ne jamais baliser d'avis non vérifiables. | ★★★★☆ |
| Architecture | Les clusters France/Allemagne/Canada existent, mais les liens profonds entre guide pays, visa, budget, bourses et articles restent trop peu systématiques. | ★★★★★ |

Le LCP ci-dessus vient d'un test de développement (`localhost`) : il ne remplace pas les données terrain CrUX/Search Console. Après déploiement, lancer PageSpeed Insights mobile sur `/`, France, Allemagne, Alternance et le plus gros article ; utiliser ensuite le rapport Core Web Vitals de Search Console comme vérité opérationnelle.

## Correctifs réalisés dans ce lot

| Modification | Fichier | Impact attendu |
| --- | --- | --- |
| Logos portail passés de JPEG/PNG à WebP | `src/components/PortalSelector.jsx` | environ 1,19 Mo de transfert évité lors de l'ouverture du portail |
| Consolidation de trois URLs historiques | `deploy/nginx.website.conf` | suppression du contenu dupliqué et concentration des signaux de liens |
| Cache immutable des assets versionnés | `deploy/nginx.website.conf` | chargements répétés plus rapides ; aucun risque de fichier périmé après build Vite |

Le fichier Nginx n'a d'effet qu'après le déploiement de cette configuration sur le serveur. Les changements n'affectent pas les modifications non liées déjà présentes dans l'arbre Git.

## Défauts à corriger ensuite

1. **LCP réel et rendu initial** — ★★★★★ impact · ★★★☆☆ difficulté · ★★★★★ ROI. Exécuter Lighthouse sur le build de production, non sur Vite dev ; supprimer tout effet Vanta/animation du chemin initial des pages SEO ; réserver la taille des images ; charger les témoignages/photos sous la ligne de flottaison en `loading="lazy"` et `decoding="async"`.
2. **Redirections et cohérence slash** — ★★★★★ · ★★☆☆☆ · ★★★★★. Déployer les 301 ajoutées, puis crawler la liste du sitemap avec `curl -I` : une URL canonique doit répondre 200, les alias 301 et les 404 404/410.
3. **Sitemap** — ★★★★☆ · ★★☆☆☆ · ★★★★☆. Ne conserver que les URLs indexables, mettre `lastmod` à la date de modification réelle et soumettre dans Search Console après chaque lot significatif. Ne pas inclure `/home`, LP, merci, portail ni variantes d'URL.
4. **Éviter les promesses ou chiffres non démontrables** — ★★★★★ · ★★☆☆☆ · ★★★★★. Les avis, statistiques de succès, partenariats, tarifs et délais doivent être sourcés, datés et visibles sur la page. Supprimer le balisage Review si les avis ne sont pas publiquement vérifiables.
5. **Fraîcheur réglementaire** — ★★★★★ · ★★★☆☆ · ★★★★★. Chaque page visa/financement doit afficher « vérifié le », auteur/relecteur et lien vers l'ambassade, Campus France, université ou ministère compétent.

## Cocon sémantique et maillage obligatoire

Chaque article doit contenir 3 à 5 liens contextuels, pas une liste générique : un lien vers son pilier, un lien vers l'étape suivante, un lien de comparaison/décision et un CTA consultation. Chaque guide pays doit comporter les liens `Pays → coût → visa → bourses → logement → niveau d'études → consultation`.

| Cluster | Pilier | Pages satellites prioritaires | Liens entrants à créer |
| --- | --- | --- | --- |
| Orientation | `/fr/etudier-a-l-etranger-depuis-tunisie/` | après bac, parents, comparatif pays, petit budget, bourses | accueil, tous guides pays, articles budget/visa |
| France | `/etudier-en-france-depuis-tunisie/` | Campus France, alternance, école privée, master, logement, refus visa | pilier orientation + articles France + pages villes |
| Allemagne | `/etudier-en-allemagne-depuis-tunisie/` | compte bloqué, visa, Ausbildung, universités publiques, langue | pilier orientation + budget/bourses + page pays |
| Visa/financement | `/visa-etudiant-tunisie/` | documents, entretien, refus, assurance, financement par pays | tous les guides pays |
| Études santé | `/fr/etudier-medecine-pharmacie-etranger/` | médecine Roumanie, Hongrie, Chypre, coûts, reconnaissance diplôme | pilier orientation + guides pays concernés |
| Local | pages agences par ville | seule page ville si présence/service réel, plus le parcours numérique | pages pays et hub orientation, jamais en maillage massif ville × pays |

## Audit de contenu et arbitrage des 91 URLs

### À conserver et renforcer en premier — excellentes intentions

Accueil, pilier « étudier à l'étranger », France, Allemagne, Canada, Alternance France, Alternance pour Tunisiens, Campus France, compte bloqué Allemagne, bourses, budget, visa, comparatif pays, après-bac, parents, médecine/pharmacie, pages Tunis/Sfax/Sousse et les guides Roumanie/Espagne/Hongrie/Italie/Chine.

Action : ajouter auteur expert, date de vérification, tableaux décisionnels, sources officielles, FAQ réellement visible, liens de cluster et CTA adapté au niveau du projet. Les deux pages Alternance doivent avoir une intention distincte : une page pilier et une page très opérationnelle « pour Tunisiens » ; sinon fusionner la plus faible après analyse GSC des requêtes.

### À améliorer — contenu utile mais trop générique ou trop court

Autriche, Chypre, Turquie, Dubaï, Russie, Maroc, Royaume-Uni, USA, France école privée, logement France, master France, entretien Campus France, lettre de motivation, documents admission, top pays et toutes les pages locales actuelles.

Action : ajouter 800–1 500 mots de contenu original utile lorsque le sujet le justifie, une checklist, contraintes d'éligibilité, coût daté, sources, erreurs fréquentes et liens entrants/sortants. Une page locale doit présenter une preuve de service pour la ville (modalité de rendez-vous, zone desservie, équipe, témoignage local vérifiable) ; sinon la garder comme page de service en ligne et ne pas créer de clone.

### À fusionner, mettre en `noindex` ou séparer — hors topicalité étudiants

Les URLs `/outsourcing*`, `education-outsourcing*`, `student-recruitment-outsourcing`, `externalisation-services-tunisie`, `outsource-customer-service-tunisia`, le calculateur B2B et les articles B2B. Elles ne sont pas mauvaises : elles doivent vivre dans un silo B2B isolé. Les LP publicitaires et `/thank-you` restent `noindex`. `/home`, `/ousourcing`, `/outourcing` doivent rediriger 301.

Avant toute suppression, exporter 16 mois de Search Console et Analytics par URL. Une URL recevant impressions, clics, liens ou leads ne se supprime jamais sans redirection vers l'équivalent le plus proche.

## Gaps de mots-clés et pages à produire après validation éditoriale

Produire d'abord les 18 pages suivantes, avec auteur, sources et informations réellement distinctes. Elles couvrent directement les questions observées ou les étapes manquantes du parcours.

1. `visa-etudiant-france-tunisie-documents-delais`
2. `compte-bloque-allemagne-tunisie-montant-documents`
3. `universites-allemagne-etudiants-tunisiens`
4. `ausbildung-allemagne-tunisiens-conditions`
5. `campus-france-tunisie-calendrier-2026-2027`
6. `alternance-france-tunisiens-conditions-visa`
7. `cout-etudier-france-depuis-tunisie`
8. `bourses-france-etudiants-tunisiens`
9. `etudier-medecine-roumanie-depuis-tunisie`
10. `etudier-medecine-hongrie-depuis-tunisie`
11. `visa-etudiant-espagne-tunisie`
12. `cout-etudier-espagne-etudiant-tunisien`
13. `master-france-etudiant-tunisien-admission`
14. `licence-apres-bac-etudes-etranger-tunisie`
15. `equivalence-diplome-tunisien-etudes-etranger`
16. `assurance-etudiant-international-tunisie`
17. `logement-etudiant-allemagne-depuis-tunisie`
18. `lettre-motivation-etudes-etranger-exemple-tunisie`

Ensuite, utiliser un gabarit programmatique **à données vérifiées** : `destination × intention` (coût, visa, admission, bourse, niveau), jamais `destination × ville` par défaut. Une page ville × destination ne doit être indexée que si elle possède une offre locale, un calendrier, des partenaires/preuves ou des questions réellement propres à cette ville. Critère de publication : 700+ mots uniques, données datées, au moins deux sources primaires, 3 liens contextuels, une FAQ visible, un responsable éditorial.

## SEO local

Créer ou optimiser le profil Google Business Profile, une seule fiche par emplacement réel, avec NAP identique au site, catégories exactes, photos, rendez-vous, réponses aux avis et posts mensuels. Pages locales à envisager uniquement après validation de la capacité à servir ces villes : Ariana, Ben Arous, Manouba, Nabeul, Monastir, Mahdia, Bizerte, Kairouan, Gabès, Médenine, Gafsa et Kasserine. Chaque page doit expliquer clairement « accompagnement à distance » si aucune agence physique n'y existe ; ne jamais inventer une adresse locale.

## EEAT, résultats enrichis et AI search

Ajouter sur tous les contenus sensibles : auteur nommé, bio/qualifications, relecteur, date de mise à jour, méthodologie, sources officielles cliquables, politique éditoriale, page équipe, mentions légales, confidentialité et modalités de facturation/remboursement. Créer une page « sources officielles » par destination.

Conserver : Organization/LocalBusiness (seulement adresse réelle), WebSite, WebPage, Service, Breadcrumb, Article/BlogPosting et FAQPage lorsque la FAQ est visible. Ajouter Person pour les auteurs et VideoObject seulement pour des vidéos réellement publiées. Ne pas implémenter HowTo, Course, Offer, Event ou AggregateRating sans objet concret et visible : ils n'améliorent pas le classement par eux-mêmes et des données trompeuses créent un risque de mesure manuelle.

Pour Google AI Overviews, ChatGPT, Perplexity, Gemini et Copilot, l'avantage vient de réponses courtes avant les détails, tableaux comparatifs factuels, citations d'autorités, pages régulièrement révisées et une entité cohérente (EduGrowth, équipe, téléphone, site, profils sociaux vérifiés). Il n'existe pas de balisage spécial garantissant une citation par un LLM.

## Acquisition de liens

Priorité : 1) partenaires universitaires/écoles avec page partenaire réelle ; 2) associations étudiantes et alumni tunisiens ; 3) médias tunisiens avec données originales ; 4) organismes d'orientation, salons, podcasts ; 5) ressources utiles à mériter (calendrier, checklist visa, comparateur de budget). Prospection mensuelle : 30 contacts ciblés, 5 propositions éditoriales, suivi des liens obtenus et des leads. Éviter achat de liens, annuaires sans contrôle, échanges à grande échelle, articles invités répétitifs et ancres optimisées.

## Conversion SEO

Par page : un CTA principal (« vérifier mon éligibilité »), WhatsApp prérempli spécifique au sujet, délai de réponse annoncé seulement s'il est respecté, mini-formulaire à 4 champs maximum, preuve vérifiable, section « ce que vous recevez », et CTA après chaque bloc décisionnel. Mesurer `cta_click`, ouverture WhatsApp, formulaire démarré/envoyé, prise de rendez-vous et lead qualifié, avec UTM par page et cluster.

## Calendrier éditorial : août 2026 à janvier 2027

| Mois | 3 contenus à publier | Intention |
| --- | --- | --- |
| Août | Compte bloqué Allemagne ; calendrier Campus France ; visa France | forte demande / urgence |
| Septembre | alternance Tunisiens conditions ; coût France ; bourses France | commercial / décision |
| Octobre | médecine Roumanie ; médecine Hongrie ; visa Espagne | destination / conversion |
| Novembre | master France ; universités Allemagne ; logement Allemagne | admission / réassurance |
| Décembre | après-bac ; équivalence diplôme ; assurance étudiant | informationnelle qualifiée |
| Janvier | comparatif France-Allemagne-Canada ; financement ; choisir son pays | orientation / lead |

## Roadmap du 14 juillet au 31 août

| Semaine | Livrable | Impact | Difficulté | ROI |
| --- | --- | --- | --- | --- |
| 14–19 juil. | Déployer ce lot, vérifier 301/200/canonicals, Lighthouse production | ★★★★★ | ★★☆☆☆ | ★★★★★ |
| 20–26 juil. | Réécrire Allemagne/compte bloqué/Alternance avec sources et auteurs ; maillage cluster | ★★★★★ | ★★★☆☆ | ★★★★★ |
| 27 juil.–2 août | Réécrire France/Campus France/visa ; ajouter tracking de conversion | ★★★★★ | ★★★☆☆ | ★★★★★ |
| 3–9 août | Publier 3 pages priorisées : visa France, calendrier Campus France, compte bloqué enrichi | ★★★★★ | ★★★☆☆ | ★★★★★ |
| 10–16 août | Audit GSC par requête/page ; titres/descriptions des URLs à forte impression et faible CTR | ★★★★★ | ★★☆☆☆ | ★★★★★ |
| 17–23 août | EEAT (équipe, auteurs, politique, sources), GBP et collecte d'avis conforme | ★★★★☆ | ★★★☆☆ | ★★★★☆ |
| 24–31 août | Publier 3 pages France/Allemagne ; lancer 30 prises de contact backlink ; bilan | ★★★★☆ | ★★★☆☆ | ★★★★☆ |

## Mesure et règles d'ajustement

Créer un tableau hebdomadaire GSC par URL et requête : impressions, clics, CTR, position, pages indexées, conversions et leads qualifiés. Annoter chaque déploiement. Après 14 jours, améliorer title/meta des pages avec plus de 100 impressions et CTR sous 3 % ; après 28 jours, enrichir/mailler les pages position 8–20 ; après 56 jours, fusionner ou noindexer une page sans impressions uniquement si elle n'a pas de rôle de conversion ou de liens. Les effets SEO ne se mesurent pas de façon fiable au lendemain d'un changement.
