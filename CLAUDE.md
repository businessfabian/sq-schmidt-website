# sq-schmidt-website

Agentur-Kundenprojekt fuer SQ Schmidt Qualitaetssicherung. Kontakt: Gerhard Schmidt (ueber Dave). Basiert auf dem meyso-kmu-template. Das ist ein ECHTER LIVE-KUNDE, kein Demo, kein Template. Produktiver Einsatz.

## Natur dieses Repos

Das ist ein produktives Kundenprojekt. Konsequenzen fuer wie man hier arbeitet:
- Content ist real und wird von Gerhard Schmidt freigegeben
- Aenderungen am sichtbaren Content immer mit Dave absprechen, der stimmt das dann mit Gerhard ab
- Keine experimentellen Design-Aenderungen auf eigene Faust
- Breaking Changes sind hier NICHT niedrigschwellig, anders als bei demo-schreinerei
- Bugs werden priorisiert gefixt weil es ein zahlender Kunde ist

Wenn eine Verbesserung hier entwickelt wird die auch anderen Projekten helfen wuerde: ins kmu-template zurueckportieren vorschlagen, nicht direkt in alle Projekte kopieren.

## Sprache
Antworte auf Deutsch.

## Stack

| Technologie   | Version |
|---------------|---------|
| Next.js       | 16.1.6  |
| React         | 19.2.4  |
| TypeScript    | 5.7.3   |
| Sanity CMS    | 4.22.0  |
| Tailwind CSS  | 4.2.0   |
| Resend        | 6.9.4   |
| Vercel Analytics | 1.6.1 |

## Beziehung zum kmu-template

Basiert auf dem meyso-kmu-template (kein Git-Fork, eigenstaendiges Repo auf Template-Basis). Das heisst:
- Alle Regeln aus `D:\dev\meyso\meyso-kmu-template\CLAUDE.md` gelten hier auch
- `config.ts` (eine Datei, nicht config/modules.ts + config/site.ts wie im aktuellen Template) ist der Ort fuer kundenspezifische Anpassungen
- Bei Updates am kmu-template: diesem Repo manuell nachziehen falls relevant und Gerhard zustimmt

## Aktuelle Konfiguration

### config.ts — Sections

| Section     | Status |
|-------------|--------|
| hero        | aktiv  |
| leistungen  | aktiv  |
| ueber       | aktiv  |
| partner     | aktiv  |
| zertifikate | aktiv  |
| kontakt     | aktiv  |

### config.ts — Features

| Feature        | Status      |
|----------------|-------------|
| kontaktformular | aktiv      |
| seminare        | aktiv      |
| newsletter      | deaktiviert |
| buchung         | deaktiviert |
| blog            | deaktiviert |
| referenzen      | deaktiviert |

### config.ts — Dashboard-Tabs

Alle aktiv: kontakt, hero, ueber, leistungen, seminare, partner, zertifikate, navigation, seo

### Site-Daten (config.ts + Sanity)

- **Firma:** SQ Schmidt Qualitaetssicherung
- **Branche:** Sachverstaendiger (IHK Konstanz zertifiziert), Qualitaetssicherung / Industrial QA
- **Logo-Kuerzel:** SQ
- **Telefon:** 07726 / 929394
- **E-Mail:** sqs@sq-sv.de
- **Adresse:** Marktplatz 21, 78647 Trossingen
- **Staging-Domain:** sq-schmidt-website.vercel.app
- **Live-Domain:** (TODO - nicht im Repo erkennbar, Dave fragen)
- **Farben:** via Tailwind CSS, kein explizites Hex in config.ts (TODO - pruefen ob in globals.css)
- **Fonts:** (TODO - nicht im explorer-Output erfasst)

### Custom Content ueber Template hinaus

**Pages:**
- `/leistungen` + `/leistungen/[slug]`
- `/seminare` + `/seminare/[slug]`
- `/vita`
- `/aktuelles`
- `/zertifikate`
- `/partner`
- `/kontakt`
- `/impressum`
- `/datenschutz`

**Sanity-Schemas (custom):**
- `leistung.ts`
- `seminartermin.ts`
- `zertifikat.ts`
- `partner.ts`
- `einstellungen.ts`
- `navigation.ts`

**API-Routes:**
- 14 Admin-Endpoints
- Kontaktformular-Handler
- Token-Login

**Komponenten (custom):**
- Admin-Dashboard
- Breadcrumb mit JSON-LD
- Cookie-Banner
- Tawk.to Chat-Widget

## Bekannte offene Punkte

- `package.json name` ist `"my-project"` statt `"sq-schmidt-website"` — beim naechsten Commit mit fixen
- Keine `vercel.json` im Repo. Deployment laeuft ueber Vercel Default. Bei Unsicherheit Dave fragen bevor etwas am Deploy-Flow geaendert wird
- Case Study zu SQ Schmidt existiert (laut Memory), liegt aber vermutlich im meyso-website Repo, nicht hier

## Workflow

- Vor Aenderungen: explorer Subagent fuer Kontext
- Nach Aenderungen: code-reviewer Subagent, besonders streng weil produktiver Kunde
- Commit-Frequenz: nach jedem logisch abgeschlossenen Block
- Commits: conventional commits, deutsch wo natuerlich
- Bei sichtbaren Content-Aenderungen: erst mit Dave besprechen, bevor gebaut wird
- Pushe nach main nach code-reviewer Go
- Nach Push: im Zweifel Dave informieren damit er checken kann ob Gerhard was merkt

## Konventionen (erben vom kmu-template)

- KEINE em-dashes (Gedankenstriche, U+2014). Komma, Punkt, Zeilenumbruch stattdessen.
- Deutsch fuer UI-Texte, Englisch fuer Code
- Umlaute als ae/oe/ue in Code-Strings
- File Naming: kebab-case Files, PascalCase Components
- TypeScript strict, kein `any` ohne Kommentar
- Tailwind only, keine inline styles
- GROQ ohne Wildcards, explizite Felder

## Was du IMMER tun sollst

- Daran denken dass das ein echter Kunde ist, produktiver Einsatz
- Bei Content-Aenderungen: erst Dave fragen
- Bei unklaren Deploy-Fragen: Dave fragen statt raten
- Bei wiederverwendbaren Verbesserungen: vorschlagen ins kmu-template zu portieren

## Was du NIE tun sollst

- Em-dashes schreiben
- Sichtbaren Content ohne Absprache aendern
- Experimentelle Design-Aenderungen pushen
- `package.json name` in irgendwas ausser `"sq-schmidt-website"` aendern (sobald der Fix gemacht ist)
- Breaking Changes ohne explizites Go
- Direkte Kunden-Kommunikation simulieren, Dave ist der einzige Kontakt zu Gerhard
- Force Push, --no-verify, Git Hook Skipping

## Geschaefts-Kontext

- SQ Schmidt Qualitaetssicherung ist einer von Daves Agentur-Kunden
- Kontakt: Gerhard Schmidt (ueber Dave)
- Branche: Qualitaetssicherung, Industrial QA, Sachverstaendiger
- Aktuelle Beziehung: produktive Website im Betrieb, keine akuten Features geplant
- Bei Bug-Reports von Gerhard: schnelle Reaktion, weil Referenzkunde
