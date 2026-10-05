import axios from "axios";
import toast from "react-hot-toast";




export async function postProductToCart(id,token) {
   
    try{
        const res=await axios.post('https://ecommerce.routemisr.com/api/v1/cart',{productId:id},{headers:{token:token}})
        // console.log(res.data)
        return res.data;
    }catch(err){
        console.log(err)
    }
    
}
export async function getProductsFromCart(token) {
    try{  
        const res=await axios.get('https://ecommerce.routemisr.com/api/v1/cart',{headers:{token:token}})
         
        return res.data;
    }catch(err){
        console.log(err)
    }
    
}
export async function updateProductFromCart(id,count,token) {
    try{
        const res=await axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,{
            count:count
        },{headers:{token:token}})

        console.log(res.data)
        return res.data.data.products;
    }catch(err){
        console.log(err)
    }
    
}
export async function deleteProductFromCart(id,token) {
    try{
    
        const res=await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,{headers:{token:token}})
       
         await(res.data.status!=='fail')?toast.success('Removed Product Successfully'):toast.error("Failed Remove");
        return res.data.data.products;
    }catch(err){
        console.log(err)
    }
    
}
export async function removeCart(token) {
    try{
        const res=await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart`,{headers:{token:token}})
        return res.data.message;
    }catch(err){
        console.log(err)
    }
    
}