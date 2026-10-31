import {
  ArrowUpRight,
  BriefcaseBusiness,
  LockKeyhole,
  UserRound,
} from "lucide-react";
import { PhonePreview } from "../product/phone-preview";
import { Riff } from "../brand";

export function Unified() {
  return (
    <section className="unified-section" aria-labelledby="unified-heading">
      <div className="container unified-grid">
        <div className="unified-copy">
          <h2 id="unified-heading">
            One app.<br />Every side of <span>your spending.</span>
          </h2>
          <p>
            Move between your personal cards and the cards your organization
            assigns to you, without juggling multiple apps.
          </p>
          <div className="ownership-list">
            <div>
              <UserRound size={21} />
              <span>
                <strong>Your personal cards</strong>
                <small>Your money. Your settings. Your everyday.</small>
              </span>
            </div>
            <div>
              <BriefcaseBusiness size={21} />
              <span>
                <strong>Your work cards</strong>
                <small>Assigned to you. Managed by your organization.</small>
              </span>
            </div>
          </div>
          <div className="ownership-note">
            <LockKeyhole size={15} />
            <span>
              One place to access them.
              <br />
              Separate ownership, balances and controls.
            </span>
          </div>
        </div>
        <figure className="unified-visual">
          <Riff className="unified-riff" light aria-hidden="true" />
          <div className="unified-phone">
            <PhonePreview initialContext="work" />
          </div>
          <div className="switch-hint">
            <ArrowUpRight size={25} />
            <span>
              Try switching
              <br />
              Personal ↔ Work
            </span>
          </div>
        </figure>
      </div>
    </section>
  );
}
