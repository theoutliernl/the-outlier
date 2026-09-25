import "./globals.css";

export default function Home() {
  return (
    <main className="root">
      <header className="nav">
        <span className="logo">OUTL<em>IER</em></span>
      </header>

      <section className="hero">
        <p className="kicker">AI &amp; Transformation Partner</p>
        <h1>
          Corporate experience.<br />
          Boutique <span className="gold-italic">execution</span>.
        </h1>
        <p className="lead">
          "I help boutique firms build practical systems backed by nearly two
          decades running that exact kind of complexity from the inside."
        </p>
        <div className="hero-cta">
          <a className="btn" href="#contact">Plan een gesprek</a>
          <a className="btn ghost" href="#diensten">Wat we doen</a>
        </div>
      </section>

      <section className="values">
        {[
          ["BOLD", "We challenge outdated ways of working. Bold isn't louder, it's the confidence to think differently."],
          ["INSIDER", "Experience matters. Not in theory. In practice. We know how organisations really work, from the inside."],
          ["SYSTEMS", "We don't optimise isolated tasks. We design systems. Strategy, people, process, technology and AI as one whole."],
          ["HUMAN", "Technology should support people. Not replace them. Experts stay at the centre of every transformation."],
          ["EVOLVING", "Growth is a process, not a one-time event. Optimisation is built in, never bolted on."],
        ].map(([k, t]) => (
          <div className="value" key={k}>
            <h3>{k.slice(0, -1)}<span className="gold-italic">{k.slice(-1)}</span></h3>
            <p>{t}</p>
          </div>
        ))}
      </section>

      <section className="services" id="diensten">
        <h2>Waar we in duiken</h2>
        <div className="services-grid">
          {[
            ["Strategie", "Helderheid over waar je bedrijf heen gaat, en wat er ertussen staat."],
            ["Brand", "Een merk dat het verhaal van je bureau draagt, niet versiert."],
            ["Web", "Sites die verkopen: snel, verifieerbaar en in je stem."],
            ["AI Systemen", "Praktische automatisering waar je consultants echte uren per week aan overhouden."],
            ["Transformatie", "Mensen, proces en techniek als één geheel, van binnenuit geleid."],
          ].map(([t, d]) => (
            <div className="card" key={t}>
              <h3>{t}</h3>
              <p>{d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="founder">
        <h2>De founder</h2>
        <p className="lead">
          Bijna twintig jaar Human Resources, Global Mobility en transformatie
          van binnenuit. ING. Heineken. Monks.
        </p>
        <p className="muted">Expertise should be amplified by better systems.</p>
      </section>

      <section className="contact" id="contact">
        <h2>Praat met ons</h2>
        <p className="muted">Vertel kort waar je tegenaan loopt. We melden ons binnen één werkdag.</p>
        <form className="form" action="/api/contact" method="POST">
          <input name="name" placeholder="Naam" required />
          <input name="email" type="email" placeholder="E-mail" required />
          <textarea name="message" placeholder="Waar loopt je bureau tegenaan?" rows={4} required />
          <button className="btn" type="submit">Verstuur</button>
        </form>
      </section>

      <footer className="footer">
        <span className="logo">OUTL<em>IER</em></span>
        <span>theoutlier.nl — Corporate experience. Boutique execution.</span>
      </footer>
    </main>
  );
}