import { Badge, PageHeader, StatCard } from "@/components/ui";
import { REUNIONES, nombreResidente } from "@/lib/data";
import { fmtFecha } from "@/lib/format";
import Link from "next/link";

export default function CoordinacionPanel() {
  const proximas = REUNIONES.filter((m) => m.estado !== "realizada").sort(
    (a, b) => +new Date(a.fecha) - +new Date(b.fecha),
  );
  const porConfirmar = REUNIONES.filter((m) => m.estado === "propuesta");
  const realizadas = REUNIONES.filter((m) => m.estado === "realizada");

  return (
    <>
      <PageHeader
        titulo="Hola, Marta 👋"
        descripcion="Resumen de coordinacion: planificacion y seguimiento de reuniones con las familias."
      />

      <div className="mb-8 grid gap-4 sm:grid-cols-2">
        <StatCard label="Reuniones por confirmar" value={String(porConfirmar.length)} tone="magenta" hint="Esperando al familiar" />
        <StatCard label="Proximas reuniones" value={String(proximas.length)} tone="verde" hint="Agendadas" />
        
      </div>

      <section className="card p-5">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-display text-lg font-700 text-carbon-900">Proximas reuniones</h2>
          <Link href="/coordinacion/reuniones" className="text-sm font-600 text-verde-700 hover:underline">
            Gestionar reuniones
          </Link>
        </div>
        <div className="space-y-3">
          {proximas.length === 0 && (
            <p className="text-sm text-carbon-400">No hay reuniones pendientes de realizar.</p>
          )}
          {proximas.map((m) => (
            <div key={m.id} className="flex items-center justify-between gap-2 rounded-xl border border-carbon-200/70 p-3">
              <div>
                <p className="font-600 text-carbon-800">{nombreResidente(m.residenteId)}</p>
                <p className="text-sm text-carbon-500">{m.motivo}</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-600 text-carbon-700">
                  {fmtFecha(m.fecha)} · {m.hora}
                </p>
                <Badge tone={m.estado === "confirmada" ? "verde" : "amarillo"}>
                  {m.estado === "confirmada" ? "Confirmada" : "Propuesta"}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
