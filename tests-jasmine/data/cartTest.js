import {
  addToCart,
  cart,
  loadFromStorage,
  removeFromCart,
  updateDeliveryOption,
} from "../../data/cart.js";

describe("Test suite: addToCart", () => {
  beforeEach(() => {
    spyOn(localStorage, "setItem");
  });

  it("adds an exisiting product to the cart", () => {
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
    expect(localStorage.setItem).toHaveBeenCalledWith(
      "cart",
      JSON.stringify([
        {
          productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
          quantity: 3,
          deliveyId: "1",
        },
      ])
    );
  });

  it("adds a new product to the cart", () => {
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
    expect(localStorage.setItem).toHaveBeenCalledWith(
      "cart",
      JSON.stringify([
        {
          productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
          quantity: 1,
          deliveryId: "1",
        },
      ])
    );
  });
});

describe("Test suite: RemoveFromCart", () => {
  const productId1 = "e43638ce-6aa0-4b85-b27f-e1d07eb678c6";
  const productName1 = "Black and Gray Athletic Cotton Socks - 6 Pairs";

  const productId2 = "15b6fc6f-327a-4ec4-896f-486349e85a3d";
  const productName2 = "Intermediate Size Basketball";

  const productId3 = "NotExistingItem";
  beforeEach(() => {
    spyOn(localStorage, "setItem");
    spyOn(localStorage, "getItem").and.callFake(() => {
      return JSON.stringify([
        {
          productId: productId1,
          quantity: 2,
          deliveryId: "3", //by default
        },
        {
          productId: productId2,
          quantity: 5,
          deliveryId: "2",
        },
      ]);
    });
    loadFromStorage();
  });

  it("remove a productId", () => {
    removeFromCart(productId1);

    expect(cart[0].productId).toEqual(productId2);
    expect(cart.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledWith(
      "cart",
      JSON.stringify([
        {
          productId: productId2,
          quantity: 5,
          deliveryId: "2",
        },
      ])
    );
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
  });

  it("remove a productId that is NOT in the cart", () => {
    removeFromCart(productId3);

    expect(cart[0].productId).toEqual(productId1);
    expect(cart.length).toEqual(2);
    expect(localStorage.setItem).toHaveBeenCalledWith(
      "cart",
      JSON.stringify([
        {
          productId: productId1,
          quantity: 2,
          deliveryId: "3", //by default
        },
        {
          productId: productId2,
          quantity: 5,
          deliveryId: "2",
        },
      ])
    );
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
  });
});

describe("Test suite: updateDeliveryOption", () => {
  const productId1 = "e43638ce-6aa0-4b85-b27f-e1d07eb678c6";
  const productName1 = "Black and Gray Athletic Cotton Socks - 6 Pairs";

  const productId2 = "15b6fc6f-327a-4ec4-896f-486349e85a3d";
  const productName2 = "Intermediate Size Basketball";
  beforeEach(() => {
    spyOn(localStorage, "setItem");
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
  });

  it("update a delivery option in cart", () => {
    updateDeliveryOption(productId1, "3"); //change deliveryoption of productID1 to 3, original was 1

    expect(cart[0].deliveryId).toEqual("3");
    expect(cart.length).toEqual(2);
    expect(cart[1].deliveryId).toEqual("2");
    expect(localStorage.setItem).toHaveBeenCalledWith(
      "cart",
      JSON.stringify([
        {
          productId: productId1,
          quantity: 2,
          deliveryId: "3", //after change
        },
        {
          productId: productId2,
          quantity: 5,
          deliveryId: "2",
        },
      ])
    );
  });

  it("update a delivery option with a product that is NOT in the cart", () => {
    updateDeliveryOption("notexistingID", "3");
    expect(cart[0].deliveryId).toEqual("1");
    expect(cart[1].deliveryId).toEqual("2");
    expect(cart.length).toEqual(2);
    expect(localStorage.setItem).toHaveBeenCalledTimes(0);
  });

  it("update a delivery option with invalid delivery option ID",()=>{
    updateDeliveryOption(productId1, "4");
    expect(cart[0].deliveryId).toEqual("1");
    expect(cart[1].deliveryId).toEqual("2");
    expect(cart.length).toEqual(2);
    expect(localStorage.setItem).toHaveBeenCalledTimes(0);
  });
});
