"use client";

import { Avatar, Badge, PageHeader } from "@/components/ui";
import { CONSULTAS, nombreResidente } from "@/lib/data";
import { fmtFechaHora, tiempoRelativo } from "@/lib/format";
import type { Consulta } from "@/lib/types";
import { useState } from "react";

const ENFERMERA = "Enf. Laura Benitez";

export default function EnfermeriaConsultas() {
  const [consultas, setConsultas] = useState<Consulta[]>(CONSULTAS);
  const [seleccion, setSeleccion] = useState<string>(CONSULTAS[0]?.id ?? "");
  const [respuesta, setRespuesta] = useState("");
  const [filtro, setFiltro] = useState<"todas" | "pendiente" | "respondida">("todas");

  const visibles = consultas
    .filter((c) => (filtro === "todas" ? true : c.estado === filtro))
    .sort((a, b) => +new Date(b.fecha) - +new Date(a.fecha));
  const actual = consultas.find((c) => c.id === seleccion);

  function responder(e: React.FormEvent) {
    e.preventDefault();
    if (!respuesta.trim() || !actual) return;
    setConsultas((prev) =>
      prev.map((c) =>
        c.id === actual.id
          ? {
              ...c,
              estado: "respondida",
              mensajes: [
                ...c.mensajes,
                {
                  autor: ENFERMERA,
                  rol: "Enfermeria",
                  mensaje: respuesta.trim(),
                  fecha: new Date().toISOString(),
                },
              ],
            }
          : c,
      ),
    );
    setRespuesta("");
  }

  const pendientes = consultas.filter((c) => c.estado === "pendiente").length;

  return (
    <>
      <PageHeader
        titulo="Bandeja de consultas"
        descripcion="Consultas realizadas por los familiares. Respondelas por el canal institucional para mantener la trazabilidad."
        accion={<Badge tone={pendientes > 0 ? "amarillo" : "verde"}>{pendientes} pendientes</Badge>}
      />

      <div className="mb-4 flex gap-2">
        {(["todas", "pendiente", "respondida"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFiltro(f)}
            className={`rounded-full px-3.5 py-1.5 text-sm font-600 capitalize transition-colors ${
              filtro === f ? "bg-magenta-600 text-white" : "bg-white text-carbon-500 border border-carbon-200"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-[340px_1fr]">
        {/* Lista */}
        <div className="space-y-2">
          {visibles.map((c) => (
            <button
              key={c.id}
              onClick={() => setSeleccion(c.id)}
              className={`w-full rounded-xl border p-4 text-left transition-colors ${
                seleccion === c.id
                  ? "border-magenta-300 bg-magenta-50"
                  : "border-carbon-200/70 bg-white hover:bg-carbon-50"
              }`}
            >
              <div className="flex items-center justify-between gap-2">
                <span className="truncate font-600 text-carbon-800">{c.asunto}</span>
                {c.estado === "pendiente" ? (
                  <span className="h-2 w-2 shrink-0 rounded-full bg-magenta-500" />
                ) : null}
              </div>
              <p className="mt-0.5 truncate text-sm text-carbon-500">
                {c.familiar} · {nombreResidente(c.residenteId)}
              </p>
              <p className="mt-1 text-xs text-carbon-400">{tiempoRelativo(c.fecha)}</p>
            </button>
          ))}
        </div>

        {/* Detalle */}
        {actual ? (
          <div className="card flex flex-col p-5">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-2 border-b border-carbon-100 pb-4">
              <div>
                <h2 className="font-display text-lg font-700 text-carbon-900">{actual.asunto}</h2>
                <p className="text-sm text-carbon-500">
                  {actual.familiar} · {nombreResidente(actual.residenteId)}
                </p>
              </div>
              {actual.estado === "pendiente" ? (
                <Badge tone="amarillo">Pendiente</Badge>
              ) : (
                <Badge tone="verde">Respondida</Badge>
              )}
            </div>

            <div className="flex-1 space-y-3">
              {actual.mensajes.map((m, i) => {
                const esEnfermeria = m.rol === "Enfermeria";
                return (
                  <div key={i} className={`flex gap-3 ${esEnfermeria ? "flex-row-reverse" : ""}`}>
                    <Avatar nombre={m.autor} tone={esEnfermeria ? "magenta" : "verde"} size={36} />
                    <div
                      className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm ${
                        esEnfermeria
                          ? "bg-magenta-600 text-white"
                          : "border border-carbon-200 bg-carbon-50 text-carbon-700"
                      }`}
                    >
                      <p className={`mb-0.5 text-xs font-600 ${esEnfermeria ? "text-white/80" : "text-carbon-400"}`}>
                        {m.autor}
                      </p>
                      <p className="leading-relaxed">{m.mensaje}</p>
                      <p className={`mt-1 text-[10px] ${esEnfermeria ? "text-white/70" : "text-carbon-400"}`}>
                        {fmtFechaHora(m.fecha)}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            <form onSubmit={responder} className="mt-4 flex gap-2 border-t border-carbon-100 pt-4">
              <input
                className="input"
                placeholder="Escribi una respuesta..."
                value={respuesta}
                onChange={(e) => setRespuesta(e.target.value)}
              />
              <button type="submit" className="btn-magenta shrink-0">
                Responder
              </button>
            </form>
          </div>
        ) : (
          <div className="card flex items-center justify-center p-10 text-sm text-carbon-400">
            Selecciona una consulta para ver el detalle.
          </div>
        )}
      </div>
    </>
  );
}
