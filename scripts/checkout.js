import {
  calculateCartQuantity,
  cart,
  removeFromCart,
  updateQuantity,
} from "../data/cart.js";
import { products } from "../data/products.js";
import { formatCurrency } from "./utils/money.js";

let cartSummaryHtml = "";
updateCartQuantity();

cart.forEach((cartItem) => {
  const productId = cartItem.productId;
  let matchingProduct;

  products.forEach((product) => {
    if (product.id === productId) {
      matchingProduct = product;
    }
  });

  cartSummaryHtml += `
    <div class="cart-item-container js-cart-item-container-${
      matchingProduct.id
    }">
        <div class="delivery-date">
            Delivery date: Tuesday, June 21
        </div>

        <div class="cart-item-details-grid">
            <img class="product-image"
                src="${matchingProduct.image}">

            <div class="cart-item-details">
            <div class="product-name">
                ${matchingProduct.name}
            </div>
            <div class="product-price">
                $${formatCurrency(matchingProduct.priceCents)}
            </div>
            <div class="product-quantity">
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
                <input class="quantity-input js-quantity-input-${
                  matchingProduct.id
                }">
                <span class="save-quantity-link js-save-quantity-link link-primary" data-product-id="${
                  matchingProduct.id
                }">Save</span>
                <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${
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
            <div class="delivery-option">
                <input type="radio" checked
                class="delivery-option-input"
                name="delivery-option-${matchingProduct.id}">
                <div>
                <div class="delivery-option-date">
                    Tuesday, June 21
                </div>
                <div class="delivery-option-price">
                    FREE Shipping
                </div>
                </div>
            </div>
            <div class="delivery-option">
                <input type="radio"
                class="delivery-option-input"
                name="delivery-option-${matchingProduct.id}">
                <div>
                <div class="delivery-option-date">
                    Wednesday, June 15
                </div>
                <div class="delivery-option-price">
                    $4.99 - Shipping
                </div>
                </div>
            </div>
            <div class="delivery-option">
                <input type="radio"
                class="delivery-option-input"
                name="delivery-option-${matchingProduct.id}">
                <div>
                <div class="delivery-option-date">
                    Monday, June 13
                </div>
                <div class="delivery-option-price">
                    $9.99 - Shipping
                </div>
                </div>
            </div>
            </div>
        </div>
    </div>`;
});

//countitng cart quantity
function updateCartQuantity() {
  document.querySelector(
    ".js-return-to-home-link"
  ).innerHTML = `${calculateCartQuantity()} items`;
}

document.querySelector(".js-order-summary").innerHTML = cartSummaryHtml;

document.querySelectorAll(".js-delete-link").forEach((link) => {
  link.addEventListener("click", () => {
    const { productId } = link.dataset;

    //delete
    removeFromCart(productId);
    updateCartQuantity();

    const container = document.querySelector(
      `.js-cart-item-container-${productId}`
    );
    container.remove();
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

    // const newQuantity = Number(
    //   document.querySelector(`.js-quantity-input-${productId}`).value
    // );

    saveNewQuantity(productId);

    // //remove element UI first then remove in database
    // if (newQuantity === 0) {
    //   const container = document.querySelector(
    //     `.js-cart-item-container-${productId}`
    //   );
    //   container.remove();
    //   updateQuantity(productId, newQuantity);
    // } else {
    //   updateQuantity(productId, newQuantity);
    //   //update quantity label
    //   if (0 < newQuantity && newQuantity < 1000) {
    //     document.querySelector(`.js-quantity-label-${productId}`).innerHTML =
    //       newQuantity;
    //   }
    //   //remove isEdittingquantityclass
    //   const cartItemElm = document.querySelector(
    //     `.js-cart-item-container-${productId}`
    //   );
    //   cartItemElm.classList.remove("is-editing-quantity");
    // }

    //update checkmark - the number of items in the header of the top
    updateCartQuantity();
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
