export const metadata = {
  title: "Services",
  description:
    "De diensten van The Outlier: AI Friction Scan, AI Systems Sprint, Fractional AI Transformation Partner en Partner Workshop. Elke opdracht eindigt met cijfers.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <main className="page-stub">
      <p className="kicker">AI &amp; Transformation Partner</p>
      <h1 style={{ fontSize: "clamp(40px,6vw,84px)", letterSpacing: "-0.04em", margin: "0 0 24px" }}>
        Our <span className="gold-italic">services</span>.
      </h1>
      <p className="lead">
        Vier manieren in: de AI Friction Scan, de AI Systems Sprint, de Fractional
        AI Transformation Partner en de Partner Workshop. Deze pagina krijgt een
        volledige uitwerking met cijfers, casestudy's en foto's.
      </p>
      <p className="muted">
        Nieuwsgierig naar de volledige uitwerking? <a href="/contact" style={{ color: "var(--gold)" }}>Neem contact op</a> of
        {" "}<a href="/start" style={{ color: "var(--gold)" }}>start de assessment</a>.
      </p>
    </main>
  );
}