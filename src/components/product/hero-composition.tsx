"use client";

import { motion, useReducedMotion } from "framer-motion";
import { PaymentCard } from "./payment-card";
import { PhonePreview } from "./phone-preview";

export function HeroComposition() {
  const reduced = useReducedMotion();
  return (
    <figure className="hero-product" aria-label="A preview of personal and assigned work cards in the Deck app">
      <div className="hero-scene">
        <div className="hero-phone"><PhonePreview hero /></div>
        <motion.div className="hero-usd" initial={false} animate={{ y: 0, rotate: -14 }} whileHover={reduced ? undefined : { y: -8, rotate: -11 }} transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}>
          <PaymentCard variant="lilac" currency="USD" ending="6208" />
        </motion.div>
        <motion.div className="hero-work" initial={false} animate={{ y: 0, rotate: 9 }} whileHover={reduced ? undefined : { y: -8, rotate: 6 }} transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}>
          <PaymentCard variant="ember" context="Northstar Studio" ending="1094" />
        </motion.div>
      </div>
    </figure>
  );
}
