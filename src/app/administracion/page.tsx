import { Badge, PageHeader, StatCard } from "@/components/ui";
import { VISITAS, nombreResidente } from "@/lib/data";
import { fmtFechaCorta } from "@/lib/format";
import Link from "next/link";

export default function AdministracionPanel() {
  const enCurso = VISITAS.filter((v) => v.estado === "en_curso");
  const hoy = VISITAS.filter((v) => esHoy(v.fecha));
  const ultimas = [...VISITAS]
    .sort((a, b) => +new Date(b.fecha) - +new Date(a.fecha))
    .slice(0, 5);

  return (
    <>
      <PageHeader
        titulo="Hola, Sofia 👋"
        descripcion="Resumen de administracion: control de ingreso y egreso de visitantes."
      />

      <div className="mb-8 grid gap-4 sm:grid-cols-3">
        <StatCard label="Visitas en curso" value={String(enCurso.length)} tone="lima" hint="Dentro de la residencia" />
        <StatCard label="Visitas de hoy" value={String(hoy.length)} tone="verde" hint="Registradas en el dia" />
        <StatCard label="Total registradas" value={String(VISITAS.length)} tone="magenta" hint="Historial completo" />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Visitas en curso */}
        <section className="card p-5">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-display text-lg font-700 text-carbon-900">Visitas en curso</h2>
            <Link href="/administracion/visitas" className="text-sm font-600 text-verde-700 hover:underline">
              Gestionar visitas
            </Link>
          </div>
          <div className="space-y-3">
            {enCurso.length === 0 && (
              <p className="text-sm text-carbon-400">No hay visitas en curso en este momento.</p>
            )}
            {enCurso.map((v) => (
              <div key={v.id} className="flex items-center justify-between gap-2 rounded-xl border border-carbon-200/70 p-3">
                <div>
                  <p className="font-600 text-carbon-800">{v.visitante}</p>
                  <p className="text-sm text-carbon-500">
                    {v.vinculo} · visita a {nombreResidente(v.residenteId)}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-carbon-400">Ingreso</p>
                  <p className="font-600 text-carbon-700">{v.horaIngreso}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Ultimas visitas */}
        <section className="card p-5">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-display text-lg font-700 text-carbon-900">Ultimas visitas</h2>
            <Link href="/administracion/visitas" className="text-sm font-600 text-verde-700 hover:underline">
              Ver historial
            </Link>
          </div>
          <div className="space-y-3">
            {ultimas.map((v) => (
              <div key={v.id} className="flex items-center justify-between gap-2 rounded-xl border border-carbon-200/70 p-3">
                <div>
                  <p className="font-600 text-carbon-800">{v.visitante}</p>
                  <p className="text-sm text-carbon-500">{nombreResidente(v.residenteId)}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-carbon-400">{fmtFechaCorta(v.fecha)}</p>
                  {v.estado === "en_curso" ? (
                    <Badge tone="verde">En curso</Badge>
                  ) : v.estado === "rechazada" ? (
                    <Badge tone="rojo">Rechazada</Badge>
                  ) : (
                    <Badge tone="carbon">Finalizada</Badge>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}

function esHoy(iso: string): boolean {
  return new Date(iso).toDateString() === new Date().toDateString();
}
