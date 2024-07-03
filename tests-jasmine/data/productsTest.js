import { Aplliance, Clothing, Product } from "../../data/products.js";

describe("Test suite: ProductClass", () => {
  let ball;
  beforeEach(() => {
    ball = new Product({
      id: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
      image: "images/products/intermediate-composite-basketball.jpg",
      name: "Intermediate Size Basketball",
      rating: {
        stars: 4,
        count: 127,
      },
      priceCents: 2095,
      keywords: ["sports", "basketballs"],
    });
  });

  it("create an item in product", () => {
    expect(ball.id).toEqual("15b6fc6f-327a-4ec4-896f-486349e85a3d");
  });

  it("testing extra html in product", () => {
    expect(ball.extraInfoHTML()).toEqual("");
  });
});

describe("Test suite: ClothingClass", () => {
  let tshirt;
  beforeEach(() => {
    tshirt = new Clothing({
      id: "83d4ca15-0f35-48f5-b7a3-1ea210004f2e",
      image: "images/products/adults-plain-cotton-tshirt-2-pack-teal.jpg",
      name: "Adults Plain Cotton T-Shirt - 2 Pack",
      rating: {
        stars: 4.5,
        count: 56,
      },
      priceCents: 799,
      keywords: ["tshirts", "apparel", "mens"],
      type: "clothing",
      sizeChartLink: "images/clothing-size-chart.png",
    });
  });

  it("create an item in product", () => {
    expect(tshirt.id).toEqual("83d4ca15-0f35-48f5-b7a3-1ea210004f2e");
  });

  it("testing extra html in product", () => {
    expect(tshirt.extraInfoHTML()).toContain(`Size Chart`);
  });
});

describe("Test suite: ClothingClass", () => {
  let toaster;
  beforeEach(() => {
    toaster = new Aplliance({
      id: "54e0eccd-8f36-462b-b68a-8182611d9add",
      image: "images/products/black-2-slot-toaster.jpg",
      name: "2 Slot Toaster - Black",
      rating: {
        stars: 5,
        count: 2197,
      },
      priceCents: 1899,
      keywords: ["toaster", "kitchen", "appliances"],
      type: "appliance",
      instructionsLink: "images/appliance-instructions.png",
      warrantyLink: "images/appliance-warranty.png",
    });
  });

  it("create an item in product", () => {
    expect(toaster.id).toEqual("54e0eccd-8f36-462b-b68a-8182611d9add");
  });

  it("testing extra html in product", () => {
    expect(toaster.extraInfoHTML()).toContain(`warranty`);
  });
});
