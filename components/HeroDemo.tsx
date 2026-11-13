"use client";
import { ArrowUp, Briefcase, ChevronDown, ChevronLeft, ChevronRight, Ellipsis, GalleryVerticalEnd, Mic, PanelLeft, Plus, RotateCcw, Search, Settings, Square } from "lucide-react";
import { AnimatePresence, motion, useInView, useReducedMotion, useSpring, useTransform } from "motion/react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { COMPLIANCE, Check, Icon, BrandLogo, Mark, Pill, ease } from "./demo-support";

/* A scripted, looping demo of a real Vibefortress flow (demo repo, demo numbers), drawn to look like the Claude desktop app on a Mac
   (feature 033; reference and colours: specs/033-front-page-compliance-demo/research.md).
   Phases: type -> send -> five review stages -> findings -> "fix this" -> fixing -> pull request, score climbs, Compliance line.
   The window has ONE fixed height per layout: everything happens inside it, so the page never moves. */
const STAGES = ["Threat model", "Plan", "Research", "Review", "Calibrate"];
const FINDINGS: { sev: "crit" | "high"; label: string; title: string; where: string; relates?: string }[] = [
  { sev: "crit", label: "Critical", title: "Live Stripe key in code", where: "src/config.js:2" },
  { sev: "crit", label: "Critical", title: "orders table has no row level security", where: "supabase/migrations/001.sql:14" },
  // The rule the shared Compliance facts hold a real "Relates to" line for, so the line is the product's own text.
  { sev: "high", label: "High", title: "Order changed by id without checking who owns it", where: "app/api/orders/[id]/route.ts:12", relates: COMPLIANCE.example.relatesTo },
];
/** How many framework items the product links to that finding. */
const LINKED = COMPLIANCE.example.relatesTo.split(",").length;
const REPO = "acme/shop";
const CHAT = `Security check for ${REPO}`;
const RECENTS = [CHAT, "Stripe checkout flow", "Landing page copy", "Orders table schema", "Fix the signup form"];
const Q1 = "check my app";
const Q2 = "fix this";
const DONE = 7;
// [phase, ms]: 16.6 seconds in all
const SCRIPT: [number, number][] = [[0, 1300], [1, 500], [2, 3200], [3, 3000], [4, 1100], [5, 400], [6, 1900], [DONE, 5200]];

function usePhase(run: boolean, reduce: boolean) {
  const [phase, setPhase] = useState(reduce ? DONE : 0);
  const [stage, setStage] = useState(reduce ? STAGES.length : 0);
  const [typed, setTyped] = useState(0);
  const [loop, setLoop] = useState(0);
  useEffect(() => {
    if (reduce || !run) return;
    let t = 0; const timers: number[] = [];
    SCRIPT.forEach(([p, ms]) => { timers.push(window.setTimeout(() => setPhase(p), t)); t += ms; });
    timers.push(window.setTimeout(() => setLoop((l) => l + 1), t));
    return () => timers.forEach(clearTimeout);
  }, [run, reduce, loop]);
  useEffect(() => { // typing for phases 0 and 4, stage ticks for phase 2
    if (reduce) return;
    if (phase === 0 || phase === 4) {
      setTyped(0);
      const len = (phase === 0 ? Q1 : Q2).length;
      const iv = window.setInterval(() => setTyped((n) => (n >= len ? n : n + 1)), phase === 0 ? 70 : 90);
      return () => clearInterval(iv);
    }
    if (phase === 2) {
      setStage(0);
      const iv = window.setInterval(() => setStage((s) => Math.min(STAGES.length, s + 1)), 600);
      return () => clearInterval(iv);
    }
  }, [phase, reduce]);
  return { phase, stage, typed, replay: () => setLoop((l) => l + 1) };
}

