"use client";
import { Check as CheckI, GitPullRequest, ListChecks } from "lucide-react";
import { siClaude } from "simple-icons";
import type { ReactNode } from "react";

export const ease = [0.22, 1, 0.36, 1] as const;

/** Only the example facts the demo needs (copied from the Vibefortress product data). */
export const COMPLIANCE = {
  example: { relatesTo: "Relates to: ISO 27001 A.5.15, ISO 27001 A.8.3, SOC 2 CC6.1, SOC 2 CC6.3, GDPR Art. 32" },
};

/** The Vibefortress mark: a shield with three merlons. */
export function Mark({ className = "size-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <path d="M4 8h5v3h4V8h6v3h4V8h5v9c0 7-5 12-12 15C9 29 4 24 4 17z" fill="currentColor" />
      <path d="M11 18.5l3.5 3.5L21 15" stroke="var(--bg)" strokeWidth={2.6} fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export const Check = ({ className = "size-4" }: { className?: string }) => <CheckI className={className} strokeWidth={2.25} aria-hidden="true" />;

export function Icon({ name, className = "size-5", strokeWidth = 1.5 }: { name: "github" | "list"; className?: string; strokeWidth?: number }) {
  const C = name === "github" ? GitPullRequest : ListChecks;
  return <C className={className} strokeWidth={strokeWidth} aria-hidden="true" />;
}

/** The Claude mark (Simple Icons, CC0 data; the mark stays Anthropic's trademark, used only to show the chat window). */
export function BrandLogo({ className = "size-6" }: { id?: "claude"; className?: string }) {
  return <svg viewBox="0 0 24 24" className={className} fill={`#${siClaude.hex}`} aria-hidden="true"><path d={siClaude.path} /></svg>;
}

const TONE = {
  ok: "bg-ok-soft text-ok", crit: "bg-crit-soft text-crit", high: "bg-high-soft text-high",
} as const;
export function Pill({ children, tone }: { children: ReactNode; tone: keyof typeof TONE }) {
  return <span className={`inline-flex shrink-0 items-center gap-1 rounded-full px-2 py-px text-[10.5px] uppercase leading-4 tracking-wide ${TONE[tone]}`}>{children}</span>;
}
