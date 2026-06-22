import { Footer } from "@/components/layout/Footer";
import { MainNav } from "@/components/layout/MainNav";

export default function CatalogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="relative">
        <MainNav variant="hero" />
        {children}
      </div>
      <Footer />
    </>
  );
}