export function HeroDemo() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-15% 0px" });
  const reduce = !!useReducedMotion();
  const { phase, stage, typed, replay } = usePhase(inView, reduce);
  const typing = phase === 0 || phase === 4;
  const working = phase === 2 || phase === 6;
  const input = phase === 0 ? Q1.slice(0, typed) : phase === 4 ? Q2.slice(0, typed) : "";

  return (
    <div ref={ref} data-demo-box className="cl relative flex h-[580px] overflow-hidden rounded-[12px] bg-[var(--cl-main)] text-left ring-1 ring-[var(--cl-line-strong)] md:h-[620px]" role="group" aria-label="Demo of Vibefortress in a Claude chat">
      <p className="sr-only">Scripted demo: you type "check my app", Vibefortress runs five review stages and shows three security holes as a card in the chat, one of them with the framework items it relates to. You type "fix this", a pull request fixes them, the score goes from D to A and the linked items go from gap to ready.</p>

      {/* Sidebar (wide screens) */}
      <div className="hidden w-[208px] shrink-0 flex-col bg-[var(--cl-side)] text-[13.5px] md:flex" aria-hidden="true">
        <div className="flex h-11 items-center gap-3 px-3.5">
          <Lights />
          <PanelLeft className="ml-1 size-4 text-[var(--cl-muted)]" strokeWidth={1.75} />
          <ChevronLeft className="size-4 text-[var(--cl-muted)]" strokeWidth={1.75} />
          <ChevronRight className="-ml-1.5 size-4 text-[var(--cl-faint)]" strokeWidth={1.75} />
        </div>
        <ul className="mt-1 px-2">
          {([[Plus, "New chat"], [Search, "Search"], [GalleryVerticalEnd, "Artifacts"], [Briefcase, "Customize"], [Ellipsis, "More"]] as const).map(([I, l]) => (
            <li key={l} className="flex h-[30px] items-center gap-2.5 rounded-[7px] px-2"><I className="size-4" strokeWidth={1.6} />{l}</li>
          ))}
        </ul>
        <p className="mt-5 px-4 text-[12px] text-[var(--cl-faint)]">Recents</p>
        <ul className="mt-1.5 px-2">
          {RECENTS.map((r, i) => (
            <li key={r} className={`flex h-[30px] items-center rounded-[7px] px-2 ${i === 0 ? "bg-[var(--cl-row)]" : ""}`}><span className="truncate">{r}</span></li>
          ))}
        </ul>
        <div className="mt-auto flex h-12 items-center gap-2 px-3.5">
          <span className="grid size-[22px] place-items-center rounded-full bg-[var(--cl-row)] text-[10.5px]">A</span>
          <span className="truncate">Ada <span className="text-[var(--cl-faint)]">· acme</span></span>
          <Settings className="ml-auto size-4 text-[var(--cl-muted)]" strokeWidth={1.6} />
        </div>
      </div>

      {/* Main column */}
      <div className="flex min-w-0 flex-1 flex-col md:border-l md:border-[var(--cl-line)]">
        <div className="flex h-11 shrink-0 items-center gap-2 border-b border-[var(--cl-line)] px-3.5">
          <span className="mr-1.5 md:hidden" aria-hidden="true"><Lights /></span>
          <span className="flex min-w-0 items-center gap-1.5 text-[13.5px]" aria-hidden="true"><span className="truncate">{CHAT}</span><ChevronDown className="size-3.5 shrink-0 text-[var(--cl-muted)]" strokeWidth={1.75} /></span>
          <button type="button" onClick={replay} className="ml-auto inline-flex h-7 shrink-0 items-center gap-1.5 whitespace-nowrap rounded-[7px] px-2 text-[12.5px] text-[var(--cl-muted)] transition-colors hover:bg-[var(--cl-bubble)] hover:text-[var(--cl-ink)]" aria-label="Replay the demo"><RotateCcw className="size-3.5" strokeWidth={1.75} />Replay</button>
        </div>

        {/* Conversation: fixed area, hidden overflow. Short content starts at the top; tall content is anchored to the bottom, so older messages leave upward. */}
        <div className="relative min-h-0 flex-1 overflow-hidden [mask-image:linear-gradient(to_bottom,transparent_0,black_22px)]" aria-hidden="true">
          <AnimatePresence>
            {phase < 1 && (
              <motion.div key="idle" className="absolute inset-0 grid place-items-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
                <BrandLogo id="claude" className="size-9 opacity-90" />
              </motion.div>
            )}
          </AnimatePresence>
          <div className="absolute inset-x-0 bottom-0 mx-auto flex min-h-full max-w-[640px] flex-col gap-3.5 px-4 pb-3 pt-6 text-[14px] leading-[1.5] sm:px-5">
            <AnimatePresence>
              {phase >= 1 && <Row key="q1"><Bubble>{Q1}</Bubble></Row>}
              {phase >= 2 && (
                <Row key="t1">
                  {phase === 2
                    ? <ToolRow working meta={`${Math.min(stage + 1, STAGES.length)} of ${STAGES.length}`}>Vibefortress: {STAGES[Math.min(stage, STAGES.length - 1)]}</ToolRow>
                    : <ToolRow>Used Vibefortress: {STAGES.length} review stages</ToolRow>}
                </Row>
              )}
              {phase >= 3 && <Row key="a1"><p>I found 3 holes in {REPO}. The worst: a live Stripe key anyone can read.</p></Row>}
              {phase >= 3 && <Row key="c1"><ResultCard reduce={reduce} /></Row>}
              {phase >= 5 && <Row key="q2"><Bubble>{Q2}</Bubble></Row>}
              {phase >= 6 && (
                <Row key="t2">
                  {phase === 6 ? <ToolRow working>Vibefortress: writing the fix on a new branch</ToolRow> : <ToolRow>Used Vibefortress and GitHub: fix, then check again</ToolRow>}
                </Row>
              )}
              {phase >= DONE && (
                <Row key="pr">
                  <div className="flex items-center gap-2 rounded-[10px] px-3 py-2 ring-1 ring-inset ring-[var(--cl-line)]">
                    <Icon name="github" className="size-4 shrink-0 text-ok" strokeWidth={2} />
                    <span className="truncate text-[13.5px]">Pull request #12 opened</span>
                    <span className="ml-auto flex shrink-0 gap-2 font-mono text-[11px]"><span className="text-ok">+38</span><span className="text-crit">−9</span></span>
                  </div>
                </Row>
              )}
              {phase >= DONE && <Row key="c2"><ResultCard fixed reduce={reduce} /></Row>}
            </AnimatePresence>
          </div>
        </div>

        {/* Composer: fixed height, one line of text */}
        <div className="shrink-0 px-3 pb-2.5 pt-1 sm:px-5" aria-hidden="true">
          <div className="mx-auto max-w-[640px]">
            <div className="flex h-11 items-center gap-2.5 rounded-[16px] bg-[var(--cl-composer)] px-3 ring-1 ring-[var(--cl-line-strong)]" style={{ boxShadow: "var(--cl-shadow)" }}>
              <Plus className="size-[18px] shrink-0" strokeWidth={1.6} />
              <span className="min-w-0 flex-1 truncate whitespace-nowrap text-[14px] leading-5">
                {input}{typing && <span className="caret ml-px inline-block h-4 w-[1.5px] translate-y-[3px] bg-[var(--cl-ink)]" />}
                {!typing && <span className="text-[var(--cl-faint)]">Reply to Claude</span>}
              </span>
              <span className={`grid size-7 shrink-0 place-items-center rounded-[8px] transition-colors duration-200 ${input || working ? "bg-[var(--cl-send)] text-[var(--cl-send-ink)]" : "bg-[var(--cl-bubble)] text-[var(--cl-faint)]"}`}>
                {working ? <Square className="size-2.5" fill="currentColor" strokeWidth={0} /> : <ArrowUp className="size-4" strokeWidth={2} />}
              </span>
              <Mic className="size-[18px] shrink-0 text-[var(--cl-muted)]" strokeWidth={1.6} />
            </div>
            <div className="mt-2 flex h-5 items-center gap-2.5 px-1 text-[12.5px]">
              <span className="mr-auto inline-flex min-w-0 items-center gap-1.5 text-[var(--cl-muted)]"><Mark className="size-3.5 shrink-0" /><span className="truncate">Vibefortress connected</span></span>
              <span className="shrink-0">Opus 5.5</span><span className="shrink-0 text-[var(--cl-muted)]">Medium</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/** The three window buttons of a Mac window. */
function Lights() {
  return <span className="flex shrink-0 gap-2">{["#ff5f57", "#febc2e", "#28c840"].map((c) => <span key={c} className="size-3 rounded-full" style={{ background: c }} />)}</span>;
}

/** One item of the conversation. Layout animation lets older items glide up when a new one arrives. */
function Row({ children }: { children: ReactNode }) {
  return (
    <motion.div layout="position" className="shrink-0" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, transition: { duration: 0.2 } }} transition={{ duration: 0.4, ease }}>
      {children}
    </motion.div>
  );
}
function Bubble({ children }: { children: ReactNode }) {
  return <div className="ml-auto w-fit max-w-[85%] rounded-[14px] bg-[var(--cl-bubble)] px-3.5 py-2">{children}</div>;
}
/** The quiet line the app shows for tool use: moving dots while it works, a summary with a chevron after. */
function ToolRow({ working, meta, children }: { working?: boolean; meta?: string; children: ReactNode }) {
  return (
    <div className="flex h-[22px] items-center gap-2 text-[13.5px] text-[var(--cl-muted)]">
      {working && <span className="cl-dots grid shrink-0 grid-cols-2 gap-[3px]">{[0, 1, 2, 3].map((i) => <span key={i} className="size-[3.5px] rounded-full bg-[var(--cl-clay)]" />)}</span>}
      <span className="truncate">{children}</span>
      {meta && <span className="shrink-0 tabular-nums">{meta}</span>}
      <ChevronRight className="size-3.5 shrink-0" strokeWidth={1.75} />
    </div>
  );
}

