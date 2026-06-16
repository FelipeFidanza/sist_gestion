"use client";

import { Logo } from "@/components/Logo";
import { Avatar } from "@/components/ui";
import { IconBell, IconLogout } from "@/components/icons";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, type ReactNode } from "react";

export interface NavItem {
  href: string;
  label: string;
  icon: ReactNode;
}

interface AppShellProps {
  navItems: NavItem[];
  rolLabel: string;
  rolTone: "verde" | "magenta";
  userName: string;
  userSub: string;
  children: ReactNode;
}

export function AppShell({
  navItems,
  rolLabel,
  rolTone,
  userName,
  userSub,
  children,
}: AppShellProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) =>
    href === pathname || (href !== "/familiar" && href !== "/personal" && pathname.startsWith(href));

  const navContent = (
    <nav className="flex flex-1 flex-col gap-1 px-3">
      {navItems.map((item) => {
        const active = isActive(item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={() => setOpen(false)}
            className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
              active
                ? "bg-verde-50 text-verde-700"
                : "text-carbon-500 hover:bg-carbon-50 hover:text-carbon-800"
            }`}
          >
            <span className={active ? "text-verde-600" : "text-carbon-400"}>{item.icon}</span>
            {item.label}
          </Link>
        );
      })}
    </nav>
  );

  return (
    <div className="min-h-screen bg-[var(--background)]">
      {/* Sidebar de escritorio */}
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 flex-col border-r border-carbon-200/70 bg-white lg:flex">
        <div className="flex h-16 items-center border-b border-carbon-200/70 px-5">
          <Logo size={34} />
        </div>
        <div className="mt-4 flex flex-1 flex-col">
          <RolTag rolLabel={rolLabel} rolTone={rolTone} />
          {navContent}
        </div>
        <SidebarFooter userName={userName} userSub={userSub} rolTone={rolTone} />
      </aside>

      {/* Drawer mobile */}
      {open && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="absolute inset-0 bg-carbon-900/40" onClick={() => setOpen(false)} />
          <aside className="absolute inset-y-0 left-0 flex w-72 flex-col bg-white">
            <div className="flex h-16 items-center justify-between border-b border-carbon-200/70 px-5">
              <Logo size={32} />
              <button onClick={() => setOpen(false)} className="text-carbon-400">
                ✕
              </button>
            </div>
            <div className="mt-4 flex flex-1 flex-col">
              <RolTag rolLabel={rolLabel} rolTone={rolTone} />
              {navContent}
            </div>
            <SidebarFooter userName={userName} userSub={userSub} rolTone={rolTone} />
          </aside>
        </div>
      )}

      {/* Contenido */}
      <div className="lg:pl-64">
        <header className="sticky top-0 z-20 flex h-16 items-center justify-between gap-4 border-b border-carbon-200/70 bg-white/85 px-4 backdrop-blur sm:px-6">
          <div className="flex items-center gap-3">
            <button
              className="rounded-lg p-2 text-carbon-500 hover:bg-carbon-50 lg:hidden"
              onClick={() => setOpen(true)}
              aria-label="Abrir menu"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" />
              </svg>
            </button>
            <span className="text-sm font-medium text-carbon-400">
              SGIF · Sistema de Gestion de Interaccion con Familiares
            </span>
          </div>
          <div className="flex items-center gap-3">
            <button className="relative rounded-lg p-2 text-carbon-500 hover:bg-carbon-50" aria-label="Notificaciones">
              <IconBell />
              <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-magenta-500" />
            </button>
            <div className="flex items-center gap-2.5">
              <Avatar nombre={userName} tone={rolTone} size={36} />
              <div className="hidden leading-tight sm:block">
                <p className="text-sm font-600 text-carbon-800">{userName}</p>
                <p className="text-xs text-carbon-400">{userSub}</p>
              </div>
            </div>
          </div>
        </header>

        <main className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-8">{children}</main>
      </div>
    </div>
  );
}

function RolTag({ rolLabel, rolTone }: { rolLabel: string; rolTone: "verde" | "magenta" }) {
  const tone =
    rolTone === "magenta"
      ? "border-magenta-200 bg-magenta-50 text-magenta-700"
      : "border-verde-200 bg-verde-50 text-verde-700";
  return (
    <div className="px-5 pb-3">
      <span className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-600 ${tone}`}>
        <span className="h-1.5 w-1.5 rounded-full bg-current" />
        {rolLabel}
      </span>
    </div>
  );
}

function SidebarFooter({
  userName,
  userSub,
  rolTone,
}: {
  userName: string;
  userSub: string;
  rolTone: "verde" | "magenta";
}) {
  return (
    <div className="border-t border-carbon-200/70 p-3">
      <div className="flex items-center gap-3 rounded-xl px-2 py-2">
        <Avatar nombre={userName} tone={rolTone} size={38} />
        <div className="min-w-0 flex-1 leading-tight">
          <p className="truncate text-sm font-600 text-carbon-800">{userName}</p>
          <p className="truncate text-xs text-carbon-400">{userSub}</p>
        </div>
      </div>
      <Link
        href="/"
        className="mt-1 flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-carbon-500 transition-colors hover:bg-carbon-50 hover:text-carbon-800"
      >
        <IconLogout className="h-5 w-5 text-carbon-400" />
        Cerrar sesion
      </Link>
    </div>
  );
}
