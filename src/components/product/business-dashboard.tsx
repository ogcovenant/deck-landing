"use client";

import { useEffect, useRef, useState } from "react";
import {
  ArrowDownLeft, ArrowUpRight, Check, ChevronDown,
  ChevronRight, CreditCard, LockKeyhole, MoreHorizontal,
  RotateCcw, Search, Settings2, ShieldCheck, Snowflake, UsersRound, X,
} from "lucide-react";
import { BrandLogo } from "../brand";
import { PaymentCard } from "./payment-card";
import { SegmentedControl } from "../ui/segmented-control";

type Status = "Active" | "Frozen" | "Terminated";
type WorkspaceView = "cards" | "activity" | "team";
const employees = [
  { name: "Tomi Adeyemi", initials: "TA", role: "Operations", ending: "1094", limit: 250000, spend: 70000, cardName: "Operations card" },
  { name: "Ada Okafor", initials: "AO", role: "Design", ending: "3082", limit: 150000, spend: 42500, cardName: "Design card" },
  { name: "Femi Bello", initials: "FB", role: "Marketing", ending: "7560", limit: 200000, spend: 85000, cardName: "Marketing card" },
];
const naira = (value: number) => new Intl.NumberFormat("en-NG", { style: "currency", currency: "NGN", maximumFractionDigits: 0 }).format(value);

