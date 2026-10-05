import React from 'react'
import { Link } from "react-router-dom";

function BrandsHomePage({brands}) {
  return (
    <>
       <section>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-blue-900">Featured Brands</h2>
          <Link
            to={"/brands"}
            className="text-sm font-semibold text-blue-500 hover:underline cursor-pointer"
          >
            View All
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
          {brands.slice(0, 6).map((brand) => (
            <div
              key={brand._id}
              className="bg-white border border-blue-100 rounded-xl p-4 flex flex-col items-center justify-center shadow-sm hover:shadow-md hover:border-blue-300 transition-all cursor-pointer"
            >
              <img
                src={brand.image}
                alt={brand.name}
                className="w-16 h-16 object-contain mb-2"
              />
              <h3 className="text-xs font-semibold text-blue-800">
                {brand.name}
              </h3>
            </div>
          ))}
        </div>
      </section> 
    </>
  )
}

export default BrandsHomePage