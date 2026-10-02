import Reveal from "./reveal";
import Accordion from "../../components/Accordion";
import MenuOverlay from "../../components/MenuOverlay";
import Progress from "../../components/Progress";
import StickyNav from "../../components/StickyNav";
import WhatsAppWidget from "../../components/WhatsAppWidget";
import HeroBars from "../../components/HeroBars";
import HeroTitle from "../../components/HeroTitle";
import HeroFX from "../../components/HeroFX";
import CodeBackground from "../../components/CodeBackground";
import LottieIcon from "../../components/LottieIcon";
import { Compass, ScanSearch, Workflow, TrendingUp } from "lucide-react";

function BarsGlyph({ heights = [12, 6, 16, 8] }) {
  return (
    <div className="bars-glyph" aria-hidden="true">
      {heights.map((h, i) => <i key={i} style={{ height: h }} />)}
    </div>
  );
}

function Mark({ size = 38 }) {
  return (
    <svg width={size * 1.103} height={size} viewBox="0 0 37.5 34" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" style={{ display: "block" }}>
      <rect x="0" y="7" width="6.3" height="27" rx="3.15" fill="#F3EDE1" />
      <rect x="7.8" y="14.5" width="6.3" height="19.5" rx="3.15" fill="#F3EDE1" />
      <rect x="15.6" y="0" width="6.3" height="34" rx="3.15" fill="#E0A828" />
      <rect x="23.4" y="11.5" width="6.3" height="22.5" rx="3.15" fill="#F3EDE1" />
      <rect x="31.2" y="9.5" width="6.3" height="24.5" rx="3.15" fill="#F3EDE1" />
    </svg>
  );
}