export function BusinessDashboard() {
  const [view, setView] = useState<WorkspaceView>("cards");
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<"all" | "active" | "frozen">("all");
  const [statuses, setStatuses] = useState<Status[]>(["Active", "Active", "Frozen"]);
  const [spotlight, setSpotlight] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const launcher = useRef<HTMLButtonElement | null>(null);
  const dashboard = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (selected === null) return;
    const panel = dialog.current;
    panel?.showModal();
    return () => {
      panel?.close();
      const fallback = dashboard.current?.querySelector<HTMLButtonElement>('.dashboard-filters button[aria-pressed="true"]');
      (launcher.current?.isConnected ? launcher.current : fallback)?.focus();
    };
  }, [selected]);
  const openManagement = (index: number, trigger: HTMLButtonElement) => {
    launcher.current = trigger;
    setSpotlight(index);
    setSelected(index);
  };
  const openCard = (index: number, trigger: HTMLButtonElement) => {
    setSpotlight(index);
    if (window.matchMedia("(max-width: 1199px)").matches) openManagement(index, trigger);
  };
  const employee = selected === null ? null : employees[selected];
  const featured = employees[spotlight];
  const matches = (person: typeof featured, index: number) =>
    (filter === "all" || statuses[index].toLowerCase() === filter) &&
    `${person.name} ${person.role} ${person.ending} ${person.cardName}`.toLowerCase().includes(query.toLowerCase().trim());
  const update = (status: Status) => {
    if (selected !== null) setStatuses((previous) => previous.map((s, i) => i === selected ? status : s));
    if (status === "Terminated" || (selected !== null && statuses[selected] === "Terminated")) dialog.current?.querySelector<HTMLButtonElement>("button")?.focus();
  };
  const reset = () => { setStatuses(["Active", "Active", "Frozen"]); setFilter("all"); setQuery(""); };

  return (
    <figure className="business-figure">
      <div className="business-dashboard deck-console" ref={dashboard} role="group" aria-label="Interactive business card management preview">
        <aside className="dashboard-sidebar">
          <BrandLogo />
          <div className="console-workspace"><span className="console-org-avatar">N</span><span>Northstar Studio<small>Business workspace</small></span><ChevronDown size={13} aria-hidden="true" /></div>
          <nav aria-label="Business preview navigation">
            {([
              { value: "cards", label: "Cards", icon: CreditCard },
              { value: "activity", label: "Activity", icon: ArrowDownLeft },
              { value: "team", label: "Team", icon: UsersRound },
            ] as const).map((item) => <button type="button" key={item.value} aria-pressed={view === item.value} onClick={() => setView(item.value)}><item.icon size={17} />{item.label}{item.value === "cards" && <span>{statuses.filter(s => s !== "Terminated").length}</span>}</button>)}
          </nav>
          <div className="console-sidebar-bottom"><span><ShieldCheck size={16} />Your business. In control.</span><div><span className="employee-avatar avatar-0">TA</span><span>Tomi Adeyemi<small>Workspace admin</small></span><Settings2 size={15} aria-hidden="true" /></div></div>
        </aside>
        <div className="dashboard-main">
          <header className="dashboard-top"><span>Workspace <ChevronRight size={12} aria-hidden="true" /><strong>{view === "cards" ? "Cards" : view === "activity" ? "Activity" : "Team"}</strong></span><span><span className="console-preview-indicator" />Northstar Studio<span className="tiny-avatar">TA</span></span></header>
          <div className="console-mobile-nav"><SegmentedControl label="Workspace view" value={view} onChange={setView} options={[{ value: "cards", label: "Cards", icon: <CreditCard size={14} /> }, { value: "activity", label: "Activity", icon: <ArrowDownLeft size={14} /> }, { value: "team", label: "Team", icon: <UsersRound size={14} /> }]} /></div>
          <div className="dashboard-heading"><div><h3>{view === "cards" ? "Team cards" : view === "activity" ? "Card activity" : "Your team"}</h3><p>{view === "cards" ? "The right cards. In the right hands." : view === "activity" ? "A closer look at your team's card spending." : "Your people, and the cards assigned to them."}</p></div><button type="button" className="console-primary" onClick={(event) => openManagement(spotlight, event.currentTarget)}><Settings2 size={14} />Manage card</button></div>
          <div className="dashboard-stats">
            <div><span>Assigned cards</span><strong>{statuses.filter(s => s !== "Terminated").length.toString().padStart(2, "0")}<small>{statuses.filter(s => s === "Active").length} active</small></strong></div>
            <div><span>Team spend this month</span><strong>{naira(employees.reduce((sum, person) => sum + person.spend, 0))}<small>.00</small></strong></div>
            <div><span>Combined monthly limits</span><strong>{naira(employees.reduce((sum, person, index) => sum + (statuses[index] === "Terminated" ? 0 : person.limit), 0))}<small>.00</small></strong></div>
          </div>
          <div className={`console-content ${view !== "cards" ? "console-content-full" : ""}`}>
            <div className="console-list">
              {view === "cards" ? <>
                <div className="dashboard-filters"><SegmentedControl label="Filter team cards" value={filter} onChange={setFilter} options={[{ value: "all", label: "All cards" }, { value: "active", label: "Active" }, { value: "frozen", label: "Frozen" }]} /><label className="console-search"><Search size={14} aria-hidden="true" /><input type="search" aria-label="Search team cards" placeholder="Search cards" value={query} onChange={event => setQuery(event.target.value)} /></label></div>
                <div className="dashboard-table-wrap"><table className="dashboard-table"><caption className="sr-only">Illustrative cards assigned to team members</caption><thead><tr><th scope="col">Cardholder</th><th scope="col">Card</th><th scope="col">Monthly limit</th><th scope="col">Status</th><th scope="col"><span className="sr-only">Actions</span></th></tr></thead><tbody>{employees.map((person, i) => matches(person, i) && <tr key={person.name} className={spotlight === i ? "console-row-selected" : ""}>
                  <td><button className="console-person" type="button" aria-label={`View ${person.name}'s card`} aria-pressed={spotlight === i} onClick={(event) => openCard(i, event.currentTarget)}><span className={`employee-avatar avatar-${i}`}>{person.initials}</span><span>{person.name}<small>{person.role}</small></span></button></td>
                  <td><span className="console-card-chip"><CreditCard size={12} />{person.ending}</span></td><td>{naira(person.limit)}</td><td><span className={`status status-${statuses[i].toLowerCase()}`}><span className="console-status-dot" />{statuses[i]}</span></td>
                  <td><button className="manage-card" type="button" aria-label={`Manage ${person.name}'s card`} aria-haspopup="dialog" onClick={(event) => openManagement(i, event.currentTarget)}><MoreHorizontal size={17} /></button></td>
                </tr>)}</tbody></table>{!employees.some(matches) && <p className="empty-table">No cards match this view. Try another name or filter.</p>}</div>
                <div className="console-list-caption"><span>{employees.filter(matches).length} of {employees.length} cards</span><span>NGN card program</span></div>
              </> : view === "activity" ? <div className="console-activity"><h4>Recent card activity<span>Recent transactions</span></h4>{employees.map((person, i) => <div key={person.name}><span className={`employee-avatar avatar-${i}`}>{person.initials}</span><span><strong>{["Studio supplies", "Design materials", "Print studio"][i]}</strong><small>{person.name} · •• {person.ending}</small></span><span className="console-transaction-date">{i === 0 ? "Today" : "Yesterday"}</span><strong>{naira(-[12500, 18500, 85000][i])}</strong><span className="status status-active"><Check size={10} />Complete</span></div>)}</div> : <div className="console-team">{employees.map((person, i) => <div key={person.name}><span className={`employee-avatar avatar-${i}`}>{person.initials}</span><span><strong>{person.name}</strong><small>{person.role}</small></span><span className="console-team-role">Member · 1 assigned card</span><button type="button" onClick={(event) => { setView("cards"); openCard(i, event.currentTarget); }}>View card<ArrowUpRight size={14} /></button></div>)}</div>}
            </div>
            {view === "cards" && <aside className="console-inspector" aria-label="Selected team card"><header>Card overview<span className={`status status-${statuses[spotlight].toLowerCase()}`}>{statuses[spotlight]}</span></header><PaymentCard variant="blackberry" compact context="Northstar Studio" holder={featured.name.toUpperCase()} ending={featured.ending} frozen={statuses[spotlight] !== "Active"} /><h4>{featured.cardName}</h4><p>Assigned to {featured.name}</p><div className="console-spend-label"><span>Monthly spending</span><strong>{Math.round(featured.spend / featured.limit * 100)}%</strong></div><div className="console-spend-track"><span style={{ width: `${featured.spend / featured.limit * 100}%` }} /></div><div className="console-spend-amount"><strong>{naira(featured.spend)}</strong><span>of {naira(featured.limit)}</span></div><button type="button" className="console-settings" onClick={event => openManagement(spotlight, event.currentTarget)}><Settings2 size={14} />Card settings<ChevronRight size={14} /></button><small><LockKeyhole size={11} />Owned by Northstar Studio</small></aside>}
          </div>
          <div className="dashboard-foot"><span><LockKeyhole size={11} />Organization-owned. Centrally managed.</span><button className="reset-demo" type="button" onClick={reset}><RotateCcw size={12} />Reset</button></div>
        </div>
        {employee && selected !== null && <dialog className="card-management" ref={dialog} onCancel={() => setSelected(null)} aria-label={`Manage ${employee.name}'s card`}>
          <div className="management-heading"><strong>Card settings</strong><button type="button" aria-label="Close card management" onClick={() => setSelected(null)}><X size={18} /></button></div>
          <PaymentCard compact variant="blackberry" context="Northstar Studio" holder={employee.name.toUpperCase()} ending={employee.ending} frozen={statuses[selected] !== "Active"} />
          <p><strong>{employee.name}</strong><span>Owned by Northstar Studio</span></p>
          <dl><div><dt>Monthly limit</dt><dd>{naira(employee.limit)}</dd></div><div><dt>Status</dt><dd aria-live="polite">{statuses[selected]}</dd></div></dl>
          {statuses[selected] !== "Terminated" ? <><button className="button" type="button" onClick={() => update(statuses[selected] === "Frozen" ? "Active" : "Frozen")}><Snowflake size={15} />{statuses[selected] === "Frozen" ? "Unfreeze card" : "Freeze card"}</button><button type="button" className="terminate-button" onClick={() => update("Terminated")}>Terminate card<ArrowUpRight size={13} /></button></> : <button className="button" type="button" onClick={() => update("Active")}><RotateCcw size={14} />Reset card</button>}
        </dialog>}
      </div>
      <figcaption>Explore the workspace. Select a card, filter the team, or open its settings.</figcaption>
    </figure>
  );
}
