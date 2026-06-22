export type CheckoutLineItem = {
  id: string;
  name: string;
  quantity: number;
  price: number;
  imagePosition?: string;
};

export const checkoutItems: CheckoutLineItem[] = [
  {
    id: "1",
    name: "Tarte cu fructe",
    quantity: 1,
    price: 9.8,
    imagePosition: "100% 0%",
  },
  {
    id: "2",
    name: "Choux cu vanilie",
    quantity: 2,
    price: 9.8,
    imagePosition: "66% 0%",
  },
  {
    id: "3",
    name: "Croissant cu fistic",
    quantity: 4,
    price: 9.8,
    imagePosition: "0% 0%",
  },
];

export const checkoutSummary = {
  productsTotal: 31.99,
  deliveryFee: 11.99,
  total: 52.46,
};

export const orderConfirmation = {
  orderNumber: "#5422",
  placedOn: "12 Mai 2026",
  fulfillment: "Livrare la adresă",
  deliveryEstimate: "Astăzi",
  customer: {
    name: "Andrei Popescu",
    phone: "+40 731 531 415",
    email: "exemplu@gmail.com",
    address: "Strada Florilor, nr. 23, ap. 4,",
    details: "Scara A, Etaj 2, Interfon 04",
    orderNotes: "-",
    paymentMethod: "Card Online",
  },
};
