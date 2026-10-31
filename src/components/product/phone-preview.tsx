"use client";

import { useEffect, useRef, useState } from "react";
import {
  ArrowDownLeft, BatteryFull, BriefcaseBusiness, Check,
  ChevronRight, Coffee, CreditCard, Eye, LockKeyhole, Settings2,
  ShieldCheck, ShoppingBag, Signal, SlidersHorizontal, Snowflake,
  UserRound, Wifi, X,
} from "lucide-react";
import { SegmentedControl } from "../ui/segmented-control";
import { PaymentCard } from "./payment-card";

type Sheet = "details" | "limits" | "settings" | null;

export function PhonePreview({
  initialContext = "personal", className = "", hero = false,
}: {
  initialContext?: "personal" | "work";
  className?: string;
  hero?: boolean;
}) {
  const [context, setContext] = useState<"personal" | "work">(initialContext);
  const [currency, setCurrency] = useState<"NGN" | "USD">("NGN");
  const [view, setView] = useState<"cards" | "activity">("cards");
  const [sheet, setSheet] = useState<Sheet>(null);
  const [frozenCards, setFrozenCards] = useState<Record<string, boolean>>({});
  const sheetTrigger = useRef<HTMLButtonElement | null>(null);
  useEffect(() => {
    if (!sheet) sheetTrigger.current?.focus();
  }, [sheet]);
  const work = context === "work";
  const usd = !work && currency === "USD";
  const cardKey = work ? "work" : currency;
  const frozen = !!frozenCards[cardKey];
  const ending = work ? "1094" : usd ? "6208" : "4821";
  const balance = work ? "₦180,000.00" : usd ? "$420.00" : "₦245,000.00";
  const transactions = work ? [
    { name: "Studio supplies", detail: "Office expenses · Today", amount: "−₦12,500", icon: ShoppingBag },
    { name: "Team lunch", detail: "Meals · Yesterday", amount: "−₦24,000", icon: Coffee },
    { name: "Print studio", detail: "Office expenses · Yesterday", amount: "−₦8,500", icon: CreditCard },
  ] : [
    { name: usd ? "Design supply" : "Coffee & Co.", detail: "Card payment · Today", amount: usd ? "−$24.00" : "−₦4,500", icon: Coffee },
    { name: usd ? "Cloud storage" : "Everyday Market", detail: "Card payment · Yesterday", amount: usd ? "−$12.00" : "−₦18,200", icon: ShoppingBag },
    { name: "Paper & Co.", detail: "Card payment · Yesterday", amount: usd ? "−$8.50" : "−₦8,000", icon: CreditCard },
  ];
  const closeSheet = () => {
    setSheet(null);
  };
  const openSheet = (next: Sheet, trigger: HTMLButtonElement) => {
    sheetTrigger.current = trigger;
    setSheet(next);
  };

  return (
    <div
      className={`phone deck-app ${work ? "app-work" : ""} ${className}`}
      role="group"
      aria-label={hero ? "Deck mobile app hero preview" : "Interactive Deck mobile app preview"}
      onKeyDown={(event) => {
        if (event.key === "Escape" && sheet) { event.stopPropagation(); closeSheet(); }
      }}
    >
      <div className="phone-screen">
        <div className="phone-status" aria-hidden="true">
          <span>9:41</span><span className="phone-island" />
          <span><Signal size={13} /><Wifi size={13} /><BatteryFull size={18} /></span>
        </div>
        <div className="phone-content" inert={!!sheet}>
          <div className="app-header">
            <h3>{view === "cards" ? "Your cards" : "Activity"}</h3>
            <div><span className="app-avatar">TA</span></div>
          </div>
          <SegmentedControl
            label="App card context" value={context} onChange={setContext}
            options={[
              { value: "personal", label: "Personal", icon: <UserRound size={14} /> },
              { value: "work", label: "Work", icon: <BriefcaseBusiness size={14} /> },
            ]}
          />
          <div className="app-balance">
            <div className="app-balance-label">
              <span>{work ? "Available for expenses" : "Personal card balance"}</span>
              {!work && <div className="currency-picker" role="group" aria-label="Personal card currency">
                {(["NGN", "USD"] as const).map((code) => <button type="button" key={code} aria-pressed={currency === code} onClick={() => setCurrency(code)}>{code}</button>)}
              </div>}
              {work && <span className="app-work-badge"><BriefcaseBusiness size={10} />Northstar</span>}
            </div>
            <strong aria-live="polite">{balance}</strong>
          </div>
          {view === "cards" && <>
            <div className="app-card-state" key={`${context}-${currency}`}>
              <PaymentCard compact variant={work ? "blackberry" : usd ? "lilac" : "ember"} context={work ? "Northstar Studio" : "Personal"} currency={usd ? "USD" : "NGN"} ending={ending} frozen={frozen} />
              <span className={`app-card-status ${frozen ? "is-frozen" : ""}`} aria-live="polite">{frozen ? <Snowflake size={10} /> : <span />}{frozen ? "Frozen" : "Active"}</span>
            </div>
            <div className="app-shortcuts">
              <button type="button" onClick={(event) => openSheet("details", event.currentTarget)}><span><Eye size={17} /></span>Details</button>
              <button type="button" aria-label={work ? "Work card status is managed by your organization" : frozen ? "Unfreeze personal card" : "Freeze personal card"} aria-pressed={frozen} disabled={work} onClick={() => setFrozenCards((previous) => ({ ...previous, [cardKey]: !frozen }))}><span><Snowflake size={17} /></span>{frozen ? "Unfreeze" : "Freeze"}</button>
              <button type="button" onClick={(event) => openSheet("limits", event.currentTarget)}><span><SlidersHorizontal size={17} /></span>Limits</button>
            </div>
            {work && <p className="app-owner"><LockKeyhole size={10} />Managed by your organization</p>}
          </>}
          <div className={`app-activity ${view === "activity" ? "app-activity-full" : ""}`}>
            <div className="app-activity-heading"><h4>{work ? "Business expenses" : "Recent activity"}</h4><span>Today</span></div>
            {transactions.slice(0, view === "activity" ? 3 : 2).map((transaction) => <div className="app-transaction" key={transaction.name}>
              <span className="transaction-icon"><transaction.icon size={17} /></span>
              <span>{transaction.name}<small>{transaction.detail}</small></span><strong>{transaction.amount}</strong>
            </div>)}
          </div>
          {hero && !work && <button className="assigned-card-hint" type="button" onClick={() => setContext("work")}><span className="hint-icon"><BriefcaseBusiness size={15} /></span><span>Your work card is here, too<small>Northstar Studio · •• 1094</small></span><ChevronRight size={15} /></button>}
        </div>
        <nav className="app-bottom-nav" aria-label="App preview navigation" inert={!!sheet}>
          <button type="button" className={view === "cards" ? "selected" : ""} aria-pressed={view === "cards"} onClick={() => setView("cards")}><CreditCard size={20} />Cards</button>
          <button type="button" className={view === "activity" ? "selected" : ""} aria-pressed={view === "activity"} onClick={() => setView("activity")}><ArrowDownLeft size={20} />Activity</button>
          <button type="button" onClick={(event) => openSheet("settings", event.currentTarget)}><Settings2 size={20} />Settings</button>
        </nav>
        {sheet && <>
          <button className="app-sheet-backdrop" type="button" onClick={closeSheet} aria-label="Close app details" />
          <section className="app-sheet" aria-label={sheet === "details" ? "Card details" : sheet === "limits" ? "Card spending limit" : "App settings"}>
            <div className="app-sheet-handle" />
            <header><h4>{sheet === "details" ? "Card details" : sheet === "limits" ? "Spending limit" : "Your Deck"}</h4><button type="button" autoFocus onClick={closeSheet} aria-label="Close app panel"><X size={17} /></button></header>
            {sheet === "details" ? <>
              <div className="app-sheet-card"><CreditCard size={22} /><div>{work ? "Northstar Studio" : "Personal card"}<small>{usd ? "USD" : "NGN"} · Virtual card</small></div><span>•• {ending}</span></div>
              <dl><div><dt>Cardholder</dt><dd>Tomi Adeyemi</dd></div><div><dt>Ownership</dt><dd>{work ? "Northstar Studio" : "Personal"}</dd></div><div><dt>Card status</dt><dd>{frozen ? "Frozen" : "Active"}</dd></div></dl>
              <p><ShieldCheck size={14} />Your card number is masked.</p>
            </> : sheet === "limits" ? <>
              <span className="app-sheet-label">Monthly card limit</span><strong className="app-sheet-amount">{work ? "₦250,000" : usd ? "$500" : "₦100,000"}</strong>
              <div className="app-limit-track"><span style={{ width: work ? "28%" : "42%" }} /></div>
              <p><LockKeyhole size={14} />{work ? "Your organization sets this limit. Personal balances stay separate." : "Keep your card spending within a monthly limit."}</p>
            </> : <>
              <div className="app-sheet-card"><span className="app-avatar">TA</span><div>Tomi Adeyemi<small>Personal Deck profile</small></div><Check size={16} /></div>
              <dl><div><dt>Personal cards</dt><dd>NGN & USD</dd></div><div><dt>Work card</dt><dd>Northstar Studio</dd></div></dl>
              <p><ShieldCheck size={14} />One app. Separate ownership, balances and controls.</p>
            </>}
          </section>
        </>}
        <div className="phone-home" aria-hidden="true" />
      </div>
    </div>
  );
}
