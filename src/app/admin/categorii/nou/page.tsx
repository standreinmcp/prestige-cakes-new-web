import dynamic from "next/dynamic";

const AdminCategoryForm = dynamic(
  () =>
    import("@/components/admin/AdminCategoryForm").then((mod) => mod.AdminCategoryForm),
  {
    loading: () => (
      <p className="text-sm text-text-muted">Se încarcă formularul...</p>
    ),
  },
);

export default function AdminCategorieNouPage() {
  return <AdminCategoryForm />;
}
