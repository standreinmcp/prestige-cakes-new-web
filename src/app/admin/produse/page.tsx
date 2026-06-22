import Link from "next/link";

export default function AdminProdusePage() {
  return (
    <div className="rounded-2xl bg-white p-8 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-brand-navy">Produse</h1>
          <p className="mt-2 text-sm text-brand-navy/70">
            Gestionează catalogul de produse.
          </p>
        </div>
        <Link
          href="/admin/produse/nou"
          className="rounded-full bg-brand-navy px-4 py-2 text-sm font-medium text-white"
        >
          Adaugă produs
        </Link>
      </div>
    </div>
  );
}
