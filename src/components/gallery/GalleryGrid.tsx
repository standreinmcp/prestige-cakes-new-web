"use client";

import Image from "next/image";
import { useMemo } from "react";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { galleryImages } from "@/lib/gallery-data";

export function GalleryGrid() {
  const convexImages = useQuery(api.products.listGallery);

  const images = useMemo(() => {
    if (convexImages === undefined) return undefined;
    if (convexImages.length > 0) return convexImages;
    return galleryImages;
  }, [convexImages]);

  if (images === undefined) {
    return (
      <section className="bg-white px-6 py-12 lg:px-12">
        <p className="text-center text-text-muted">Se încarcă galeria...</p>
      </section>
    );
  }

  return (
    <section className="bg-white px-6 py-12 lg:px-12">
      <div className="mx-auto grid max-w-[1200px] gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {images.map((image) => (
          <figure
            key={image.id}
            className="group relative aspect-[4/3] overflow-hidden rounded-2xl shadow-[0_8px_20px_rgba(0,0,0,0.08)]"
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              style={{ objectPosition: image.objectPosition ?? "center" }}
              sizes="(max-width: 768px) 100vw, 33vw"
            />
            <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-brand-navy/80 to-transparent px-4 py-3 text-sm font-medium text-white opacity-0 transition-opacity group-hover:opacity-100">
              {image.alt}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
