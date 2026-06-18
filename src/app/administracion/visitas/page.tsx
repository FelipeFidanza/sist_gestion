"use client";

import { Badge, PageHeader } from "@/components/ui";
import { AUTORIZADOS, RESIDENTES, VISITAS, nombreResidente } from "@/lib/data";
import { fmtFechaCorta } from "@/lib/format";
import type { Visita } from "@/lib/types";
import { useState } from "react";

export default function AdministracionVisitas() {
  const [visitas, setVisitas] = useState<Visita[]>(
    [...VISITAS].sort((a, b) => +new Date(b.fecha) - +new Date(a.fecha)),
  );
  const [residenteId, setResidenteId] = useState(RESIDENTES[0].id);
  const [documento, setDocumento] = useState("");
  const [chequeo, setChequeo] = useState<null | {
    ok: boolean;
    texto: string;
    persona?: { nombre: string; vinculo: string; documento: string; restriccion?: string };
  }>(null);

  function verificar() {
    const lista = AUTORIZADOS[residenteId] ?? [];
    const persona = lista.find((a) => a.documento === documento.trim());
    if (persona) {
      setChequeo({
        ok: true,
        texto: `${persona.nombre} esta autorizado/a para visitar a ${nombreResidente(residenteId)}.`,
        persona,
      });
    } else {
      setChequeo({
        ok: false,
        texto: "El visitante NO figura en la lista de personas autorizadas para este residente.",
      });
    }
  }

  function registrarIngreso() {
    if (!chequeo?.ok || !chequeo.persona) return;
    const ahora = new Date();
    const nueva: Visita = {
      id: `v-${Date.now()}`,
      residenteId,
      visitante: chequeo.persona.nombre,
      vinculo: chequeo.persona.vinculo,
      documento: chequeo.persona.documento,
      autorizado: true,
      estado: "en_curso",
      fecha: ahora.toISOString(),
      horaIngreso: ahora.toLocaleTimeString("es-AR", { hour: "2-digit", minute: "2-digit" }),
      observacion: chequeo.persona.restriccion,
    };
    setVisitas([nueva, ...visitas]);
    setChequeo(null);
    setDocumento("");
  }

  function registrarEgreso(id: string) {
    const hora = new Date().toLocaleTimeString("es-AR", { hour: "2-digit", minute: "2-digit" });
    setVisitas((prev) =>
      prev.map((v) => (v.id === id ? { ...v, estado: "finalizada", horaEgreso: hora } : v)),
    );
  }

  const enCurso = visitas.filter((v) => v.estado === "en_curso").length;

  return (
    <>
      <PageHeader
        titulo="Gestion de visitas"
        descripcion="Registro digital de visitantes con verificacion de autorizacion, control de ingreso/egreso e historial."
        accion={<Badge tone="lima">{enCurso} en curso</Badge>}
      />

      <div className="grid gap-6 lg:grid-cols-[360px_1fr]">
        {/* Recepcion */}
        <div className="card h-fit p-5">
          <h2 className="mb-4 font-display text-lg font-700 text-carbon-900">Recepcion de visitante</h2>
          <div className="mb-3">
            <label className="label">Residente a visitar</label>
            <select
              className="input"
              value={residenteId}
              onChange={(e) => {
                setResidenteId(e.target.value);
                setChequeo(null);
              }}
            >
              {RESIDENTES.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.nombre} {r.apellido}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="label">Documento del visitante</label>
            <input
              className="input"
              placeholder="Ej. 27.845.112"
              value={documento}
              onChange={(e) => {
                setDocumento(e.target.value);
                setChequeo(null);
              }}
            />
          </div>
          <button onClick={verificar} className="btn-ghost w-full" disabled={!documento.trim()}>
            Verificar autorizacion
          </button>

          {chequeo && (
            <div
              className={`mt-4 rounded-xl border px-4 py-3 text-sm font-medium ${
                chequeo.ok
                  ? "border-verde-200 bg-verde-50 text-verde-700"
                  : "border-red-200 bg-red-50 text-red-700"
              }`}
            >
              <p>{chequeo.texto}</p>
              {chequeo.persona?.restriccion && (
                <p className="mt-1 text-amber-700">Restriccion: {chequeo.persona.restriccion}</p>
              )}
              {chequeo.ok && (
                <button onClick={registrarIngreso} className="btn-primary mt-3 w-full py-2 text-xs">
                  Habilitar acceso y registrar ingreso
                </button>
              )}
            </div>
          )}

          <p className="mt-4 text-xs text-carbon-400">
            Sugerencia: probar con DNI 27.845.112 (autorizado para Hector Gomez) o un numero
            cualquiera para ver el rechazo.
          </p>
        </div>

        {/* Historial */}
        <div>
          <p className="mb-3 text-sm font-600 text-carbon-500">Registro de visitas ({visitas.length})</p>
          <div className="overflow-x-auto card">
            <table className="w-full min-w-[640px] text-sm">
              <thead className="bg-carbon-50 text-left text-xs uppercase tracking-wide text-carbon-400">
                <tr>
                  <th className="px-4 py-3 font-600">Visitante</th>
                  <th className="px-4 py-3 font-600">Residente</th>
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
                      <p className="text-xs text-carbon-400">
                        {v.vinculo} · DNI {v.documento}
                      </p>
                    </td>
                    <td className="px-4 py-3 text-carbon-500">{nombreResidente(v.residenteId)}</td>
                    <td className="px-4 py-3 text-carbon-500">{fmtFechaCorta(v.fecha)}</td>
                    <td className="px-4 py-3 text-carbon-500">{v.horaIngreso}</td>
                    <td className="px-4 py-3 text-carbon-500">{v.horaEgreso ?? "—"}</td>
                    <td className="px-4 py-3">
                      {v.estado === "en_curso" ? (
                        <div className="flex flex-col items-start gap-1.5">
                          <Badge tone="verde">En curso</Badge>
                          <button
                            onClick={() => registrarEgreso(v.id)}
                            className="text-xs font-600 text-magenta-600 hover:underline"
                          >
                            Registrar egreso
                          </button>
                        </div>
                      ) : v.estado === "rechazada" ? (
                        <Badge tone="rojo">Rechazada</Badge>
                      ) : (
                        <Badge tone="carbon">Finalizada</Badge>
                      )}
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
