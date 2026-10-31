import type { ComponentProps } from "react";

export function BrandLogo({
  light = false,
  wordmark = false,
  className = "",
}: {
  light?: boolean;
  wordmark?: boolean;
  className?: string;
}) {
  return (
    <img
      src={`/brand/deck-${wordmark ? "wordmark" : "horizontal"}-${light ? "paper" : "ink"}.svg`}
      alt="Deck"
      width={wordmark ? 224 : 311}
      height={76}
      className={`brand-logo ${className}`}
    />
  );
}

export function Riff({
  light = false,
  className = "",
  ...props
}: ComponentProps<"img"> & { light?: boolean }) {
  return (
    <img
      src={`/brand/deck-symbol-${light ? "paper" : "ink"}.svg`}
      alt=""
      width={72}
      height={64}
      className={`riff ${className}`}
      {...props}
    />
  );
}
