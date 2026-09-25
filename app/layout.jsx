import "./globals.css";

export const metadata = {
  title: "The Outlier — Corporate experience. Boutique execution",
  description:
    "AI & Transformation Partner voor boutique adviesbureaus. Strategie, brand, web, AI-systemen en transformatie, met bijna twintig jaar corporate ervaring van binnenuit.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="nl">
      <body>{children}</body>
    </html>
  );
}