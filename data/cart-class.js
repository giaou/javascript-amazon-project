class Cart {
  cartItems;
  localStorageKey;

  constructor(localStorageKey) {
    this.localStorageKey = localStorageKey;
    this.loadFromStorage();
  }

  loadFromStorage() {
    this.cartItems = JSON.parse(localStorage.getItem(this.localStorageKey)) || [
      {
        productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
        quantity: 2,
        deliveryId: "3", //by default
      },
      {
        productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
        quantity: 5,
        deliveryId: "2",
      },
    ];
  }
  saveToStorage() {
    localStorage.setItem(this.localStorageKey, JSON.stringify(this.cartItems));
  }
  addToCart(productId) {
    const selectorElm = document.querySelector(`.js-selector-${productId}`);
    let itemQuantity;
    if (selectorElm != null) {
      itemQuantity = Number(selectorElm.value);
    } else itemQuantity = 1;
    let matchingItem;

    this.cartItems.forEach((item) => {
      if (productId === item.productId) {
        matchingItem = item;
      }
    });

    if (matchingItem) {
      matchingItem.quantity += itemQuantity;
    } else {
      this.cartItems.push({
        productId: productId,
        quantity: itemQuantity,
        deliveryId: "1", //By Default
      });
    }

    this.saveToStorage();
  }
  calculateCartQuantity() {
    let cartQuantity = 0;
    //calculate total of the cart
    this.cartItems.forEach((item) => {
      cartQuantity += item.quantity;
    });
    return cartQuantity;
  }
  removeFromCart(productId) {
    const newCart = [];

    this.cartItems.forEach((item) => {
      if (item.productId !== productId) {
        newCart.push(item);
      }
    });

    cart = newCart;

    this.saveToStorage();
  }
  updateQuantity(productId, newQuantity) {
    let matchingItem;
    this.cartItems.forEach((item) => {
      if (item.productId === productId) {
        matchingItem = item;
      }
    });

    if (matchingItem) {
      if (newQuantity === 0) removeFromCart(productId);
      else if (1 <= newQuantity && newQuantity < 1000) {
        matchingItem.quantity = newQuantity;
      }
    }

    this.saveToStorage();
  }
  updateDeliveryOption(productId, deliveryOptionId) {
    if (
      deliveryOptionId != "1" &&
      deliveryOptionId != "2" &&
      deliveryOptionId != "3"
    )
      return;
    let matchingItem;
    this.cartItems.forEach((cartItem) => {
      if (cartItem.productId === productId) {
        matchingItem = cartItem;
      }
    });

    if (matchingItem) {
      matchingItem.deliveryId = deliveryOptionId;
      this.saveToStorage();
    } else return;
  }
}

const cart = new Cart("cart-oop");
const businessCart = new Cart("cart-business");

cart.addToCart("83d4ca15-0f35-48f5-b7a3-1ea210004f2e");
console.log(cart);
console.log(businessCart);
console.log(businessCart instanceof Cart);
