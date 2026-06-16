import { Logo, LeafMark } from "@/components/Logo";
import { IconChat, IconDoor, IconUsers } from "@/components/icons";
import Link from "next/link";

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[var(--background)]">
      {/* Decoracion de fondo */}
      <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-verde-200/40 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -left-24 h-96 w-96 rounded-full bg-magenta-100/50 blur-3xl" />

      <div className="relative mx-auto flex min-h-screen max-w-5xl flex-col px-6 py-10">
        <header className="flex items-center justify-between">
          <Logo size={42} />
          <span className="rounded-full border border-carbon-200 bg-white/70 px-3 py-1 text-xs font-600 text-carbon-500">
            Prototipo de muestra
          </span>
        </header>

        <main className="flex flex-1 flex-col items-center justify-center py-10 text-center">
          <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-verde-200 bg-verde-50 px-4 py-1.5 text-sm font-600 text-verde-700">
            <LeafMark size={18} />
            Sistema de Gestion de Interaccion con Familiares
          </span>
          <h1 className="max-w-3xl font-display text-4xl font-700 leading-tight text-carbon-900 sm:text-5xl text-balance">
            Comunicacion clara y trazable entre la residencia y las familias
          </h1>
          <p className="mt-4 max-w-2xl text-base text-carbon-500 text-balance">
            Centraliza las novedades de cada residente, las consultas de los familiares, la
            planificacion de reuniones y el control de visitas. La informacion clinica se
            integra automaticamente desde Nexup.
          </p>

          <p className="mt-10 text-sm font-600 uppercase tracking-wide text-carbon-400">
            Ingresar como
          </p>

          <div className="mt-4 grid w-full max-w-2xl gap-5 sm:grid-cols-2">
            <RoleCard
              href="/familiar"
              tone="verde"
              icon={<IconUsers className="h-7 w-7" />}
              titulo="Familiar"
              descripcion="Segui el dia a dia de tu ser querido, realiza consultas y registra tus visitas."
            />
            <RoleCard
              href="/personal"
              tone="magenta"
              icon={<IconChat className="h-7 w-7" />}
              titulo="Personal de la residencia"
              descripcion="Responde consultas, planifica reuniones y gestiona el acceso de visitantes."
            />
          </div>

          <p className="mt-8 max-w-md text-xs text-carbon-400">
            Acceso de demostracion: no requiere credenciales. Los datos mostrados son
            ilustrativos y no representan informacion real.
          </p>
        </main>

        <footer className="border-t border-carbon-200/70 pt-5 text-center text-xs text-carbon-400">
          <p className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1">
            <IconDoor className="hidden h-4 w-4 sm:inline" />
            Residencia La Fabiana · Trabajo Final Integrador — Sistemas de Gestion · Equipo
            Gestech (UTN FRRe)
          </p>
        </footer>
      </div>
    </div>
  );
}

function RoleCard({
  href,
  titulo,
  descripcion,
  icon,
  tone,
}: {
  href: string;
  titulo: string;
  descripcion: string;
  icon: React.ReactNode;
  tone: "verde" | "magenta";
}) {
  const tones = {
    verde: {
      ring: "hover:border-verde-300 hover:shadow-card",
      badge: "bg-verde-100 text-verde-700",
      cta: "text-verde-700",
    },
    magenta: {
      ring: "hover:border-magenta-300 hover:shadow-card",
      badge: "bg-magenta-100 text-magenta-700",
      cta: "text-magenta-700",
    },
  }[tone];

  return (
    <Link
      href={href}
      className={`group card flex flex-col items-start p-6 text-left transition-all ${tones.ring}`}
    >
      <span className={`mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl ${tones.badge}`}>
        {icon}
      </span>
      <h2 className="font-display text-xl font-700 text-carbon-900">{titulo}</h2>
      <p className="mt-1.5 text-sm text-carbon-500">{descripcion}</p>
      <span className={`mt-4 inline-flex items-center gap-1.5 text-sm font-600 ${tones.cta}`}>
        Ingresar
        <span className="transition-transform group-hover:translate-x-1">→</span>
      </span>
    </Link>
  );
}
