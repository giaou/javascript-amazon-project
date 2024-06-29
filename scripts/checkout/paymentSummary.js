import { cart } from "../../data/cart.js";
import { getDeliveryOption } from "../../data/deliveryOptions.js";
import { getProduct } from "../../data/products.js";
import { formatCurrency } from "../utils/money.js";

export function paymentSummary() {
  //save/manipulate the data
  let productPriceCents = 0;
  let shippingCostCents = 0;

  cart.forEach((cartItem) => {
    const product = getProduct(cartItem.productId);
    productPriceCents += cartItem.quantity * product.priceCents;

    const deliveryOption = getDeliveryOption(cartItem.deliveryId);
    shippingCostCents += deliveryOption.priceCents;
  });

  const totalBeforeTaxCents = productPriceCents + shippingCostCents;
  const taxCents = totalBeforeTaxCents * 0.1;
  const totalCents = totalBeforeTaxCents + taxCents;

  //generate HTML
  const paymentSummaryHTML = `
    <div class="payment-summary-title">Order Summary</div>

    <div class="payment-summary-row">
        <div>Items (3):</div>
        <div class="payment-summary-money">$${formatCurrency(
          productPriceCents
        )}</div>
    </div>

    <div class="payment-summary-row">
        <div>Shipping &amp; handling:</div>
        <div class="payment-summary-money">$${formatCurrency(
          shippingCostCents
        )}</div>
    </div>

    <div class="payment-summary-row subtotal-row">
        <div>Total before tax:</div>
        <div class="payment-summary-money">$${formatCurrency(
          totalBeforeTaxCents
        )}</div>
    </div>

    <div class="payment-summary-row">
        <div>Estimated tax (10%):</div>
        <div class="payment-summary-money">$${formatCurrency(taxCents)}</div>
    </div>

    <div class="payment-summary-row total-row">
        <div>Order total:</div>
        <div class="payment-summary-money">$${formatCurrency(totalCents)}</div>
    </div>

    <button class="place-order-button button-primary">
        Place your order
    </button>
  `;
  //make it interactive
  document.querySelector(".js-payment-summary").innerHTML = paymentSummaryHTML;

  
}
