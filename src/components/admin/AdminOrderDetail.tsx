"use client";

import Link from "next/link";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import type { Id } from "../../../convex/_generated/dataModel";
import {
  ORDER_STATUS_LABELS,
  ORDER_STATUS_OPTIONS,
  type OrderStatus,
} from "@/lib/order-constants";
import { adminInputClass } from "./AdminField";

type AdminOrderDetailProps = {
  orderId: string;
};

export function AdminOrderDetail({ orderId }: AdminOrderDetailProps) {
  const order = useQuery(api.orders.getById, {
    id: orderId as Id<"orders">,
  });
  const updateStatus = useMutation(api.orders.updateStatus);

  if (order === undefined) {
    return (
      <div className="rounded-2xl bg-white p-8 shadow-sm">
        <p className="text-sm text-text-muted">Se încarcă comanda...</p>
      </div>
    );
  }

  if (order === null) {
    return (
      <div className="rounded-2xl bg-white p-8 shadow-sm">
        <p className="text-brand-navy">Comanda nu a fost găsită.</p>
        <Link href="/admin/comenzi" className="mt-4 inline-block text-brand-gold hover:underline">
          ← Înapoi la comenzi
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <Link href="/admin/comenzi" className="text-sm text-brand-gold hover:underline">
          ← Comenzi
        </Link>
        <h1 className="mt-2 text-2xl font-semibold text-brand-navy">
          Comanda {order.customerName}
        </h1>
        <p className="mt-1 text-sm text-text-muted">
          Status: {ORDER_STATUS_LABELS[order.status] ?? order.status}
        </p>
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <label className="text-sm text-brand-navy">Actualizează status:</label>
          <select
            className={adminInputClass}
            value={order.status}
            onChange={async (e) => {
              await updateStatus({
                id: order._id,
                status: e.target.value as OrderStatus,
              });
            }}
          >
            {ORDER_STATUS_OPTIONS.map((status) => (
              <option key={status} value={status}>
                {ORDER_STATUS_LABELS[status]}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="rounded-2xl bg-white p-6 shadow-sm">
        <h2 className="font-serif text-lg font-semibold text-brand-navy">Produse</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {order.items.map((item, index) => (
            <div
              key={`${item.productName}-${index}`}
              className="rounded-xl border border-border-card p-4"
            >
              <p className="font-medium text-brand-navy">{item.productName}</p>
              <p className="mt-1 text-sm text-text-muted">
                {item.quantity} × {item.unitPrice.toFixed(2)} lei
              </p>
            </div>
          ))}
        </div>
      </div>

      {order.subOrders && order.subOrders.length > 0 && (
        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <h2 className="font-serif text-lg font-semibold text-brand-navy">
            Sub-comenzi (split)
          </h2>
          <div className="mt-4 space-y-4">
            {order.subOrders.map((sub) => (
              <div
                key={sub.kind}
                className="rounded-xl border border-brand-gold/30 bg-brand-lilac/20 p-4"
              >
                <p className="font-medium text-brand-navy">
                  {sub.kind === "live" ? "Vitrină Live" : "Produse la comandă"}
                </p>
                <p className="text-sm text-text-muted">
                  Status: {ORDER_STATUS_LABELS[sub.status] ?? sub.status}
                </p>
                <select
                  className={`${adminInputClass} mt-2 max-w-xs`}
                  value={sub.status}
                  onChange={async (e) => {
                    await updateStatus({
                      id: order._id,
                      status: e.target.value as OrderStatus,
                      subOrderKind: sub.kind,
                    });
                  }}
                >
                  {ORDER_STATUS_OPTIONS.map((status) => (
                    <option key={status} value={status}>
                      {ORDER_STATUS_LABELS[status]}
                    </option>
                  ))}
                </select>
                <ul className="mt-2 text-sm text-brand-navy">
                  {sub.items.map((item, i) => (
                    <li key={i}>
                      {item.productName} × {item.quantity}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="rounded-2xl bg-white p-6 shadow-sm">
        <h2 className="font-serif text-lg font-semibold text-brand-navy">Client</h2>
        <dl className="mt-4 space-y-2 text-sm text-brand-navy">
          <div>Telefon: {order.phone}</div>
          <div>Email: {order.email}</div>
          {order.deliveryAddress && <div>Adresă: {order.deliveryAddress}</div>}
          {order.locality && <div>Localitate: {order.locality}</div>}
          <div>Total: {order.total.toFixed(2)} lei</div>
        </dl>
      </div>
    </div>
  );
}
