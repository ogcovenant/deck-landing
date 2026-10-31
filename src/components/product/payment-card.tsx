export type CardVariant = "ember" | "lilac" | "blackberry";

export function PaymentCard({
  variant = "ember",
  currency = "NGN",
  context = "Personal",
  ending = "4821",
  holder = "TOMI ADEYEMI",
  compact = false,
  frozen = false,
  className = "",
}: {
  variant?: CardVariant;
  currency?: "NGN" | "USD";
  context?: string;
  ending?: string;
  holder?: string;
  compact?: boolean;
  frozen?: boolean;
  className?: string;
}) {
  return (
    <div
      className={`payment-card card-${variant} ${compact ? "card-compact" : ""} ${frozen ? "card-frozen" : ""} ${className}`}
      aria-label={`${context} ${currency} virtual card ending ${ending}${frozen ? ", frozen" : ""}`}
    >
      <img
        className="card-render"
        src={`/cards/deck-${variant}.webp`}
        alt=""
        width={1200}
        height={750}
        decoding="async"
      />
      <div className="card-top">
        <span className="card-currency">
          {currency}
          <span>VIRTUAL</span>
        </span>
      </div>
      <div className="card-bottom">
        <div>
          <span className="card-number">•••• &nbsp; {ending}</span>
          <span className="card-holder">{holder}</span>
        </div>
        <span className="card-context">{context}</span>
      </div>
    </div>
  );
}
