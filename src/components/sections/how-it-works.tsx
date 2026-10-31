"use client";

import { useId, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";

const flows = {
  personal: [
    { title: "Make yourself at home.", copy: "Create your Deck account." },
    {
      title: "A few details. A secure start.",
      copy: "Complete the required identity verification.",
    },
    {
      title: "Meet your Deck.",
      copy: "Create your cards and manage them in the app.",
    },
  ],
  business: [
    {
      title: "Bring your business.",
      copy: "Set up your organization’s business profile.",
    },
    {
      title: "Get verified.",
      copy: "Complete the required business verification.",
    },
    {
      title: "Build your team’s Deck.",
      copy: "Issue cards and assign them to employees.",
    },
    {
      title: "Keep a clear view.",
      copy: "Manage spending, controls and card activity.",
    },
  ],
};

export function HowItWorks() {
  const [flow, setFlow] = useState<"personal" | "business">("personal");
  const id = useId();
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  return (
    <section
      id="how-it-works"
      className="how-section section-space"
      aria-labelledby="how-heading"
    >
      <div className="container">
        <div className="how-intro">
          <h2 id="how-heading">
            A few steps.
            <br />A whole new Deck.
          </h2>
          <div>
            <div
              className="segmented how-tabs"
              role="tablist"
              aria-label="Getting started"
              onKeyDown={(event) => {
                if (
                  !["ArrowLeft", "ArrowRight", "Home", "End"].includes(
                    event.key,
                  )
                )
                  return;
                event.preventDefault();
                const next =
                  event.key === "Home"
                    ? 0
                    : event.key === "End"
                      ? 1
                      : flow === "personal"
                        ? 1
                        : 0;
                setFlow(next ? "business" : "personal");
                refs.current[next]?.focus();
              }}
            >
              {(["personal", "business"] as const).map((value, index) => (
                <button
                  key={value}
                  ref={(node) => {
                    refs.current[index] = node;
                  }}
                  type="button"
                  role="tab"
                  id={`${id}-${value}`}
                  aria-controls={`${id}-panel`}
                  aria-selected={flow === value}
                  tabIndex={flow === value ? 0 : -1}
                  onClick={() => setFlow(value)}
                >
                  {value === "personal" ? "For you" : "For your business"}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div
          className={`steps steps-${flow}`}
          role="tabpanel"
          id={`${id}-panel`}
          aria-labelledby={`${id}-${flow}`}
          tabIndex={0}
        >
          {flows[flow].map((step, index) => (
            <div className="step" key={step.title}>
              <div className="step-index">
                <span>{String(index + 1).padStart(2, "0")}</span>
                {index < flows[flow].length - 1 && (
                  <ArrowRight size={20} aria-hidden="true" />
                )}
              </div>
              <h3>{step.title}</h3>
              <p>{step.copy}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
