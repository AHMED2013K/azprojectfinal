# 📦 COMMANDES GIT PRÊTES À COPIER-COLLER

## 🔴 PROBLÈME CRITIQUE RÉSOLU
Les formulaires de lead capture ne sauvegardaient que localement. Les leads n'atteignaient jamais le serveur.

---

## ✅ SOLUTIONS IMPLÉMENTÉES

1. **POST `/api/leads` endpoint créé** - Backend reçoit maintenant les leads
2. **LeadCaptureForm refactorisée** - Envoie les données au serveur
3. **Sécurité améliorée** - Headers de sécurité ajoutés (HSTS, CSP, etc.)
4. **Configuration .env corrigée** - Variables d'environnement documentées

---

## 🚀 DÉPLOIEMENT - COPIER/COLLER LES COMMANDES

### **Commande 1: Vérifier les changements**
```bash
git diff HEAD backend/server.js src/components/LeadCaptureForm.jsx .env.example
```

### **Commande 2: Staging des modifications**
```bash
git add backend/server.js src/components/LeadCaptureForm.jsx .env.example AUDIT_COMPLET_2026_JUILLET.md DEPLOYMENT_COMMANDS.sh package-lock.json
```

### **Commande 3: Commit**
```bash
git commit -m "🚨 CRITICAL FIX: Implement lead API endpoint and fix form capture

CHANGES:
✅ Add POST /api/leads endpoint to backend/server.js
✅ Refactor LeadCaptureForm.jsx to send data to server  
✅ Improve security headers (HSTS, X-Content-Type-Options, etc.)
✅ Update .env.example with proper configuration
✅ Add LEADS_TO email variable for lead notifications

IMPACT:
- Leads now captured on server (fixes 0 prospects/day issue)
- Forms send email notifications to team
- Improved security posture
- Proper fallback to localStorage if API fails

TESTING:
- Test /lp/study-abroad form submission
- Verify email at LEADS_TO address
- Check WhatsApp integration works
- Monitor server logs for errors"
```

### **Commande 4: Push to main**
```bash
git push origin main
```

---

## 📋 VÉRIFICATION POST-DÉPLOIEMENT

### **Commande 5: Tester l'endpoint API**
```bash
# Test de l'endpoint /api/leads
curl -X POST https://edugrowth.tn/api/leads \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test Lead",
    "email": "test@example.com",
    "phone": "+21612345678",
    "organization": "Test Org",
    "objective": "Test lead submission",
    "segment": "general",
    "sourcePage": "api_test"
  }'

# Réponse attendue:
# {"status":"success","messageId":"<message-id>","leadId":"lead_<timestamp>"}
```

### **Commande 6: Vérifier les logs (Render/Heroku)**
```bash
# Pour Render.com
render logs --service <service-name>

# Ou via SSH si applicable:
ssh user@your-server.com
tail -f /var/log/edugrowth/app.log | grep -i lead
```

### **Commande 7: Tester depuis le navigateur**
```javascript
// Console browser sur https://edugrowth.tn/lp/study-abroad
// Remplir et soumettre le formulaire
// Vérifier qu'il n'y a pas d'erreurs dans la console DevTools
// Vérifier que vous êtes redirigé vers /thank-you
```

---

## 📊 RÉSUMÉ DES CHANGEMENTS

### Fichiers modifiés:

**1. backend/server.js** (Nouveau endpoint + Sécurité)
- ✅ Ajout de `POST /api/leads` 
- ✅ Validation des champs requis
- ✅ Envoi d'email via SMTP
- ✅ Amélioration des headers de sécurité (HSTS, X-Frame-Options, etc.)
- ✅ Correction CORS: localhost limité à dev uniquement

**2. src/components/LeadCaptureForm.jsx** (API Integration)
- ✅ Envoi au serveur via `/api/leads`
- ✅ Fallback à localStorage si API échoue
- ✅ Meilleure gestion des erreurs
- ✅ Conservation de la redirection WhatsApp

**3. .env.example** (Configuration)
- ✅ Ajout de `LEADS_TO` pour email des leads
- ✅ `VITE_PUBLIC_API_BASE_URL` documentée
- ✅ `VITE_META_PIXEL_ID` pour Facebook Pixel
- ✅ `NODE_ENV` pour env-aware config

**4. Fichiers créés:**
- `AUDIT_COMPLET_2026_JUILLET.md` - Rapport complet
- `DEPLOYMENT_COMMANDS.sh` - Vue d'ensemble

---