export default function Home() {
  return (
    <main>
      <Progress />
      <StickyNav />
      <div className="gridlines" aria-hidden="true" />
      <div className="bar" id="top" />

      <div className="container">
        <header>
          <div className="header-row">
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <Mark size={38} />
              <div style={{ position: "relative" }}>
                <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.2em", color: "#E0A828", lineHeight: 1, position: "absolute", top: -9, left: 1 }}>THE</div>
                <div style={{ fontWeight: 700, fontSize: 28, letterSpacing: "0.015em", color: "#F3EDE1", lineHeight: 1 }}>
                  OUTL<span style={{ fontStyle: "italic", color: "#E0A828" }}>IER</span>
                </div>
              </div>
            </div>
            <div className="header-right">
              <a className="bookpill" href="#contact">
                Book a call<span className="pillcircle">→</span>
              </a>
              <MenuOverlay />
            </div>
          </div>
        </header>
      </div>

      <div className="hero-wrap" id="home">
        <div className="hero-bg kb" aria-hidden="true" />
        <div className="hero-fx-glow" aria-hidden="true" />
        <CodeBackground />
        <HeroBars />
        <div className="container">
          <HeroFX>
          <div className="hero-meta">
            <div className="hm-left">
              <span>Founded from the inside</span>
              <span>Amsterdam, NL — working internationally</span>
              <a href="mailto:hello@theoutlier.nl">hello@theoutlier.nl</a>
            </div>
            <div className="hm-right">
              <div className="hm-tags">
                <span>Strategy</span>
                <span>Brand</span>
                <span>Web</span>
                <span>AI Systems</span>
                <span>Transformation</span>
              </div>
              <div className="hm-mark"><Mark size={34} /></div>
            </div>
          </div>
          <div className="hero-sub">
            <p>
              Boutique consultancies are expected to run like large firms, with a
              fraction of the people, the budget and the time. We close that gap
              with practical AI-powered systems, built around your experts.
            </p>
          </div>
          </HeroFX>
        </div>
      </div>

      <section id="approach">
        <div className="container">
          <Reveal className="biglines">
            <h2 className="word">UNDERSTAND.</h2>
            <h2 className="word">SYSTEMISE.</h2>
            <h2 className="word">SCALE.</h2>
          </Reveal>
          <Reveal as="p" className="section-lead">
            We work with ambitious boutique firms to find where friction lives,
            build the systems that remove it, and keep the experts at the centre.
            No hype. No bureaucracy.
          </Reveal>
          <div className="lottie-bars" style={{ marginTop: 34 }} aria-hidden="true">
            <LottieIcon src="/lottie/bars-grow.json" width={200} height={140} />
          </div>
          <Reveal className="proc-grid">
            <div className="proc-card">
              <BarsGlyph />
              <div className="pc-icon"><Compass size={26} strokeWidth={1.8} /></div><h3>Understand</h3>
              <p>How your firm actually works: partners, people, clients, flows. No assumptions.</p>
            </div>
            <div className="proc-card">
              <BarsGlyph heights={[10, 14, 6, 12]} />
              <div className="pc-icon"><ScanSearch size={26} strokeWidth={1.8} /></div><h3>Map the friction</h3>
              <p>Where time and margin leak, measured in hours and euros per week.</p>
            </div>
            <div className="proc-card">
              <BarsGlyph />
              <div className="pc-icon"><Workflow size={26} strokeWidth={1.8} /></div><h3>Build the system</h3>
              <p>Smarter systems around your experts, integrated in the tools you already use.</p>
            </div>
            <div className="proc-card">
              <BarsGlyph heights={[12, 6, 16, 8]} />
              <div className="pc-icon"><TrendingUp size={26} strokeWidth={1.8} /></div><h3>Measure the gain</h3>
              <p>Before and after, in numbers. If a system does not pay back, we say so.</p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="manifesto-band">
        <div className="container">
          <Reveal className="kicker">Brand manifesto</Reveal>
          <Reveal className="mline">We don’t build hype. We build <em>systems</em>.</Reveal>
          <Reveal className="mline">We don’t replace experts. We help them <em>work smarter</em>.</Reveal>
          <Reveal className="msign">This is consulting, redefined.</Reveal>
        </div>
      </section>

      <section id="services">
        <div className="container">
          <Reveal className="svc-head">
            <h2 className="h2-display">OUR SERVICES</h2>
            <p className="section-lead">
              Four ways in. Every engagement ends with numbers: hours saved, margin
              improved. If a scan shows a system will not pay back, we will say so.
            </p>
          </Reveal>
          <Reveal>
            <Accordion />
          </Reveal>
        </div>
      </section>

      <section id="insights">
        <div className="container">
          <Reveal className="svc-head">
            <h2 className="h2-display">WHERE WE CREATE VALUE</h2>
            <p className="section-lead">
              Three places where boutique firms lose the most, and where smart
              systems win it back.
            </p>
          </Reveal>
          <Reveal className="ins-grid">
            <a className="ins-card" href="#services">
              <div className="ins-img duo"><img src="/images/px-team-laptop-point.jpg" alt="Consultants reviewing performance dashboards together" loading="lazy" /></div>
              <div className="ins-tag">AI SYSTEMS</div>
              <div className="ins-title">Where AI saves consulting firms real hours</div>
            </a>
            <a className="ins-card" href="#services">
              <div className="ins-img duo"><img src="/images/px-workshop-talk.jpg" alt="Workshop conversation between consultants" loading="lazy" /></div>
              <div className="ins-tag">TRANSFORMATION</div>
              <div className="ins-title">Why transformation fails without one owner</div>
            </a>
            <a className="ins-card" href="#services">
              <div className="ins-img duo"><img src="/images/px-team-planning.jpg" alt="Planning session around a table" loading="lazy" /></div>
              <div className="ins-tag">STRATEGY</div>
              <div className="ins-title">The boutique advantage in a corporate world</div>
            </a>
          </Reveal>
        </div>
      </section>

      <section id="founder">
        <div className="container">
          <Reveal className="svc-head">
            <h2 className="h2-display">FOUNDED FROM THE INSIDE</h2>
            <p className="section-lead">
              Nearly two decades across Human Resources, Global Mobility, Governance,
              Compliance and Global Transformation inside international organisations.
            </p>
          </Reveal>
          <Reveal className="founder-grid">
            <div className="f-photo duo">
              <img src="/founder.jpg" alt="Fariza Sbaa, founder of The Outlier" />
            </div>
            <div>
              <div className="f-companies">
                <div className="f-co"><div className="name">ING Bank</div><div className="years">14 years</div></div>
                <div className="f-co"><div className="name">Heineken International</div><div className="years">8 months</div></div>
                <div className="f-co"><div className="name">Media.Monks</div><div className="years">4 years</div></div>
              </div>
              <div className="belief">
                <div className="b-label">The Outlier was built on one belief</div>
                <div className="b-line">Expertise should be amplified by better systems.</div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="cta-band" id="contact">
        <div className="container">
          <Reveal className="kicker gold">Ready to scale?</Reveal>
          <Reveal as="h2" className="h2-display ink">One call to find out where the friction lives.</Reveal>
          <Reveal as="p" className="cta-lead">
            Schedule a free 20-minute call. We discuss where your firm stands today
            and whether a scan makes sense. If it does not, we will say so.
          </Reveal>
          <Reveal><a className="btn-inkbig" href="mailto:hello@theoutlier.nl">Schedule a call</a></Reveal>
          <Reveal className="foot">
            <span className="wordmark">THE <em>OUTLIER</em></span>
            <span>Corporate experience. Boutique execution.</span>
            <span>theoutlier.nl</span>
          </Reveal>

          <Reveal className="foot-sitemap">
            <div className="fs-col">
              <div className="fs-head">Site</div>
              <a href="/#home">Home</a>
              <a href="/#approach">Approach</a>
              <a href="/#services">Services</a>
              <a href="/#insights">Insights</a>
              <a href="/#founder">Founder</a>
            </div>
            <div className="fs-col">
              <div className="fs-head">Meer</div>
              <a href="/services">Services</a>
              <a href="/contact">Contact</a>
              <a href="/start">Start assessment</a>
              <a href="/blog">Blog</a>
            </div>
            <div className="fs-col fs-news">
              <div className="fs-head">Stay updated</div>
              <p className="fs-copy">Eén e-mail per artikel. Geen hype.</p>
              <form className="fs-form" action="/api/newsletter" method="POST">
                <label htmlFor="footer-email" className="visually-hidden">E-mailadres</label>
                <input id="footer-email" name="email" type="email" placeholder="name@email.com" required />
                <button className="fs-go" type="submit" aria-label="Aanmelden voor de nieuwsbrief">→</button>
              </form>
            </div>
          </Reveal>

          <div className="foot-credit">Photography: Wikimedia Commons (CC) · Founders portrait © The Outlier</div>
        </div>
      </section>

      <div className="bar" />
      <WhatsAppWidget />
    </main>
  );
}