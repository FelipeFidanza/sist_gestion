"use client";

import { Badge, PageHeader } from "@/components/ui";
import { AUTORIZADOS, FAMILIAR_DEMO, VISITAS, nombreResidente } from "@/lib/data";
import { fmtFechaCorta } from "@/lib/format";
import type { Visita } from "@/lib/types";
import { useState } from "react";

export default function FamiliarVisitas() {
  const residenteId = FAMILIAR_DEMO.residenteId;
  const autorizados = AUTORIZADOS[residenteId] ?? [];

  const [visitas, setVisitas] = useState<Visita[]>(
    VISITAS.filter((v) => v.residenteId === residenteId).sort(
      (a, b) => +new Date(b.fecha) - +new Date(a.fecha),
    ),
  );
  const [documento, setDocumento] = useState(FAMILIAR_DEMO.documento);
  const [resultado, setResultado] = useState<null | { ok: boolean; texto: string }>(null);

  function registrarIngreso(e: React.FormEvent) {
    e.preventDefault();
    const persona = autorizados.find((a) => a.documento === documento.trim());
    if (!persona) {
      setResultado({
        ok: false,
        texto:
          "El documento ingresado no figura en la lista de personas autorizadas para este residente. Acercate a recepcion.",
      });
      return;
    }
    const ahora = new Date();
    const nueva: Visita = {
      id: `v-${Date.now()}`,
      residenteId,
      visitante: persona.nombre,
      vinculo: persona.vinculo,
      documento: persona.documento,
      autorizado: true,
      estado: "en_curso",
      fecha: ahora.toISOString(),
      horaIngreso: ahora.toLocaleTimeString("es-AR", { hour: "2-digit", minute: "2-digit" }),
      observacion: persona.restriccion,
    };
    setVisitas([nueva, ...visitas]);
    setResultado({
      ok: true,
      texto: `Acceso autorizado para ${persona.nombre}. Ingreso registrado a las ${nueva.horaIngreso}.`,
    });
  }

  function registrarEgreso(id: string) {
    const hora = new Date().toLocaleTimeString("es-AR", { hour: "2-digit", minute: "2-digit" });
    setVisitas((prev) =>
      prev.map((v) => (v.id === id ? { ...v, estado: "finalizada", horaEgreso: hora } : v)),
    );
  }

  return (
    <>
      <PageHeader
        titulo="Mis visitas"
        descripcion="Registra tu ingreso al llegar a la residencia. El sistema verifica que estes autorizado."
      />

      <div className="grid gap-6 lg:grid-cols-[360px_1fr]">
        <div className="h-fit space-y-4">
          <form onSubmit={registrarIngreso} className="card p-5">
            <h2 className="mb-1 font-display text-lg font-700 text-carbon-900">Registrar ingreso</h2>
            <p className="mb-4 text-sm text-carbon-400">
              Visita a {nombreResidente(residenteId)}
            </p>
            <div className="mb-4">
              <label className="label">Documento del visitante</label>
              <input
                className="input"
                placeholder="Ej. 27.845.112"
                value={documento}
                onChange={(e) => setDocumento(e.target.value)}
              />
            </div>
            <button type="submit" className="btn-primary w-full">
              Verificar y registrar ingreso
            </button>

            {resultado && (
              <div
                className={`mt-4 rounded-xl border px-4 py-3 text-sm font-medium ${
                  resultado.ok
                    ? "border-verde-200 bg-verde-50 text-verde-700"
                    : "border-red-200 bg-red-50 text-red-700"
                }`}
              >
                {resultado.texto}
              </div>
            )}
          </form>

          <div className="card p-5">
            <p className="mb-3 text-sm font-600 text-carbon-700">Personas autorizadas</p>
            <ul className="space-y-2">
              {autorizados.map((a) => (
                <li key={a.documento} className="flex items-center justify-between gap-2 text-sm">
                  <span className="text-carbon-700">
                    {a.nombre}{" "}
                    <span className="text-carbon-400">· {a.vinculo}</span>
                  </span>
                  {a.restriccion ? (
                    <Badge tone="amarillo">{a.restriccion}</Badge>
                  ) : (
                    <Badge tone="verde">Sin restriccion</Badge>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div>
          <p className="mb-3 text-sm font-600 text-carbon-500">Historial de visitas ({visitas.length})</p>
          <div className="overflow-hidden card">
            <table className="w-full text-sm">
              <thead className="bg-carbon-50 text-left text-xs uppercase tracking-wide text-carbon-400">
                <tr>
                  <th className="px-4 py-3 font-600">Visitante</th>
                  <th className="px-4 py-3 font-600">Fecha</th>
                  <th className="px-4 py-3 font-600">Ingreso</th>
                  <th className="px-4 py-3 font-600">Egreso</th>
                  <th className="px-4 py-3 font-600">Estado</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-carbon-100">
                {visitas.map((v) => (
                  <tr key={v.id}>
                    <td className="px-4 py-3">
                      <p className="font-600 text-carbon-800">{v.visitante}</p>
                      <p className="text-xs text-carbon-400">{v.vinculo}</p>
                    </td>
                    <td className="px-4 py-3 text-carbon-500">{fmtFechaCorta(v.fecha)}</td>
                    <td className="px-4 py-3 text-carbon-500">{v.horaIngreso}</td>
                    <td className="px-4 py-3 text-carbon-500">
                      {v.horaEgreso ?? (v.estado === "en_curso" ? "—" : "—")}
                    </td>
                    <td className="px-4 py-3">
                      <EstadoVisitaBadge visita={v} onEgreso={() => registrarEgreso(v.id)} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

function EstadoVisitaBadge({ visita, onEgreso }: { visita: Visita; onEgreso: () => void }) {
  if (visita.estado === "en_curso") {
    return (
      <div className="flex flex-col items-start gap-1.5">
        <Badge tone="verde">En curso</Badge>
        <button onClick={onEgreso} className="text-xs font-600 text-magenta-600 hover:underline">
          Registrar egreso
        </button>
      </div>
    );
  }
  if (visita.estado === "rechazada") return <Badge tone="rojo">Rechazada</Badge>;
  return <Badge tone="carbon">Finalizada</Badge>;
}