## ⚠️ ÉTAPES CRITIQUES AVANT DÉPLOIEMENT

### Étape 1: Mettre à jour `.env` en production
```bash
# SSH sur votre serveur
ssh user@your-server.com

# Édiger le .env
nano /path/to/edugrowth/.env

# Vérifier ces variables:
export VITE_PUBLIC_API_BASE_URL=https://edugrowth.tn
export VITE_META_PIXEL_ID=YOUR_FACEBOOK_PIXEL_ID  # ← À remplir!
export LEADS_TO=leads@edugrowth.tn  # ← À remplir avec votre email
export SMTP_HOST=smtp.your-provider.com
export SMTP_USER=your_email
export SMTP_PASS=your_password  # ← À remplir!
export CONTACT_TO=contact@edugrowth.tn
export NODE_ENV=production
```

### Étape 2: Configurer l'email des leads
```bash
# Créer un alias email ou une adresse dédiée:
# leads@edugrowth.tn → Reçoit tous les leads de formulaires

# Tester l'envoi SMTP:
node -e "
const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});
transporter.sendMail({
  from: 'test@edugrowth.tn',
  to: process.env.LEADS_TO,
  subject: 'Test SMTP',
  text: 'Test email'
}, (err, info) => {
  if (err) console.error('SMTP Error:', err);
  else console.log('SMTP OK:', info.response);
});
"
```

### Étape 3: Tester avant de mettre en ligne
```bash
# Build et test local
npm run build

# Démarrer server localement
NODE_ENV=production npm start

# Tester en local via ngrok:
npm install -g ngrok
ngrok http 5000
# Puis tester depuis https://<ngrok-url>/lp/study-abroad
```

---

## 🎯 RÉSULTATS ATTENDUS

### Avant les changements:
- ❌ 0 leads reçus
- ❌ Données perdues dans localStorage
- ❌ Aucun email de lead

### Après les changements:
- ✅ Leads sauvegardés sur serveur
- ✅ Email reçu à LEADS_TO
- ✅ Historique complet de chaque lead
- ✅ WhatsApp integration fonctionnelle
- ✅ Fallback à localStorage en cas de panne API
- ✅ Sécurité améliorée

---

## ❓ DÉPANNAGE

### Problème: "Lead submission failed"
→ Vérifier: `VITE_PUBLIC_API_BASE_URL` dans `.env`
→ Vérifier: CORS en production (pas localhost)
→ Vérifier: Logs du serveur pour erreur API

### Problème: "Email not received"
→ Vérifier: `LEADS_TO` address est correcte
→ Vérifier: Credentials SMTP sont valides
→ Vérifier: Spam folder
→ Tester: `curl -X POST ...` manuellement

### Problème: "Form redirects but no lead saved"
→ Vérifier: Network tab (F12) → voir error 500?
→ Vérifier: Server logs → error details?
→ Vérifier: .env variables configurées?

---

## 📞 SUPPORT TECHNIQUE

En cas de problème après déploiement:

1. **Vérifier les logs du serveur**
   ```bash
   # Render.com
   render logs --service edugrowth
   
   # Ou SSH
   tail -f /var/log/edugrowth/app.log
   ```

2. **Tester l'API directement**
   ```bash
   curl -X POST https://edugrowth.tn/api/leads \
     -H "Content-Type: application/json" \
     -d '{"name":"Test","email":"test@test.com","phone":"123"}'
   ```

3. **Vérifier les variables .env**
   ```bash
   # Ne pas révéler les passwords mais vérifier qu'elles existent:
   cat /path/to/.env | grep -E "LEADS_TO|VITE_PUBLIC_API|SMTP_"
   ```

4. **Rollback si nécessaire**
   ```bash
   git revert HEAD
   git push origin main
   ```

---

## ✅ CHECKLIST DE DÉPLOIEMENT

- [ ] Fichiers modifiés vérifiés (git diff)
- [ ] Build local réussit: `npm run build`
- [ ] `.env` en production mis à jour
- [ ] SMTP configuré et testé
- [ ] Commits créés avec messages détaillés
- [ ] Push vers main réalisé
- [ ] Déploiement automatic lancé (si CI/CD)
- [ ] Email de lead test reçu
- [ ] Formulaires testés en production
- [ ] Pas d'erreurs console (F12 DevTools)
- [ ] WhatsApp integration fonctionne
- [ ] Logs serveur surveillés pour erreurs

---

**Date:** 30 juillet 2026
**Créateur:** Full-Stack Audit Agent
**Urgence:** 🔴 CRITIQUE - Fix immédiat

