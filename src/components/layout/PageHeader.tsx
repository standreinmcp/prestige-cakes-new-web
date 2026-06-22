type PageHeaderProps = {
  title: string;
  description?: string;
};

export function PageHeader({ title, description }: PageHeaderProps) {
  return (
    <div className="border-b border-neutral-muted bg-brand-lilac/30 px-6 py-16 lg:px-12">
      <div className="mx-auto max-w-[1440px]">
        <h1 className="text-3xl font-semibold text-brand-navy lg:text-4xl">
          {title}
        </h1>
        {description ? (
          <p className="mt-4 max-w-2xl text-base text-brand-navy/70">
            {description}
          </p>
        ) : null}
      </div>
    </div>
  );
}
