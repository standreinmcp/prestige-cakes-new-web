import dynamic from "next/dynamic";

const AdminProductForm = dynamic(
  () =>
    import("@/components/admin/AdminProductForm").then((mod) => mod.AdminProductForm),
  {
    loading: () => (
      <p className="text-sm text-text-muted">Se încarcă formularul...</p>
    ),
  },
);

export default function AdminProdusNouPage() {
  return <AdminProductForm />;
}
