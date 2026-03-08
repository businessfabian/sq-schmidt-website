import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export const metadata = {
  title: "Impressum — SQ Schmidt Qualitätssicherung",
  description: "Impressum der SQ Schmidt Qualitätssicherung für das Bauwesen",
}

export default function ImpressumPage() {
  return (
    <>
      <Header />
      <main className="pt-32 pb-24">
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          <h1 className="text-4xl font-bold tracking-tight text-foreground mb-2">Impressum</h1>
          <p className="text-muted-foreground mb-12">Angaben gemäß § 5 TMG</p>

          <div className="space-y-10">

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">Anbieter</h2>
              <p className="text-muted-foreground leading-relaxed">
                SQ Schmidt Qualitätssicherung für das Bauwesen<br />
                [Inhaber Vorname Nachname]<br />
                Marktplatz 21<br />
                78647 Trossingen
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">Kontakt</h2>
              <p className="text-muted-foreground leading-relaxed">
                Telefon: 07726 / 929394<br />
                E-Mail: <a href="mailto:sqs@sq-sv.de" className="text-primary hover:underline">sqs@sq-sv.de</a>
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">Berufsbezeichnung und berufsrechtliche Regelungen</h2>
              <p className="text-muted-foreground leading-relaxed">
                Öffentlich bestellter und vereidigter Sachverständiger<br />
                Bestellt durch: IHK Konstanz<br />
                Es gelten die berufsrechtlichen Regelungen der IHK Konstanz.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">Umsatzsteuer-ID</h2>
              <p className="text-muted-foreground leading-relaxed">
                [USt-ID hier eintragen, falls vorhanden]
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV</h2>
              <p className="text-muted-foreground leading-relaxed">
                [Inhaber Vorname Nachname]<br />
                Marktplatz 21<br />
                78647 Trossingen
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">Streitschlichtung</h2>
              <p className="text-muted-foreground leading-relaxed">
                Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:{" "}
                <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                  https://ec.europa.eu/consumers/odr/
                </a>
                <br /><br />
                Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer
                Verbraucherschlichtungsstelle teilzunehmen.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">Haftung für Inhalte</h2>
              <p className="text-muted-foreground leading-relaxed">
                Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den
                allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht
                verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen
                zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">Haftung für Links</h2>
              <p className="text-muted-foreground leading-relaxed">
                Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben.
                Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der
                verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">Urheberrecht</h2>
              <p className="text-muted-foreground leading-relaxed">
                Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen
                Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der
                Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.
              </p>
            </section>

            <p className="text-sm text-muted-foreground pt-4 border-t border-border">
              Webseite erstellt von{" "}
              <a href="https://meyso.de" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                Meyso
              </a>
            </p>

          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
