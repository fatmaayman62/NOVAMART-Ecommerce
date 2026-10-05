import axios from "axios";

export async function postToWishList(x,token) {
  try {
    // Pass both page and limit to the API
    let res = await axios.post(
      'https://ecommerce.routemisr.com/api/v1/wishlist',
      {
        productId: x,
      },
      {
        headers: {
          token: token,
        },
      },
    );

    return res.data;
  } catch (error) {
    console.error("Error fetching products:", error);
  }
}
export async function deleteFromWishList(id,token) {
  try {
    // Pass both page and limit to the API
    let res = await axios.delete(
      `https://ecommerce.routemisr.com/api/v1/wishlist/${id}`,
      {
        headers: {
          token: token,
        },
      },
    );

    return res.data;
  } catch (error) {
    console.error("Error fetching products:", error);
  }
}
export async function getDataOfWishList(token) {
  try {
    // Pass both page and limit to the API
    let res = await axios.get(
      'https://ecommerce.routemisr.com/api/v1/wishlist',
      {
        headers: {
          token: token,
        },
      },
    );

    return res.data;
  } catch (error) {
    console.error("Error fetching products:", error);
  }
}
