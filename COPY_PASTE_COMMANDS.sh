#!/bin/bash
# ==================================================
# 🚀 EDUGROWTH - COMMANDES GIT PRÊTES À COPIER-COLLER
# ==================================================
# Date: 30 juillet 2026
# Urgence: 🔴 CRITIQUE
# Problem: 0 leads/jour depuis 7 jours
# Solution: Implémenter l'endpoint /api/leads
# ==================================================

# ==========================================
# ÉTAPE 1: Vérifier les changements
# ==========================================
git status

# ==========================================
# ÉTAPE 2: Stage tous les changements
# ==========================================
git add backend/server.js src/components/LeadCaptureForm.jsx .env.example AUDIT_COMPLET_2026_JUILLET.md DEPLOYMENT_COMMANDS.sh COMMANDS_READY_TO_DEPLOY.md && git status

# ==========================================
# ÉTAPE 3: Commit avec message détaillé
# ==========================================
git commit -m "🚨 CRITICAL FIX: Implement lead capture API - Fix 0 prospects/day issue

PROBLEM IDENTIFIED:
- LeadCaptureForm saved leads only in browser localStorage
- No data was sent to server
- Leads were completely lost
- Caused 0 prospects/day (was 5/day normally)

SOLUTIONS IMPLEMENTED:

1️⃣ Backend Changes (backend/server.js):
   ✅ Added POST /api/leads endpoint
   ✅ Validates: name, email, phone (required)
   ✅ Sends email notification to LEADS_TO address
   ✅ Accepts: segment, sourcePage, utm_*, referrer
   ✅ Improved security headers (HSTS, X-Frame-Options, CSP)
   ✅ Fixed CORS: removed localhost from production

2️⃣ Frontend Changes (src/components/LeadCaptureForm.jsx):
   ✅ Now sends data to /api/leads endpoint via POST
   ✅ Falls back to localStorage if API fails
   ✅ Improved error handling and logging
   ✅ Maintains WhatsApp integration
   ✅ Better UTM parameter handling

3️⃣ Configuration (.env.example):
   ✅ Added LEADS_TO variable
   ✅ Documented VITE_PUBLIC_API_BASE_URL
   ✅ Added NODE_ENV for production awareness
   ✅ Proper SMTP configuration guide

FILES CHANGED:
 - backend/server.js (API endpoint + security)
 - src/components/LeadCaptureForm.jsx (API integration)
 - .env.example (configuration)
 - AUDIT_COMPLET_2026_JUILLET.md (full audit report)
 - DEPLOYMENT_COMMANDS.sh (deployment guide)
 - COMMANDS_READY_TO_DEPLOY.md (quick reference)

IMPACT:
✅ All leads now saved on server
✅ Email notifications to team
✅ No more lost prospects
✅ Improved security posture
✅ Proper environment configuration

TESTING REQUIRED AFTER DEPLOY:
1. Visit https://edugrowth.tn/lp/study-abroad
2. Fill and submit form
3. Verify email received at LEADS_TO address
4. Check WhatsApp opens correctly
5. Monitor server logs for errors

ESTIMATED TIME TO RECOVERY: Immediately after deploy"

# ==========================================
# ÉTAPE 4: Vérifier le commit
# ==========================================
git log --oneline -1 && git log --stat -1

# ==========================================
# ÉTAPE 5: Push vers main
# ==========================================
git push origin main

# ==========================================
# ÉTAPE 6: Vérifier le push
# ==========================================
git log --oneline -5

echo ""
echo "✅ COMMIT POUSSÉ VERS MAIN"
echo "🚀 Vérifier que le déploiement a démarré automatiquement (CI/CD)"
echo "📧 Vérifier les emails reçus à LEADS_TO après déploiement"
echo "🔍 Surveiller les logs: render logs ou tail -f /var/log/edugrowth/app.log"
