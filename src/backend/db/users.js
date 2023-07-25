import { v4 as uuid } from "uuid";
import { formatDate } from "../utils/authUtils";
/**
 * User Database can be added here.
 * You can add default users of your wish with different attributes
 * Every user will have cart (Quantity of all Products in Cart is set to 1 by default), wishList by default
 * */

export const users = [
  {
    _id: uuid(),
    fullname: "Guest User",
    email: "guest@gmail.com",
    password: "guest@test",
    createdAt: formatDate(),
    updatedAt: formatDate(),
    address : [{ 
      _id : uuid(),
      name : 'Guest User',
      house : 'White Memoral Hostel',
      city : 'Guwhati',
      stateName : 'Assam',
      country : 'India',
      postalCode : '781001',
      mobileNumber : '0123456789',}],
  },
];
