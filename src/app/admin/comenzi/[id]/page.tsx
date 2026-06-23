import dynamic from "next/dynamic";

const AdminOrderDetail = dynamic(
  () =>
    import("@/components/admin/AdminOrderDetail").then((mod) => mod.AdminOrderDetail),
  {
    loading: () => (
      <p className="text-sm text-text-muted">Se încarcă comanda...</p>
    ),
  },
);

type Props = {
  params: Promise<{ id: string }>;
};

export default async function AdminComandaDetailPage({ params }: Props) {
  const { id } = await params;
  return <AdminOrderDetail orderId={id} />;
}
