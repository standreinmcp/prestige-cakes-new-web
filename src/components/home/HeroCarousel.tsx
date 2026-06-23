"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const heroImages = [
  { src: "/images/home/hero.jpg", alt: "Deserturi artizanale Prestige Cakes" },
  { src: "/images/home/kitchen.jpg", alt: "Laboratorul Prestige Cakes" },
  { src: "/images/home/categories.jpg", alt: "Selecție de prăjituri" },
];

export function HeroCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [loadedIndices, setLoadedIndices] = useState<Set<number>>(
    () => new Set([0]),
  );

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveIndex((i) => (i + 1) % heroImages.length);
    }, 5000);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    setLoadedIndices((prev) => {
      const next = new Set(prev);
      next.add(activeIndex);
      next.add((activeIndex + 1) % heroImages.length);
      return next;
    });
  }, [activeIndex]);

  return (
    <div className="absolute inset-0">
      {heroImages.map((image, index) => {
        if (!loadedIndices.has(index)) return null;
        const isActive = index === activeIndex;
        return (
          <Image
            key={image.src}
            src={image.src}
            alt={image.alt}
            fill
            priority={index === 0}
            fetchPriority={index === 0 ? "high" : "auto"}
            className={`object-cover transition-opacity duration-1000 ${
              isActive ? "opacity-100" : "pointer-events-none opacity-0"
            }`}
            sizes="(max-width: 768px) 100vw, 1440px"
          />
        );
      })}
    </div>
  );
}
