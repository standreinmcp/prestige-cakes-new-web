import { CatalogPage } from "@/components/catalog/CatalogPage";
import { madeToOrderProducts } from "@/lib/catalog-data";

export default function ProduseLaComandaPage() {
  return (
    <CatalogPage
      title="Produsele noastere artizanale, create cu rafinament"
      subtitle="Prăjituri proaspete, realizate la comandă din ingrediente atent alese."
      products={madeToOrderProducts}
    />
  );
}