/** The Vibefortress result card as it sits in the conversation. Its height does not depend on the phase. */
function ResultCard({ fixed = false, reduce }: { fixed?: boolean; reduce: boolean }) {
  // The second card starts at the old score and climbs, so the change from D to A is seen.
  const [done, setDone] = useState(fixed && reduce);
  useEffect(() => { if (!fixed || reduce) return; const t = window.setTimeout(() => setDone(true), 700); return () => clearTimeout(t); }, [fixed, reduce]);
  const good = fixed && done;
  return (
    <div className="rounded-[12px] bg-card p-3 font-sans text-ink ring-1 ring-inset ring-[var(--cl-line-strong)] sm:p-3.5">
      <div className="flex items-center gap-3">
        <ScoreRing value={good ? 96 : 52} grade={good ? "A" : "D"} good={good} from={fixed || reduce ? 52 : 0} />
        <div className="min-w-0 flex-1">
          <p className="flex items-center gap-1.5 text-[12px] text-muted"><Mark className="size-3.5 shrink-0" /><span className="truncate">Vibefortress · {REPO}</span></p>
          <p className="text-[17px] leading-6 tracking-[-0.01em]">{good ? "Looking solid" : "Risky"}</p>
        </div>
        <p className="shrink-0 text-right text-[12px] leading-4 text-muted">{good ? <>0 open<br />3 fixed</> : <>2 critical<br />1 high</>}</p>
      </div>
      <ul className="mt-3 border-t border-line">
        {FINDINGS.map((f, i) => (
          <motion.li key={f.title} className="flex items-start gap-2.5 border-b border-line py-2 last:border-b-0 last:pb-0" initial={reduce ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: fixed ? 0 : 0.25 + i * 0.2, duration: 0.4 }}>
            <span className="mt-px">{good ? <Pill tone="ok"><Check className="size-3" />Fixed</Pill> : <Pill tone={f.sev}>{f.label}</Pill>}</span>
            <div className="min-w-0 flex-1">
              <p className={`truncate text-[13px] leading-5 transition-colors duration-500 ${good ? "text-muted line-through decoration-ok/60" : ""}`}>{f.title}</p>
              <p className="truncate font-mono text-[11px] leading-4 text-muted">{f.where}</p>
              {f.relates && <p className="mt-1 text-[11px] leading-4 text-muted">{f.relates}</p>}
            </div>
          </motion.li>
        ))}
      </ul>
      {fixed && (
        <p className={`mt-2.5 flex items-center gap-2 rounded-[8px] bg-bg-soft px-2.5 py-1.5 text-[12px] leading-5 transition-opacity duration-500 ${good ? "" : "opacity-0"}`}>
          <Icon name="list" className="size-3.5 shrink-0" />
          <span className="truncate sm:hidden">Compliance: {LINKED} gaps now <span className="text-ok">ready</span></span>
          <span className="hidden truncate sm:inline">Compliance view: {LINKED} linked items, <span className="text-muted">gap</span> to <span className="text-ok">ready</span></span>
          <span className="ml-auto shrink-0 rounded-[4px] bg-pop px-1.5 text-[10.5px] leading-4 text-pop-ink">Pro</span>
        </p>
      )}
    </div>
  );
}

