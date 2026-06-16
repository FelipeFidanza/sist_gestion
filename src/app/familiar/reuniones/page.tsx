"use client";

import { Badge, EmptyState, PageHeader } from "@/components/ui";
import { IconCheck } from "@/components/icons";
import { FAMILIAR_DEMO, REUNIONES } from "@/lib/data";
import { fmtFecha } from "@/lib/format";
import type { Reunion } from "@/lib/types";
import { useState } from "react";

export default function FamiliarReuniones() {
  const [reuniones, setReuniones] = useState<Reunion[]>(
    REUNIONES.filter((m) => m.residenteId === FAMILIAR_DEMO.residenteId),
  );

  const proximas = reuniones
    .filter((m) => m.estado !== "realizada")
    .sort((a, b) => +new Date(a.fecha) - +new Date(b.fecha));
  const historial = reuniones
    .filter((m) => m.estado === "realizada")
    .sort((a, b) => +new Date(b.fecha) - +new Date(a.fecha));

  function confirmar(id: string) {
    setReuniones((prev) =>
      prev.map((m) => (m.id === id ? { ...m, estado: "confirmada" } : m)),
    );
  }

  return (
    <>
      <PageHeader
        titulo="Reuniones de seguimiento"
        descripcion="Encuentros periodicos con el equipo interdisciplinario para conocer la evolucion del residente."
      />

      <section className="mb-8">
        <h2 className="mb-3 font-display text-lg font-700 text-carbon-900">Proximas reuniones</h2>
        {proximas.length === 0 ? (
          <EmptyState titulo="No hay reuniones programadas" descripcion="Te avisaremos cuando se proponga una nueva fecha." />
        ) : (
          <div className="space-y-4">
            {proximas.map((m) => (
              <div key={m.id} className="card p-5">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="flex gap-4">
                    <FechaBox iso={m.fecha} hora={m.hora} />
                    <div>
                      <p className="font-display font-700 text-carbon-900">{m.motivo}</p>
                      <p className="mt-0.5 text-sm text-carbon-500">
                        Participan: {m.participantes.join(", ")}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    {m.estado === "confirmada" ? (
                      <Badge tone="verde">Asistencia confirmada</Badge>
                    ) : (
                      <Badge tone="amarillo">Propuesta - a confirmar</Badge>
                    )}
                    {m.estado === "propuesta" && (
                      <button onClick={() => confirmar(m.id)} className="btn-primary py-2 text-xs">
                        <IconCheck className="h-4 w-4" /> Confirmar asistencia
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <section>
        <h2 className="mb-3 font-display text-lg font-700 text-carbon-900">Historial</h2>
        {historial.length === 0 ? (
          <EmptyState titulo="Aun no hay reuniones realizadas" />
        ) : (
          <div className="space-y-4">
            {historial.map((m) => (
              <div key={m.id} className="card p-5">
                <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                  <p className="font-display font-700 text-carbon-900">{m.motivo}</p>
                  <Badge tone="carbon">{fmtFecha(m.fecha)}</Badge>
                </div>
                <p className="mb-2 text-sm text-carbon-500">Participaron: {m.participantes.join(", ")}</p>
                {m.conclusiones && (
                  <div className="rounded-xl border border-carbon-200/70 bg-carbon-50 p-4">
                    <p className="mb-1 text-xs font-600 uppercase tracking-wide text-carbon-400">
                      Conclusiones registradas
                    </p>
                    <p className="text-sm leading-relaxed text-carbon-600">{m.conclusiones}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </section>
    </>
  );
}

function FechaBox({ iso, hora }: { iso: string; hora: string }) {
  const d = new Date(iso);
  const dia = d.toLocaleDateString("es-AR", { day: "2-digit" });
  const mes = d.toLocaleDateString("es-AR", { month: "short" }).replace(".", "");
  return (
    <div className="flex h-16 w-16 shrink-0 flex-col items-center justify-center rounded-xl bg-magenta-50 text-magenta-700">
      <span className="font-display text-xl font-700 leading-none">{dia}</span>
      <span className="text-xs font-600 uppercase">{mes}</span>
      <span className="text-[10px]">{hora}</span>
    </div>
  );
}
