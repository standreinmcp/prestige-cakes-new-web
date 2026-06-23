import { cookies } from "next/headers";
import { Footer } from "@/components/layout/Footer";
import { MainNav } from "@/components/layout/MainNav";
import { CatalogProviders } from "@/components/providers/CatalogProviders";
import { LOCALE_COOKIE, parseLocale } from "@/lib/locale";

export default async function CatalogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const locale = parseLocale(cookieStore.get(LOCALE_COOKIE)?.value);

  return (
    <CatalogProviders>
      <div className="relative">
        <MainNav variant="catalog" initialLocale={locale} />
        {children}
      </div>
      <Footer />
    </CatalogProviders>
  );
}
