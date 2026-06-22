import { CatalogPage } from "@/components/catalog/CatalogPage";
import { vitrinaProducts } from "@/lib/catalog-data";
import { filterAvailableLiveProducts } from "@/lib/catalog-utils";

export default function VitrinaLivePage() {
  return (
    <CatalogPage
      title="Produsele noastere artizanale, create cu rafinament"
      subtitle="Prăjituri proaspete, realizate zilnic din ingrediente atent alese. Disponibile azi — stoc limitat."
      products={filterAvailableLiveProducts(vitrinaProducts)}
    />
  );
}
