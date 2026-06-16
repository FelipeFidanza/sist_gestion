import { AppShell, type NavItem } from "@/components/AppShell";
import { IconCalendar, IconChat, IconDoor, IconHome } from "@/components/icons";
import { FAMILIAR_DEMO, nombreResidente } from "@/lib/data";

const nav: NavItem[] = [
  { href: "/familiar", label: "Inicio", icon: <IconHome /> },
  { href: "/familiar/consultas", label: "Consultas", icon: <IconChat /> },
  { href: "/familiar/reuniones", label: "Reuniones", icon: <IconCalendar /> },
  { href: "/familiar/visitas", label: "Mis visitas", icon: <IconDoor /> },
];

export default function FamiliarLayout({ children }: { children: React.ReactNode }) {
  return (
    <AppShell
      navItems={nav}
      rolLabel="Portal de Familiares"
      rolTone="verde"
      userName={FAMILIAR_DEMO.nombre}
      userSub={`${FAMILIAR_DEMO.vinculo} de ${nombreResidente(FAMILIAR_DEMO.residenteId)}`}
    >
      {children}
    </AppShell>
  );
}
