import dynamic from "next/dynamic";

const CheckoutView = dynamic(
  () =>
    import("@/components/checkout/CheckoutView").then((mod) => mod.CheckoutView),
  {
    loading: () => (
      <div className="flex min-h-[40vh] items-center justify-center text-text-muted">
        Se încarcă checkout-ul...
      </div>
    ),
  },
);

export default function CheckoutPage() {
  return <CheckoutView defaultFulfillment="delivery" />;
}
