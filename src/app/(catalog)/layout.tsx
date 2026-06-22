import { Footer } from "@/components/layout/Footer";
import { MainNav } from "@/components/layout/MainNav";
import { ClientOnly } from "@/components/ClientOnly";

export default function CatalogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="relative">
        <MainNav variant="hero" />
        <ClientOnly
          fallback={
            <div className="flex min-h-[40vh] items-center justify-center bg-white text-text-muted">
              Se încarcă...
            </div>
          }
        >
          {children}
        </ClientOnly>
      </div>
      <Footer />
    </>
  );
}
