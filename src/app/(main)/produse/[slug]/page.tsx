import { PageHeader } from "@/components/layout/PageHeader";

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;

  return (
    <PageHeader
      title="Pagina produsului"
      description={`Produs: ${slug.replace(/-/g, " ")}`}
    />
  );
}
