import Reveal from "../reveal";
import Marquee from "../../../components/Marquee";
import LottieIcon from "../../../components/LottieIcon";

const MQ_ITEMS = ["Measured in numbers", "Senior expertise only", "Adoptie inbegrepen", "Corporate experience", "Boutique execution", "Geen junioren op je af"];
import { jsonLdServices } from "../../../lib/schema";

export const metadata = {
  title: "Services — AI Friction Scan, Systems Sprint en Transformation Partner",
  description:
    "Vier manieren waarop The Outlier boutique adviesbureaus van frictie naar systeem brengt: AI Friction Scan, AI Systems Sprint, Fractional AI Transformation Partner en Partner Workshop. Elke opdracht eindigt met cijfers.",
  alternates: { canonical: "/services" },
  openGraph: {
    title: "Services — The Outlier",
    description: "Vier manieren in. Elke opdracht eindigt met cijfers: uren bespaard, marge verbeterd.",
  },
};

const breadcrumbLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://theoutlier.nl" },
    { "@type": "ListItem", position: 2, name: "Services", item: "https://theoutlier.nl/services" },
  ],
};

export default function ServicesPage() {
  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdServices) }} />

      <Marquee className="mq-gold" duration={36}>
        {MQ_ITEMS.map((t) => (
          <span key={t} className="mq-item">{t}</span>
        ))}
      </Marquee>

      <div className="page-stub" style={{ paddingBottom: 40 }}>
        <p className="kicker">AI &amp; Transformation Partner</p>
        <h1 style={{ fontSize: "clamp(40px,6vw,84px)", letterSpacing: "-0.04em", margin: "0 0 24px" }}>
          Our <span className="gold-italic">services</span>.
        </h1>
        <p className="lead">
          Vier manieren in. Elke opdracht eindigt met cijfers: uren bespaard, marge
          verbeterd. Als een scan laat zien dat een systeem zich niet terugverdient,
          zeggen we dat. Dat is geen leus, dat is de manier waarop we werken — want
          ons eigen bureau draait op dezelfde systemen die wij bij jou bouwen.
        </p>
      </div>

      <section style={{ padding: "40px 0" }}>
        <div className="container">
          <Reveal className="svc-head">
            <h2 className="h2-display">Hoe wij werken</h2>
            <p className="section-lead">
              Elke opdracht doorloopt dezelfde vier stappen: Understand, Map the
              friction, Build the system, Measure the gain. Geen rapportspecifieke
              excuse voor weken vertraging. Wij beginnen bij de vraag en eindigen
              bij een systeem dat draait — en bij de cijfers die bewijzen dat het werkt.
            </p>
          </Reveal>

          <Reveal className="proc-grid">
            <div className="proc-card">
              <div className="bars-glyph" aria-hidden="true"><i style={{height:12}} /><i style={{height:6}} /><i style={{height:16}} /><i style={{height:8}} /></div>
              <h3>Understand</h3>
              <p>Hoe je bureau echt werkt: partners, klanten, processen, flows. Geen aannames, geen template. Wij beginnen bij de werkvloer.</p>
            </div>
            <div className="proc-card">
              <div className="bars-glyph" aria-hidden="true"><i style={{height:10}} /><i style={{height:14}} /><i style={{height:6}} /><i style={{height:12}} /></div>
              <h3>Map the friction</h3>
              <p>Waar lekt tijd en marge weg, gemeten in uren en euro&apos;s per week. Alles komt in een cijfer, niet in een gevoel.</p>
            </div>
            <div className="proc-card">
              <div className="bars-glyph" aria-hidden="true"><i style={{height:12}} /><i style={{height:6}} /><i style={{height:16}} /><i style={{height:8}} /></div>
              <h3>Build the system</h3>
              <p>Slimmere systemen rond je experts, geïntegreerd in de gereedschappen die je al gebruikt. Geen extra stack, geen extra licenties waar je niet om vroeg.</p>
            </div>
            <div className="proc-card">
              <div className="bars-glyph" aria-hidden="true"><i style={{height:12}} /><i style={{height:6}} /><i style={{height:16}} /><i style={{height:8}} /></div>
              <h3>Measure the gain</h3>
              <p>Voor en na, in cijfers. uren bespaard per consultant, marge per project, doorlooptijd per offerte. Als een systeem zich niet terugverdient, zeggen we dat — vóór je het koopt.</p>
            </div>
          </Reveal>
        </div>
      </section>

      <section style={{ padding: "40px 0" }}>
        <div className="container">
          <Reveal className="svc-head">
            <h2 className="h2-display">De vier diensten</h2>
            <p className="section-lead">
              Van eerste meting tot doorlopende transformatie. Je kiest de ingang
              die past bij waar je bureau nu staat — en we adviseren openlijk als
              een kleinere vorm beter is dan een grotere.
            </p>
          </Reveal>
        </div>

        <div className="container svc-detail">
          <Reveal className="svc-block">
            <div className="svc-nr">01</div>
            <div className="svc-body">
              <h3 className="h2-display" style={{ fontSize: "clamp(26px,3.4vw,40px)" }}>AI Friction Scan</h3>
              <p className="svc-meta">€2,750 · 2 weken · vast bedrag</p>
              <p className="section-lead" style={{ marginTop: 18 }}>
                De scan is het beginpunt voor bijna elk traject, en het is bewust
                klein gehouden. In twee weken brengen we in kaart waar je bureau
                tijd en marge verliest — en wat AI daaraan realistisch kan doen.
                Geen vage kansenlijst, maar een roadmap met terugverdientijden.
              </p>
              <p className="section-lead">
                We interviewen partners en de werkvloer, lopen je drie zwaarste
                processen af, en meten waar handmatig werk dubbel gebeurt. Denk
                aan offertes die elke keer opnieuw worden geschreven, rapportages
                die consultants &apos;s avonds maken, onboarding die afhangt van één
                persoon zijn geheugen. Aan het eind krijg je een lijst: wat lekt
                waar, wat kost dat per jaar, welk systeem pakt het op, en wat
                levert dat per maand op. Een lijst die je maandag kunt oppakken —
                met ons, of met iemand anders.
              </p>
              <p className="section-lead">
                Voor wie is dit: bureaus die voelen dat er frictie zit maar niet
                kunnen benoemen waar. En bureaus die over AI hebben gelezen,
                terecht sceptisch zijn, en eerst cijfers willen voordat er gebouwd wordt.
              </p>
            </div>
          </Reveal>

          <Reveal className="svc-block">
            <div className="svc-nr">02</div>
            <div className="svc-body">
              <h3 className="h2-display" style={{ fontSize: "clamp(26px,3.4vw,40px)" }}>AI Systems Sprint</h3>
              <p className="svc-meta">€12,500 · 8-12 weken · één systeem, gebouwd en geïmplementeerd</p>
              <p className="section-lead" style={{ marginTop: 18 }}>
                De sprint neemt één knelpunt uit de scan en lost het volledig op.
                Niet als losse proefopstelling, maar als systeem dat in je
                bestaande gereedschappen draait en dat je team vanaf dag één
                gebruikt. Voorbeelden: de offerteflow die van vijf uur naar
                vijftig minuten gaat, client-onboarding die zichzelf opzet,
                een knowledge-assistant die je eigen expertise doorzocht,
                of monitoring van regelgeving die je niche raakt.
              </p>
              <p className="section-lead">
                We bouwen met je mensen, niet over hun heen. Dat betekent:
                jouw consultants bepalen mee wat het systeem moet doen, jouw
                formuleringen zitten erin, en de adoptie is onderdeel van de
                levering — niet een bijzaak voor erna. Voor en na meten we in
                uren en euro&apos;s. Is het resultaat niet wat de scan beloofde,
                dan lossen we dat op binnen de sprint.
              </p>
              <p className="section-lead">
                Voor wie is dit: bureaus die de frictie al kennen en nu het
                systeem willen — zonder een groot implementatieproject en zonder
                afhankelijk te worden van een bureau dat alleen strategie schrijft.
              </p>
            </div>
          </Reveal>

          <Reveal className="svc-block">
            <div className="svc-nr">03</div>
            <div className="svc-body">
              <h3 className="h2-display" style={{ fontSize: "clamp(26px,3.4vw,40px)" }}>Fractional AI Transformation Partner</h3>
              <p className="svc-meta">€2,750 /mnd · 2 of 4 dagen per maand · doorlopend</p>
              <p className="section-lead" style={{ marginTop: 18 }}>
                De transformation lead die je niet kunt aantrekken. Een vaste
                plek aan de tafel van management en partnerschap, met een
                kwartaalagenda en meetbare mijlpalen. Geen advies van de zijlijn:
                we sturen de transformatie, van prioriteitskeuze tot adoptie
                tot cijfermatige verantwoording richting het partnerschap.
              </p>
              <p className="section-lead">
                De achtergrond is corporate: bijna twintig jaar HR, Global
                Mobility en transformatie binnen ING, Heineken en Monks —
                organisaties waar verandering zonder draagvlak niets wordt.
                Dat maken we nu beschikbaar voor bureaus van tien tot vijftig
                mensen, parttime, zonder de politiek en zonder de salarislast
                van een fulltime executive.
              </p>
              <p className="section-lead">
                Voor wie is dit: bureaus die meerdere systemen willen bouwen,
                of een transformatie willen aansturen waar het hele
                partnerschap achter staat. Dit is de vorm voor de bureau dat
                weet wat het wil maar de uitvoering niet intern kan dragen.
              </p>
            </div>
          </Reveal>

          <Reveal className="svc-block">
            <div className="svc-nr">04</div>
            <div className="svc-body">
              <h3 className="h2-display" style={{ fontSize: "clamp(26px,3.4vw,40px)" }}>Partner Workshop</h3>
              <p className="svc-meta">€1,650 · halve dag · het hele partnerschap</p>
              <p className="section-lead" style={{ marginTop: 18 }}>
                Eén middag waarin het volledige partnerschap begrijpt wat AI
                betekent voor jullie bureau. Live demo&apos;s op jullie eigen
                processen, eerlijke grenzen — waar AI sterk is en waar het
                huiswerk blijft — en privacy en compliance, want in advieswerk
                is vertrouwelijkheid geen optie maar het vak.
              </p>
              <p className="section-lead">
                Na de middag beslissen jullie. Wij pakken de executie op als
                jullie doorgaan, en zeggen het gewoon als de scan aantoont dat
                er voor jullie niets te halen valt. Dat laatste gebeurt — en
                dat is precies waarom het vertrouwen werkt.
              </p>
              <p className="section-lead">
                Voor wie is dit: partnerships die één gedeeld beeld willen
                voordat er budget vrijkomt. De workshop is de laagdrempelige
                ingang, en wordt volledig verrekend bij een vervolgtraject.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section style={{ padding: "40px 0" }}>
        <div className="container">
          <Reveal className="svc-head">
            <h2 className="h2-display">Wat dat er in de praktijk uitziet</h2>
            <p className="section-lead">
              Twee voorbeelden van hoe frictie eruitziet voordat er een systeem
              staat — en wat het oplevert als die er wel is.
            </p>
          </Reveal>

          <Reveal className="svc-block" style={{ gridTemplateColumns: "1fr" }}>
            <div className="svc-body">
              <div className="svc-visual duo" aria-hidden="true"><img src="/images/ramp-card.jpg" alt="" loading="lazy" /></div>
              <h3 className="h2-display" style={{ fontSize: "clamp(22px,2.6vw,30px)" }}>De offertes die elk weekend worden herschreven</h3>
              <p className="section-lead">
                Een bureau van achttien mensen schrijft elke offerte deels opnieuw:
                dezelfde Scope-teksten, dezelfde tariefstructuur, dezelfde
                disclaimers — telkens getikt door de partner die de deal binnenhaalt.
                Reken uit: drie offertes per week, elk twee tot drie uur, tel de
                uren bij elkaar op en dat is bijna een werkdag per week die niet
                factureerbaar is. Een systeem dat de eerdere offertes doorzocht,
                de terugkerende delen automatisch invult en de partner alleen de
                klantspecifieke stukken laat schrijven, haalt dat terug naar
                ruim veertig minuten per offerte. Over een jaar is dat honderd
                factureerbare uren die nu in de avonden zitten.
              </p>
            </div>
          </Reveal>

          <Reveal className="svc-block" style={{ gridTemplateColumns: "1fr" }}>
            <div className="svc-body">
              <div className="svc-visual duo" aria-hidden="true"><img src="/images/concrete-lights.jpg" alt="" loading="lazy" style={{height:"100%",objectFit:"cover"}} /></div>
              <h3 className="h2-display" style={{ fontSize: "clamp(22px,2.6vw,30px)" }}>De onboarding die in één hoofd zit</h3>
              <p className="section-lead">
                Een tweede bureau groeide van twaalf naar vijfentwintig mensen in
                twee jaar. De onboarding van nieuwe consultants hing volledig aan
                één operations manager: zijn checklists, zijn geheugen, zijn
                habit om tussentijds even iets te &apos;snapshotten&apos;. Elke nieuwe
                hire kostte hem twee volle dagen, en elke vakantie van hem kostte
                het bureau weken van trager temp. Een gestructureerd onboarding-
                systeem — met de kennis van die ene manager erin gebouwd, niet
                eromheen — nam die afhankelijkheid weg en bracht de doorlooptijd
                van zes weken naar drie. Niet door mensen te vervangen, maar door
                de kennis van mensen vast te leggen waar het team werkt.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section style={{ padding: "40px 0 80px" }}>
        <div className="container">
          <Reveal className="svc-head">
            <h2 className="h2-display">Wat je altijd krijgt</h2>
            <p className="section-lead">
              Onafhankelijk van de vorm: metingen voor en na, cijfers in plaats
              van meningen, adoptie als onderdeel van de levering, en de
              belofte dat we zeggen als iets zich niet terugverdient. We zijn
              geen tool-verkoper en sturen geen junioren op je af — senior
              expertise of niets.
            </p>
          </Reveal>
          <Reveal style={{ maxWidth: 620 }}>
            <p className="lead" style={{ fontSize: 19 }}>
              Twijfel je welke ingang past? De assessment op deze site geeft in
              vijf vragen een eerste indicatie — of plan direct een gesprek en
              we kijken samen naar je cijfers.
            </p>
            <div className="hero-cta" style={{ marginTop: 28, display: "flex", gap: 16, flexWrap: "wrap" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
                <a className="btn-inkbig" href="/start" style={{ marginTop: 0 }}>Doe de assessment</a>
                <span aria-hidden="true"><LottieIcon src="/lottie/mingcute/arrow_right_line.json" width={44} height={44} /></span>
              </div>
              <a className="bookpill" href="#contact" style={{ color: "var(--slate)" }}>
                Book a call<span className="pillcircle">→</span>
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}