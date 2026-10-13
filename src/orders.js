// In-memory order store used by the demo API.
const orders = new Map([
  ["ORD-1001", { id: "ORD-1001", customer: "Asha", shippingFee: 49, items: [
    { sku: "TSHIRT-M", unitPrice: 499, quantity: 2 },
    { sku: "CAP-BLK", unitPrice: 299, quantity: 1 },
  ] }],
  ["ORD-1002", { id: "ORD-1002", customer: "Ravi", shippingFee: 0, items: [
    { sku: "MUG-WHT", unitPrice: 249, quantity: 3 },
  ] }],
]);

export function findOrder(orderId) {
  return orders.get(orderId) ?? null;
}
