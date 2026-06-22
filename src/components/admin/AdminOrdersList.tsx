"use client";

import Link from "next/link";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { ORDER_STATUS_LABELS } from "@/lib/order-constants";

function formatDate(timestamp: number) {
  return new Date(timestamp).toLocaleDateString("ro-RO", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function AdminOrdersList() {
  const orders = useQuery(api.orders.list);

  if (orders === undefined) {
    return (
      <div className="rounded-2xl bg-white p-8 shadow-sm">
        <p className="text-sm text-text-muted">Se încarcă comenzile...</p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl bg-white p-8 shadow-sm">
      <h1 className="text-2xl font-semibold text-brand-navy">Comenzi</h1>
      <p className="mt-1 text-sm text-brand-navy/70">
        {orders.length} comenzi în total
      </p>

      {orders.length === 0 ? (
        <p className="mt-8 text-sm text-text-muted">
          Nu există comenzi încă. Plasează o comandă din checkout pentru a testa.
        </p>
      ) : (
        <div className="mt-6 overflow-x-auto">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead>
              <tr className="border-b border-border-card text-text-muted">
                <th className="py-3 pr-4 font-medium">Client</th>
                <th className="py-3 pr-4 font-medium">Data</th>
                <th className="py-3 pr-4 font-medium">Total</th>
                <th className="py-3 pr-4 font-medium">Status</th>
                <th className="py-3 font-medium" />
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id} className="border-b border-border-card/60">
                  <td className="py-3 pr-4 text-brand-navy">{order.customerName}</td>
                  <td className="py-3 pr-4 text-text-muted">
                    {formatDate(order.createdAt)}
                  </td>
                  <td className="py-3 pr-4 text-brand-navy">
                    {order.total.toFixed(2)} lei
                  </td>
                  <td className="py-3 pr-4">
                    <span className="rounded-full bg-brand-lilac/40 px-2 py-1 text-xs font-medium text-brand-navy">
                      {ORDER_STATUS_LABELS[order.status] ?? order.status}
                    </span>
                  </td>
                  <td className="py-3 text-right">
                    <Link
                      href={`/admin/comenzi/${order._id}`}
                      className="text-brand-gold hover:underline"
                    >
                      Detalii
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