function ScoreRing({ value, grade, good, from }: { value: number; grade: string; good: boolean; from: number }) {
  const spring = useSpring(from, { stiffness: 45, damping: 18 });
  useEffect(() => { spring.set(value); }, [value, spring]);
  const dash = useTransform(spring, (v) => `${(v / 100) * 163.4} 999`);
  const num = useTransform(spring, (v) => Math.round(v).toString());
  const color = good ? "var(--ok)" : "var(--high)";
  return (
    <div className="relative size-14 shrink-0">
      <svg viewBox="0 0 64 64" className="size-full -rotate-90">
        <circle cx="32" cy="32" r="26" fill="none" stroke="var(--bg-soft)" strokeWidth="7" />
        <motion.circle cx="32" cy="32" r="26" fill="none" strokeWidth="7" strokeLinecap="round" style={{ strokeDasharray: dash }} initial={false} animate={{ stroke: color }} transition={{ duration: 0.6 }} />
      </svg>
      <div className="absolute inset-0 grid place-items-center text-center">
        <div>
          <AnimatePresence mode="wait" initial={false}>
            <motion.div key={grade} className="text-[19px] leading-none" style={{ color }} initial={{ scale: 0.4, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 1.5, opacity: 0 }} transition={{ type: "spring", stiffness: 400, damping: 18 }}>{grade}</motion.div>
          </AnimatePresence>
          <div className="mt-0.5 text-[9px] leading-none tabular-nums text-muted"><motion.span>{num}</motion.span></div>
        </div>
      </div>
    </div>
  );
}
