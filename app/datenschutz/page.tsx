import { Header } from "@/components/header-wrapper"
import { Footer } from "@/components/footer"
import { BreadcrumbJsonLd } from "@/components/breadcrumb-jsonld"

export const metadata = {
  title: "Datenschutz — SQ Schmidt Qualitätssicherung",
  description: "Datenschutzerklärung der SQ Schmidt Qualitätssicherung für das Bauwesen",
}

export default function DatenschutzPage() {
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "Datenschutz" }]} />
      <Header />
      <main className="pt-32 pb-24">
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          <h1 className="text-4xl font-bold tracking-tight text-foreground mb-2">Datenschutzerklärung</h1>
          <p className="text-muted-foreground mb-12">Stand: März 2026</p>

          <div className="space-y-10">

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">1. Verantwortlicher</h2>
              <p className="text-muted-foreground leading-relaxed">
                SQ Schmidt Qualitätssicherung für das Bauwesen<br />
                Dipl.-Ing. Gerhard Schmidt<br />
                Marktplatz 21, 78647 Trossingen<br />
                Telefon: 07726 / 929394<br />
                E-Mail: <a href="mailto:sqs@sq-sv.de" className="text-primary hover:underline">sqs@sq-sv.de</a>
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">2. Erhebung und Speicherung personenbezogener Daten</h2>
              <p className="text-muted-foreground leading-relaxed">
                Beim Besuch unserer Website werden durch den Browser automatisch Informationen an den Server
                übermittelt. Dies sind: Browsertyp und -version, verwendetes Betriebssystem, Referrer-URL,
                Hostname des zugreifenden Rechners sowie Uhrzeit der Serveranfrage. Diese Daten sind nicht
                bestimmten Personen zuordenbar und werden nicht mit Daten aus anderen Quellen zusammengeführt.
                Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">3. Hosting</h2>
              <p className="text-muted-foreground leading-relaxed">
                Diese Website wird gehostet bei Vercel Inc., 340 Pine Street, Suite 701, San Francisco, CA 94104, USA.
                Mit Vercel wurde ein Auftragsverarbeitungsvertrag (AVV) gemäß Art. 28 DSGVO geschlossen.
                Weitere Informationen finden Sie in der Datenschutzerklärung von Vercel:{" "}
                <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                  vercel.com/legal/privacy-policy
                </a>
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">4. Content Management System (CMS)</h2>
              <p className="text-muted-foreground leading-relaxed">
                Zur Verwaltung der Inhalte dieser Website nutzen wir Sanity AS, Storgata 8, 0155 Oslo, Norwegen.
                Sanity speichert und verarbeitet die redaktionellen Inhalte unserer Website. Bei der Nutzung
                können technische Daten (z.B. IP-Adressen) an Server von Sanity übermittelt werden.
                Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse am Betrieb der Website).
                Weitere Informationen:{" "}
                <a href="https://www.sanity.io/legal/privacy" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                  sanity.io/legal/privacy
                </a>
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">5. Kontaktformular und E-Mail-Versand</h2>
              <p className="text-muted-foreground leading-relaxed">
                Wenn Sie uns per Kontaktformular Anfragen zukommen lassen, werden Ihre Angaben aus dem
                Anfrageformular inklusive der von Ihnen angegebenen Kontaktdaten zwecks Bearbeitung der
                Anfrage und für den Fall von Anschlussfragen bei uns gespeichert. Diese Daten geben wir
                nicht ohne Ihre Einwilligung weiter. Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO.
                <br /><br />
                Für den Versand der Kontaktformular-Nachrichten nutzen wir den Dienst Resend (Resend Inc.,
                San Francisco, USA). Dabei werden die von Ihnen eingegebenen Daten (Name, E-Mail, Nachricht)
                an Resend zur E-Mail-Zustellung übermittelt. Weitere Informationen:{" "}
                <a href="https://resend.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                  resend.com/legal/privacy-policy
                </a>
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">6. Cookies</h2>
              <div className="text-muted-foreground leading-relaxed space-y-4">
                <p>
                  Diese Website verwendet keine Cookies zu Tracking- oder Werbezwecken.
                </p>
                <p>
                  <strong className="text-foreground">Funktionale Cookies:</strong> Wir setzen einen Cookie
                  zur Speicherung Ihrer Cookie-Banner-Einstellung ({'"'}cookies_accepted{'"'}). Dieser Cookie ist
                  technisch notwendig und wird nur lokal in Ihrem Browser gespeichert (localStorage).
                  Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO.
                </p>
                <p>
                  <strong className="text-foreground">Analyse-Cookies:</strong> Vercel Analytics setzt keine
                  eigenen Cookies. Die Auswertung erfolgt ohne personenbezogene Daten und ohne Cookies.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">7. Analyse-Tools</h2>
              <p className="text-muted-foreground leading-relaxed">
                Diese Website nutzt Vercel Analytics zur anonymen Auswertung von Seitenaufrufen.
                Es werden keine personenbezogenen Daten gespeichert und keine Cookies gesetzt.
                Die Daten werden ausschließlich aggregiert und anonym verarbeitet.
                Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an der
                Analyse der Websitenutzung).
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">8. Ihre Rechte</h2>
              <p className="text-muted-foreground leading-relaxed">
                Sie haben das Recht auf Auskunft über die bei uns gespeicherten personenbezogenen Daten
                (Art. 15 DSGVO), Berichtigung unrichtiger Daten (Art. 16 DSGVO), Löschung Ihrer Daten
                (Art. 17 DSGVO), Einschränkung der Verarbeitung (Art. 18 DSGVO), Datenübertragbarkeit
                (Art. 20 DSGVO) sowie Widerspruch gegen die Verarbeitung (Art. 21 DSGVO).
                <br /><br />
                Zur Ausübung Ihrer Rechte wenden Sie sich an: <a href="mailto:sqs@sq-sv.de" className="text-primary hover:underline">sqs@sq-sv.de</a>
                <br /><br />
                Sie haben zudem das Recht, sich bei einer Datenschutz-Aufsichtsbehörde zu beschweren.
                Die zuständige Behörde in Baden-Württemberg ist der Landesbeauftragte für den Datenschutz
                und die Informationsfreiheit Baden-Württemberg.
              </p>
            </section>

          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
