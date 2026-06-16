import { Avatar, Badge, PageHeader } from "@/components/ui";
import { CONSULTAS, NOVEDADES, RESIDENTES } from "@/lib/data";
import { fmtFecha } from "@/lib/format";
import Link from "next/link";

export default function PersonalResidentes() {
  return (
    <>
      <PageHeader
        titulo="Residentes"
        descripcion="Listado de residentes en seguimiento. Ingresa para ver el reporte diario y las novedades."
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {RESIDENTES.map((r) => {
          const tieneNovedad = NOVEDADES.some(
            (n) => n.residenteId === r.id && esHoy(n.fecha),
          );
          const consultas = CONSULTAS.filter(
            (c) => c.residenteId === r.id && c.estado === "pendiente",
          ).length;
          return (
            <Link
              key={r.id}
              href={`/personal/residentes/${r.id}`}
              className="card p-5 transition-all hover:shadow-card"
            >
              <div className="flex items-center gap-3">
                <Avatar nombre={`${r.nombre} ${r.apellido}`} tone="verde" size={52} />
                <div className="min-w-0">
                  <p className="truncate font-display font-700 text-carbon-900">
                    {r.nombre} {r.apellido}
                  </p>
                  <p className="text-sm text-carbon-400">{r.edad} anios</p>
                </div>
              </div>
              <div className="mt-4 space-y-1 text-sm text-carbon-500">
                <p>{r.habitacion}</p>
                <p>Ingreso: {fmtFecha(r.ingreso)}</p>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                <Badge tone="lima">Grupo {r.grupo}</Badge>
                {tieneNovedad && <Badge tone="verde">Reporte de hoy</Badge>}
                {consultas > 0 && <Badge tone="amarillo">{consultas} consulta(s)</Badge>}
              </div>
            </Link>
          );
        })}
      </div>
    </>
  );
}

function esHoy(iso: string): boolean {
  const d = new Date(iso);
  const hoy = new Date();
  return d.toDateString() === hoy.toDateString();
}
