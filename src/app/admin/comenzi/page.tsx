import dynamic from "next/dynamic";

const AdminOrdersList = dynamic(
  () =>
    import("@/components/admin/AdminOrdersList").then((mod) => mod.AdminOrdersList),
  {
    loading: () => (
      <p className="text-sm text-text-muted">Se încarcă comenzile...</p>
    ),
  },
);

export default function AdminComenziPage() {
  return <AdminOrdersList />;
}
