import type {
  Consulta,
  NovedadDiaria,
  PersonaAutorizada,
  Residente,
  Reunion,
  Visita,
} from "./types";

// ---------------------------------------------------------------------------
// DATOS SIMULADOS (MOCK)
// Este prototipo es 100% frontend. Toda la informacion esta precargada aqui y
// es solo demostrativa. En la solucion real, gran parte de estos datos
// (signos vitales, novedades clinicas, medicacion) se obtendrian
// automaticamente desde Nexup mediante su API.
// ---------------------------------------------------------------------------

export const RESIDENTES: Residente[] = [
  {
    id: "r-001",
    nombre: "Hector",
    apellido: "Gomez",
    edad: 82,
    grupo: "C",
    habitacion: "Habitacion 4 - Ala Jardin",
    ingreso: "2021-03-12",
    familiarResponsable: "Rosa Gomez",
    vinculoResponsable: "Hija",
  },
  {
    id: "r-002",
    nombre: "Elsa",
    apellido: "Martinez",
    edad: 88,
    grupo: "D",
    habitacion: "Habitacion 1 - Ala Sur",
    ingreso: "2019-08-01",
    familiarResponsable: "Carlos Martinez",
    vinculoResponsable: "Hijo",
  },
  {
    id: "r-003",
    nombre: "Juan",
    apellido: "Pereyra",
    edad: 79,
    grupo: "B",
    habitacion: "Habitacion 7 - Ala Jardin",
    ingreso: "2022-11-20",
    familiarResponsable: "Lucia Pereyra",
    vinculoResponsable: "Hija",
  },
  {
    id: "r-004",
    nombre: "Marta",
    apellido: "Sosa",
    edad: 85,
    grupo: "A",
    habitacion: "Habitacion 9 - Ala Sur",
    ingreso: "2023-05-04",
    familiarResponsable: "Daniel Sosa",
    vinculoResponsable: "Hijo",
  },
];

// El familiar "logueado" en el portal de demostracion.
export const FAMILIAR_DEMO = {
  nombre: "Rosa Gomez",
  vinculo: "Hija",
  residenteId: "r-001",
  documento: "27.845.112",
};

export const NOVEDADES: NovedadDiaria[] = [
  {
    id: "n-001",
    residenteId: "r-001",
    fecha: new Date().toISOString(),
    origenNexup: true,
    signosVitales: {
      presion: "128/80 mmHg",
      temperatura: "36.4 °C",
      saturacion: "97%",
      frecuenciaCardiaca: "74 lpm",
    },
    items: [
      {
        categoria: "alimentacion",
        detalle:
          "Desayuno y almuerzo completos. Buena hidratacion. Merienda con fruta y te.",
        estado: "ok",
      },
      {
        categoria: "estadoAnimico",
        detalle: "Animado y participativo. Disfruto la actividad de musica.",
        estado: "ok",
      },
      {
        categoria: "medicacion",
        detalle: "Medicacion administrada segun indicacion medica (8:00, 14:00 y 20:00).",
        estado: "ok",
      },
      {
        categoria: "actividades",
        detalle: "Taller de musica por la manana y caminata asistida en el jardin.",
        estado: "ok",
      },
      {
        categoria: "observaciones",
        detalle:
          "Descanso nocturno adecuado. Se recomienda continuar con kinesiologia 3 veces por semana.",
        estado: "atencion",
      },
      {
        categoria: "incidentes",
        detalle: "Sin incidentes en la jornada.",
        estado: "ok",
      },
    ],
  },
  {
    id: "n-002",
    residenteId: "r-001",
    fecha: new Date(Date.now() - 86400000).toISOString(),
    origenNexup: true,
    signosVitales: {
      presion: "132/84 mmHg",
      temperatura: "36.7 °C",
      saturacion: "96%",
      frecuenciaCardiaca: "78 lpm",
    },
    items: [
      {
        categoria: "alimentacion",
        detalle: "Comio bien en todas las ingestas.",
        estado: "ok",
      },
      {
        categoria: "estadoAnimico",
        detalle: "Tranquilo, algo cansado por la tarde.",
        estado: "atencion",
      },
      {
        categoria: "medicacion",
        detalle: "Medicacion administrada sin novedades.",
        estado: "ok",
      },
      {
        categoria: "actividades",
        detalle: "Juegos de mesa y lectura compartida.",
        estado: "ok",
      },
      {
        categoria: "observaciones",
        detalle: "Leve molestia en rodilla derecha, evaluada por kinesiologo.",
        estado: "atencion",
      },
      { categoria: "incidentes", detalle: "Sin incidentes.", estado: "ok" },
    ],
  },
  {
    id: "n-003",
    residenteId: "r-002",
    fecha: new Date().toISOString(),
    origenNexup: true,
    signosVitales: {
      presion: "140/88 mmHg",
      temperatura: "37.1 °C",
      saturacion: "94%",
      frecuenciaCardiaca: "82 lpm",
    },
    items: [
      {
        categoria: "alimentacion",
        detalle: "Almuerzo asistido, dieta blanda. Ingesta parcial.",
        estado: "atencion",
      },
      {
        categoria: "estadoAnimico",
        detalle: "Mas reservada que de costumbre.",
        estado: "atencion",
      },
      {
        categoria: "medicacion",
        detalle: "Se ajusto horario de antihipertensivo segun indicacion medica.",
        estado: "atencion",
      },
      {
        categoria: "actividades",
        detalle: "Participo de la actividad de relajacion.",
        estado: "ok",
      },
      {
        categoria: "observaciones",
        detalle: "Temperatura levemente elevada, en control por enfermeria.",
        estado: "alerta",
      },
      {
        categoria: "incidentes",
        detalle: "Episodio de desorientacion breve a la tarde, ya recuperada.",
        estado: "alerta",
      },
    ],
  },
];

