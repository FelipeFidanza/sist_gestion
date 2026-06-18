// Tipos del dominio del Sistema de Gestion de Interaccion con Familiares (SGIF).
// Prototipo: los datos son simulados (mock) y viven en memoria.

export type Grupo = "A" | "B" | "C" | "D";

export interface Residente {
  id: string;
  nombre: string;
  apellido: string;
  edad: number;
  grupo: Grupo; // nivel de dependencia (A: autovalido ... D: alta dependencia)
  habitacion: string;
  ingreso: string; // fecha ISO
  familiarResponsable: string;
  vinculoResponsable: string;
  foto?: string;
}

export type CategoriaNovedad =
  | "alimentacion"
  | "estadoAnimico"
  | "medicacion"
  | "actividades"
  | "observaciones"
  | "incidentes";

export interface ItemNovedad {
  categoria: CategoriaNovedad;
  detalle: string;
  // Estado opcional para colorear el dato (ej. incidentes / medicacion)
  estado?: "ok" | "atencion" | "alerta";
}

export interface SignosVitales {
  presion: string;
  temperatura: string;
  saturacion: string;
  frecuenciaCardiaca: string;
}

export interface NovedadDiaria {
  id: string;
  residenteId: string;
  fecha: string; // ISO
  // Se obtiene automaticamente desde Nexup
  origenNexup: boolean;
  signosVitales: SignosVitales;
  items: ItemNovedad[];
}

export type EstadoConsulta = "pendiente" | "respondida";

export interface MensajeConsulta {
  autor: string;
  rol: "Familiar" | "Enfermeria";
  mensaje: string;
  fecha: string; // ISO
}

export interface Consulta {
  id: string;
  residenteId: string;
  familiar: string;
  asunto: string;
  estado: EstadoConsulta;
  fecha: string; // ISO de creacion
  mensajes: MensajeConsulta[];
}

export type EstadoReunion = "propuesta" | "confirmada" | "realizada";

export interface Reunion {
  id: string;
  residenteId: string;
  fecha: string; // ISO
  hora: string;
  estado: EstadoReunion;
  participantes: string[];
  motivo: string;
  conclusiones?: string;
}

export type EstadoVisita = "en_curso" | "finalizada" | "rechazada";

export interface Visita {
  id: string;
  residenteId: string;
  visitante: string;
  vinculo: string;
  documento: string;
  autorizado: boolean;
  estado: EstadoVisita;
  fecha: string; // ISO (dia de la visita)
  horaIngreso: string;
  horaEgreso?: string;
  observacion?: string;
}

export interface PersonaAutorizada {
  nombre: string;
  documento: string;
  vinculo: string;
  restriccion?: string;
}
