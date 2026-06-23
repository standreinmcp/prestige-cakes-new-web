import dynamic from "next/dynamic";

const AdminProductsList = dynamic(
  () =>
    import("@/components/admin/AdminProductsList").then(
      (mod) => mod.AdminProductsList,
    ),
  {
    loading: () => (
      <p className="text-sm text-text-muted">Se încarcă produsele...</p>
    ),
  },
);

export default function AdminProdusePage() {
  return <AdminProductsList />;
}
