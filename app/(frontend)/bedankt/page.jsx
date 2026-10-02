import Link from "next/link";

export const metadata = {
  title: "Dank je wel",
  robots: { index: false, follow: false },
};

export default function Bedankt({ searchParams }) {
  const isNewsletter = (searchParams?.type || "") === "newsletter";
  return (
    <main className="page-stub">
      <p className="kicker">{isNewsletter ? "Nieuwsbrief" : "Bericht ontvangen"}</p>
      <h1 style={{ fontSize: "clamp(40px,6vw,84px)", letterSpacing: "-0.04em", margin: "0 0 24px" }}>
        Dank je <span className="gold-italic">wel</span>.
      </h1>
      <p className="lead">
        {isNewsletter
          ? "Je staat op de lijst. Eén e-mail per artikel, geen spam, geen hype."
          : "Je bericht staat veilig bij ons. We melden ons binnen één werkdag."}
      </p>
      <p style={{ marginTop: 40 }}>
        <Link className="btn ghost" href="/">Terug naar de site</Link>
      </p>
    </main>
  );
}