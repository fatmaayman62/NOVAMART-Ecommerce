import React, { useEffect, useState } from 'react';
import { deleteFromWishList, getDataOfWishList } from '../Services/WishListService';
import useTokenStore from '../Store/authTokenStore';
import toast from 'react-hot-toast';
import useWishListStore from '../Store/wishListStore';

function WishList() { 
  const token=useTokenStore((state)=>state.token); 
  const wishList=useWishListStore((state)=>state.wishList);
  const removeFromWishList=useWishListStore((state)=>state.removeFromWishList);
 
  // Remove product from Wishlist
  const handleRemove = async(id) => {
      removeFromWishList(id);
     const res = await deleteFromWishList(id, token);
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
      
  };

 

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-blue-100 mb-8">
          <div>
            <h1 className="text-3xl font-extrabold text-blue-950 flex items-center gap-3">
              <svg className="w-8 h-8 text-blue-600 fill-current" viewBox="0 0 24 24">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
              </svg>
              My Saved Wishlist
            </h1>
            <p className="text-sm text-blue-600 mt-1 ms-2 font-medium">
              You have <span className="font-bold text-blue-800">{wishList.length}</span> items in your blue collection
            </p>
          </div>
 
        </div>

        {/* Loading State */}
        { wishList.length === 0 ? (
          /* Empty State */
          <div className="text-center py-20 bg-white rounded-2xl shadow-sm border border-blue-100 max-w-md mx-auto">
            <div className="w-16 h-16 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-slate-800">Your wishlist is empty</h3>
            <p className="text-slate-500 text-sm mt-1 mb-6">Explore products and save your favorite blue items!</p>
            <button className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-6 py-2.5 rounded-xl shadow-md shadow-blue-200 transition-all">
              Continue Shopping
            </button>
          </div>
        ) : (
          /* Product Grid */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {wishList.map((product) => {
              const hasDiscount = Boolean(product.priceAfterDiscount);
              
              return (
                <div 
                  key={product._id} 
                  className="group bg-white rounded-2xl border border-blue-100 shadow-sm hover:shadow-xl hover:border-blue-300 transition-all duration-300 flex flex-col justify-between overflow-hidden relative"
                >
                  {/* Top Floating Badge (Brand) */}
                  <div className="absolute top-3 left-3 z-10 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-full border border-blue-100 text-xs font-semibold text-blue-900 shadow-sm">
                    {product.brand?.name}
                  </div>

                  {/* Remove Button */}
                  <button 
                    onClick={() => handleRemove(product._id)}
                    className="absolute top-3 right-3 z-10 cursor-pointer p-2 bg-white/90 backdrop-blur-md hover:bg-red-50 text-slate-400 hover:text-red-500 rounded-full transition-all border border-slate-100 shadow-sm"
                    title="Remove from Wishlist"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>

                  {/* Product Image */}
                  <div className="relative aspect-square h-50 overflow-hidden bg-slate-100">
                    <img 
                      src={product.imageCover} 
                      alt={product.title}
                      className="w-full h-full object-cover  group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  {/* Details Container */}
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      {/* Category Name */}
                      <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">
                        {product.category?.name}
                      </span>

                      {/* Product Title */}
                      <h3 className="font-semibold text-slate-800 text-sm mt-1 line-clamp-2 min-h-[2.5rem] group-hover:text-blue-600 transition-colors">
                        {product.title}
                      </h3>

                      {/* Ratings & Stock */}
                      <div className="flex items-center justify-between my-3 text-xs">
                        <div className="flex items-center gap-1 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                          <span className="text-amber-500 font-bold">★ {product.ratingsAverage}</span>
                          <span className="text-slate-400">({product.ratingsQuantity})</span>
                        </div>
                        <span className="text-slate-400 font-medium">In Stock: {product.quantity}</span>
                      </div>
                    </div>

                    {/* Price & Action Button */}
                    <div className="pt-3 border-t border-slate-100 mt-2">
                      <div className="flex items-baseline gap-2 mb-3">
                        <span className="text-xl font-black text-blue-900">
                          {hasDiscount ? product.priceAfterDiscount : product.price} EGP
                        </span>
                        {hasDiscount && (
                          <span className="text-xs font-medium text-slate-400 line-through">
                            {product.price} EGP
                          </span>
                        )}
                      </div>

                      {/* Add to Cart Button */}
                      <button className="w-full bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-sm font-semibold py-2.5 px-4 rounded-xl shadow-md shadow-blue-100 hover:shadow-blue-200 transition-all flex items-center justify-center gap-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        Add To Cart
                      </button>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </div>
  );
}

export default WishList;