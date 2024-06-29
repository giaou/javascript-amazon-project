import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";

export function getDeliveryOption(deliveryOptionId) {
  let deliveryOption;

  deliveryOptions.forEach((option) => {
    if (option.id === deliveryOptionId) {
      deliveryOption = option;
    }
  });

  return deliveryOption || deliveryOptions[0];
}

export function calculateDeliveryDate(deliveryOption) {
  let expectedDeliveryDate = deliveryOption.deliveryDays;
  let actualDeliveryDate = dayjs();

  while (expectedDeliveryDate >= 0) {
    //increase today's date by 1
    actualDeliveryDate = actualDeliveryDate.add(1, "day");
    if (!isWeekend(actualDeliveryDate.add(1, "day"))) {
      expectedDeliveryDate -= 1;
    }
  }

  return actualDeliveryDate.format("dddd, MMMM D");
}

export function isWeekend(date) {
  if (date.format("dddd") === "Saturday" || date.format("dddd") === "Sunday") {
    return true;
  }
  return false;
}

export const deliveryOptions = [
  {
    id: "1",
    deliveryDays: 7,
    priceCents: 0,
  },
  {
    id: "2",
    deliveryDays: 3,
    priceCents: 499,
  },
  {
    id: "3",
    deliveryDays: 1,
    priceCents: 999,
  },
];
