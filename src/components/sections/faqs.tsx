import { Plus } from "lucide-react";

const faqs = [
  [
    "What is Deck Cards?",
    "Deck Cards brings personal and business payment cards into one app. Create and manage your cards, follow card activity, and stay in control of spending.",
  ],
  [
    "Can I have both personal and business cards?",
    "Yes. Your personal cards and the business cards assigned to you are accessible in the same Deck app. Their ownership, balances and controls stay separate.",
  ],
  [
    "Can I access a card assigned by my employer?",
    "Yes. Cards assigned by your organization appear in your Deck app alongside your personal cards. Your organization owns its cards and manages their spending permissions.",
  ],
  [
    "Does Deck offer NGN and USD cards?",
    "Yes. Create and manage NGN and USD virtual cards in your Deck app, with your card settings and transaction activity in one place.",
  ],
  [
    "How do I get access?",
    "Join the early access list and choose personal cards, business cards, or both. We’ll email you with the next steps.",
  ],
  [
    "How can my business join?",
    "Choose “Business cards” or “Both” in the early access form. Set up your business profile, complete business verification, and issue cards to your team.",
  ],
];

export function FAQs() {
  return (
    <section
      id="faqs"
      className="faqs-section section-space"
      aria-labelledby="faqs-heading"
    >
      <div className="container faqs-grid">
        <div>
          <h2 id="faqs-heading">
            Good questions.
            <br />
            Straight answers.
          </h2>
          <p>
            A few things to know about Deck Cards.
          </p>
        </div>
        <div className="faq-list">
          {faqs.map(([question, answer]) => (
            <details key={question}>
              <summary>
                {question}
                <Plus size={19} aria-hidden="true" />
              </summary>
              <p>{answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
