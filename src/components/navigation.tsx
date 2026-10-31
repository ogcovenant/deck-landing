"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { BrandLogo } from "./brand";

const links = [
  { href: "/#personal", label: "Personal" },
  { href: "/#business", label: "Business" },
  { href: "/#how-it-works", label: "How it works" },
  { href: "/#faqs", label: "FAQs" },
];

export function Navigation() {
  const [open, setOpen] = useState(false);
  const trigger = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!open) return;
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        trigger.current?.focus();
      }
    };
    document.addEventListener("keydown", close);
    return () => document.removeEventListener("keydown", close);
  }, [open]);
  return (
    <header className="site-header">
      <div className="nav-wrap container">
        <a
          href="/"
          className="logo-link"
          aria-label="Deck home"
          onClick={() => setOpen(false)}
        >
          <BrandLogo />
        </a>
        <nav className="desktop-nav" aria-label="Main navigation">
          {links.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>
        <a href="/#early-access" className="button nav-cta">
          Get early access <ArrowUpRight size={16} aria-hidden="true" />
        </a>
        <button
          type="button"
          ref={trigger}
          className="menu-trigger"
          aria-label={open ? "Close navigation" : "Open navigation"}
          aria-expanded={open}
          aria-controls="mobile-navigation"
          onClick={() => setOpen(!open)}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>
      <nav
        id="mobile-navigation"
        className="mobile-nav"
        aria-label="Mobile navigation"
        hidden={!open}
      >
        {links.map((link) => (
          <a key={link.href} href={link.href} onClick={() => setOpen(false)}>
            {link.label}
            <ArrowUpRight size={18} aria-hidden="true" />
          </a>
        ))}
        <a href="/#early-access" onClick={() => setOpen(false)}>
          Get early access
          <ArrowUpRight size={18} aria-hidden="true" />
        </a>
      </nav>
    </header>
  );
}
