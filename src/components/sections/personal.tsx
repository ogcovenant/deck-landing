import Image from "next/image";
import { ArrowUpRight, Check, Snowflake } from "lucide-react";
import { PaymentCard } from "../product/payment-card";

export function Personal() {
  return (
    <section id="personal" className="personal-section section-space" aria-labelledby="personal-heading">
      <div className="container">
        <div className="personal-intro">
          <h2 id="personal-heading">Your money.<br />Your cards.<br />Your rules.</h2>
          <div className="section-copy">
            <p>For your everyday plans and the things you’re building toward. Personal cards designed to put you in charge.</p>
            <a href="#early-access" className="text-link">Find your personal Deck <ArrowUpRight size={17} aria-hidden="true" /></a>
          </div>
        </div>
        <div className="personal-scenes">
          <figure className="personal-lifestyle">
            <Image src="/photography/deck-campaign.webp" alt="A woman walking through a sunlit courtyard with an orange wall" width={1536} height={1024} sizes="(max-width: 719px) 600px, 900px" quality={85} />
            <figcaption>For wherever the day takes you.</figcaption>
          </figure>
          <div className="personal-visual">
            <div className="personal-card-usd"><PaymentCard currency="USD" variant="lilac" ending="6208" /></div>
            <div className="personal-card-ngn"><PaymentCard /></div>
            <div className="card-detail-slip"><span className="slip-icon"><Snowflake size={18} aria-hidden="true" /></span><div><strong>A pause, on your terms.</strong><span>Freeze and unfreeze in the app.</span></div><Check size={16} aria-hidden="true" /></div>
          </div>
        </div>
        <div className="personal-details">
          <ul className="feature-list">
            <li><Check aria-hidden="true" />NGN and USD virtual cards</li>
            <li><Check aria-hidden="true" />Create and manage cards in one app</li>
            <li><Check aria-hidden="true" />Freeze, unfreeze and view transactions</li>
            <li><Check aria-hidden="true" />Supported settings and spending controls</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
