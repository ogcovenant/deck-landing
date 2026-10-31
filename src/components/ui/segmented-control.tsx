"use client";

import { useRef } from "react";

type Option<T extends string> = {
  value: T;
  label: string;
  icon?: React.ReactNode;
};

export function SegmentedControl<T extends string>({
  label,
  options,
  value,
  onChange,
  className = "",
}: {
  label: string;
  options: Option<T>[];
  value: T;
  onChange: (value: T) => void;
  className?: string;
}) {
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  return (
    <div
      className={`segmented ${className}`}
      role="group"
      aria-label={label}
      onKeyDown={(event) => {
        const current = options.findIndex((option) => option.value === value);
        const index =
          event.key === "ArrowRight"
            ? (current + 1) % options.length
            : event.key === "ArrowLeft"
              ? (current - 1 + options.length) % options.length
              : event.key === "Home"
                ? 0
                : event.key === "End"
                  ? options.length - 1
                  : -1;
        if (index < 0) return;
        event.preventDefault();
        onChange(options[index].value);
        refs.current[index]?.focus();
      }}
    >
      {options.map((option, index) => (
        <button
          key={option.value}
          type="button"
          ref={(node) => {
            refs.current[index] = node;
          }}
          aria-pressed={value === option.value}
          onClick={() => onChange(option.value)}
        >
          {option.icon}
          {option.label}
        </button>
      ))}
    </div>
  );
}
