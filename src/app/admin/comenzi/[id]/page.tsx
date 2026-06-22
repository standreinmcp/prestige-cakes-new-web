type Props = {
  params: Promise<{ id: string }>;
};

export default async function AdminComandaDetailPage({ params }: Props) {
  const { id } = await params;

  return (
    <div className="rounded-2xl bg-white p-8 shadow-sm">
      <h1 className="text-2xl font-semibold text-brand-navy">
        Comandă #{id}
      </h1>
      <p className="mt-2 text-sm text-brand-navy/70">
        Detalii comandă deschisă.
      </p>
    </div>
  );
}
