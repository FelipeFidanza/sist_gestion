import type { CategoriaNovedad } from "./types";

export function fmtFecha(iso: string): string {
  return new Date(iso).toLocaleDateString("es-AR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

export function fmtFechaCorta(iso: string): string {
  return new Date(iso).toLocaleDateString("es-AR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

export function fmtHora(iso: string): string {
  return new Date(iso).toLocaleTimeString("es-AR", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function fmtFechaHora(iso: string): string {
  return `${fmtFechaCorta(iso)} · ${fmtHora(iso)}`;
}

export function tiempoRelativo(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const min = Math.round(diff / 60000);
  if (min < 1) return "recien";
  if (min < 60) return `hace ${min} min`;
  const horas = Math.round(min / 60);
  if (horas < 24) return `hace ${horas} h`;
  const dias = Math.round(horas / 24);
  return `hace ${dias} d`;
}

export function iniciales(nombre: string): string {
  return nombre
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

interface MetaCategoria {
  etiqueta: string;
  icono: string;
}

export const CATEGORIAS: Record<CategoriaNovedad, MetaCategoria> = {
  alimentacion: { etiqueta: "Alimentacion", icono: "🍽️" },
  estadoAnimico: { etiqueta: "Estado animico", icono: "🙂" },
  medicacion: { etiqueta: "Medicacion", icono: "💊" },
  actividades: { etiqueta: "Actividades", icono: "🎶" },
  observaciones: { etiqueta: "Observaciones", icono: "📝" },
  incidentes: { etiqueta: "Incidentes", icono: "⚠️" },
};
