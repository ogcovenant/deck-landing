import { ArrowDown, ArrowUpRight } from "lucide-react";
import { HeroComposition } from "../product/hero-composition";

export function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-heading">
      <div className="container hero-layout">
        <div className="hero-copy">
          <h1 id="hero-heading">Every card.<br /><span>One Deck.</span></h1>
          <p>Your personal and business cards, together in one app. Create, manage, and control how you spend.</p>
          <div className="hero-actions">
            <a className="button button-large" href="#early-access">Get early access <ArrowUpRight size={18} aria-hidden="true" /></a>
            <a className="text-link" href="#personal">Explore Deck Cards <ArrowDown size={16} aria-hidden="true" /></a>
          </div>
        </div>
        <HeroComposition />
      </div>
      <div className="container hero-baseline">
        <p>Made for your everyday.<br />And everything you’re building.</p>
        <div><span>Personal cards</span><span>Business cards</span><span>One Deck app</span></div>
      </div>
    </section>
  );
}
