import dynamic from "next/dynamic";

const AdminCategoriesList = dynamic(
  () =>
    import("@/components/admin/AdminCategoriesList").then(
      (mod) => mod.AdminCategoriesList,
    ),
  {
    loading: () => (
      <p className="text-sm text-text-muted">Se încarcă categoriile...</p>
    ),
  },
);

export default function AdminCategoriiPage() {
  return <AdminCategoriesList />;
}
