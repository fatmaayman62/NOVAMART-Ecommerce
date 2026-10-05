import axios from "axios";



export async function getProducts(page,limit){
        try {
      // Pass both page and limit to the API
      let res = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/products?page=${page}&limit=${limit}`,
      );

    return(res.data)
    } catch (error) {
      console.error("Error fetching products:", error);
    }
}
export async function getBrands(page,limit){
        try {
      // Pass both page and limit to the API
      let res = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/brands?page=${page}&limit=${limit}`,
      );

    return(res.data)
    } catch (error) {
      console.error("Error fetching products:", error);
    }
}


export async function getCategories(page,limit){
        try {
      // Pass both page and limit to the API
      let res = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/categories?page=${page}&limit=${limit}`,
      );

    return(res.data)
    } catch (error) {
      console.error("Error fetching products:", error);
    }
}
export async function confirmOrders(id,token,values){
        try {
      // Pass both page and limit to the API
      let res = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${id}?url=http://localhost:5173`,{shippingAddress:values},{
          headers:{token:token}
        }
      );

    return(res.data)
    } catch (error) {
      console.error("Error fetching products:", error);
    }
}

 