import { CatalogPage } from "@/components/catalog/CatalogPage";
import { vitrinaProducts } from "@/lib/catalog-data";

export default function VitrinaLivePage() {
  return (
    <CatalogPage
      title="Produsele noastere artizanale, create cu rafinament"
      subtitle="Prăjituri proaspete, realizate zilnic din ingrediente atent alese."
      products={vitrinaProducts}
    />
  );
}
