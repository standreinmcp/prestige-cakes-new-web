type Props = {
  params: Promise<{ id: string }>;
};

export default async function AdminProdusEditPage({ params }: Props) {
  const { id } = await params;

  return (
    <div className="rounded-2xl bg-white p-8 shadow-sm">
      <h1 className="text-2xl font-semibold text-brand-navy">
        Editează produsul
      </h1>
      <p className="mt-2 text-sm text-brand-navy/70">ID: {id}</p>
    </div>
  );
}
