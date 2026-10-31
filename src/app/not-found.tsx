import Link from "next/link";
import { BrandLogo } from "@/components/brand";

export default function NotFound() {
  return (
    <main id="main" className="container info-page">
      <Link href="/" aria-label="Deck home">
        <BrandLogo />
      </Link>
      <h1 style={{ marginTop: 60 }}>Not in this Deck.</h1>
      <p>We couldn’t find that page. Let’s take you back to the cards.</p>
      <Link className="text-link" href="/">
        Back to Deck Cards
      </Link>
    </main>
  );
}
