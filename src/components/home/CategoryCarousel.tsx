import Link from "next/link";

const categories = [
  {
    slug: "croissante",
    name: "Croissante",
    description:
      "Croissante proaspete, coapte zilnic, cu unt premium și foițe perfecte.",
    image:
      "https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=600&q=80",
  },
  {
    slug: "cozonaci",
    name: "Cozonaci",
    description:
      "Cozonaci tradiționali, umpluți generos, preparați după rețete proprii.",
    image:
      "https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?auto=format&fit=crop&w=600&q=80",
  },
  {
    slug: "choux",
    name: "Choux",
    description:
      "Deserturi choux fine, cu creme artizanale și finisaje elegante.",
    image:
      "https://images.unsplash.com/photo-1464349095431-e9a21285b5cc?auto=format&fit=crop&w=600&q=80",
  },
  {
    slug: "tarte",
    name: "Tarte",
    description:
      "Tarte cu fructe proaspete și creme fine, perfecte pentru orice ocazie.",
    image:
      "https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=600&q=80",
  },
];

export function CategoryCarousel() {
  return (
    <section className="bg-white py-16 lg:py-24">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
        <h2 className="text-center text-3xl font-semibold text-brand-navy lg:text-4xl">
          Explorează gama noastră
        </h2>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => (
            <article
              key={category.slug}
              className="overflow-hidden rounded-2xl border border-neutral-muted bg-white shadow-sm transition-shadow hover:shadow-md"
            >
              <div
                className="h-48 bg-cover bg-center"
                style={{ backgroundImage: `url('${category.image}')` }}
                role="img"
                aria-label={category.name}
              />
              <div className="p-6">
                <h3 className="text-lg font-semibold text-brand-navy">
                  {category.name}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-brand-navy/70">
                  {category.description}
                </p>
                <Link
                  href={`/vitrina-live?categorie=${category.slug}`}
                  className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-brand-gold hover:underline"
                >
                  Vezi tot →
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