export const CONSULTAS: Consulta[] = [
  {
    id: "c-001",
    residenteId: "r-001",
    familiar: "Rosa Gomez",
    asunto: "Consulta por la medicacion de la noche",
    estado: "respondida",
    fecha: new Date(Date.now() - 2 * 86400000).toISOString(),
    mensajes: [
      {
        autor: "Rosa Gomez",
        rol: "Familiar",
        mensaje:
          "Buenas tardes, queria saber si a papa le cambiaron algo de la medicacion de la noche. Gracias!",
        fecha: new Date(Date.now() - 2 * 86400000).toISOString(),
      },
      {
        autor: "Enf. Laura Benitez",
        rol: "Enfermeria",
        mensaje:
          "Hola Rosa! No hubo cambios en la medicacion. Se mantiene el esquema indicado por el medico. Cualquier cosa quedamos a disposicion.",
        fecha: new Date(Date.now() - 2 * 86400000 + 5400000).toISOString(),
      },
    ],
  },
  {
    id: "c-002",
    residenteId: "r-001",
    familiar: "Rosa Gomez",
    asunto: "Turno con kinesiologia",
    estado: "pendiente",
    fecha: new Date(Date.now() - 3600000).toISOString(),
    mensajes: [
      {
        autor: "Rosa Gomez",
        rol: "Familiar",
        mensaje:
          "Hola! Vi en el reporte que tuvo una molestia en la rodilla. Se le pudo dar turno con kinesiologia esta semana?",
        fecha: new Date(Date.now() - 3600000).toISOString(),
      },
    ],
  },
  {
    id: "c-003",
    residenteId: "r-002",
    familiar: "Carlos Martinez",
    asunto: "Estado de mama hoy",
    estado: "pendiente",
    fecha: new Date(Date.now() - 1800000).toISOString(),
    mensajes: [
      {
        autor: "Carlos Martinez",
        rol: "Familiar",
        mensaje:
          "Buen dia, vi que mama tuvo la temperatura un poco alta. Como esta evolucionando? Gracias.",
        fecha: new Date(Date.now() - 1800000).toISOString(),
      },
    ],
  },
];

