import { CatalogHero } from "@/components/catalog/CatalogHero";
import { VitrinaLiveClient } from "@/components/catalog/VitrinaLiveClient";

export default function VitrinaLivePage() {
  return (
    <>
      <CatalogHero
        title="Produsele noastre artizanale, create cu rafinament"
        subtitle="Prăjituri proaspete, realizate zilnic din ingrediente atent alese. Disponibile azi — stoc limitat."
      />
      <VitrinaLiveClient />
    </>
  );
}
