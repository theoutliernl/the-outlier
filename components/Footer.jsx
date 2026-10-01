import Link from "next/link";

export default function Footer() {
  return (
    <footer className="footer-v2">
      <div className="footer-cta">
        <p className="mega footer-mega">Get in touch.</p>
        <a className="btn" href="/start">
          Doe de assessment
          <span className="circle-arrow dark" aria-hidden="true">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </a>
      </div>

      <div className="footer-grid">
        <div className="footer-col">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo-vertical.svg" alt="The Outlier logo — vier kleinere balken en één gouden balk die eruit steekt, met de payoff Corporate experience. Boutique execution" width={150} height={70} />
          <p className="muted">
            AI &amp; Transformation Partner voor boutique adviesbureaus.
            Amsterdam, NL — working internationally.
          </p>
        </div>

        <nav className="footer-col" aria-label="Sitemap">
          <h4>Site</h4>
          <ul>
            <li><Link href="/">Home</Link></li>
            <li><Link href="/services">Services</Link></li>
            <li><Link href="/contact">Contact</Link></li>
            <li><Link href="/start">Start assessment</Link></li>
            <li><Link href="/blog">Blog</Link></li>
          </ul>
        </nav>

        <div className="footer-col">
          <h4>Founder</h4>
          <ul>
            <li>Fariza Sbaa</li>
            <li><a href="https://www.linkedin.com/in/fariza-sbaa" rel="noopener noreferrer">LinkedIn</a></li>
            <li><a href="mailto:hello@theoutlier.nl">hello@theoutlier.nl</a></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Stay updated</h4>
          <form className="newsletter" action="/api/newsletter" method="POST">
            <label htmlFor="newsletter-email" className="visually-hidden">E-mailadres voor de nieuwsbrief</label>
            <input id="newsletter-email" name="email" type="email" placeholder="name@email.com" required />
            <button className="circle-arrow" type="submit" aria-label="Aanmelden voor de nieuwsbrief">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </form>
          <p className="muted small">Eén e-mail per artikel. Geen spam, geen hype.</p>
        </div>
      </div>

      <div className="footer-base">
        <span>© {new Date().getFullYear()} The Outlier — Corporate experience. Boutique execution.</span>
        <span>KvK Amsterdam · NL</span>
      </div>
    </footer>
  );
}