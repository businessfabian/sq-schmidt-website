export const revalidate = 0

import { Header } from "@/components/header-wrapper"
import { Footer } from "@/components/footer"
import { getEinstellungen } from "@/sanity/lib/queries"

export const metadata = {
  title: "Impressum | SQ Schmidt Qualitaetssicherung",
}

export default async function ImpressumPage() {
  const e = await getEinstellungen()

  const name = e?.inhaberName ?? "Dipl.-Ing. Gerhard Schmidt"
  const strasse = e?.strasseHausnummer ?? "Marktplatz 21"
  const plzOrt = e?.plzOrt ?? "78647 Trossingen"
  const telefon = e?.telefon ?? "07726 / 929394"
  const email = e?.email ?? "sqs@sq-sv.de"
  const ustId = e?.ustId ?? ""
  const kleinunternehmer = e?.kleinunternehmer ?? true
  const beruf = e?.berufsbezeichnung ?? "Oeffentlich bestellter und vereidigter Sachverstaendiger"
  const kammer = e?.bestellendeKammer ?? "IHK Konstanz"
  const haftpflichtVersicherer = e?.berufshaftpflichtVersicherer ?? ""
  const haftpflichtOrt = e?.berufshaftpflichtOrt ?? ""
  const verantwortlicher = e?.verantwortlicherInhalte ?? name

  return (
    <>
      <Header einstellungen={e} />
      <main className="min-h-screen bg-background">
        <div className="mx-auto max-w-3xl px-6 lg:px-8 py-32">
          <h1 className="text-4xl font-bold text-foreground mb-12" style={{ fontFamily: "var(--font-display)" }}>
            Impressum
          </h1>

          <div className="prose prose-neutral dark:prose-invert max-w-none space-y-8">

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">Angaben gemaess Par. 5 TMG</h2>
              <div className="text-muted-foreground space-y-1">
                <p className="font-medium text-foreground">{name}</p>
                <p>SQ Schmidt Qualitaetssicherung fuer das Bauwesen</p>
                <p>{strasse}</p>
                <p>{plzOrt}</p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">Kontakt</h2>
              <div className="text-muted-foreground space-y-1">
                <p>Telefon: <a href={"tel:+" + telefon.replace(/\D/g,"")} className="text-primary hover:underline">{telefon}</a></p>
                <p>E-Mail: <a href={"mailto:" + email} className="text-primary hover:underline">{email}</a></p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">Umsatzsteuer</h2>
              <div className="text-muted-foreground">
                {kleinunternehmer ? (
                  <p>Gemaess Par. 19 UStG wird keine Umsatzsteuer berechnet (Kleinunternehmerregelung).</p>
                ) : (
                  <p>Umsatzsteuer-Identifikationsnummer gemaess Par. 27a UStG: {ustId}</p>
                )}
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">Berufsbezeichnung und berufsrechtliche Regelungen</h2>
              <div className="text-muted-foreground space-y-1">
                <p>Berufsbezeichnung: {beruf}</p>
                <p>Zustaendige Bestellungskoerperschaft: {kammer}</p>
              </div>
            </section>

            {(haftpflichtVersicherer || haftpflichtOrt) && (
              <section>
                <h2 className="text-xl font-semibold text-foreground mb-3">Berufshaftpflichtversicherung</h2>
                <div className="text-muted-foreground space-y-1">
                  {haftpflichtVersicherer && <p>Versicherer: {haftpflichtVersicherer}</p>}
                  {haftpflichtOrt && <p>Sitz: {haftpflichtOrt}</p>}
                </div>
              </section>
            )}

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">Verantwortlich fuer den Inhalt nach Par. 18 Abs. 2 MStV</h2>
              <div className="text-muted-foreground space-y-1">
                <p>{verantwortlicher}</p>
                <p>{strasse}</p>
                <p>{plzOrt}</p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">Haftung fuer Inhalte</h2>
              <p className="text-muted-foreground leading-relaxed">
                Als Diensteanbieter sind wir gemaess Par. 7 Abs.1 TMG fuer eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach Par. 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet, uebermittelte oder gespeicherte fremde Informationen zu ueberwachen oder nach Umstaenden zu forschen, die auf eine rechtswidrige Taetigkeit hinweisen.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">Haftung fuer Links</h2>
              <p className="text-muted-foreground leading-relaxed">
                Unser Angebot enthaelt Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb koennen wir fuer diese fremden Inhalte auch keine Gewaehr uebernehmen. Fuer die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">Urheberrecht</h2>
              <p className="text-muted-foreground leading-relaxed">
                Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfaeltigung, Bearbeitung, Verbreitung und jede Art der Verwertung ausserhalb der Grenzen des Urheberrechtes beduerfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.
              </p>
            </section>

          </div>
        </div>
      </main>
      <Footer einstellungen={e} />
    </>
  )
}