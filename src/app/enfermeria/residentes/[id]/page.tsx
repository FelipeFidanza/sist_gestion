import { NovedadCard } from "@/components/NovedadDiaria";
import { Avatar, Badge, EmptyState, PageHeader } from "@/components/ui";
import { AUTORIZADOS, NOVEDADES, RESIDENTES, getResidente } from "@/lib/data";
import { fmtFecha } from "@/lib/format";
import Link from "next/link";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return RESIDENTES.map((r) => ({ id: r.id }));
}

export default function ResidenteDetalle({ params }: { params: { id: string } }) {
  const residente = getResidente(params.id);
  if (!residente) notFound();

  const novedades = NOVEDADES.filter((n) => n.residenteId === residente.id).sort(
    (a, b) => +new Date(b.fecha) - +new Date(a.fecha),
  );
  const autorizados = AUTORIZADOS[residente.id] ?? [];

  return (
    <>
      <Link
        href="/enfermeria/residentes"
        className="mb-4 inline-flex items-center gap-1 text-sm font-600 text-carbon-500 hover:text-carbon-800"
      >
        ← Volver a residentes
      </Link>

      <PageHeader titulo={`${residente.nombre} ${residente.apellido}`} />

      <div className="mb-6 card flex flex-wrap items-center gap-4 p-5">
        <Avatar nombre={`${residente.nombre} ${residente.apellido}`} tone="verde" size={60} />
        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <p className="font-display text-lg font-700 text-carbon-900">
              {residente.nombre} {residente.apellido}
            </p>
            <Badge tone="lima">Grupo {residente.grupo}</Badge>
          </div>
          <p className="text-sm text-carbon-500">
            {residente.edad} anios · {residente.habitacion}
          </p>
          <p className="text-xs text-carbon-400">
            Familiar responsable: {residente.familiarResponsable} ({residente.vinculoResponsable}) ·
            Ingreso {fmtFecha(residente.ingreso)}
          </p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_300px]">
        <div className="space-y-6">
          {novedades.length === 0 ? (
            <EmptyState titulo="Sin reportes cargados" />
          ) : (
            novedades.map((n) => <NovedadCard key={n.id} novedad={n} />)
          )}
        </div>

        <aside className="h-fit card p-5">
          <h3 className="mb-3 font-display font-700 text-carbon-900">Personas autorizadas</h3>
          <ul className="space-y-3">
            {autorizados.map((a) => (
              <li key={a.documento}>
                <p className="text-sm font-600 text-carbon-800">{a.nombre}</p>
                <p className="text-xs text-carbon-400">
                  {a.vinculo} · DNI {a.documento}
                </p>
                {a.restriccion && (
                  <span className="mt-1 inline-block">
                    <Badge tone="amarillo">{a.restriccion}</Badge>
                  </span>
                )}
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </>
  );
}
