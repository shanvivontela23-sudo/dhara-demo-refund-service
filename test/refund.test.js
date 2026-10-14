import assert from "node:assert/strict";
import { test } from "node:test";
import { findOrder } from "../src/orders.js";
import { calculateRefund } from "../src/refund.js";

test("refunds a single returned unit", () => {
  const order = findOrder("ORD-1001");
  const quote = calculateRefund(order, [{ sku: "CAP-BLK", quantity: 1 }]);
  assert.equal(quote.total, 299);
});

test("rejects an item that is not on the order", () => {
  const order = findOrder("ORD-1001");
  assert.throws(() => calculateRefund(order, [{ sku: "UNKNOWN", quantity: 1 }]));
});

test("rejects returning more units than were bought", () => {
  const order = findOrder("ORD-1002");
  assert.throws(() => calculateRefund(order, [{ sku: "MUG-WHT", quantity: 5 }]));
});

test("refunds unit price times quantity for multiple units of one item", () => {
  const order = findOrder("ORD-1002");
  const quote = calculateRefund(order, [{ sku: "MUG-WHT", quantity: 2 }]);
  assert.equal(quote.total, 498);
});

test("sums different quantities across items without shipping on partial return", () => {
  const order = findOrder("ORD-1001");
  const quote = calculateRefund(order, [
    { sku: "TSHIRT-M", quantity: 2 },
    { sku: "CAP-BLK", quantity: 0 },
  ]);
  assert.equal(quote.total, 998);
});

test("refunds shipping only when every unit of every item is returned", () => {
  const order = findOrder("ORD-1001");
  const quote = calculateRefund(order, [
    { sku: "TSHIRT-M", quantity: 2 },
    { sku: "CAP-BLK", quantity: 1 },
  ]);
  assert.equal(quote.total, 499 * 2 + 299 + 49);
});
