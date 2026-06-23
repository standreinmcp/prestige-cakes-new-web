import { CatalogHero } from "@/components/catalog/CatalogHero";
import { ProduseLaComandaClient } from "@/components/catalog/ProduseLaComandaClient";

export default function ProduseLaComandaPage() {
  return (
    <>
      <CatalogHero
        title="Produsele noastere artizanale, create cu rafinament"
        subtitle="Torturi și deserturi personalizate, pregătite în 1–2 zile lucrătoare după confirmarea comenzii."
      />
      <ProduseLaComandaClient />
    </>
  );
}