export const REUNIONES: Reunion[] = [
  {
    id: "m-001",
    residenteId: "r-001",
    fecha: nextDateISO(7),
    hora: "16:00",
    estado: "confirmada",
    participantes: ["Dra. Medica de cabecera", "Lic. Psicologia", "Kinesiologo"],
    motivo: "Reunion mensual de seguimiento",
  },
  {
    id: "m-002",
    residenteId: "r-001",
    fecha: pastDateISO(23),
    hora: "10:30",
    estado: "realizada",
    participantes: ["Dra. Medica de cabecera", "Enf. Laura Benitez"],
    motivo: "Seguimiento mensual",
    conclusiones:
      "Buena evolucion general. Se refuerza plan de kinesiologia y se mantiene esquema de medicacion. La familia consulto por alimentacion, se brindo detalle del plan nutricional.",
  },
  {
    id: "m-003",
    residenteId: "r-002",
    fecha: nextDateISO(2),
    hora: "11:00",
    estado: "propuesta",
    participantes: ["Dra. Medica de cabecera", "Lic. Nutricion"],
    motivo: "Reunion mensual de seguimiento",
  },
];

export const VISITAS: Visita[] = [
  {
    id: "v-001",
    residenteId: "r-001",
    visitante: "Rosa Gomez",
    vinculo: "Hija",
    documento: "27.845.112",
    autorizado: true,
    estado: "finalizada",
    fecha: pastDateISO(1),
    horaIngreso: "15:10",
    horaEgreso: "17:05",
  },
  {
    id: "v-002",
    residenteId: "r-003",
    visitante: "Lucia Pereyra",
    vinculo: "Hija",
    documento: "30.114.998",
    autorizado: true,
    estado: "en_curso",
    fecha: new Date().toISOString(),
    horaIngreso: "16:20",
  },
  {
    id: "v-003",
    residenteId: "r-002",
    visitante: "Carlos Martinez",
    vinculo: "Hijo",
    documento: "25.330.470",
    autorizado: true,
    estado: "finalizada",
    fecha: pastDateISO(2),
    horaIngreso: "10:00",
    horaEgreso: "11:30",
  },
  {
    id: "v-004",
    residenteId: "r-001",
    visitante: "Persona no registrada",
    vinculo: "Vecino",
    documento: "33.901.220",
    autorizado: false,
    estado: "rechazada",
    fecha: pastDateISO(4),
    horaIngreso: "12:40",
    observacion: "Visitante no figura en la lista de personas autorizadas del residente.",
  },
];

// Lista de personas autorizadas por residente (para verificar el acceso).
export const AUTORIZADOS: Record<string, PersonaAutorizada[]> = {
  "r-001": [
    { nombre: "Rosa Gomez", documento: "27.845.112", vinculo: "Hija" },
    { nombre: "Mariano Gomez", documento: "29.110.455", vinculo: "Hijo" },
    {
      nombre: "Pedro Gomez",
      documento: "12.004.881",
      vinculo: "Hermano",
      restriccion: "Solo en horario de tarde",
    },
  ],
  "r-002": [
    { nombre: "Carlos Martinez", documento: "25.330.470", vinculo: "Hijo" },
    { nombre: "Ana Martinez", documento: "28.770.112", vinculo: "Nieta" },
  ],
  "r-003": [{ nombre: "Lucia Pereyra", documento: "30.114.998", vinculo: "Hija" }],
  "r-004": [{ nombre: "Daniel Sosa", documento: "26.540.330", vinculo: "Hijo" }],
};

// ---------------------------------------------------------------------------
// Helpers de datos
// ---------------------------------------------------------------------------

export function getResidente(id: string): Residente | undefined {
  return RESIDENTES.find((r) => r.id === id);
}

export function nombreResidente(id: string): string {
  const r = getResidente(id);
  return r ? `${r.nombre} ${r.apellido}` : "Residente";
}

function nextDateISO(daysAhead: number): string {
  const d = new Date();
  d.setDate(d.getDate() + daysAhead);
  return d.toISOString();
}

function pastDateISO(daysAgo: number): string {
  const d = new Date();
  d.setDate(d.getDate() - daysAgo);
  return d.toISOString();
}
