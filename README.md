# refund-service

A small API the support team uses to quote refunds for returned items.

## Run

    npm install
    npm start

## Test

    npm test

## Endpoints

- `GET /health`
- `POST /orders/:orderId/refund-quote` with body `{ "returns": [{ "sku": "TSHIRT-M", "quantity": 2 }] }`
