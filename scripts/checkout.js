import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";
import { calculateDeliveryDate } from "../data/deliveryOptions.js";
import { renderCheckOutHeader } from "./checkout/checkoutHeader.js";
import { renderOrderSummary } from "./checkout/orderSummary.js";
import { paymentSummary } from "./checkout/paymentSummary.js";

renderCheckOutHeader();
renderOrderSummary();
paymentSummary();

