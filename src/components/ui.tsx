import { iniciales } from "@/lib/format";
import type { ReactNode } from "react";

/* --------------------------------- Badge --------------------------------- */

type BadgeTone = "verde" | "lima" | "magenta" | "carbon" | "amarillo" | "rojo";

const badgeTones: Record<BadgeTone, string> = {
  verde: "bg-verde-100 text-verde-800",
  lima: "bg-lima-100 text-lima-800",
  magenta: "bg-magenta-100 text-magenta-700",
  carbon: "bg-carbon-100 text-carbon-700",
  amarillo: "bg-amber-100 text-amber-800",
  rojo: "bg-red-100 text-red-700",
};

export function Badge({
  children,
  tone = "carbon",
}: {
  children: ReactNode;
  tone?: BadgeTone;
}) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold ${badgeTones[tone]}`}
    >
      {children}
    </span>
  );
}

/* -------------------------------- Avatar --------------------------------- */

export function Avatar({
  nombre,
  tone = "verde",
  size = 40,
}: {
  nombre: string;
  tone?: "verde" | "magenta" | "lima";
  size?: number;
}) {
  const tones = {
    verde: "bg-verde-100 text-verde-700",
    magenta: "bg-magenta-100 text-magenta-700",
    lima: "bg-lima-100 text-lima-800",
  };
  return (
    <span
      className={`inline-flex shrink-0 items-center justify-center rounded-full font-display font-600 ${tones[tone]}`}
      style={{ width: size, height: size, fontSize: size * 0.36 }}
    >
      {iniciales(nombre)}
    </span>
  );
}

/* ------------------------------ PageHeader ------------------------------- */

export function PageHeader({
  titulo,
  descripcion,
  accion,
}: {
  titulo: string;
  descripcion?: string;
  accion?: ReactNode;
}) {
  return (
    <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
      <div>
        <h1 className="font-display text-2xl font-700 text-carbon-900">{titulo}</h1>
        {descripcion && (
          <p className="mt-1 max-w-2xl text-sm text-carbon-500">{descripcion}</p>
        )}
      </div>
      {accion}
    </div>
  );
}

/* -------------------------------- StatCard ------------------------------- */

export function StatCard({
  label,
  value,
  hint,
  tone = "verde",
}: {
  label: string;
  value: string;
  hint?: string;
  tone?: "verde" | "magenta" | "lima" | "carbon";
}) {
  const bar = {
    verde: "bg-verde-500",
    magenta: "bg-magenta-500",
    lima: "bg-lima-500",
    carbon: "bg-carbon-400",
  }[tone];
  return (
    <div className="card p-5">
      <div className={`mb-3 h-1 w-10 rounded-full ${bar}`} />
      <p className="text-sm text-carbon-500">{label}</p>
      <p className="mt-1 font-display text-3xl font-700 text-carbon-900">{value}</p>
      {hint && <p className="mt-1 text-xs text-carbon-400">{hint}</p>}
    </div>
  );
}

/* ------------------------------ EmptyState ------------------------------- */

export function EmptyState({
  titulo,
  descripcion,
}: {
  titulo: string;
  descripcion?: string;
}) {
  return (
    <div className="card flex flex-col items-center justify-center px-6 py-12 text-center">
      <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-carbon-100 text-2xl">
        📭
      </div>
      <p className="font-display font-600 text-carbon-700">{titulo}</p>
      {descripcion && <p className="mt-1 text-sm text-carbon-400">{descripcion}</p>}
    </div>
  );
}

/* ---------------------------- NexupSyncBadge ----------------------------- */

// Indica que la informacion proviene automaticamente de Nexup (requisito clave).
export function NexupSyncBadge() {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-verde-200 bg-verde-50 px-2.5 py-1 text-xs font-semibold text-verde-700">
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" className="animate-none">
        <path
          d="M21 12a9 9 0 1 1-2.64-6.36M21 4v4h-4"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      Sincronizado desde Nexup
    </span>
  );
}
