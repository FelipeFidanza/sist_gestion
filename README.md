# SGIF · Sistema de Gestión de Interacción con Familiares

Prototipo de muestra del sistema de gestión propuesto para la **Residencia La Fabiana**,
desarrollado como parte del Trabajo Final Integrador de la materia **Sistemas de Gestión**
(Ingeniería en Sistemas de Información — UTN FRRe), por el equipo **Gestech**.

Este repositorio implementa la fase de **muestra de implementación** del trabajo: una vez
analizada la organización (AS-IS / TO-BE) y seleccionada la fuente de provisión
(**desarrollo a medida**), se construye un prototipo **visual y navegable** del sistema
propuesto.

> ⚠️ **Es un prototipo de demostración.** No tiene backend ni base de datos: toda la
> información es simulada (mock) y vive en el navegador. El objetivo es mostrar de forma
> tangible cómo se vería y se usaría el sistema, no entregar un producto final.

---

## 🎯 Qué resuelve

Hoy la comunicación con las familias se hace de manera informal y desorganizada
(principalmente por WhatsApp) y el registro de visitas es manual. El SGIF centraliza estas
funciones en un único canal institucional, integrándose con **Nexup** (el sistema de gestión
clínica que la residencia ya utiliza) para reutilizar la información de los residentes.

El prototipo cubre los **requisitos funcionales** definidos en el documento del trabajo:

| # | Requisito | MoSCoW | Dónde se ve en el prototipo |
|---|-----------|--------|------------------------------|
| 1 | Visualizar información del residente (alimentación, ánimo, medicación, actividades, observaciones, incidentes) | Must | Portal Familiar → **Inicio** |
| 2 | Obtener información automáticamente desde Nexup | Must | Insignia **"Sincronizado desde Nexup"** en reportes y KPIs |
| 3 | Permitir a los familiares realizar consultas | Must | Portal Familiar → **Consultas** |
| 4 | Permitir al personal responder consultas | Must | Panel Personal → **Consultas** |
| 5 | Mantener historial de consultas y respuestas | Should | Hilos de conversación en ambas vistas de Consultas |
| 6 | Registrar fechas y horarios de reuniones de seguimiento | Could | Panel Personal → **Reuniones** |
| 7 | Almacenar observaciones y conclusiones de reuniones | Could | Panel Personal → **Reuniones** (y se ven en el portal del familiar) |
| 8 | Registrar ingreso y egreso de visitantes | Must | Panel Personal → **Visitas** / Portal Familiar → **Mis visitas** |
| 9 | Verificar si un visitante está autorizado | Must | Verificación de autorización en **Visitas** |
| 10 | Mantener historial de visitas | Should | Tabla de registro de visitas |

---

## 🧭 Estructura de la aplicación

El sistema tiene dos perfiles de acceso, que se eligen en la pantalla de inicio:

### 👨‍👩‍👧 Portal de Familiares (`/familiar`)
- **Inicio** — ficha del residente, reporte del día con signos vitales y novedades por categoría, accesos rápidos.
- **Consultas** — crear consultas y seguir las respuestas en formato chat.
- **Reuniones** — próximas reuniones (con confirmación de asistencia) e historial con conclusiones.
- **Mis visitas** — registrar el ingreso (con verificación de autorización) e historial de visitas.

### 🩺 Panel del Personal (`/personal`)
- **Panel** — resumen operativo, consultas pendientes, próximas reuniones e indicadores (KPIs).
- **Residentes** — listado y detalle de cada residente con sus reportes diarios.
- **Consultas** — bandeja de entrada para responder a los familiares.
- **Reuniones** — planificar encuentros y registrar conclusiones.
- **Visitas** — recepción de visitantes con verificación de autorización y control de ingreso/egreso.

> El acceso es **de demostración**: no pide credenciales. El "login" simplemente elige el rol.

---

## 🛠️ Tecnologías

- **[Next.js 14](https://nextjs.org/)** (App Router)
- **React 18** + **TypeScript**
- **Tailwind CSS** para el diseño
- **next/font** (Inter + Poppins) para la tipografía
- **Docker** (opcional) para levantar el prototipo sin instalar dependencias localmente

### 🎨 Identidad visual
La paleta se construyó a partir del **logo de la residencia**: verde lima, verde teal y
magenta, sobre neutros cálidos. Está definida en [`tailwind.config.ts`](./tailwind.config.ts)
(`verde`, `lima`, `magenta`, `carbon`). El isologo se recreó en SVG en
[`src/components/Logo.tsx`](./src/components/Logo.tsx).

---

## 🚀 Cómo ejecutarlo

### Opción A — Node.js (desarrollo)

Requisitos: **Node.js 18.18+** (recomendado 20).

```bash
npm install
npm run dev
```

Abrir 👉 [http://localhost:3000](http://localhost:3000)

Para un build de producción:

```bash
npm run build
npm start
```

### Opción B — Docker (recomendado para visualizar)

No requiere tener Node instalado, solo Docker. Levanta el prototipo ya construido con todas
sus dependencias:

```bash
docker compose up --build
```

Abrir 👉 [http://localhost:3000](http://localhost:3000)

Para detenerlo: `docker compose down`.

> También se puede construir y correr la imagen a mano:
> ```bash
> docker build -t sgif-la-fabiana .
> docker run -p 3000:3000 sgif-la-fabiana
> ```

---

## 📁 Estructura del proyecto

```
src/
├── app/
│   ├── page.tsx               # Pantalla de inicio / selección de rol
│   ├── layout.tsx             # Layout raíz (fuentes, metadata)
│   ├── globals.css            # Estilos base + utilidades de marca
│   ├── familiar/              # Portal de Familiares
│   │   ├── layout.tsx
│   │   ├── page.tsx           # Inicio
│   │   ├── consultas/
│   │   ├── reuniones/
│   │   └── visitas/
│   └── personal/              # Panel del Personal
│       ├── layout.tsx
│       ├── page.tsx           # Panel / KPIs
│       ├── residentes/
│       │   └── [id]/          # Detalle de residente
│       ├── consultas/
│       ├── reuniones/
│       └── visitas/
├── components/
│   ├── AppShell.tsx           # Layout con sidebar + topbar
│   ├── Logo.tsx               # Isologo en SVG
│   ├── NovedadDiaria.tsx      # Reporte diario del residente
│   ├── icons.tsx              # Íconos SVG
│   └── ui.tsx                 # Badge, Avatar, StatCard, etc.
└── lib/
    ├── types.ts               # Tipos del dominio
    ├── data.ts                # Datos simulados (mock)
    └── format.ts              # Helpers de fecha/formato
```

---

## 📝 Notas y alcance

- **Sin persistencia:** los cambios (nuevas consultas, visitas, reuniones) se mantienen
  mientras la página esté abierta y se reinician al recargar. Es intencional, por ser un prototipo.
- **Integración con Nexup:** se representa visualmente mediante la insignia *"Sincronizado
  desde Nexup"* en los datos que, en la solución real, se obtendrían vía su API
  (signos vitales, medicación, novedades clínicas).
- **Datos ficticios:** residentes, familiares y profesionales son ilustrativos.

---

## 👥 Equipo Gestech

Fidanza, Felipe · Lopez, Tomás Agustín · Machado, Matías · Marain, Yoel Mario · Rodriguez Scornik, Matías

*UTN — Facultad Regional Resistencia · Ingeniería en Sistemas de Información · 2026*
