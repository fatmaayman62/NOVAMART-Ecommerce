import React from 'react'
import { Link } from "react-router-dom";

function ProductsHomePage({products,cart}) {
  return (
    <>
    <section>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-blue-900">Popular Products</h2>
          <Link
            to={"/products"}
            className="text-sm font-semibold text-blue-500 hover:underline cursor-pointer"
          >
            View All
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.slice(0, 8).map((prod) => (
            <div
              key={prod._id}
              className="bg-white border border-blue-100 rounded-2xl p-4 shadow-sm hover:shadow-md hover:border-blue-300 transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="relative overflow-hidden rounded-xl mb-4 bg-blue-50">
                  <img
                    src={prod.imageCover}
                    alt={prod.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <span className="absolute top-2 right-2 bg-white/90 backdrop-blur text-blue-600 text-xs font-bold px-2 py-1 rounded-md shadow">
                    ★ {prod.ratingsAverage}
                  </span>
                </div>
                <span className="text-xs font-semibold text-blue-500 uppercase tracking-wider">
                  {prod.category?.name}
                </span>
                <h3 className="text-base font-bold text-blue-950 mt-1 line-clamp-1">
                  {prod.title}
                </h3>
              </div>

              <div className="mt-4 flex items-center justify-between pt-3 border-t border-blue-50">
                <span className="text-lg font-extrabold text-blue-600">
                  {prod.price} EGP
                </span>
                <button
                  onClick={() => add(prod)}
                  className={`w-full ${
                    cart.some((item) => item.product._id === prod._id)
                      ? "cursor-not-allowed"
                      : "cursor-pointer"
                  } bg-blue-500 hover:bg-blue-600 text-white text-xs font-semibold px-3.5 py-2 rounded-lg shadow transition-colors`}
                  disabled={cart.some((item) => item.product._id === prod._id)}
                >
                  + Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}

export default ProductsHomePage