import { Logo } from "@/components/Logo";
import { IconCalendar, IconDoor, IconHeart, IconUsers } from "@/components/icons";
import Link from "next/link";

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[var(--background)]">
      {/* Decoracion de fondo */}
      <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-verde-200/40 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -left-24 h-96 w-96 rounded-full bg-magenta-100/50 blur-3xl" />

      <div className="relative mx-auto flex min-h-screen max-w-4xl flex-col px-6 py-10">
        <main className="flex flex-1 flex-col items-center justify-center py-10 text-center">
          {/* Logo centrado */}
          <Logo size={88} layout="col" />

          <p className="mt-10 text-sm font-600 uppercase tracking-wide text-carbon-400">
            Ingresar como
          </p>

          <div className="mt-4 grid w-full max-w-2xl gap-4 sm:grid-cols-2">
            <RoleCard
              href="/familiar"
              tone="verde"
              icon={<IconUsers className="h-6 w-6" />}
              titulo="Familiar"
              descripcion="Segui el dia a dia de tu ser querido y mantenete en contacto."
            />
            <RoleCard
              href="/enfermeria"
              tone="magenta"
              icon={<IconHeart className="h-6 w-6" />}
              titulo="Enfermeria"
              descripcion="Reportes de residentes y consultas de las familias."
            />
            <RoleCard
              href="/administracion"
              tone="lima"
              icon={<IconDoor className="h-6 w-6" />}
              titulo="Administracion"
              descripcion="Registro y control de visitas a la residencia."
            />
            <RoleCard
              href="/coordinacion"
              tone="verde"
              icon={<IconCalendar className="h-6 w-6" />}
              titulo="Coordinacion"
              descripcion="Planificacion y seguimiento de reuniones con las familias."
            />
          </div>

          <p className="mt-8 max-w-md text-xs text-carbon-400">
            Acceso de demostracion: no requiere credenciales. Los datos mostrados son
            ilustrativos y no representan informacion real.
          </p>
        </main>

        <footer className="border-t border-carbon-200/70 pt-5 text-center text-xs text-carbon-400">
          <p>
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
  tone: "verde" | "magenta" | "lima";
}) {
  const tones = {
    verde: { ring: "hover:border-verde-300", badge: "bg-verde-100 text-verde-700", cta: "text-verde-700" },
    magenta: { ring: "hover:border-magenta-300", badge: "bg-magenta-100 text-magenta-700", cta: "text-magenta-700" },
    lima: { ring: "hover:border-lima-300", badge: "bg-lima-100 text-lima-800", cta: "text-lima-700" },
  }[tone];

  return (
    <Link
      href={href}
      className={`group card flex flex-col items-start p-5 text-left transition-all hover:shadow-card ${tones.ring}`}
    >
      <span className={`mb-3 inline-flex h-12 w-12 items-center justify-center rounded-2xl ${tones.badge}`}>
        {icon}
      </span>
      <h2 className="font-display text-lg font-700 text-carbon-900">{titulo}</h2>
      <p className="mt-1 text-sm text-carbon-500">{descripcion}</p>
      <span className={`mt-3 inline-flex items-center gap-1.5 text-sm font-600 ${tones.cta}`}>
        Ingresar
        <span className="transition-transform group-hover:translate-x-1">→</span>
      </span>
    </Link>
  );
}
