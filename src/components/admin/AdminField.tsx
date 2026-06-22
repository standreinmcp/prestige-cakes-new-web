export function AdminField({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-sm font-medium text-brand-navy">{label}</span>
      {children}
    </label>
  );
}

export const adminInputClass =
  "h-10 w-full rounded-lg border border-border-card bg-white px-3 text-sm text-brand-navy outline-none focus:border-brand-gold";

export const adminTextareaClass =
  "w-full rounded-lg border border-border-card bg-white px-3 py-2 text-sm text-brand-navy outline-none focus:border-brand-gold";
