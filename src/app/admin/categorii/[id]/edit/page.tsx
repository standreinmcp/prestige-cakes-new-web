import { AdminCategoryForm } from "@/components/admin/AdminCategoryForm";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function AdminCategorieEditPage({ params }: Props) {
  const { id } = await params;
  return <AdminCategoryForm categoryId={id} />;
}
