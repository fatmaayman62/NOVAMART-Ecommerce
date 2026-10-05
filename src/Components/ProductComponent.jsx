import { Button } from "@heroui/react";
import React, { useState } from "react";
import { MdOutlineStarPurple500 } from "react-icons/md";
import { FaHeart } from "react-icons/fa6";
import {
  deleteFromWishList,
  postToWishList,
} from "../Services/WishListService";
import useTokenStore from "../Store/authTokenStore";
import toast from "react-hot-toast";
import useWishListStore from "../Store/wishListStore";
import useCartStore from "../Store/cartStore";

function ProductComponent({ product }) {
  const tokenAuth = useTokenStore((state) => state.token);
  const wishList = useWishListStore((state) => state.wishList);
  const addToWishList = useWishListStore((state) => state.addToWishList);
  const removeFromWishList = useWishListStore((state) => state.removeFromWishList); 
  const addToCart = useCartStore((state) => state.addToCart); 
  const cart = useCartStore((state) => state.cart) ; 


  const isInWishList=wishList.some(item=>item._id===product.id);
const isChoosed = cart.some(
  item => item.product._id === product._id
);


  async function addToWishListz(productId) {
    if (!isInWishList) {
      const res = await postToWishList(productId, tokenAuth);
     
      toast.success(res.message);
      addToWishList(product);
    } else {
      const res = await deleteFromWishList(productId, tokenAuth);
      removeFromWishList(productId)
      toast.success(res.message, {
        style: {
          border: "1px solid #713200",
          padding: "16px",
          color: "#713200",
        },
        iconTheme: {
          primary: "#713200",
          secondary: "#FFFAEE",
        },
      }); 

      // console.log(res);
    }
  }

  async function add() { 
  const res =await addToCart(product._id, tokenAuth);
  if (res === "success") {
    toast.success("Product added to cart");
  }
}

  return (
    <>
      <div
        key={product._id}
        className="group rounded-2xl shadow p-4 cursor-pointer transition-transform duration-400 hover:-translate-y-1.5"
      >
        <figure className="h-40 overflow-hidden relative">
          <img
            src={product.imageCover}
            alt={product.title}
            className="w-full h-full object-cover mb-2 transition-transform duration-400 group-hover:scale-125"
          />
          <span
            onClick={() => addToWishListz(product.id)}
            className={`text-2xl absolute top-1 right-1 translate-x-4 opacity-0 transition-all duration-600 group-hover:-translate-x-1 group-hover:opacity-100 hover:scale-125 ${isInWishList ? "text-red-500" : "text-black"}`}
          >
            <FaHeart />
          </span>
        </figure>
        <div className="pt-4 flex flex-col gap-1">
          <div className="flex justify-between">
            <h3 className="font-bold truncate">
              {product.title.split(" ").slice(0, 2).join(" ")}
            </h3>
            <span className="flex items-center gap-0.5">
              {product.ratingsAverage}
              <MdOutlineStarPurple500 className="text-amber-400 text-[18px]" />
            </span>
          </div>
          <p className="text-sm text-gray-500">
            {product.description.split(" ").slice(0, 2).join(" ")}...
          </p>
          <div className="flex justify-between">
            <h4>Price</h4>
            <p className="text-gray-500">${product.price}</p>
          </div>
          <Button onPress={()=>add()} className={`w-full ${isChoosed?'cursor-not-allowed':'cursor-pointer'}`} disabled={isChoosed} color="primary">
            Add To Cart
          </Button>
        </div>
      </div>
    </>
  );
}

export default ProductComponent;
