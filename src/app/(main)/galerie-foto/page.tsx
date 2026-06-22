import { GalleryGrid } from "@/components/gallery/GalleryGrid";

export default function GalerieFotoPage() {
  return (
    <>
      <section className="bg-gradient-to-b from-[#fcfcff] to-white px-6 py-16 lg:px-12">
        <div className="mx-auto max-w-[984px] text-center">
          <h1 className="font-serif text-4xl font-semibold text-brand-navy">
            Galerie foto
          </h1>
          <p className="mt-3 text-lg text-text-muted">
            Descoperă creațiile noastre și inspirația din laborator.
          </p>
        </div>
      </section>
      <GalleryGrid />
    </>
  );
}
