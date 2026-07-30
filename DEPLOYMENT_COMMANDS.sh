#!/bin/bash
# ========================================
# EDUGROWTH DEPLOYMENT COMMANDS
# Critical Lead Capture Form Fix
# Date: 30 juillet 2026
# ========================================

# STEP 1: Verify changes
git diff backend/server.js | head -100
git diff src/components/LeadCaptureForm.jsx | head -80

# STEP 2: Stage all changes
git add .env.example
git add backend/server.js
git add src/components/LeadCaptureForm.jsx
git add AUDIT_COMPLET_2026_JUILLET.md
git add package-lock.json

# STEP 3: Commit with meaningful message
git commit -m "🚨 CRITICAL FIX: Implement lead capture API endpoint and fix form submission

This commit fixes the critical issue causing 0 prospects/day:

CHANGES:
- Add POST /api/leads endpoint to backend/server.js
  * Saves lead data to email (SMTP)
  * Validates required fields (name, email, phone)
  * Includes comprehensive lead information (segment, source, UTM params)

- Refactor LeadCaptureForm.jsx to send to server
  * Now sends lead data to /api/leads endpoint
  * Falls back to localStorage if API fails
  * Maintains WhatsApp integration
  * Improved error handling and logging

- Improve security headers in backend
  * Add HSTS (HTTP Strict-Transport-Security)
  * Add X-Content-Type-Options
  * Add X-Frame-Options
  * Add Referrer-Policy
  * Remove localhost from production CORS origins

- Update .env.example with proper defaults
  * Add LEADS_TO variable for lead email destination
  * Add VITE_PUBLIC_API_BASE_URL configuration
  * Set proper NODE_ENV defaults
  * Add documentation for VITE_META_PIXEL_ID

IMPACT:
✅ Leads will now be captured on server
✅ Forms will work correctly
✅ Email notifications to team
✅ Improved security posture
✅ Proper environment configuration

TESTING REQUIRED:
- Send test lead from /lp/study-abroad
- Send test lead from /lp/outsourcing
- Verify emails arrive at LEADS_TO address
- Test WhatsApp integration still works
- Verify no console errors"

# STEP 4: Show the diff summary
echo ""
echo "========================================="
echo "COMMIT SUMMARY"
echo "========================================="
git log --oneline -1
git diff --stat HEAD~1

# STEP 5: Push to main
echo ""
echo "Ready to push. Run this command:"
echo "git push origin main"

# After push, verify deployment:
echo ""
echo "========================================="
echo "POST-DEPLOYMENT VERIFICATION"
echo "========================================="
echo "1. Check server logs: tail -f /var/log/edugrowth/app.log"
echo "2. Test lead form: curl -X POST https://edugrowth.tn/api/leads -H 'Content-Type: application/json' -d '{\"name\":\"Test\",\"email\":\"test@example.com\",\"phone\":\"123456\",\"objective\":\"Test\"}'"
echo "3. Check email received at LEADS_TO address"
echo "4. Test UI at: https://edugrowth.tn/lp/study-abroad"
