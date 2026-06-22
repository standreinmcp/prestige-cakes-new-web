import Image from "next/image";
import {
  checkoutItems,
  checkoutSummary,
  type CheckoutLineItem,
} from "@/lib/checkout-data";

type OrderSummaryProps = {
  items?: CheckoutLineItem[];
  showDelivery?: boolean;
};

export function OrderSummary({
  items = checkoutItems,
  showDelivery = true,
}: OrderSummaryProps) {
  const total = showDelivery
    ? checkoutSummary.total
    : checkoutSummary.productsTotal;

  return (
    <aside className="h-fit rounded-[22px] border border-border-card bg-white p-8 shadow-[0_8px_20px_rgba(0,0,0,0.12)] lg:sticky lg:top-8">
      <h2 className="font-serif text-3xl font-semibold text-brand-navy">
        Comanda ta
      </h2>
      <div className="my-4 h-0.5 bg-border-card" />

      <div className="space-y-8">
        {items.map((item) => (
          <div key={item.id} className="flex gap-5">
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
                {item.price.toFixed(2)} lei
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="my-6 h-0.5 bg-border-card" />

      <dl className="space-y-4 text-base">
        <div className="flex justify-between">
          <dt className="text-text-muted">Produse</dt>
          <dd className="font-medium text-brand-navy">
            {checkoutSummary.productsTotal.toFixed(2)} RON
          </dd>
        </div>
        {showDelivery && (
          <div className="flex justify-between">
            <dt className="text-text-muted">Livrare</dt>
            <dd className="font-medium text-brand-navy">
              {checkoutSummary.deliveryFee.toFixed(2)} RON
            </dd>
          </div>
        )}
        <div className="border-t border-border-card pt-4 flex justify-between">
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
