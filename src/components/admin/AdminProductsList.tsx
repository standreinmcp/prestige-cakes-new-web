"use client";

import Link from "next/link";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import type { Id } from "../../../convex/_generated/dataModel";

export function AdminProductsList() {
  const products = useQuery(api.products.list);
  const categories = useQuery(api.categories.list);
  const removeProduct = useMutation(api.products.remove);

  const categoryName = (id: Id<"categories">) =>
    categories?.find((c) => c._id === id)?.name ?? "—";

  if (products === undefined || categories === undefined) {
    return (
      <div className="rounded-2xl bg-white p-8 shadow-sm">
        <p className="text-sm text-text-muted">Se încarcă produsele...</p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl bg-white p-8 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-brand-navy">Produse</h1>
          <p className="mt-1 text-sm text-brand-navy/70">
            {products.length} produse în catalog
          </p>
        </div>
        <Link
          href="/admin/produse/nou"
          className="rounded-full bg-brand-navy px-4 py-2 text-sm font-medium text-white hover:bg-brand-navy/90"
        >
          Adaugă produs
        </Link>
      </div>

      {products.length === 0 ? (
        <p className="mt-8 text-sm text-text-muted">
          Niciun produs. Rulează seed-ul Convex sau adaugă manual.
        </p>
      ) : (
        <div className="mt-6 overflow-x-auto">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead>
              <tr className="border-b border-border-card text-text-muted">
                <th className="py-3 pr-4 font-medium">Nume</th>
                <th className="py-3 pr-4 font-medium">Categorie</th>
                <th className="py-3 pr-4 font-medium">Tip</th>
                <th className="py-3 pr-4 font-medium">Preț</th>
                <th className="py-3 pr-4 font-medium">Stoc</th>
                <th className="py-3 pr-4 font-medium">Status</th>
                <th className="py-3 font-medium" />
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id} className="border-b border-border-card/60">
                  <td className="py-3 pr-4 font-medium text-brand-navy">
                    {product.name}
                  </td>
                  <td className="py-3 pr-4 text-text-muted">
                    {categoryName(product.categoryId)}
                  </td>
                  <td className="py-3 pr-4 text-text-muted">
                    {product.isMadeToOrder ? "La comandă" : "Vitrină"}
                  </td>
                  <td className="py-3 pr-4 text-brand-navy">
                    {product.price.toFixed(2)} lei
                  </td>
                  <td className="py-3 pr-4 text-text-muted">
                    {product.isMadeToOrder
                      ? "—"
                      : (product.stockQuantity ?? 0)}
                  </td>
                  <td className="py-3 pr-4">
                    <span
                      className={`rounded-full px-2 py-1 text-xs font-medium ${
                        product.isAvailable
                          ? "bg-green-100 text-green-800"
                          : "bg-neutral-200 text-neutral-600"
                      }`}
                    >
                      {product.isAvailable ? "Activ" : "Inactiv"}
                    </span>
                  </td>
                  <td className="py-3 text-right">
                    <Link
                      href={`/admin/produse/${product._id}/edit`}
                      className="mr-3 text-brand-gold hover:underline"
                    >
                      Editează
                    </Link>
                    <button
                      type="button"
                      className="text-red-600 hover:underline"
                      onClick={async () => {
                        if (
                          !confirm(
                            `Ștergi produsul „${product.name}”? Această acțiune este ireversibilă.`,
                          )
                        ) {
                          return;
                        }
                        await removeProduct({ id: product._id });
                      }}
                    >
                      Șterge
                    </button>
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
