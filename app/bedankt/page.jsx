import Link from "next/link";

export default function Bedankt() {
  return (
    <main className="root" style={{ padding: "120px 24px" }}>
      <h1>Dank je wel.</h1>
      <p className="lead">
        Je bericht staat veilig bij ons. We melden ons binnen één werkdag.
      </p>
      <p style={{ marginTop: 40 }}>
        <Link className="btn ghost" href="/">Terug naar de site</Link>
      </p>
    </main>
  );
}