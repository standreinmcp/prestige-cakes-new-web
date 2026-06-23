import dynamic from "next/dynamic";

const AdminDashboard = dynamic(
  () =>
    import("@/components/admin/AdminDashboard").then((mod) => mod.AdminDashboard),
  {
    loading: () => (
      <p className="text-sm text-text-muted">Se încarcă dashboard-ul...</p>
    ),
  },
);

export default function AdminDashboardPage() {
  return <AdminDashboard />;
}
