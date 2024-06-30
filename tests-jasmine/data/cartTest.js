import { addToCart, cart, loadFromStorage } from "../../data/cart.js";

describe("Test suite: addToCart", () => {
  it("adds an exisiting product to the cart", () => {
    spyOn(localStorage, "setItem");
    //mock an empty cart
    spyOn(localStorage, "getItem").and.callFake(() => {
      return JSON.stringify([
        {
          productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
          quantity: 2,
          deliveyId: "1",
        },
      ]);
    });

    //load the cart after mocking. The cart should be empty
    loadFromStorage();

    addToCart("e43638ce-6aa0-4b85-b27f-e1d07eb678c6");
    expect(cart.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    //check if the product is successfully added to cart
    expect(cart[0].productId).toEqual("e43638ce-6aa0-4b85-b27f-e1d07eb678c6");
    expect(cart[0].quantity).toEqual(3);
  });

  it("adds a new product to the cart", () => {
    spyOn(localStorage, "setItem");

    //mock an empty cart
    spyOn(localStorage, "getItem").and.callFake(() => {
      return JSON.stringify([]);
    });

    //load the cart after mocking. The cart should be empty
    loadFromStorage();

    addToCart("e43638ce-6aa0-4b85-b27f-e1d07eb678c6");
    expect(cart.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    //check if the product is successfully added to cart
    expect(cart[0].productId).toEqual("e43638ce-6aa0-4b85-b27f-e1d07eb678c6");
    expect(cart[0].quantity).toEqual(1);
  });
});
