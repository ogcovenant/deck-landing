"use client";

import { useState } from "react";
import {
  ArrowUpRight,
  Check,
  CreditCard,
  LockKeyhole,
  SlidersHorizontal,
  Snowflake,
  ShieldCheck,
  Utensils,
  ShoppingBag,
  Coffee,
} from "lucide-react";
import { PaymentCard } from "./payment-card";
import { SegmentedControl } from "../ui/segmented-control";

type Control = "freeze" | "limits" | "activity";
const descriptions = {
  freeze: [
    "A little pause. A lot of peace of mind.",
    "Put a card on hold when you need to. Unfreeze it when you’re ready.",
  ],
  limits: [
    "Your limits. Clearly set.",
    "Plan your spending with controls where your card supports them.",
  ],
  activity: [
    "The details, without the digging.",
    "See what you spent, where you spent it, and which card you used.",
  ],
};

export function CardControls() {
  const [control, setControl] = useState<Control>("freeze");
  const [frozen, setFrozen] = useState(false);
  const [limit, setLimit] = useState(100000);
  const [savedLimit, setSavedLimit] = useState(100000);
  const format = (value: number) =>
    new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      maximumFractionDigits: 0,
    }).format(value);
  return (
    <section
      className="controls-section section-space"
      aria-labelledby="controls-heading"
    >
      <div className="container">
        <div className="controls-heading">
          <h2 id="controls-heading">
            Control goes
            <br />
            beyond the card.
          </h2>
          <p>
            A clearer view. A few thoughtful controls.
            <br />
            More say in how your cards are used.
          </p>
        </div>
        <div className="controls-demo product-controls">
          <div className="controls-story">
            <SegmentedControl
              label="Explore card controls"
              value={control}
              onChange={setControl}
              options={[
                {
                  value: "freeze",
                  label: "Freeze",
                  icon: <Snowflake size={15} />,
                },
                {
                  value: "limits",
                  label: "Limits",
                  icon: <SlidersHorizontal size={15} />,
                },
                {
                  value: "activity",
                  label: "Activity",
                  icon: <CreditCard size={15} />,
                },
              ]}
            />
            <h3>{descriptions[control][0]}</h3>
            <p>{descriptions[control][1]}</p>
            <div className="controls-card">
              <PaymentCard
                variant={control === "freeze" ? "lilac" : "ember"}
                currency={control === "freeze" ? "USD" : "NGN"}
                ending={control === "freeze" ? "6208" : "4821"}
                frozen={control === "freeze" && frozen}
              />
              {control === "freeze" && frozen && (
                <span className="frozen-overlay">
                  <Snowflake size={17} />
                  Card frozen
                </span>
              )}
            </div>
          </div>
          <div className="control-panel" aria-live="polite">
            <div className="control-panel-top">
              <span>
                <span className="mini-riff">
                  <CreditCard size={18} />
                </span>
                {control === "freeze"
                  ? "Card settings"
                  : control === "limits"
                    ? "Spending controls"
                    : "Card activity"}
              </span>
            </div>
            {control === "freeze" && (
              <div className="freeze-panel">
                <div className="settings-card-identity">
                  <span><CreditCard size={21} /></span>
                  <div><strong>Personal USD</strong><small>Virtual card · •• 6208</small></div>
                  <span
                    className={`status ${frozen ? "status-frozen" : "status-active"}`}
                  >
                    {frozen ? "Frozen" : "Active"}
                  </span>
                </div>
                <h4>Card security</h4>
                <p>A little extra control, whenever you need it.</p>
                <div className="settings-freeze-row"><Snowflake size={19} /><div><strong>Freeze card</strong><small>Pause new card payments.</small></div><button type="button" className={`settings-switch ${frozen ? "is-on" : ""}`} aria-pressed={frozen} aria-label={frozen ? "Unfreeze card" : "Freeze card"} onClick={() => setFrozen(!frozen)}><span /></button></div>
                <div className={`settings-state-note ${frozen ? "is-frozen" : ""}`} aria-live="polite">{frozen ? <Snowflake size={18} /> : <ShieldCheck size={18} />}<div><strong>{frozen ? "A moment on hold." : "Your card is ready."}</strong><p>{frozen ? "Unfreeze it here whenever you’re ready to use it again." : "Freeze this card to pause payments. Your balance stays where it is."}</p></div></div>
                <small className="settings-ownership"><LockKeyhole size={12} />Personal card. Managed by you.</small>
              </div>
            )}
            {control === "limits" && (
              <div className="limits-panel">
                <h4>
                  A little structure
                  <br />
                  for your spending.
                </h4>
                <p>Personal NGN · •• 4821</p>
                <label htmlFor="spending-limit">
                  Monthly spending limit<strong>{format(limit)}</strong>
                </label>
                <input
                  id="spending-limit"
                  type="range"
                  min={50000}
                  max={500000}
                  step={25000}
                  value={limit}
                  onChange={(event) => setLimit(Number(event.target.value))}
                />
                <div className="range-labels">
                  <span>₦50,000</span>
                  <span>₦500,000</span>
                </div>
                <button
                  className="button"
                  type="button"
                  disabled={savedLimit === limit}
                  onClick={() => setSavedLimit(limit)}
                >
                  {savedLimit === limit ? (
                    <Check size={16} />
                  ) : (
                    <SlidersHorizontal size={16} />
                  )}
                  {savedLimit === limit
                    ? "Limit saved"
                    : "Save limit"}
                </button>
                <small>
                  Work card limits are managed by your organization.
                </small>
              </div>
            )}
            {control === "activity" && (
              <div className="activity-panel">
                <h4>The full picture.</h4>
                <p>Personal NGN · •• 4821</p>
                <div className="activity-date">Today</div>
                {[
                  {
                    icon: Coffee,
                    name: "Coffee & Co.",
                    category: "Food & drink",
                    amount: "−₦4,500.00",
                  },
                  {
                    icon: ShoppingBag,
                    name: "Everyday Market",
                    category: "Shopping",
                    amount: "−₦18,200.00",
                  },
                  {
                    icon: Utensils,
                    name: "Lunch at the studio",
                    category: "Food & drink",
                    amount: "−₦8,000.00",
                  },
                ].map((item) => (
                  <div className="activity-item" key={item.name}>
                    <span className="activity-icon">
                      <item.icon size={17} />
                    </span>
                    <span>
                      {item.name}
                      <small>{item.category}</small>
                    </span>
                    <strong>
                      {item.amount}
                      <small>
                        <Check size={10} />
                        Completed
                      </small>
                    </strong>
                  </div>
                ))}
                <div className="activity-bottom">
                  <span>Card activity</span>
                  <ArrowUpRight size={15} />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
