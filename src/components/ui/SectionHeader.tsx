type SectionHeaderProps = {
  badge: string;
  title: string;
  subtitle?: string;
  align?: "center" | "left";
  className?: string;
};

export function SectionHeader({
  badge,
  title,
  subtitle,
  align = "center",
  className = "",
}: SectionHeaderProps) {
  const alignClass = align === "center" ? "items-center text-center" : "items-start text-left";

  return (
    <div className={`flex flex-col gap-3 ${alignClass} ${className}`}>
      <span className="inline-flex rounded-full bg-brand-gold/30 px-[22px] py-2 text-base font-medium text-brand-gold">
        {badge}
      </span>
      <h2 className="font-serif text-4xl font-semibold text-brand-navy">{title}</h2>
      {subtitle ? (
        <p className="max-w-3xl text-lg font-medium text-[#686868]">{subtitle}</p>
      ) : null}
    </div>
  );
}
