import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy notice",
  robots: { index: false, follow: true },
};
export default function Privacy() {
  return (
    <>
      <Navigation />
      <main id="main" className="container info-page">
        <h1>Your privacy matters.</h1>
        <h2>About the early access form</h2>
        <p>
          The form asks for your email address and whether you’re interested in
          personal cards, business cards, or both. Registration is only complete
          when the form confirms your email has been accepted.
        </p>
        <p>
          If registration is unavailable, the form will tell you. It does not
          save signup details in your browser as a substitute for registration.
        </p>
        <p>
          The app screens on this website use fictional names, organizations,
          transactions and balances.
        </p>
        <a className="text-link" href="/">
          Back to Deck Cards
        </a>
      </main>
      <Footer />
    </>
  );
}
