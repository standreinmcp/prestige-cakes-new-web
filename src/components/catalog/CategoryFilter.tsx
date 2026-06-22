"use client";

const filters = [
  { id: "popular", label: "Cele mai apreciate", icon: true },
  { id: "all", label: "Toate produsele" },
  { id: "torturi", label: "Torturi" },
  { id: "prajituri", label: "Prăjituri" },
  { id: "cozonaci", label: "Cozonaci" },
  { id: "choux", label: "Choux a la creme" },
  { id: "tarte", label: "Tarte" },
  { id: "ciocolata", label: "Cicolată" },
] as const;

export type CatalogFilterId = (typeof filters)[number]["id"];

type CategoryFilterProps = {
  active: CatalogFilterId;
  onChange: (id: CatalogFilterId) => void;
};

export function CategoryFilter({ active, onChange }: CategoryFilterProps) {
  const row1 = filters.slice(0, 5);
  const row2 = filters.slice(5);

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex flex-wrap justify-center gap-3">
        {row1.map((filter) => (
          <FilterChip
            key={filter.id}
            filter={filter}
            active={active === filter.id}
            onClick={() => onChange(filter.id)}
          />
        ))}
      </div>
      <div className="flex flex-wrap justify-center gap-3">
        {row2.map((filter) => (
          <FilterChip
            key={filter.id}
            filter={filter}
            active={active === filter.id}
            onClick={() => onChange(filter.id)}
          />
        ))}
      </div>
    </div>
  );
}

function FilterChip({
  filter,
  active,
  onClick,
}: {
  filter: (typeof filters)[number];
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex items-center gap-3 rounded-full px-[22px] py-2.5 text-base font-medium transition-colors ${
        active
          ? "bg-brand-gold text-brand-navy"
          : "bg-white text-brand-navy shadow-[0_4px_12px_rgba(0,0,0,0.08)] hover:bg-brand-gold/20"
      }`}
    >
      {"icon" in filter && filter.icon ? (
        <span className="text-brand-navy" aria-hidden>
          ♥
        </span>
      ) : null}
      {filter.label}
    </button>
  );
}
