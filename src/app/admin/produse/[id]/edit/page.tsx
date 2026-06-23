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

type Props = {
  params: Promise<{ id: string }>;
};

export default async function AdminProdusEditPage({ params }: Props) {
  const { id } = await params;
  return <AdminProductForm productId={id} />;
}
