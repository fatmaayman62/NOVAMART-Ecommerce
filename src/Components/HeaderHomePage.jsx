import React from 'react'
import { Link } from "react-router-dom";

function HeaderHomePage() {
  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center bg-gradient-to-br from-blue-900 via-blue-800 to-blue-600 rounded-3xl p-6 md:p-10 text-white shadow-xl overflow-hidden">
        {/* Left Column: Text & CTA */}
        <div className="lg:col-span-7 flex flex-col items-start justify-center gap-5 z-10">
          <div className="inline-flex items-center gap-2 bg-blue-500/50 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border border-blue-400/30">
            <span className="w-2 h-2 rounded-full bg-blue-300 animate-pulse"></span>
            Exclusive Offer 2026
          </div>

          <h1 className="text-3xl md:text-5xl font-black leading-tight tracking-tight">
            Discover the Best Fashion & Lifestyle Products
          </h1>

          <p className="text-blue-100 text-sm md:text-base font-normal leading-relaxed max-w-lg">
            Upgrade your wardrobe with top global brands, trending apparel, and
            unbeatable seasonal discounts.
          </p>

          <div className="flex items-center gap-4 mt-2">
            <Link
              to={"/products"}
              className="bg-white text-blue-950 hover:bg-blue-50 font-extrabold px-8 py-3.5 rounded-2xl shadow-lg transition-all duration-200 hover:-translate-y-0.5"
            >
              Shop Collection
            </Link>
            <div className="text-xs text-blue-200 font-medium">
              ⚡ Fast Delivery & <br />
              Secure Checkout
            </div>
          </div>
        </div>

        {/* Right Column: Modern Image Grid Preview */}
        <div className="lg:col-span-5 grid grid-cols-2 gap-3 z-10">
          <div className="space-y-3">
            <div className="h-36 rounded-2xl overflow-hidden border border-white/20 shadow-md">
              <img
                src="https://ecommerce.routemisr.com/Route-Academy-products/1680403266739-cover.jpeg"
                alt="Fashion Item 1"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="h-24 rounded-2xl overflow-hidden border border-white/20 shadow-md bg-blue-950/40 p-3 flex flex-col justify-end">
              <span className="text-xs font-bold text-blue-200">
                New Arrivals
              </span>
              <span className="text-sm font-black text-white">
                Up to 40% OFF
              </span>
            </div>
          </div>

          <div className="space-y-3 pt-6">
            <div className="h-24 rounded-2xl overflow-hidden border border-white/20 shadow-md bg-white/10 backdrop-blur-md p-3 flex flex-col justify-center text-center">
              <span className="text-2xl font-black text-white">100+</span>
              <span className="text-[10px] uppercase font-bold text-blue-200 tracking-wider">
                Top Brands
              </span>
            </div>
            <div className="h-36 rounded-2xl overflow-hidden border border-white/20 shadow-md">
              <img
                src="https://ecommerce.routemisr.com/Route-Academy-categories/1681511818071.jpeg"
                alt="Fashion Item 2"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>
        </div>
      </div>  
    </>
  )
}

export default HeaderHomePage