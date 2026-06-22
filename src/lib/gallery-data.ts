export type GalleryImage = {
  id: string;
  src: string;
  alt: string;
  objectPosition?: string;
};

/** Static gallery — future: sync from admin product uploads (PDP-01). */
export const galleryImages: GalleryImage[] = [
  {
    id: "1",
    src: "/images/home/categories.jpg",
    alt: "Tort artizanal cu decor floral",
    objectPosition: "center",
  },
  {
    id: "2",
    src: "/images/home/categories.jpg",
    alt: "Croissant cu fistic",
    objectPosition: "0% 0%",
  },
  {
    id: "3",
    src: "/images/home/categories.jpg",
    alt: "Tarte cu fructe de sezon",
    objectPosition: "100% 0%",
  },
  {
    id: "4",
    src: "/images/home/kitchen.jpg",
    alt: "Laboratorul nostru",
    objectPosition: "center",
  },
  {
    id: "5",
    src: "/images/home/categories.jpg",
    alt: "Choux cu vanilie",
    objectPosition: "66% 0%",
  },
  {
    id: "6",
    src: "/images/home/categories.jpg",
    alt: "Cozonac tradițional",
    objectPosition: "33% 0%",
  },
];
