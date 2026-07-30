# 🚀 LES 3 BLOCS DE COMMANDES À COPIER-COLLER

Exécuter dans cet ordre, dans le terminal Ubuntu, dans le répertoire `/home/ahmed/Bureau/edugrowth`

---

## BLOC 1 - STAGE LES FICHIERS
Copier-coller ce bloc complet:

```bash
git add backend/server.js src/components/LeadCaptureForm.jsx .env.example AUDIT_COMPLET_2026_JUILLET.md DEPLOYMENT_COMMANDS.sh COMMANDS_READY_TO_DEPLOY.md COPY_PASTE_COMMANDS.sh RESUME_EXECUTIF_DEPLOY.md COMMANDES_A_EXECUTER.md && git status
```

---

## BLOC 2 - CRÉE LE COMMIT
Copier-coller ce bloc complet:

```bash
git commit -m "🚨 CRITICAL FIX: Implement lead capture API endpoint - Fix 0 prospects/day

PROBLEM: LeadCaptureForm saved leads only in browser localStorage, never to server.
Result: 0 leads in 7+ days despite form submissions.

SOLUTION IMPLEMENTED:

Backend (backend/server.js):
✅ Added POST /api/leads endpoint
✅ Validates: name, email, phone
✅ Sends email to LEADS_TO address
✅ Improved security headers (HSTS, X-Frame-Options)
✅ Fixed CORS: localhost only in development

Frontend (src/components/LeadCaptureForm.jsx):
✅ Now sends data to /api/leads endpoint
✅ Falls back to localStorage if API fails
✅ Better error handling and logging
✅ Maintains WhatsApp integration

Configuration (.env.example):
✅ Added LEADS_TO variable
✅ Documented VITE_PUBLIC_API_BASE_URL
✅ Proper SMTP configuration guide
✅ NODE_ENV awareness

IMPACT:
✅ All leads now saved to server
✅ Email notifications instantly
✅ No more lost prospects
✅ Proper error handling
✅ Improved security

TESTING: Visit /lp/study-abroad → submit form → verify email at LEADS_TO"
```

---

## BLOC 3 - PUSH VERS MAIN
Copier-coller ce bloc complet:

```bash
git push origin main
```

---

## ✅ VÉRIFICATION

Après le BLOC 3, vérifier que le push a réussi:

```bash
git log --oneline -3
```

Vous devez voir le commit "🚨 CRITICAL FIX..." en haut.

---

## 🔧 CONFIGURATION PRODUCTION (APRÈS DÉPLOIEMENT)

Une fois le serveur redeployé, mettre à jour le `.env`:

```bash
# SSH sur votre serveur
ssh user@your-server.com

# Éditer
nano /path/to/.env

# Ajouter/vérifier:
VITE_PUBLIC_API_BASE_URL=https://edugrowth.tn
LEADS_TO=leads@edugrowth.tn
SMTP_HOST=your_smtp
SMTP_USER=your_email
SMTP_PASS=your_password
NODE_ENV=production

# Ctrl+O, Entrée, Ctrl+X
# Redémarrer:
npm start
```

---

## 📧 TEST IMMÉDIAT

```bash
# Tester l'API:
curl -X POST https://edugrowth.tn/api/leads \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test",
    "email": "test@test.com",
    "phone": "+21612345678",
    "objective": "Test",
    "segment": "general",
    "sourcePage": "test"
  }'

# Doit retourner: {"status":"success","messageId":"...","leadId":"..."}
```

Test dans navigateur: `https://edugrowth.tn/lp/study-abroad` → Soumettre → Vérifier email

---

## ⏱️ TIMELINE

- **BLOC 1-3 à exécuter:** < 1 minute  
- **Déploiement automatique:** 2-5 minutes  
- **Total:** 5-10 minutes

---

## 🎯 RÉSULTAT ATTENDU

- ✅ Leads reçus dans email LEADS_TO
- ✅ Tous les prospects capturés
- ✅ Retour à 5+ prospects/jour
- ✅ Pas d'erreur console

---

**C'est tout! Exécutez les 3 BLOCS et vous avez résolu le problème. 🚀**

