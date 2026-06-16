"use client";

import { Badge, PageHeader } from "@/components/ui";
import { REUNIONES, RESIDENTES, nombreResidente } from "@/lib/data";
import { fmtFecha } from "@/lib/format";
import type { EstadoReunion, Reunion } from "@/lib/types";
import { useState } from "react";

const estadoMeta: Record<EstadoReunion, { label: string; tone: "amarillo" | "verde" | "carbon" }> = {
  propuesta: { label: "Propuesta", tone: "amarillo" },
  confirmada: { label: "Confirmada", tone: "verde" },
  realizada: { label: "Realizada", tone: "carbon" },
};

export default function PersonalReuniones() {
  const [reuniones, setReuniones] = useState<Reunion[]>(REUNIONES);
  const [form, setForm] = useState({
    residenteId: RESIDENTES[0].id,
    fecha: "",
    hora: "",
    motivo: "Reunion mensual de seguimiento",
  });
  const [borradorConclusion, setBorradorConclusion] = useState<Record<string, string>>({});

  function planificar(e: React.FormEvent) {
    e.preventDefault();
    if (!form.fecha || !form.hora) return;
    const nueva: Reunion = {
      id: `m-${Date.now()}`,
      residenteId: form.residenteId,
      fecha: new Date(form.fecha).toISOString(),
      hora: form.hora,
      estado: "propuesta",
      participantes: ["Equipo interdisciplinario"],
      motivo: form.motivo,
    };
    setReuniones([nueva, ...reuniones]);
    setForm({ ...form, fecha: "", hora: "" });
  }

  function marcarRealizada(id: string) {
    setReuniones((prev) => prev.map((m) => (m.id === id ? { ...m, estado: "realizada" } : m)));
  }

  function guardarConclusion(id: string) {
    const texto = borradorConclusion[id]?.trim();
    if (!texto) return;
    setReuniones((prev) =>
      prev.map((m) => (m.id === id ? { ...m, estado: "realizada", conclusiones: texto } : m)),
    );
  }

  const ordenadas = [...reuniones].sort((a, b) => +new Date(b.fecha) - +new Date(a.fecha));

  return (
    <>
      <PageHeader
        titulo="Reuniones de seguimiento"
        descripcion="Planifica encuentros con las familias y registra las conclusiones de cada reunion."
      />

      <div className="grid gap-6 lg:grid-cols-[340px_1fr]">
        {/* Form planificar */}
        <form onSubmit={planificar} className="card h-fit p-5">
          <h2 className="mb-4 font-display text-lg font-700 text-carbon-900">Planificar reunion</h2>
          <div className="mb-3">
            <label className="label">Residente</label>
            <select
              className="input"
              value={form.residenteId}
              onChange={(e) => setForm({ ...form, residenteId: e.target.value })}
            >
              {RESIDENTES.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.nombre} {r.apellido}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-3 grid grid-cols-2 gap-3">
            <div>
              <label className="label">Fecha</label>
              <input
                type="date"
                className="input"
                value={form.fecha}
                onChange={(e) => setForm({ ...form, fecha: e.target.value })}
              />
            </div>
            <div>
              <label className="label">Hora</label>
              <input
                type="time"
                className="input"
                value={form.hora}
                onChange={(e) => setForm({ ...form, hora: e.target.value })}
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="label">Motivo</label>
            <input
              className="input"
              value={form.motivo}
              onChange={(e) => setForm({ ...form, motivo: e.target.value })}
            />
          </div>
          <button type="submit" className="btn-magenta w-full">
            Registrar reunion
          </button>
        </form>

        {/* Lista */}
        <div className="space-y-4">
          {ordenadas.map((m) => (
            <div key={m.id} className="card p-5">
              <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                <div>
                  <p className="font-display font-700 text-carbon-900">{nombreResidente(m.residenteId)}</p>
                  <p className="text-sm text-carbon-500">{m.motivo}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-600 text-carbon-700">
                    {fmtFecha(m.fecha)} · {m.hora}
                  </p>
                  <Badge tone={estadoMeta[m.estado].tone}>{estadoMeta[m.estado].label}</Badge>
                </div>
              </div>
              <p className="text-xs text-carbon-400">Participan: {m.participantes.join(", ")}</p>

              {m.estado === "realizada" && m.conclusiones && (
                <div className="mt-3 rounded-xl border border-carbon-200/70 bg-carbon-50 p-4">
                  <p className="mb-1 text-xs font-600 uppercase tracking-wide text-carbon-400">Conclusiones</p>
                  <p className="text-sm leading-relaxed text-carbon-600">{m.conclusiones}</p>
                </div>
              )}

              {m.estado !== "realizada" && (
                <div className="mt-3 space-y-2">
                  <textarea
                    className="input min-h-20 resize-none"
                    placeholder="Registrar observaciones y conclusiones de la reunion..."
                    value={borradorConclusion[m.id] ?? ""}
                    onChange={(e) =>
                      setBorradorConclusion({ ...borradorConclusion, [m.id]: e.target.value })
                    }
                  />
                  <div className="flex gap-2">
                    <button onClick={() => guardarConclusion(m.id)} className="btn-primary py-2 text-xs">
                      Guardar y marcar realizada
                    </button>
                    <button onClick={() => marcarRealizada(m.id)} className="btn-ghost py-2 text-xs">
                      Solo marcar realizada
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
