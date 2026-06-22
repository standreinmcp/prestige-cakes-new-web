import type { ProductCardData } from "@/components/catalog/ProductCard";
import { vitrinaProducts } from "./catalog-data";

export type ProductDetailData = ProductCardData & {
  longDescription: string;
  pricePerKg: number;
  nutrition: {
    calories: string;
    protein: string;
    carbs: string;
    fat: string;
  };
};

const productDetails: Record<string, ProductDetailData> = {
  "tarte-cu-fructe": {
    slug: "tarte-cu-fructe",
    name: "Tarte cu fructe",
    description: "Tarte artizanale cu fructe proaspete de...",
    portion: "70 g / o bucată.",
    priceLabel: "140 lei / kg",
    pricePerKg: 140,
    imagePosition: "100% 0%",
    longDescription:
      "Aluat fraged preparat manual, fără conservanți sau aditivi artificiali, copt la perfecțiune pentru a obține o textură crocantă pe exterior și fină în interior. Crema premium este realizată cu ouă proaspete de la fermieri locali selectați.",
    nutrition: {
      calories: "320",
      protein: "4.5",
      carbs: "42",
      fat: "15",
    },
  },
  "croissant-cu-fistic": {
    slug: "croissant-cu-fistic",
    name: "Croissant cu fistic",
    description: "Croissant franțuzesc cu fistic proaspăt...",
    portion: "70 g / o bucată.",
    priceLabel: "85 lei / kg",
    pricePerKg: 85,
    imagePosition: "0% 0%",
    longDescription:
      "Croissant franțuzesc cu fistic proaspăt, preparat zilnic din unt premium și foițe coapte manual pentru o textură aerată și crocantă.",
    nutrition: {
      calories: "410",
      protein: "7.2",
      carbs: "38",
      fat: "22",
    },
  },
  "cozonac-cu-ciocolata": {
    slug: "cozonac-cu-ciocolata",
    name: "Cozonac cu cicolată",
    description: "Cozonac cu nucă și cacao, rețetă...",
    portion: "500 g / o bucată.",
    priceLabel: "75 lei / kg",
    pricePerKg: 75,
    imagePosition: "33% 0%",
    longDescription:
      "Cozonac cu nucă și cacao, rețetă tradițională reinterpretată cu ingrediente premium și umplutură generoasă.",
    nutrition: {
      calories: "380",
      protein: "8.1",
      carbs: "48",
      fat: "14",
    },
  },
  "choux-cu-vanilie": {
    slug: "choux-cu-vanilie",
    name: "Choux cu vanilie",
    description: "Choux umplut cu cremă de vanilie naturală...",
    portion: "250 g.",
    priceLabel: "110 lei / kg",
    pricePerKg: 110,
    imagePosition: "66% 0%",
    longDescription:
      "Choux umplut cu cremă de vanilie naturală, glazurat delicat și finisat cu atenție la detalii.",
    nutrition: {
      calories: "290",
      protein: "5.8",
      carbs: "34",
      fat: "12",
    },
  },
};

export function getProductBySlug(slug: string): ProductDetailData | undefined {
  const baseSlug = slug.replace(/-\d+$/, "");
  return productDetails[slug] ?? productDetails[baseSlug];
}

export const similarProducts = vitrinaProducts.slice(0, 4);
