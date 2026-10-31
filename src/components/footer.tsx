import { ArrowUpRight } from "lucide-react";
import { BrandLogo } from "./brand";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-main">
          <div>
            <a href="/" aria-label="Deck home">
              <BrandLogo light />
            </a>
            <p>Every card. One Deck.</p>
          </div>
          <nav aria-label="Footer product navigation">
            <a href="/#personal">Personal</a>
            <a href="/#business">Business</a>
            <a href="/#how-it-works">How it works</a>
            <a href="/#early-access">
              Get early access
              <ArrowUpRight size={13} />
            </a>
          </nav>
          <nav aria-label="Company information">
            <a href="/contact">Contact</a>
            <a href="/privacy">Privacy Policy</a>
            <a href="/terms">Terms of Service</a>
          </nav>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Deck. All rights reserved.</span>
          <span>Personal and business cards. Together.</span>
        </div>
        <div className="footer-signature" aria-hidden="true"><BrandLogo wordmark light /></div>
      </div>
    </footer>
  );
}
