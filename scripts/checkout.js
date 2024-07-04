import "../data/backend-practice.js";
import "../data/cart-class.js";
import { renderCheckOutHeader } from "./checkout/checkoutHeader.js";
import { renderOrderSummary } from "./checkout/orderSummary.js";
import { paymentSummary } from "./checkout/paymentSummary.js";

renderCheckOutHeader();
renderOrderSummary();
paymentSummary();
