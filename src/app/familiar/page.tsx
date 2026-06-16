import { NovedadCard } from "@/components/NovedadDiaria";
import { Avatar, Badge, PageHeader } from "@/components/ui";
import { IconCalendar, IconChat, IconDoor } from "@/components/icons";
import { CONSULTAS, FAMILIAR_DEMO, NOVEDADES, REUNIONES, getResidente } from "@/lib/data";
import { fmtFecha } from "@/lib/format";
import Link from "next/link";

export default function FamiliarInicio() {
  const residente = getResidente(FAMILIAR_DEMO.residenteId)!;
  const novedades = NOVEDADES.filter((n) => n.residenteId === residente.id).sort(
    (a, b) => +new Date(b.fecha) - +new Date(a.fecha),
  );
  const ultima = novedades[0];

  const consultasPendientes = CONSULTAS.filter(
    (c) => c.residenteId === residente.id && c.estado === "pendiente",
  ).length;
  const proximaReunion = REUNIONES.filter(
    (m) => m.residenteId === residente.id && m.estado !== "realizada",
  ).sort((a, b) => +new Date(a.fecha) - +new Date(b.fecha))[0];

  return (
    <>
      <PageHeader
        titulo={`Hola, ${FAMILIAR_DEMO.nombre.split(" ")[0]} 👋`}
        descripcion="Aca podes seguir como transcurre el dia y mantenerte en contacto con la residencia."
      />

      {/* Ficha del residente */}
      <div className="card mb-6 flex flex-wrap items-center gap-4 p-5">
        <Avatar nombre={`${residente.nombre} ${residente.apellido}`} tone="verde" size={64} />
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="font-display text-xl font-700 text-carbon-900">
              {residente.nombre} {residente.apellido}
            </h2>
            <Badge tone="lima">Grupo {residente.grupo}</Badge>
          </div>
          <p className="mt-0.5 text-sm text-carbon-500">
            {residente.edad} anios · {residente.habitacion}
          </p>
          <p className="text-xs text-carbon-400">
            Ingreso: {fmtFecha(residente.ingreso)} · Familiar responsable:{" "}
            {residente.familiarResponsable} ({residente.vinculoResponsable})
          </p>
        </div>
      </div>

      {/* Accesos rapidos */}
      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        <QuickCard
          href="/familiar/consultas"
          icon={<IconChat className="h-6 w-6" />}
          titulo="Consultas"
          dato={consultasPendientes > 0 ? `${consultasPendientes} en espera` : "Al dia"}
          tone="verde"
        />
        <QuickCard
          href="/familiar/reuniones"
          icon={<IconCalendar className="h-6 w-6" />}
          titulo="Proxima reunion"
          dato={proximaReunion ? fmtFecha(proximaReunion.fecha) : "Sin programar"}
          tone="magenta"
        />
        <QuickCard
          href="/familiar/visitas"
          icon={<IconDoor className="h-6 w-6" />}
          titulo="Visitas"
          dato="Registrar visita"
          tone="lima"
        />
      </div>

      {ultima && <NovedadCard novedad={ultima} />}

      {/* Historial breve */}
      {novedades.length > 1 && (
        <div className="mt-6">
          <h3 className="mb-3 font-display text-lg font-700 text-carbon-900">Dias anteriores</h3>
          <div className="space-y-3">
            {novedades.slice(1).map((n) => (
              <div key={n.id} className="card flex items-center justify-between gap-3 p-4">
                <div>
                  <p className="text-sm font-600 text-carbon-800">{fmtFecha(n.fecha)}</p>
                  <p className="text-xs text-carbon-400">
                    {n.items.find((i) => i.categoria === "estadoAnimico")?.detalle}
                  </p>
                </div>
                <Badge tone="carbon">Reporte completo</Badge>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

function QuickCard({
  href,
  icon,
  titulo,
  dato,
  tone,
}: {
  href: string;
  icon: React.ReactNode;
  titulo: string;
  dato: string;
  tone: "verde" | "magenta" | "lima";
}) {
  const tones = {
    verde: "bg-verde-100 text-verde-700",
    magenta: "bg-magenta-100 text-magenta-700",
    lima: "bg-lima-100 text-lima-800",
  }[tone];
  return (
    <Link href={href} className="card flex items-center gap-3 p-4 transition-all hover:shadow-card">
      <span className={`inline-flex h-11 w-11 items-center justify-center rounded-xl ${tones}`}>
        {icon}
      </span>
      <div>
        <p className="text-sm text-carbon-400">{titulo}</p>
        <p className="font-display font-700 text-carbon-900">{dato}</p>
      </div>
    </Link>
  );
}
