"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import type { Id } from "../../../convex/_generated/dataModel";
import { AdminField, adminInputClass, adminTextareaClass } from "./AdminField";

type CategoryFormProps = {
  categoryId?: string;
};

export function AdminCategoryForm({ categoryId }: CategoryFormProps) {
  const router = useRouter();
  const existing = useQuery(
    api.categories.getById,
    categoryId ? { id: categoryId as Id<"categories"> } : "skip",
  );
  const categories = useQuery(api.categories.list);
  const createCategory = useMutation(api.categories.create);
  const updateCategory = useMutation(api.categories.update);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [sortOrder, setSortOrder] = useState("1");
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!existing) return;
    setName(existing.name);
    setDescription(existing.description ?? "");
    setSortOrder(String(existing.sortOrder));
  }, [existing]);

  useEffect(() => {
    if (!categoryId && categories) {
      setSortOrder(String(categories.length + 1));
    }
  }, [categories, categoryId]);

  if (categoryId && existing === undefined) {
    return (
      <div className="rounded-2xl bg-white p-8 shadow-sm">
        <p className="text-sm text-text-muted">Se încarcă formularul...</p>
      </div>
    );
  }

  if (categoryId && existing === null) {
    return (
      <div className="rounded-2xl bg-white p-8 shadow-sm">
        <p className="text-brand-navy">Categoria nu a fost găsită.</p>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSaving(true);

    try {
      if (categoryId) {
        await updateCategory({
          id: categoryId as Id<"categories">,
          name: name.trim(),
          description: description.trim() || undefined,
          sortOrder: Number(sortOrder),
        });
      } else {
        await createCategory({
          name: name.trim(),
          description: description.trim() || undefined,
          sortOrder: Number(sortOrder),
        });
      }
      router.push("/admin/categorii");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Eroare la salvare.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="rounded-2xl bg-white p-8 shadow-sm">
      <Link href="/admin/categorii" className="text-sm text-brand-gold hover:underline">
        ← Categorii
      </Link>
      <h1 className="mt-2 text-2xl font-semibold text-brand-navy">
        {categoryId ? "Editează categorie" : "Adaugă categorie"}
      </h1>

      <form onSubmit={handleSubmit} className="mt-8 max-w-xl space-y-5">
        <AdminField label="Nume *">
          <input
            className={adminInputClass}
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </AdminField>

        <AdminField label="Descriere">
          <textarea
            className={adminTextareaClass}
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </AdminField>

        <AdminField label="Ordine sortare">
          <input
            type="number"
            min="1"
            className={adminInputClass}
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          />
        </AdminField>

        {error && <p className="text-sm text-red-600">{error}</p>}

        <button
          type="submit"
          disabled={saving}
          className="rounded-full bg-brand-gold px-6 py-2.5 text-sm font-medium text-brand-navy hover:bg-brand-gold/90 disabled:opacity-50"
        >
          {saving
            ? "Se salvează..."
            : categoryId
              ? "Salvează schimbările"
              : "Adaugă categorie"}
        </button>
      </form>
    </div>
  );
}
