"use client";

import Link from "next/link";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";

export function AdminCategoriesList() {
  const categories = useQuery(api.categories.list);
  const removeCategory = useMutation(api.categories.remove);

  if (categories === undefined) {
    return (
      <div className="rounded-2xl bg-white p-8 shadow-sm">
        <p className="text-sm text-text-muted">Se încarcă categoriile...</p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl bg-white p-8 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-brand-navy">Categorii</h1>
          <p className="mt-1 text-sm text-brand-navy/70">
            {categories.length} categorii
          </p>
        </div>
        <Link
          href="/admin/categorii/nou"
          className="rounded-full bg-brand-navy px-4 py-2 text-sm font-medium text-white hover:bg-brand-navy/90"
        >
          Adaugă categorie
        </Link>
      </div>

      {categories.length === 0 ? (
        <p className="mt-8 text-sm text-text-muted">Nicio categorie încă.</p>
      ) : (
        <div className="mt-6 space-y-3">
          {categories.map((category) => (
            <div
              key={category._id}
              className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-border-card px-4 py-3"
            >
              <div>
                <p className="font-medium text-brand-navy">{category.name}</p>
                {category.description && (
                  <p className="text-sm text-text-muted">{category.description}</p>
                )}
              </div>
              <div className="flex gap-3 text-sm">
                <Link
                  href={`/admin/categorii/${category._id}/edit`}
                  className="text-brand-gold hover:underline"
                >
                  Editează
                </Link>
                <button
                  type="button"
                  className="text-red-600 hover:underline"
                  onClick={async () => {
                    if (
                      !confirm(
                        `Ștergi categoria „${category.name}”? Această acțiune este ireversibilă.`,
                      )
                    ) {
                      return;
                    }
                    try {
                      await removeCategory({ id: category._id });
                    } catch (err) {
                      alert(
                        err instanceof Error ? err.message : "Nu s-a putut șterge.",
                      );
                    }
                  }}
                >
                  Șterge
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
