import { Footer } from "@/components/layout/Footer";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { ConvexProviders } from "@/components/providers/ConvexProviders";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ConvexProviders>
      <SiteHeader />
      <main className="flex-1">{children}</main>
      <Footer />
    </ConvexProviders>
  );
}
