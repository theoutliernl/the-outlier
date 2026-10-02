import Assessment from "../../../components/Assessment";

export const metadata = {
  title: "Start de assessment",
  description:
    "Vijf vragen over jouw bureau: waar lekt tijd en marge weg, en verdient een systeem zich bij jou terug? Aan het eind weet je of een gesprek met The Outlier zin heeft.",
  alternates: { canonical: "/start" },
};

export default function StartPage() {
  return (
    <>
      
      <main className="page-stub">
        <p className="kicker">Assessment</p>
        <h1 style={{ fontSize: "clamp(40px,6vw,84px)", letterSpacing: "-0.04em", margin: "0 0 20px" }}>
          Vind jouw <span className="gold-italic">friction</span>.
        </h1>
        <p className="lead">
          Vijf vragen over hoe je bureau werkt. Aan het eind: jouw profiel in één
          oogopslag — en als het zin heeft, een gesprek. Geen nieuwsbrief, geen spam.
        </p>
        <Assessment />
      </main>
      
      
    </>
  );
}
