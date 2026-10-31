import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
  robots: { index: false, follow: true },
};
export default function Terms() {
  return (
    <>
      <Navigation />
      <main id="main" className="container info-page">
        <h1>A clear start.</h1>
        <p>
          For questions about Deck Cards and the terms that apply to your card,
          contact the Deck team.
        </p>
        <h2>About this website</h2>
        <p>
          This website introduces Deck Cards. Joining the early access list
          records your interest; it does not create an account or issue a card.
        </p>
        <a className="text-link" href="/">
          Back to Deck Cards
        </a>
      </main>
      <Footer />
    </>
  );
}
