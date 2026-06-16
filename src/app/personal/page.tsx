import { Badge, PageHeader, StatCard } from "@/components/ui";
import { NexupSyncBadge } from "@/components/ui";
import {
  CONSULTAS,
  KPIS,
  REUNIONES,
  RESIDENTES,
  VISITAS,
  nombreResidente,
} from "@/lib/data";
import { fmtFecha, tiempoRelativo } from "@/lib/format";
import Link from "next/link";

export default function PersonalPanel() {
  const consultasPendientes = CONSULTAS.filter((c) => c.estado === "pendiente");
  const visitasEnCurso = VISITAS.filter((v) => v.estado === "en_curso");
  const proximasReuniones = REUNIONES.filter((m) => m.estado !== "realizada").sort(
    (a, b) => +new Date(a.fecha) - +new Date(b.fecha),
  );

  return (
    <>
      <PageHeader
        titulo="Panel general"
        descripcion="Resumen operativo del Sistema de Gestion de Interaccion con Familiares."
      />

      {/* Tarjetas resumen */}
      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Residentes activos" value={String(RESIDENTES.length)} tone="verde" hint="En seguimiento" />
        <StatCard
          label="Consultas pendientes"
          value={String(consultasPendientes.length)}
          tone="magenta"
          hint="Requieren respuesta"
        />
        <StatCard label="Visitas en curso" value={String(visitasEnCurso.length)} tone="lima" hint="Dentro de la residencia" />
        <StatCard
          label="Reuniones por realizar"
          value={String(proximasReuniones.length)}
          tone="carbon"
          hint="Proximos encuentros"
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Consultas pendientes */}
        <section className="card p-5">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-display text-lg font-700 text-carbon-900">Consultas pendientes</h2>
            <Link href="/personal/consultas" className="text-sm font-600 text-verde-700 hover:underline">
              Ver todas
            </Link>
          </div>
          <div className="space-y-3">
            {consultasPendientes.length === 0 && (
              <p className="text-sm text-carbon-400">No hay consultas pendientes. ¡Todo al dia!</p>
            )}
            {consultasPendientes.map((c) => (
              <Link
                key={c.id}
                href="/personal/consultas"
                className="block rounded-xl border border-carbon-200/70 p-3 transition-colors hover:bg-carbon-50"
              >
                <div className="flex items-center justify-between gap-2">
                  <p className="font-600 text-carbon-800">{c.asunto}</p>
                  <span className="text-xs text-carbon-400">{tiempoRelativo(c.fecha)}</span>
                </div>
                <p className="mt-0.5 text-sm text-carbon-500">
                  {c.familiar} · {nombreResidente(c.residenteId)}
                </p>
              </Link>
            ))}
          </div>
        </section>

        {/* Proximas reuniones */}
        <section className="card p-5">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-display text-lg font-700 text-carbon-900">Proximas reuniones</h2>
            <Link href="/personal/reuniones" className="text-sm font-600 text-verde-700 hover:underline">
              Ver agenda
            </Link>
          </div>
          <div className="space-y-3">
            {proximasReuniones.map((m) => (
              <div key={m.id} className="flex items-center justify-between gap-2 rounded-xl border border-carbon-200/70 p-3">
                <div>
                  <p className="font-600 text-carbon-800">{nombreResidente(m.residenteId)}</p>
                  <p className="text-sm text-carbon-500">{m.motivo}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-600 text-carbon-700">{fmtFecha(m.fecha)}</p>
                  <Badge tone={m.estado === "confirmada" ? "verde" : "amarillo"}>
                    {m.estado === "confirmada" ? "Confirmada" : "Propuesta"}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* KPIs */}
      <section className="mt-8">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
          <h2 className="font-display text-lg font-700 text-carbon-900">Indicadores (KPIs)</h2>
          <NexupSyncBadge />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {KPIS.map((k) => (
            <div key={k.titulo} className="card p-5">
              <div className="mb-1 flex items-center justify-between gap-2">
                <Badge tone="carbon">{k.perspectiva}</Badge>
                <span className="font-display text-2xl font-700 text-carbon-900">{k.valor}</span>
              </div>
              <p className="text-sm font-600 text-carbon-700">{k.titulo}</p>
              <div className="mt-3 h-2 overflow-hidden rounded-full bg-carbon-100">
                <div
                  className={`h-full rounded-full ${k.progreso >= 95 ? "bg-verde-500" : "bg-lima-500"}`}
                  style={{ width: `${k.progreso}%` }}
                />
              </div>
              <p className="mt-1.5 text-xs text-carbon-400">{k.meta}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
