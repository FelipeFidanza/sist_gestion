import { AppShell, type NavItem } from "@/components/AppShell";
import { IconChat, IconGrid, IconUsers } from "@/components/icons";

const nav: NavItem[] = [
  { href: "/enfermeria", label: "Panel", icon: <IconGrid /> },
  { href: "/enfermeria/residentes", label: "Residentes", icon: <IconUsers /> },
  { href: "/enfermeria/consultas", label: "Consultas", icon: <IconChat /> },
];

export default function EnfermeriaLayout({ children }: { children: React.ReactNode }) {
  return (
    <AppShell
      navItems={nav}
      rolLabel="Enfermeria"
      rolTone="magenta"
      userName="Laura Benitez"
      userSub="Enfermeria"
    >
      {children}
    </AppShell>
  );
}
