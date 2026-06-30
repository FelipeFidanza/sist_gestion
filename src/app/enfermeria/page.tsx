import { Avatar, Badge, PageHeader, StatCard } from "@/components/ui";
import {
  CONSULTAS,
  NOVEDADES,
  RESIDENTES,
  nombreResidente,
} from "@/lib/data";
import { tiempoRelativo } from "@/lib/format";
import Link from "next/link";

export default function EnfermeriaPanel() {
  const consultasPendientes = CONSULTAS.filter((c) => c.estado === "pendiente");
  const reportesHoy = NOVEDADES.filter((n) => esHoy(n.fecha));
  // Residentes con algun dato que requiere seguimiento o atencion en el dia.
  const conAtencion = NOVEDADES.filter(
    (n) => esHoy(n.fecha) && n.items.some((i) => i.estado === "atencion" || i.estado === "alerta"),
  );

  return (
    <>
      <PageHeader
        titulo="Hola, Laura 👋"
        descripcion="Resumen de enfermeria: consultas de las familias y novedades de los residentes."
      />

      <div className="mb-8 grid gap-4 sm:grid-cols-3">
        <StatCard
          label="Consultas pendientes"
          value={String(consultasPendientes.length)}
          tone="magenta"
          hint="Requieren respuesta"
        />
        <StatCard
          label="Residentes en seguimiento"
          value={String(RESIDENTES.length)}
          tone="verde"
          hint="Total activos"
        />
        <StatCard
          label="Reportes cargados hoy"
          value={String(reportesHoy.length)}
          tone="lima"
          hint="Sincronizados desde Nexup"
        />
      </div>

      <div className="flex flex-col lg:grid gap-6 lg:grid-cols-2">
        {/* Consultas pendientes */}
        <section className="card p-5 w-full">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-display text-lg font-700 text-carbon-900">Consultas por responder</h2>
            <Link href="/enfermeria/consultas" className="text-sm font-600 text-verde-700 hover:underline">
              Ver todas
            </Link>
          </div>
          <div className="space-y-3">
            {consultasPendientes.length === 0 && (
              <p className="text-sm text-carbon-400">No hay consultas pendientes. ¡Todo al dia!</p>
            )}
            {consultasPendientes.map((c) => (
              <Link
                key={c.id}
                href="/enfermeria/consultas"
                className="block rounded-xl border border-carbon-200/70 p-3 transition-colors hover:bg-carbon-50"
              >
                <div className="flex items-center justify-between gap-2">
                  <p className="font-600 text-carbon-800">{c.asunto}</p>
                  <span className="text-xs text-carbon-400">{tiempoRelativo(c.fecha)}</span>
                </div>
                <p className="mt-0.5 text-sm text-carbon-500">
                  {c.familiar} · {nombreResidente(c.residenteId)}
                </p>
              </Link>
            ))}
          </div>
        </section>

        {/* Residentes a seguir */}
        <section className="card p-5 w-full">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-display text-lg font-700 text-carbon-900">Residentes a seguir hoy</h2>
            <Link href="/enfermeria/residentes" className="text-sm font-600 text-verde-700 hover:underline">
              Ver residentes
            </Link>
          </div>
          <div className="space-y-3">
            {conAtencion.length === 0 && (
              <p className="text-sm text-carbon-400">Sin novedades que requieran seguimiento.</p>
            )}
            {conAtencion.map((n) => {
              const alerta = n.items.some((i) => i.estado === "alerta");
              return (
                <Link
                  key={n.id}
                  href={`/enfermeria/residentes/${n.residenteId}`}
                  className="flex items-center gap-3 rounded-xl border border-carbon-200/70 p-3 transition-colors hover:bg-carbon-50"
                >
                  <Avatar nombre={nombreResidente(n.residenteId)} tone="verde" size={40} />
                  <div className="min-w-0 flex-1">
                    <p className="font-600 text-carbon-800">{nombreResidente(n.residenteId)}</p>
                    <p className="truncate text-sm text-carbon-500">
                      {n.items.find((i) => i.estado === "alerta" || i.estado === "atencion")?.detalle}
                    </p>
                  </div>
                  <Badge tone={alerta ? "rojo" : "amarillo"}>{alerta ? "Atencion" : "A seguir"}</Badge>
                </Link>
              );
            })}
          </div>
        </section>
      </div>
    </>
  );
}

function esHoy(iso: string): boolean {
  return new Date(iso).toDateString() === new Date().toDateString();
}
