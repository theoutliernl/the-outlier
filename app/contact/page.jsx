export const metadata = {
  title: "Contact",
  description:
    "Neem contact op met The Outlier: hello@theoutlier.nl, Amsterdam NL — working internationally. Of start direct de assessment.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <main className="page-stub">
      <p className="kicker">Contact</p>
      <h1 style={{ fontSize: "clamp(40px,6vw,84px)", letterSpacing: "-0.04em", margin: "0 0 24px" }}>
        Have a project <span className="gold-italic">in mind</span>?
      </h1>
      <p className="lead">
        The Outlier · Amsterdam, NL — working internationally · hello@theoutlier.nl
      </p>
      <form className="form" action="/api/contact" method="POST" style={{ maxWidth: 520, display: "grid", gap: 12 }}>
        <label htmlFor="c-name" className="visually-hidden">Naam</label>
        <input id="c-name" name="name" placeholder="Naam" required />
        <label htmlFor="c-email" className="visually-hidden">E-mail</label>
        <input id="c-email" name="email" type="email" placeholder="E-mail" required />
        <label htmlFor="c-phone" className="visually-hidden">Telefoonnummer</label>
        <input id="c-phone" name="phone" type="tel" placeholder="Telefoonnummer" />
        <label htmlFor="c-msg" className="visually-hidden">Bericht</label>
        <textarea id="c-msg" name="message" placeholder="Waar loopt je bureau tegenaan?" rows={4} required />
        <button className="btn" type="submit">Verstuur</button>
      </form>
      <p className="muted" style={{ marginTop: 20 }}>
        Liever direct een kwalificerend gesprek? <a href="/start" style={{ color: "var(--gold)" }}>Start de assessment.</a>
      </p>
    </main>
  );
}