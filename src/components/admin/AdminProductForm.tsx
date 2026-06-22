"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import type { Id } from "../../../convex/_generated/dataModel";
import { AdminField, adminInputClass, adminTextareaClass } from "./AdminField";

type ProductFormProps = {
  productId?: string;
};

export function AdminProductForm({ productId }: ProductFormProps) {
  const router = useRouter();
  const categories = useQuery(api.categories.list);
  const existing = useQuery(
    api.products.getById,
    productId ? { id: productId as Id<"products"> } : "skip",
  );
  const createProduct = useMutation(api.products.create);
  const updateProduct = useMutation(api.products.update);

  const [name, setName] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [isMadeToOrder, setIsMadeToOrder] = useState(false);
  const [isAvailable, setIsAvailable] = useState(true);
  const [stockQuantity, setStockQuantity] = useState("10");
  const [imageUrl, setImageUrl] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!existing) return;
    setName(existing.name);
    setCategoryId(existing.categoryId);
    setDescription(existing.description ?? "");
    setPrice(String(existing.price));
    setIsMadeToOrder(existing.isMadeToOrder);
    setIsAvailable(existing.isAvailable);
    setStockQuantity(String(existing.stockQuantity ?? 0));
    setImageUrl(existing.imageUrl ?? "");
  }, [existing]);

  useEffect(() => {
    if (!categoryId && categories?.[0]) {
      setCategoryId(categories[0]._id);
    }
  }, [categories, categoryId]);

  if (categories === undefined || (productId && existing === undefined)) {
    return (
      <div className="rounded-2xl bg-white p-8 shadow-sm">
        <p className="text-sm text-text-muted">Se încarcă formularul...</p>
      </div>
    );
  }

  if (productId && existing === null) {
    return (
      <div className="rounded-2xl bg-white p-8 shadow-sm">
        <p className="text-brand-navy">Produsul nu a fost găsit.</p>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSaving(true);

    const payload = {
      name: name.trim(),
      categoryId: categoryId as Id<"categories">,
      description: description.trim() || undefined,
      price: Number(price),
      isAvailable,
      isMadeToOrder,
      stockQuantity: isMadeToOrder ? undefined : Number(stockQuantity),
      imageUrl: imageUrl.trim() || undefined,
    };

    try {
      if (productId) {
        await updateProduct({ id: productId as Id<"products">, ...payload });
      } else {
        await createProduct(payload);
      }
      router.push("/admin/produse");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Eroare la salvare.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="rounded-2xl bg-white p-8 shadow-sm">
      <Link href="/admin/produse" className="text-sm text-brand-gold hover:underline">
        ← Produse
      </Link>
      <h1 className="mt-2 text-2xl font-semibold text-brand-navy">
        {productId ? "Editează produs" : "Adaugă produs"}
      </h1>

      {categories.length === 0 && (
        <p className="mt-4 text-sm text-red-600">
          Adaugă mai întâi o categorie înainte de a crea produse.
        </p>
      )}

      <form onSubmit={handleSubmit} className="mt-8 max-w-xl space-y-5">
        <AdminField label="Nume *">
          <input
            className={adminInputClass}
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </AdminField>

        <AdminField label="Categorie *">
          <select
            className={adminInputClass}
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            required
          >
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))}
          </select>
        </AdminField>

        <AdminField label="Descriere">
          <textarea
            className={adminTextareaClass}
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </AdminField>

        <AdminField label="Preț (lei) *">
          <input
            type="number"
            min="0"
            step="0.01"
            className={adminInputClass}
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </AdminField>

        <AdminField label="Tip produs *">
          <select
            className={adminInputClass}
            value={isMadeToOrder ? "made_to_order" : "live"}
            onChange={(e) => setIsMadeToOrder(e.target.value === "made_to_order")}
          >
            <option value="live">Vitrină Live</option>
            <option value="made_to_order">Produse la comandă</option>
          </select>
        </AdminField>

        {!isMadeToOrder && (
          <AdminField label="Stoc *">
            <input
              type="number"
              min="0"
              className={adminInputClass}
              value={stockQuantity}
              onChange={(e) => setStockQuantity(e.target.value)}
              required
            />
          </AdminField>
        )}

        <AdminField label="URL imagine (galerie)">
          <input
            className={adminInputClass}
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="/images/home/categories.jpg"
          />
        </AdminField>

        <label className="flex items-center gap-2 text-sm text-brand-navy">
          <input
            type="checkbox"
            checked={isAvailable}
            onChange={(e) => setIsAvailable(e.target.checked)}
            className="h-4 w-4 accent-brand-gold"
          />
          Activ (vizibil în magazin)
        </label>

        {error && <p className="text-sm text-red-600">{error}</p>}

        <button
          type="submit"
          disabled={saving || categories.length === 0}
          className="rounded-full bg-brand-gold px-6 py-2.5 text-sm font-medium text-brand-navy hover:bg-brand-gold/90 disabled:opacity-50"
        >
          {saving
            ? "Se salvează..."
            : productId
              ? "Salvează schimbările"
              : "Adaugă produs"}
        </button>
      </form>
    </div>
  );
}
