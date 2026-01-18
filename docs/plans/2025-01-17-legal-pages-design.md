# Legal Pages Design: Terms of Service & Privacy Policy

**Date:** 2025-01-17
**Status:** Implemented
**App:** Kairōs (iOS astrology app)
**Entity:** Zojer Studio LLC (United States)

## Overview

Create Terms of Service and Privacy Policy pages for zojer.studio, covering the Kairōs iOS app.

## Key Facts

| Aspect | Detail |
|--------|--------|
| Business entity | Zojer Studio LLC (US) |
| Age requirement | 13+ |
| Data storage | Supabase (auth), Apple CloudKit (chart data), iCloud Drive (backups) |
| Third parties | None besides Supabase and Apple services |
| Analytics | None |
| Monetization | Free (3 charts), $6.99/mo subscription, $30 lifetime |

## Privacy Policy Structure

### 1. What We Collect
- **Account information**: Email address or Apple ID (for authentication)
- **Chart data**: Chart names, dates, times, chart locations, and associated metadata
- **Display preferences**: How you customize chart appearance
- **Backup files**: Only when you choose to export (stored in your iCloud Drive)

### 2. What We Don't Collect
- No analytics or usage tracking
- No advertising identifiers
- No location tracking (chart locations are user-provided, not GPS)
- We don't sell or share your data with third parties

### 3. Where Your Data Lives
- **Supabase**: Authentication data (email, account ID) - US-based
- **Apple CloudKit**: Chart data and preferences - Apple's infrastructure
- **iCloud Drive**: Backup files you create - your personal iCloud storage

### 4. Third-Party Services
- Supabase (authentication infrastructure)
- Apple (CloudKit, StoreKit, Sign in with Apple)

### 5. Data Security
- Authentication data encrypted via Supabase
- Chart data protected by Apple's CloudKit security
- All data transmitted over HTTPS

### 6. Data Retention & Deletion
- Delete your account: Removes authentication data from Supabase
- Delete chart data: Via the app or iCloud settings
- We don't retain data after deletion (processing may take up to 30 days)

### 7. Your Rights
- **Access**: View your data in the app
- **Export**: Use the backup feature
- **Delete**: Remove your account and data
- **GDPR (EU users)**: Data processed in the US; you have rights to access, correct, and delete
- **CCPA (California)**: We don't sell personal information

### 8. Children's Privacy
- Kairōs is intended for users 13 and older
- We don't knowingly collect data from children under 13

### 9. Changes to This Policy
- Material changes communicated via app update notes or email
- Continued use after changes constitutes acceptance

### 10. Contact
- Email: [contact email]
- Zojer Studio LLC

---

## Terms of Service Structure

### 1. Acceptance of Terms
- By using Kairōs, you agree to these terms
- You must be 13 or older to use the app

### 2. Your Account
- You're responsible for keeping your credentials secure
- One account per person
- Accurate information required

### 3. Your Data
- Your chart data belongs to you
- We store it via Supabase and Apple CloudKit to provide the service
- You can export or delete your data at any time

### 4. Subscriptions & Purchases

**Free Tier:**
- Create and save up to 3 charts
- Full app functionality

**Monthly Subscription ($6.99/month):**
- Unlimited chart creation and saving
- Auto-renews until cancelled
- Cancel anytime via App Store settings
- No refunds for partial periods

**Lifetime License ($30 one-time):**
- Unlimited chart creation and saving for the lifetime of the app
- "Lifetime" refers to the product's lifespan, not the purchaser's
- Future features or major new functionality may require separate purchase
- Non-refundable after purchase (per App Store policy)

**All Purchases:**
- Processed through Apple's App Store
- Refund requests handled by Apple
- Prices may vary by region

### 5. Acceptable Use
You agree not to:
- Reverse-engineer or decompile the app
- Use the app for illegal purposes
- Attempt to access other users' data
- Abuse or overload our services

### 6. Disclaimer
- Kairōs is for entertainment and personal insight
- Not professional, medical, psychological, or financial advice
- Astrological interpretations are for informational purposes only
- We make no guarantees about accuracy of calculations or interpretations

### 7. Limitation of Liability
- To the maximum extent permitted by law, Zojer Studio LLC is not liable for indirect, incidental, or consequential damages
- Our total liability is limited to the amount you paid us in the past 12 months

### 8. Termination
- You may delete your account at any time
- We may terminate accounts that violate these terms
- Upon termination, your right to use the app ends

### 9. Changes to Terms
- We may update these terms
- Material changes communicated via app or email
- Continued use after changes constitutes acceptance

### 10. Governing Law
- These terms are governed by the laws of the United States
- Disputes resolved in courts of [your state]

### 11. Contact
- Questions: [contact email]
- Zojer Studio LLC

---

## Implementation Plan

### Pages to Create
1. `app/terms/page.tsx` - Terms of Service
2. `app/privacy/page.tsx` - Privacy Policy

### Design Requirements
- Match zojer.studio styling (Whyte font, theme support)
- Clean, readable layout with clear headings
- Last updated date at top
- Contact information at bottom

### Footer Update
- Add links to Terms and Privacy from main page footer

### Content Style
- Plain language (minimal legalese)
- Short paragraphs
- Tables where helpful
- Clear section headings

---

## Implementation Notes

**Completed:** January 17, 2025

**Files created:**
- `app/terms/page.tsx` - Terms of Service
- `app/privacy/page.tsx` - Privacy Policy
- `app/page.tsx` - Updated with footer links

**Configuration:**
- Contact email: pageofswrds@zojer.studio
- Governing law: State of Washington, United States
