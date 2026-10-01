import NavBar from "../components/NavBar";
import Hero from "../components/Hero";
import Ticker from "../components/Ticker";
import Understand from "../components/Understand";
import Services from "../components/Services";
import Stats from "../components/Stats";
import Footer from "../components/Footer";
import Progress from "../components/Progress";
import WhatsAppWidget from "../components/WhatsAppWidget";
import { jsonLdFaq, jsonLdServices } from "../lib/schema";

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdServices) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFaq) }} />
      <Progress />
      <NavBar />
      <main id="top">
        <Hero />
        <Ticker />
        <Understand />
        <Stats />
        <Services />
      </main>
      <Footer />
      <WhatsAppWidget />
    </>
  );
}