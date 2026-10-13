import express from "express";
import { findOrder } from "./orders.js";
import { calculateRefund } from "./refund.js";

const app = express();
app.use(express.json());

app.get("/health", (_request, response) => {
  response.json({ status: "ok" });
});

app.post("/orders/:orderId/refund-quote", (request, response) => {
  const order = findOrder(request.params.orderId);
  if (!order) return response.status(404).json({ error: "Order not found" });
  try {
    response.json(calculateRefund(order, request.body.returns ?? []));
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
});

const port = Number(process.env.PORT ?? 4000);
app.listen(port, () => console.log(`refund-service listening on ${port}`));
