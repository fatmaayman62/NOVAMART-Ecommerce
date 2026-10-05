import { create } from "zustand";
import { deleteProductFromCart, getProductsFromCart, postProductToCart, removeCart, updateProductFromCart } from "../Services/CartServices";
import toast from "react-hot-toast";


 const  useCartStore=create((set)=>({
    cart:[],
    cartId:'', 
    setCart:(state)=>{set({cart:state})},
    updateCart:async(id,count,token)=>{
        const res=await updateProductFromCart(id,count,token);
        set({cart:res})
    },
    removeFromCart:async(id,token)=>{
       
        const res=await deleteProductFromCart(id,token);
        set({cart:res})
    },
    removeCart:async(token)=>{
        const res=await removeCart(token);
        if(res=="success"){
            toast.success("Removed All Products Successfully");
            set({cart:[]})
        }
    },
    addToCart:async(id,token)=>{
        const res=await postProductToCart(id,token);
            set({cart:res.data.products})
            // console.log(res)

        return res?.status

    },
    getCart:async(token)=>{
        const res=await getProductsFromCart(token);
        
        set({cart:res.data.products});
        set({cartId:res.cartId}); 
        return res;
    },

}))

export default useCartStore;