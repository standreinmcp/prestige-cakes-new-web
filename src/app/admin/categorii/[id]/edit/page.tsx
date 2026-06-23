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

type Props = {
  params: Promise<{ id: string }>;
};

export default async function AdminCategorieEditPage({ params }: Props) {
  const { id } = await params;
  return <AdminCategoryForm categoryId={id} />;
}
