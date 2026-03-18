# Meyso Business Template

Professionelles Next.js Website-Template fuer Handwerker, Sachverstaendige und Dienstleister.

## Tech Stack
- Next.js 16 (App Router)
- Sanity CMS
- Tailwind CSS + shadcn/ui
- Vercel Hosting
- Resend (Email)

## Neuen Kunden einrichten (10 Schritte)

1. Repo klonen: `git clone https://github.com/businessfabian/meyso-template`
2. Sanity Projekt anlegen: `npx sanity init` → neue Project ID notieren
3. `.env.local` anlegen (siehe `.env.example`)
4. `config.ts` anpassen (Firmenname, Sections, Features)
5. `npm install && npm run dev`
6. Sanity Studio: `localhost:3000/studio` → Einstellungen befuellen
7. Vercel Projekt anlegen → Env Variables setzen
8. Domain verbinden
9. Admin Passwort setzen (`ADMIN_PASSWORD`)
10. Kunde einweisen: `ihre-domain.de/admin`

## Env Variables

Siehe `.env.example` fuer alle benoetigten Variablen.

## Sanity Studio

Erreichbar unter `/studio` (nur lokal) oder auf sanity.io/manage

## Admin Dashboard

Erreichbar unter `/admin` — Login mit `ADMIN_PASSWORD`