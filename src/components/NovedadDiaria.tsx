import { Badge, NexupSyncBadge } from "@/components/ui";
import { CATEGORIAS, fmtFecha } from "@/lib/format";
import type { ItemNovedad, NovedadDiaria } from "@/lib/types";

const estadoTone: Record<NonNullable<ItemNovedad["estado"]>, "verde" | "amarillo" | "rojo"> = {
  ok: "verde",
  atencion: "amarillo",
  alerta: "rojo",
};

const estadoLabel: Record<NonNullable<ItemNovedad["estado"]>, string> = {
  ok: "Sin novedad",
  atencion: "A seguir",
  alerta: "Atencion",
};

export function NovedadCard({ novedad }: { novedad: NovedadDiaria }) {
  return (
    <div className="card p-5 sm:p-6">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
        <div>
          <h3 className="font-display text-lg font-700 text-carbon-900">Reporte del dia</h3>
          <p className="text-sm text-carbon-400">{fmtFecha(novedad.fecha)}</p>
        </div>
       
      </div>

      {/* Signos vitales */}
      <div className="mb-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Vital label="Presion arterial" value={novedad.signosVitales.presion} />
        <Vital label="Temperatura" value={novedad.signosVitales.temperatura} />
        <Vital label="Saturacion O2" value={novedad.signosVitales.saturacion} />
        <Vital label="Frec. cardiaca" value={novedad.signosVitales.frecuenciaCardiaca} />
      </div>

      {/* Categorias */}
      <div className="grid gap-3 sm:grid-cols-2">
        {novedad.items.map((item) => {
          const meta = CATEGORIAS[item.categoria];
          return (
            <div key={item.categoria} className="rounded-xl border border-carbon-200/70 p-4">
              <div className="mb-1.5 flex items-center justify-between gap-2">
                <span className="flex items-center gap-2 text-sm font-600 text-carbon-800">
                  <span aria-hidden>{meta.icono}</span>
                  {meta.etiqueta}
                </span>
                {item.estado && (
                  <Badge tone={estadoTone[item.estado]}>{estadoLabel[item.estado]}</Badge>
                )}
              </div>
              <p className="text-sm leading-relaxed text-carbon-500">{item.detalle}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function Vital({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-carbon-50 p-3 text-center">
      <p className="text-[11px] uppercase tracking-wide text-carbon-400">{label}</p>
      <p className="mt-0.5 font-display text-base font-700 text-carbon-800">{value}</p>
    </div>
  );
}
