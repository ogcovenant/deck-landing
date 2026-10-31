import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Contact" };
export default function Contact() {
  const email = process.env.CONTACT_EMAIL;
  return (
    <>
      <Navigation />
      <main id="main" className="container info-page">
        <h1>Let’s stay in touch.</h1>
        {email ? (
          <>
            <p>
              For questions about Deck Cards or your business’s card needs, you
              can reach the team by email.
            </p>
            <a className="text-link" href={`mailto:${email}`}>
              {email}
            </a>
          </>
        ) : (
          <p>
            For personal cards or cards for your team, leave your details in
            the early access form.
          </p>
        )}
        <p>
          Interested in cards for your team? Choose “Business cards” or “Both”
          in the early access form.
        </p>
        <a className="text-link" href="/#early-access">
          Explore early access
        </a>
      </main>
      <Footer />
    </>
  );
}
