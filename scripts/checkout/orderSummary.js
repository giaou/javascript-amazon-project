import {
  cart,
  removeFromCart,
  updateDeliveryOption,
  updateQuantity,
} from "../../data/cart.js";
import {
  calculateDeliveryDate,
  deliveryOptions,
  getDeliveryOption,
} from "../../data/deliveryOptions.js";
import { getProduct } from "../../data/products.js";
import { formatCurrency } from "../utils/money.js";
import { renderCheckOutHeader } from "./checkoutHeader.js";
import { paymentSummary } from "./paymentSummary.js";

export function renderOrderSummary() {
  let cartSummaryHtml = "";
  renderCheckOutHeader();

  cart.forEach((cartItem) => {
    const productId = cartItem.productId;
    const matchingProduct = getProduct(productId);

    const deliveryOptionId = cartItem.deliveryId;

    const deliveryOption = getDeliveryOption(deliveryOptionId);

    const deliveryDate = calculateDeliveryDate(deliveryOption);

    cartSummaryHtml += `
    <div class="cart-item-container js-cart-item-container js-cart-item-container-${
      matchingProduct.id
    }">
        <div class="delivery-date">
            Delivery date: ${deliveryDate}
        </div>

        <div class="cart-item-details-grid">
            <img class="product-image"
                src="${matchingProduct.image}">

            <div class="cart-item-details">
            <div class="product-name js-product-name-${matchingProduct.id}">
                ${matchingProduct.name}
            </div>
            <div class="product-price js-product-price-${matchingProduct.id}">
                $${formatCurrency(matchingProduct.priceCents)}
            </div>
            <div class="product-quantity js-product-quantity-${matchingProduct.id}">
                <span>
                Quantity: <span class="quantity-label js-quantity-label-${
                  matchingProduct.id
                }">${cartItem.quantity}</span>
                </span>
                <span class="update-quantity-link link-primary js-update-quantity-link" data-product-id="${
                  matchingProduct.id
                }">
                Update
                </span>
                <input class="quantity-input js-quantity-input js-quantity-input-${
                  matchingProduct.id
                }" data-product-id="${matchingProduct.id}">
                <span class="save-quantity-link js-save-quantity-link link-primary" data-product-id="${
                  matchingProduct.id
                }">Save</span>
                <span class="delete-quantity-link link-primary js-delete-link js-delete-link-${matchingProduct.id}" data-product-id="${
                  matchingProduct.id
                }">
                Delete
                </span>
            </div>
            </div>

            <div class="delivery-options">
            <div class="delivery-options-title">
                Choose a delivery option:
            </div>
            ${deliveryOptionsHTML(matchingProduct, cartItem)}
            </div>
        </div>
    </div>`;
  });

  //   //countitng cart quantity
  //   function updateCartQuantity() {
  //     document.querySelector(
  //       ".js-return-to-home-link"
  //     ).innerHTML = `${calculateCartQuantity()} items`;
  //   }

  document.querySelector(".js-order-summary").innerHTML = cartSummaryHtml;

  document.querySelectorAll(".js-delete-link").forEach((link) => {
    link.addEventListener("click", () => {
      const { productId } = link.dataset;

      //delete
      removeFromCart(productId);

      //render the page again
      renderCheckOutHeader();
      renderOrderSummary();
      paymentSummary();
    });
  });

  document.querySelectorAll(".js-update-quantity-link").forEach((link) => {
    link.addEventListener("click", () => {
      const { productId } = link.dataset;

      const cartItemElm = document.querySelector(
        `.js-cart-item-container-${productId}`
      );

      //add .is-editing-quantity to container element
      cartItemElm.classList.add("is-editing-quantity");
    });
  });

  document.querySelectorAll(".js-save-quantity-link").forEach((link) => {
    link.addEventListener("click", () => {
      const { productId } = link.dataset;
      saveNewQuantity(productId);
      //update checkmark - the number of items in the header of the top
      renderCheckOutHeader();
      paymentSummary();
    });
  });

  function saveNewQuantity(productId) {
    const newQuantity = Number(
      document.querySelector(`.js-quantity-input-${productId}`).value
    );
    if (newQuantity === 0) {
      const container = document.querySelector(
        `.js-cart-item-container-${productId}`
      );
      container.remove();
      updateQuantity(productId, newQuantity);
    } else {
      updateQuantity(productId, newQuantity);
      //update quantity label
      if (0 < newQuantity && newQuantity < 1000) {
        document.querySelector(`.js-quantity-label-${productId}`).innerHTML =
          newQuantity;
      }
      //remove isEdittingquantityclass
      const cartItemElm = document.querySelector(
        `.js-cart-item-container-${productId}`
      );
      cartItemElm.classList.remove("is-editing-quantity");
    }
  }

  document.querySelectorAll(".js-quantity-input").forEach((link) => {
    link.addEventListener("keydown", (event) => {
      const { productId } = link.dataset;
      if (event.key === "Enter") {
        saveNewQuantity(productId);
        paymentSummary();
        renderCheckOutHeader();
      }
    });
  });

  //generate delivery option html - handle delivery methods here
  function deliveryOptionsHTML(matchingProduct, cartItem) {
    let deliveryOptionsHTMl = "";

    deliveryOptions.forEach((deliveryOption) => {
      const deliveryDate = calculateDeliveryDate(deliveryOption);
      const price =
        deliveryOption.priceCents === 0
          ? "FREE"
          : `$${formatCurrency(deliveryOption.priceCents)} -`;

      const isChecked = deliveryOption.id === cartItem.deliveryId;
      deliveryOptionsHTMl += `
    <div class="delivery-option js-delivery-option"
    data-product-id="${matchingProduct.id}" data-delivery-option-id="${
        deliveryOption.id
      }">
      <input type="radio" ${
        isChecked ? "checked" : ""
      } class="delivery-option-input"
      name="delivery-option-${matchingProduct.id}">
      <div>
        <div class="delivery-option-date">
            ${deliveryDate}
        </div>
        <div class="delivery-option-price">
            ${price} Shipping
        </div>
      </div>
    </div>
    `;
    });

    return deliveryOptionsHTMl;
  }

  document.querySelectorAll(".js-delivery-option").forEach((element) => {
    element.addEventListener("click", () => {
      const { productId, deliveryOptionId } = element.dataset;
      updateDeliveryOption(productId, deliveryOptionId);
      renderOrderSummary();
      paymentSummary();
    });
  });
}

// export default renderOrderSummary;
