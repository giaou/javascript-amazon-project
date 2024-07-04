import "../data/backend-practice.js";
import "../data/cart-class.js";
import { loadProducts } from "../data/products.js";
import { renderCheckOutHeader } from "./checkout/checkoutHeader.js";
import { renderOrderSummary } from "./checkout/orderSummary.js";
import { paymentSummary } from "./checkout/paymentSummary.js";

loadProducts(() => {
  renderCheckOutHeader();
  renderOrderSummary();
  paymentSummary();
});
