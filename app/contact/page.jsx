import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer";
import WhatsAppWidget from "../../components/WhatsAppWidget";
import { jsonLdContact } from "../../lib/schema";

export const metadata = {
  title: "Contact — The Outlier",
  description:
    "Neem contact op met The Outlier: hello@theoutlier.nl, Amsterdam NL — working internationally. Of start direct de assessment.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdContact) }}
      />
      <NavBar />
      <main className="page-stub">
        <div className="contact-grid">
          <div>
            <p className="kicker">Contact</p>
            <h1 style={{ fontSize: "clamp(40px,6vw,84px)", letterSpacing: "-0.04em", margin: "0 0 24px" }}>
              Have a project <span className="gold-italic">in mind</span>?
            </h1>
            <p className="lead">
              Vertel in twee zinnen waar je bureau tijd en marge verliest.
              We reageren binnen één werkdag — geen verkooppraatje, wel een eerlijk advies.
            </p>
            <div className="addr-block" style={{ marginTop: 26 }}>
              <strong style={{ color: "var(--slate)" }}>The Outlier</strong>
              <span>Amsterdam, NL — working internationally</span>
              <a href="mailto:hello@theoutlier.nl">hello@theoutlier.nl</a>
              <p className="muted" style={{ margin: "8px 0 0", fontSize: 14 }}>
                Liever direct een kwalificerend gesprek? <a href="/start">Start de assessment.</a>
              </p>
            </div>
          </div>

          <form className="form-card" action="/api/contact" method="POST">
            <label htmlFor="c-name" className="visually-hidden">Naam</label>
            <input id="c-name" name="name" placeholder="Naam" required autoComplete="name" />
            <label htmlFor="c-email" className="visually-hidden">E-mail</label>
            <input id="c-email" name="email" type="email" placeholder="E-mail" required autoComplete="email" />
            <label htmlFor="c-phone" className="visually-hidden">Telefoonnummer (optioneel)</label>
            <input id="c-phone" name="phone" type="tel" placeholder="Telefoonnummer (optioneel)" autoComplete="tel" />
            <label htmlFor="c-msg" className="visually-hidden">Bericht</label>
            <textarea id="c-msg" name="message" placeholder="Waar loopt je bureau tegenaan?" rows={4} required />
            <button className="form-btn" type="submit">Verstuur bericht</button>
            <p className="muted" style={{ margin: 0, fontSize: 13 }}>
              Je gegevens gaan alleen naar The Outlier. Geen nieuwsbrief, tenzij je er zelf om vraagt.
            </p>
          </form>
        </div>
      </main>
      <Footer />
      <WhatsAppWidget />
    </>
  );
}
