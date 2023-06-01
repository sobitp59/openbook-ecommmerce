import { v4 as uuid } from "uuid";

/**
 * Coupons Database can be added here.
 * You can add different coupons of your wish with different attributes
 * */

export const coupons = [
  {
    _id: uuid(),
    couponDescription: "50% off",
    coupon: 50,
    couponCode: "SHOP50",
  },
  {
    _id: uuid(),
    couponDescription: "45% off",
    coupon: 45,
    couponCode: "NEW45",
  },
  {
    _id: uuid(),
    couponDescription: "30% off",
    coupon: 30,
    couponCode: "SHOP30",
  },
  {
    _id: uuid(),
    couponDescription: "80% off",
    coupon: 80,
    couponCode: "BIBLIO80",
  },
  {
    _id: uuid(),
    couponDescription: "10% off",
    coupon: 10,
    couponCode: "JUST10",
  },
  {
    _id: uuid(),
    couponDescription: "40% off",
    coupon: 40,
    couponCode: "AVID40",
  },
];
