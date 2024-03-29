import { Response } from "miragejs";
import { v4 as uuid } from "uuid";
import { formatDate, requiresAuth } from "../utils/authUtils";
/**
 * All the routes related to Address are present here.
 * These are private routes.
 * Client needs to add "authorization" header with JWT token in it to access it.
 * */

/**
 * This handler handles getting all addresses from user.
 * send GET Request at /api/user/addresses
 * */

export const getAllAddressesHandler = function (schema, request) {
  const userId = requiresAuth.call(this, request);
  if (!userId) {
    new Response(
      404,
      {},
      {
        errors: ["The email you entered is not Registered. Not Found error"],
      }
    );
  }
  const userAddresses = schema.users.findBy({ _id: userId }).address;
  return new Response(200, {}, { address: userAddresses });
};

/**
 * This handler handles adding an address to user.
 * send POST Request at /api/user/address
 * body contains { address }
 * */

export const addNewAddressHandler = function (schema, request) {
  const userId = requiresAuth.call(this, request);
  try {
    if (!userId) {
      new Response(
        404,
        {},
        {
          errors: ["The email you entered is not Registered. Not Found error"],
        }
      );
    }
    const userAddresses = schema.users.findBy({ _id: userId }).address;
    const { address } = JSON.parse(request.requestBody);
   
    userAddresses.push({
      ...address,
      createdAt: formatDate(),
      updatedAt: formatDate(),
      _id: uuid(),
    });
    this.db.users.update({ _id: userId }, { address: userAddresses });
    return new Response(201, {}, { address: userAddresses });
  } catch (error) {
    return new Response(
      500,
      {},
      {
        error,
      }
    );
  }
};

/**
 * This handler handles removing an address from user.
 * send DELETE Request at /api/user/address/:addressId
 *
 * */

export const removeAddressHandler = function (schema, request) {
  const userId = requiresAuth.call(this, request);
  try {
    if (!userId) {
      new Response(
        404,
        {},
        {
          errors: ["The email you entered is not Registered. Not Found error"],
        }
      );
    }
    let userAddresses = schema.users.findBy({ _id: userId }).address;
    const addressId = request.params.addressId;
    userAddresses = userAddresses.filter((item) => item._id !== addressId);
    this.db.users.update({ _id: userId }, { address: userAddresses });
    return new Response(200, {}, { address: userAddresses });
  } catch (error) {
    return new Response(
      500,
      {},
      {
        error,
      }
    );
  }
};


/**
 * This handler handles adding items to user's address.
 * send POST Request at /api/user/address/:addressId
* */

export const editAddressHandler = function (schema, request) {
  const addressId = request.params.addressId;
  const userId = requiresAuth.call(this, request);
  try {
    if (!userId) {
      new Response(
        404,
        {},
        {
          errors: ["The email you entered is not Registered. Not Found error"],
        }
      );
    }
    const userAddress = schema.users.findBy({
      _id: userId,
    }).address;

    const {
      address: {name, house, city, stateName, country, postalCode, mobileNumber },
    } = JSON.parse(request.requestBody);

    userAddress.forEach((address) => {
      if (address._id === addressId) {
        address.name = name;
        address.house = house;
        address.city = city;
        address.stateName = stateName;
        address.country = country;
        address.postalCode = postalCode;
        address.mobileNumber = mobileNumber;
        address.updatedAt = formatDate();
      }
    });
    this.db.users.update(
      {
        _id: userId,
      },
      {
        address: userAddress,
      }
    );
    return new Response(
      200,
      {},
      {
        address: userAddress,
      }
    );
  } catch (error) {
    return new Response(
      500,
      {},
      {
        error,
      }
    );
  }
};

// export const editAddressHandler = function (schema, request) {
//   const userId = requiresAuth.call(this, request);

//     try {
//         if(!userId){
//             new Response(
//                 404,
//                 {},
//                 {
//                     errors: ["The email you entered is not Registered. Not Found error"],
//                 }
//             );
//         }

//         const addressId = request.params.addressId;
//         const {address} = JSON.parse(request.requestBody);

//         let userAddresses = schema.users.findBy({_id: userId}).address;

//         userAddresses =  userAddresses.map((item)=>
//             item._id === addressId ? address : item
//         );

//         this.db.users.update({_id: userId}, {address: userAddresses});
//         return new Response(201, {}, {address: userAddresses});

//     } catch (error) {
//         return new Response(
//             500,
//             {},
//             {
//                 error,
//             }
//         );
//     }
// };

// export const editAddressHandler = function (schema, request) {
//   const userId = requiresAuth.call(this, request);

//   try {
//     if (!userId) {
//       new Response(
//         404,
//         {},
//         {
//           errors: ["The email you entered is not Registered. Not Found error"],
//         }
//       );
//     }
//     const addressId = request.params.addressId;
//     const {address} = JSON.parse(request.requestBody);

//     let userAddress = schema.users.findBy({
//       _id: userId
//     }).address;

//     userAddress = userAddress.map((item)=> item._id === addressId ? address : item)

//     this.db.users.update(
//       {
//         _id: userId,
//       },
//       {
//         address: userAddress,
//       }
//     );
//     return new Response(
//       200,
//       {},
//       {
//         address: userAddress,
//       }
//     );
//   } catch (error) {
//     return new Response(
//       500,
//       {},
//       {
//         error,
//       }
//     );
//   }
// };