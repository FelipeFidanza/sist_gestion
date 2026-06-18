import { AppShell, type NavItem } from "@/components/AppShell";
import { IconDoor, IconGrid } from "@/components/icons";

const nav: NavItem[] = [
  { href: "/administracion", label: "Panel", icon: <IconGrid /> },
  { href: "/administracion/visitas", label: "Visitas", icon: <IconDoor /> },
];

export default function AdministracionLayout({ children }: { children: React.ReactNode }) {
  return (
    <AppShell
      navItems={nav}
      rolLabel="Administracion"
      rolTone="lima"
      userName="Sofia Aguirre"
      userSub="Administracion · Recepcion"
    >
      {children}
    </AppShell>
  );
}
