import { create } from "zustand";
import { getDataOfWishList } from "../Services/WishListService";
import useTokenStore from "./authTokenStore";

 

const useWishListStore=create((set)=>({
    wishList:[], 
    setWishList:(products)=>set({wishList:products}),
    addToWishList:(product)=>set((state)=>({wishList:[...state.wishList,product]})),
    removeFromWishList:(id)=>set((state)=>({wishList:state.wishList.filter(item=>item._id!==id)})),
    getData:async()=>{   
    const token = useTokenStore.getState().token;

    const res = await getDataOfWishList(token);

    const products = res?.data;

    set({ wishList: products });}

}))

export default useWishListStore;