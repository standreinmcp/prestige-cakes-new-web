import { notFound } from "next/navigation";
import { ProductDetailView } from "@/components/catalog/ProductDetailView";
import { getProductBySlug, similarProducts } from "@/lib/product-data";

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return <ProductDetailView product={product} similar={similarProducts} />;
}
