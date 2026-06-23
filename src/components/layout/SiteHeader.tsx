import { cookies } from "next/headers";
import { MainNav } from "@/components/layout/MainNav";
import { LOCALE_COOKIE, parseLocale } from "@/lib/locale";

export async function SiteHeader() {
  const cookieStore = await cookies();
  const locale = parseLocale(cookieStore.get(LOCALE_COOKIE)?.value);

  return <MainNav variant="default" initialLocale={locale} />;
}
