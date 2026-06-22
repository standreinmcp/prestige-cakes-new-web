import Image from "next/image";
import type { CartItem } from "@/lib/cart-types";

export type SummaryLineItem = {
  id: string;
  name: string;
  quantity: number;
  price: number;
  imagePosition?: string;
};

type PackageSummary = {
  title: string;
  items: SummaryLineItem[];
};

type OrderSummaryProps = {
  items: SummaryLineItem[];
  subtotal: number;
  deliveryFee?: number;
  deliveryFeeCount?: number;
  showDelivery?: boolean;
  splitPackages?: PackageSummary[];
  sticky?: boolean;
};

export function OrderSummary({
  items,
  subtotal,
  deliveryFee = 0,
  deliveryFeeCount = 0,
  showDelivery = false,
  splitPackages,
  sticky = true,
}: OrderSummaryProps) {
  const totalDelivery = showDelivery ? deliveryFee * deliveryFeeCount : 0;
  const total = subtotal + totalDelivery;

  return (
    <aside
      className={`h-fit rounded-[22px] border border-border-card bg-white p-8 shadow-[0_8px_20px_rgba(0,0,0,0.12)] ${sticky ? "lg:sticky lg:top-8" : ""}`}
    >
      <h2 className="font-serif text-3xl font-semibold text-brand-navy">
        Comanda ta
      </h2>
      <div className="my-4 h-0.5 bg-border-card" />

      {splitPackages && splitPackages.length > 0 ? (
        <div className="space-y-8">
          {splitPackages.map((pkg) => (
            <div key={pkg.title}>
              <h3 className="font-serif text-lg font-semibold text-brand-navy">
                {pkg.title}
              </h3>
              <div className="mt-4 space-y-6">
                {pkg.items.map((item) => (
                  <SummaryRow key={item.id} item={item} />
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-8">
          {items.map((item) => (
            <SummaryRow key={item.id} item={item} />
          ))}
        </div>
      )}

      <div className="my-6 h-0.5 bg-border-card" />

      <dl className="space-y-4 text-base">
        <div className="flex justify-between">
          <dt className="text-text-muted">Produse</dt>
          <dd className="font-medium text-brand-navy">
            {subtotal.toFixed(2)} RON
          </dd>
        </div>
        {showDelivery && deliveryFeeCount > 0 && (
          <div className="flex justify-between">
            <dt className="text-text-muted">
              Livrare{deliveryFeeCount > 1 ? ` (×${deliveryFeeCount})` : ""}
            </dt>
            <dd className="font-medium text-brand-navy">
              {totalDelivery.toFixed(2)} RON
            </dd>
          </div>
        )}
        {!showDelivery && (
          <div className="flex justify-between">
            <dt className="text-text-muted">Livrare</dt>
            <dd className="font-medium text-text-muted text-sm">
              Alege localitatea
            </dd>
          </div>
        )}
        <div className="flex justify-between border-t border-border-card pt-4">
          <dt className="font-serif text-2xl font-semibold text-brand-navy">
            TOTAL
          </dt>
          <dd className="font-serif text-2xl font-semibold text-brand-navy">
            {total.toFixed(2).replace(".", ",")} RON
          </dd>
        </div>
      </dl>
    </aside>
  );
}

function SummaryRow({ item }: { item: SummaryLineItem }) {
  return (
    <div className="flex gap-5">
      <div className="relative h-[106px] w-[106px] shrink-0 overflow-hidden rounded-2xl">
        <Image
          src="/images/home/categories.jpg"
          alt={item.name}
          fill
          className="object-cover"
          style={{ objectPosition: item.imagePosition ?? "center" }}
          sizes="106px"
        />
      </div>
      <div>
        <h3 className="font-serif text-[22px] font-semibold text-brand-navy">
          {item.name}
        </h3>
        <p className="mt-2 text-base text-text-muted">
          Cantitate: {item.quantity} buc.
        </p>
        <p className="mt-2 font-serif text-2xl font-semibold text-brand-navy">
          {(item.price * item.quantity).toFixed(2)} lei
        </p>
      </div>
    </div>
  );
}

export function cartItemsToSummary(items: CartItem[]): SummaryLineItem[] {
  return items.map((item) => ({
    id: item.id,
    name: item.name,
    quantity: item.quantity,
    price: item.price,
    imagePosition: item.imagePosition,
  }));
}
