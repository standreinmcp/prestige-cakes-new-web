"use client";

import Link from "next/link";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";

function StatCard({
  title,
  value,
  href,
}: {
  title: string;
  value: string | number;
  href?: string;
}) {
  const content = (
    <div className="rounded-2xl border border-border-card bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
      <p className="text-sm text-text-muted">{title}</p>
      <p className="mt-2 font-serif text-3xl font-semibold text-brand-navy">
        {value}
      </p>
    </div>
  );

  if (href) {
    return <Link href={href}>{content}</Link>;
  }
  return content;
}

export function AdminDashboard() {
  const stats = useQuery(api.admin.dashboardStats);

  if (stats === undefined) {
    return (
      <div className="rounded-2xl bg-white p-8 shadow-sm">
        <p className="text-sm text-text-muted">Se încarcă statisticile...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-brand-navy">Dashboard</h1>
          <p className="mt-1 text-sm text-brand-navy/70">
            Privire de ansamblu asupra comenzilor și produselor.
          </p>
        </div>
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-medium text-brand-gold hover:underline"
        >
          Vezi site-ul public ↗
        </a>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Produse active" value={stats.activeProducts} href="/admin/produse" />
        <StatCard title="Comenzi noi" value={stats.newOrders} href="/admin/comenzi" />
        <StatCard title="Cel mai vândut" value={stats.bestSeller} />
        <StatCard title="Total comenzi" value={stats.totalOrders} />
      </div>

      <div className="rounded-2xl border border-border-card bg-white p-6 shadow-sm">
        <h2 className="font-serif text-xl font-semibold text-brand-navy">
          Top 5 produse
        </h2>
        {stats.topFive.length === 0 ? (
          <p className="mt-4 text-sm text-text-muted">Nicio vânzare încă.</p>
        ) : (
          <ol className="mt-4 space-y-2">
            {stats.topFive.map((item, index) => (
              <li
                key={item.name}
                className="flex items-center justify-between rounded-lg bg-neutral-soft px-4 py-2 text-sm"
              >
                <span className="text-brand-navy">
                  {index + 1}. {item.name}
                </span>
                <span className="text-text-muted">{item.units} buc.</span>
              </li>
            ))}
          </ol>
        )}
      </div>
    </div>
  );
}
