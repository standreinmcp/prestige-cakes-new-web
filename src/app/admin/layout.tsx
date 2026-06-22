"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AdminLogoutButton } from "@/components/admin/AdminLogoutButton";

const adminNav = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/comenzi", label: "Comenzi" },
  { href: "/admin/produse", label: "Produse" },
  { href: "/admin/categorii", label: "Categorii" },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  return (
    <div className="flex min-h-screen">
      <aside className="w-64 shrink-0 border-r border-neutral-muted bg-brand-navy p-6 text-white">
        <Link href="/admin" className="text-lg font-semibold">
          Prestige Admin
        </Link>
        <nav className="mt-8 space-y-2" aria-label="Administrare">
          {adminNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block rounded-lg px-3 py-2 text-sm text-white/80 hover:bg-white/10 hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <AdminLogoutButton />
      </aside>
      <main className="flex-1 bg-neutral-soft p-8">{children}</main>
    </div>
  );
}
