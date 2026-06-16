"use client";

import { Badge, PageHeader } from "@/components/ui";
import { CONSULTAS, FAMILIAR_DEMO } from "@/lib/data";
import { fmtFechaHora, tiempoRelativo } from "@/lib/format";
import type { Consulta } from "@/lib/types";
import { useState } from "react";

export default function FamiliarConsultas() {
  const iniciales = CONSULTAS.filter((c) => c.residenteId === FAMILIAR_DEMO.residenteId);
  const [consultas, setConsultas] = useState<Consulta[]>(iniciales);
  const [asunto, setAsunto] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [enviada, setEnviada] = useState(false);

  function crearConsulta(e: React.FormEvent) {
    e.preventDefault();
    if (!asunto.trim() || !mensaje.trim()) return;
    const nueva: Consulta = {
      id: `c-${Date.now()}`,
      residenteId: FAMILIAR_DEMO.residenteId,
      familiar: FAMILIAR_DEMO.nombre,
      asunto: asunto.trim(),
      estado: "pendiente",
      fecha: new Date().toISOString(),
      mensajes: [
        {
          autor: FAMILIAR_DEMO.nombre,
          rol: "Familiar",
          mensaje: mensaje.trim(),
          fecha: new Date().toISOString(),
        },
      ],
    };
    setConsultas([nueva, ...consultas]);
    setAsunto("");
    setMensaje("");
    setEnviada(true);
    setTimeout(() => setEnviada(false), 3500);
  }

  return (
    <>
      <PageHeader
        titulo="Consultas"
        descripcion="Realiza consultas al equipo de la residencia y segui las respuestas en un unico lugar."
      />

      <div className="grid gap-6 lg:grid-cols-[360px_1fr]">
        {/* Nueva consulta */}
        <form onSubmit={crearConsulta} className="card h-fit p-5">
          <h2 className="mb-4 font-display text-lg font-700 text-carbon-900">Nueva consulta</h2>
          {enviada && (
            <div className="mb-4 rounded-xl border border-verde-200 bg-verde-50 px-4 py-2.5 text-sm font-medium text-verde-700">
              Consulta enviada. El personal de enfermeria te respondera a la brevedad.
            </div>
          )}
          <div className="mb-3">
            <label className="label">Asunto</label>
            <input
              className="input"
              placeholder="Ej. Consulta por la alimentacion"
              value={asunto}
              onChange={(e) => setAsunto(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="label">Mensaje</label>
            <textarea
              className="input min-h-28 resize-none"
              placeholder="Escribi tu consulta..."
              value={mensaje}
              onChange={(e) => setMensaje(e.target.value)}
            />
          </div>
          <button type="submit" className="btn-primary w-full">
            Enviar consulta
          </button>
        </form>

        {/* Historial de consultas */}
        <div className="space-y-4">
          <p className="text-sm font-600 text-carbon-500">
            Historial de consultas ({consultas.length})
          </p>
          {consultas.map((c) => (
            <ConsultaItem key={c.id} consulta={c} />
          ))}
        </div>
      </div>
    </>
  );
}

function ConsultaItem({ consulta }: { consulta: Consulta }) {
  return (
    <article className="card p-5">
      <header className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <h3 className="font-display font-700 text-carbon-900">{consulta.asunto}</h3>
        {consulta.estado === "pendiente" ? (
          <Badge tone="amarillo">Esperando respuesta</Badge>
        ) : (
          <Badge tone="verde">Respondida</Badge>
        )}
      </header>
      <div className="space-y-3">
        {consulta.mensajes.map((m, i) => {
          const esFamiliar = m.rol === "Familiar";
          return (
            <div key={i} className={`flex ${esFamiliar ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm ${
                  esFamiliar
                    ? "bg-verde-600 text-white"
                    : "border border-carbon-200 bg-carbon-50 text-carbon-700"
                }`}
              >
                <p className={`mb-0.5 text-xs font-600 ${esFamiliar ? "text-white/80" : "text-carbon-400"}`}>
                  {m.autor}
                </p>
                <p className="leading-relaxed">{m.mensaje}</p>
                <p className={`mt-1 text-[10px] ${esFamiliar ? "text-white/70" : "text-carbon-400"}`}>
                  {tiempoRelativo(m.fecha)}
                </p>
              </div>
            </div>
          );
        })}
      </div>
      <p className="mt-3 text-[11px] text-carbon-400">Iniciada el {fmtFechaHora(consulta.fecha)}</p>
    </article>
  );
}
