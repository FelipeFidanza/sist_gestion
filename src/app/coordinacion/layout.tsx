import { AppShell, type NavItem } from "@/components/AppShell";
import { IconCalendar, IconGrid } from "@/components/icons";

const nav: NavItem[] = [
  { href: "/coordinacion", label: "Panel", icon: <IconGrid /> },
  { href: "/coordinacion/reuniones", label: "Reuniones", icon: <IconCalendar /> },
];

export default function CoordinacionLayout({ children }: { children: React.ReactNode }) {
  return (
    <AppShell
      navItems={nav}
      rolLabel="Coordinacion"
      rolTone="verde"
      userName="Marta Quiroga"
      userSub="Encargada del equipo interdisciplinario"
    >
      {children}
    </AppShell>
  );
}
