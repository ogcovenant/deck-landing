"use client";

import { useRef, useState, type FormEvent } from "react";
import { ArrowUpRight, Check, LoaderCircle, LockKeyhole } from "lucide-react";
import { Riff } from "../brand";

export function EarlyAccess() {
  const [state, setState] = useState<"idle" | "loading" | "success" | "error">(
    "idle",
  );
  const [message, setMessage] = useState("");
  const submitting = useRef(false);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting.current) return;
    submitting.current = true;
    const form = event.currentTarget;
    const data = new FormData(form);
    setState("loading");
    setMessage("");
    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: data.get("email"),
          interest: data.get("interest"),
          website: data.get("website"),
        }),
        signal: AbortSignal.timeout(15000),
      });
      const result = await response.json();
      if (!response.ok || result.accepted !== true)
        throw new Error(
          result.message ||
            "We couldn’t add you just yet. Please try again shortly.",
        );
      setState("success");
      setMessage(
        "You’re on the list. We’ll email you when there’s news about Deck Cards.",
      );
      form.reset();
    } catch (error) {
      setState("error");
      setMessage(
        error instanceof Error &&
          error.name !== "TimeoutError" &&
          error.name !== "TypeError"
          ? error.message
          : "We couldn’t reach the registration service. Your signup isn’t confirmed. Please try again.",
      );
    } finally {
      submitting.current = false;
    }
  }
  return (
    <section
      id="early-access"
      className="early-access-section"
      aria-labelledby="early-access-heading"
    >
      <div className="container early-access-grid">
        <div className="early-access-copy">
          <h2 id="early-access-heading">
            Make room for
            <br />a better way
            <br />
            to spend.
          </h2>
          <p>
            Personal cards. Business cards. One app. Join the early access list
            and make Deck part of your everyday.
          </p>
          <Riff className="early-riff" aria-hidden="true" />
        </div>
        <div className="waitlist-wrap">
          <h3>Your next Deck starts here.</h3>
          <p>A personal card, a team of cards, or a little of both.</p>
          <form onSubmit={submit} aria-busy={state === "loading"}>
            <label htmlFor="waitlist-email">Your email address</label>
            <input
              id="waitlist-email"
              name="email"
              type="email"
              autoComplete="email"
              inputMode="email"
              placeholder="you@example.com"
              maxLength={254}
              required
              disabled={state === "loading" || state === "success"}
            />
            <fieldset disabled={state === "loading" || state === "success"}>
              <legend>I’m interested in</legend>
              <div className="interest-options">
                <label>
                  <input
                    type="radio"
                    name="interest"
                    value="personal"
                    defaultChecked
                  />
                  <span>Personal cards</span>
                  <Check size={14} aria-hidden="true" />
                </label>
                <label>
                  <input type="radio" name="interest" value="business" />
                  <span>Business cards</span>
                  <Check size={14} aria-hidden="true" />
                </label>
                <label>
                  <input type="radio" name="interest" value="both" />
                  <span>Both</span>
                  <Check size={14} aria-hidden="true" />
                </label>
              </div>
            </fieldset>
            <div className="honeypot" aria-hidden="true">
              <label htmlFor="waitlist-website">Leave this field empty</label>
              <input
                id="waitlist-website"
                name="website"
                tabIndex={-1}
                autoComplete="off"
              />
            </div>
            <button
              type="submit"
              className="button waitlist-submit"
              disabled={state === "loading" || state === "success"}
            >
              {state === "loading" ? (
                <>
                  Joining the list
                  <LoaderCircle className="loading-icon" size={17} />
                </>
              ) : state === "success" ? (
                <>
                  You’re on the list
                  <Check size={17} />
                </>
              ) : (
                <>
                  Get early access
                  <ArrowUpRight size={17} />
                </>
              )}
            </button>
            <p
              className={`form-feedback ${state === "error" ? "form-error" : ""}`}
              role={state === "error" ? "alert" : "status"}
            >
              {message}
            </p>
            <p className="privacy-reassurance">
              <LockKeyhole size={13} aria-hidden="true" />
              <span>
                Only news about Deck Cards. See our{" "}
                <a href="/privacy">privacy notice</a> for signup details.
              </span>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
