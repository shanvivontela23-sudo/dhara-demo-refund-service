// Refund rules:
// - A customer can return some or all units of an item.
// - The refund for an item is unit price x returned quantity.
// - Shipping is refunded only when every unit of every item is returned.

export function calculateRefund(order, returns) {
  for (const returned of returns) {
    if (!(returned.quantity >= 1)) throw new Error(`Returned quantity for ${returned.sku} must be at least 1`);
  }
  let total = 0;
  for (const returned of returns) {
    const item = order.items.find((candidate) => candidate.sku === returned.sku);
    if (!item) throw new Error(`Item ${returned.sku} is not part of order ${order.id}`);
    if (returned.quantity > item.quantity) throw new Error(`Cannot return more than ${item.quantity} of ${item.sku}`);
    total += item.unitPrice * returned.quantity;
  }
  if (isFullReturn(order, returns)) total += order.shippingFee;
  return { orderId: order.id, total };
}

function isFullReturn(order, returns) {
  return order.items.every((item) => {
    const returned = returns.find((candidate) => candidate.sku === item.sku);
    return returned && returned.quantity === item.quantity;
  });
}
