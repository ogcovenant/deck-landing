import { ArrowUpRight } from "lucide-react";
import { BusinessDashboard } from "../product/business-dashboard";

export function Business() {
  return (
    <section
      id="business"
      className="business-section section-space"
      aria-labelledby="business-heading"
    >
      <div className="container">
        <div className="business-intro">
          <h2 id="business-heading">
            Better control.<br />Every business expense.
          </h2>
          <div>
            <p>
              Give your team the cards they need.
              <br />
              Keep the oversight your business needs.
            </p>
            <a className="text-link" href="#early-access">
              Build your business Deck
              <ArrowUpRight size={17} />
            </a>
          </div>
        </div>
        <BusinessDashboard />
        <div className="business-benefits">
          <div>
            <span>Built for the business</span>
            <p>
              Issue and assign cards. Set spending limits, track
              transactions, and freeze or terminate cards centrally.
            </p>
          </div>
          <div>
            <span>Made easy for the team</span>
            <p>
              Assigned cards are right inside each employee’s Deck app,
              ready to manage alongside their personal cards.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
