import { AdminOrderDetail } from "@/components/admin/AdminOrderDetail";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function AdminComandaDetailPage({ params }: Props) {
  const { id } = await params;
  return <AdminOrderDetail orderId={id} />;
}
