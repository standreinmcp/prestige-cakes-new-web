import { VitrinaCatalog } from "@/components/catalog/VitrinaCatalog";
import { vitrinaProducts } from "@/lib/catalog-data";

export default function VitrinaLivePage() {
  return <VitrinaCatalog products={vitrinaProducts} />;
}
