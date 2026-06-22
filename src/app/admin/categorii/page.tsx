import Link from "next/link";

export default function AdminCategoriiPage() {
  return (
    <div className="rounded-2xl bg-white p-8 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-brand-navy">Categorii</h1>
          <p className="mt-2 text-sm text-brand-navy/70">
            Gestionează categoriile de produse.
          </p>
        </div>
        <Link
          href="/admin/categorii/nou"
          className="rounded-full bg-brand-navy px-4 py-2 text-sm font-medium text-white"
        >
          Adaugă categorie
        </Link>
      </div>
    </div>
  );
}
