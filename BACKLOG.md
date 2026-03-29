# SQ Schmidt Website — Backlog

## Agent Tasks (Claude kann diese ausführen)

- [ ] Admin Dashboard: Anfragen-Ansicht mit Filter und Suche erweitern
- [ ] Blog-Bereich aufbauen (Sanity Schema + Seiten wie bei Meyso)
- [ ] Preise-Seite aus Sanity (dynamisch wie bei Meyso)
- [ ] Scroll-Animationen weiter ausbauen
- [ ] FAQ-Bereich auf der Website einbauen
- [ ] Live-Chat Widget einbinden (Tawk.to Script in Layout)
- [ ] Anfragen CSV-Export im Admin (Voraussetzung: Anfragen müssen erst in Sanity gespeichert werden)

## Manuell (kein Agent)

- Bewertungen von Google importieren — braucht Google Business API Key
- Sitemap bei Google Search Console einreichen — manuell im Browser
- Mehrsprachigkeit (DE/EN) — braucht Übersetzungen
- Hero Bild Upload testen — manuell prüfen

## ✅ Erledigt

- [x] Admin Dashboard
- [x] Scroll-Reveal Animationen + animierte Counter
- [x] Accessibility (Kontrast, Links, Headings)
- [x] Google PageSpeed API im Admin
- [x] Website-Analyse Tab im Admin
- [x] Performance + SEO Optimierung
- [x] Security Hardening
- [x] Footer Sitemap
- [x] Service Schema (strukturierte Daten)
- [x] Sitemap Auto-Submission an Google (via /api/revalidate)
- [x] Breadcrumb JSON-LD Schema auf allen Unterseiten
- [x] GA4 Conversion Tracking im Kontaktformular (generate_lead Event)
- [x] Mail Kill-Switch (lib/mail.ts — MAIL_ENABLED Env-Variable)
- [x] Auth Middleware für Admin-Routen (proxy.ts erweitert)
- [x] Dependency Cleanup (styled-components, date-fns entfernt)
- [x] Server Components (about, services, partners, certificates)
- [x] ISR Caching (revalidate=60 statt 0)
- [x] Favicon (app/icon.tsx)
