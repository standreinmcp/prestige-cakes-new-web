const stats = [
  {
    icon: "🌿",
    value: "100%",
    label: "Ingrediente naturale",
  },
  {
    icon: "🕐",
    value: "Zilnic",
    label: "Producție proaspătă",
  },
  {
    icon: "⭐",
    value: "15+",
    label: "Ani experiență",
  },
];

export function StatsRow() {
  return (
    <section className="border-b border-neutral-muted bg-white">
      <div className="mx-auto grid max-w-[1440px] grid-cols-1 divide-y divide-neutral-muted sm:grid-cols-3 sm:divide-x sm:divide-y-0">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="flex items-center gap-4 px-6 py-8 lg:px-12"
          >
            <span
              className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-lilac text-xl"
              aria-hidden
            >
              {stat.icon}
            </span>
            <div>
              <p className="text-lg font-semibold text-brand-navy">
                {stat.value}
              </p>
              <p className="text-sm text-brand-navy/70">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
