import { CatalogPage } from "@/components/catalog/CatalogPage";
import { madeToOrderProducts } from "@/lib/catalog-data";

export default function ProduseLaComandaPage() {
  return (
    <CatalogPage
      title="Produsele noastere artizanale, create cu rafinament"
      subtitle="Torturi și deserturi personalizate, pregătite în 1–2 zile lucrătoare după confirmarea comenzii."
      products={madeToOrderProducts}
    />
  );
}
