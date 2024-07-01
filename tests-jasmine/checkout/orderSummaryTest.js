import { cart, loadFromStorage } from "../../data/cart.js";
import { renderOrderSummary } from "../../scripts/checkout/orderSummary.js";

describe("Test suite: renderOrderSummary", () => {
  //2 things to test: how the page looks and how the page behave

  //setup - creating a hook
  const productId1 = "e43638ce-6aa0-4b85-b27f-e1d07eb678c6";
  const productName1 = "Black and Gray Athletic Cotton Socks - 6 Pairs";

  const productId2 = "15b6fc6f-327a-4ec4-896f-486349e85a3d";
  const productName2 = "Intermediate Size Basketball";

  beforeEach(() => {
    spyOn(localStorage, "setItem");
    document.querySelector(".js-test-container").innerHTML = `
        <div class="js-checkout-header"></div>;
        <div class="js-order-summary">
            <div class="js-delete-link-${productId1}"></div>
        </div> 
        <div class="js-payment-summary"></div>
    `;

    spyOn(localStorage, "getItem").and.callFake(() => {
      return JSON.stringify([
        {
          productId: productId1,
          quantity: 2,
          deliveryId: "1", //by default
        },
        {
          productId: productId2,
          quantity: 5,
          deliveryId: "2",
        },
      ]);
    });
    loadFromStorage();
    renderOrderSummary();
  });

  afterEach(() => {
    document.querySelector(".js-test-container").innerHTML = "";
  });

  //first create a div with class"js-test-container" in tests.html
  it("display the cart", () => {
    expect(document.querySelectorAll(".js-cart-item-container").length).toEqual(
      2
    );

    expect(
      document.querySelector(`.js-product-quantity-${productId1}`).innerText
    ).toContain("Quantity: 2");

    expect(
      document.querySelector(`.js-product-quantity-${productId2}`).innerText
    ).toContain("Quantity: 5");

    expect(
      document.querySelector(`.js-product-name-${productId1}`).innerText
    ).toContain(`${productName1}`);

    expect(
      document.querySelector(`.js-product-price-${productId1}`).innerText
    ).toContain("$10.90");

    expect(
      document.querySelector(`.js-product-price-${productId2}`).innerText
    ).toContain("$20.95");
  });

  it("remove a product", () => {
    document.querySelector(`.js-delete-link-${productId1}`).click();

    expect(document.querySelectorAll(".js-cart-item-container").length).toEqual(
      1
    );

    expect(
      document.querySelector(`.js-cart-item-container-${productId1}`)
    ).toEqual(null);

    expect(
      document.querySelector(`.js-cart-item-container-${productId2}`)
    ).not.toEqual(null);

    expect(cart.length).toEqual(1);
    expect(cart[0].productId).toEqual(productId2);

    expect(document.querySelector(`.js-product-name-${productId1}`)).toEqual(
      null
    );

    expect(
      document.querySelector(`.js-product-name-${productId2}`)
    ).not.toEqual(null);

    expect(
      document.querySelector(`.js-product-name-${productId2}`).innerText
    ).toContain(`${productName2}`);
  });

  it("update a delivery option", () => {
    document.querySelector(`.js-delivery-option-${productId1}-3`).click();

    expect(
      document.querySelector(`.js-delivery-option-input-${productId1}-3`)
        .checked
    ).toEqual(true);

    expect(cart.length).toEqual(2);
    expect(cart[0].productId).toEqual(productId1);
    expect(cart[0].deliveryId).toEqual("3");

    expect(
      document.querySelector(".js-payment-summary-shipping").innerText
    ).toEqual("$14.98");

    expect(
      document.querySelector(".js-payment-summary-total").innerText
    ).toEqual("$155.68");
  });
});
