import { AppShell, type NavItem } from "@/components/AppShell";
import { IconCalendar, IconChat, IconDoor, IconGrid, IconUsers } from "@/components/icons";

const nav: NavItem[] = [
  { href: "/personal", label: "Panel", icon: <IconGrid /> },
  { href: "/personal/residentes", label: "Residentes", icon: <IconUsers /> },
  { href: "/personal/consultas", label: "Consultas", icon: <IconChat /> },
  { href: "/personal/reuniones", label: "Reuniones", icon: <IconCalendar /> },
  { href: "/personal/visitas", label: "Visitas", icon: <IconDoor /> },
];

export default function PersonalLayout({ children }: { children: React.ReactNode }) {
  return (
    <AppShell
      navItems={nav}
      rolLabel="Personal de la residencia"
      rolTone="magenta"
      userName="Laura Benitez"
      userSub="Enfermeria · Comunicacion con familias"
    >
      {children}
    </AppShell>
  );
}
