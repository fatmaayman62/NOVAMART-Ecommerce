import React from 'react'
import { Link } from "react-router-dom";

function CategoriesHomePage({categories}) {
  return (
    <>
        <section>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-blue-900">Shop by Category</h2>
          <Link
            to={"/categories"}
            className="text-sm font-semibold text-blue-500 hover:underline cursor-pointer"
          >
            View All
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {categories.slice(0, 6).map((cat) => (
            <div
              key={cat._id}
              className="bg-white border border-blue-100 rounded-xl p-4 text-center shadow-sm hover:shadow-md hover:border-blue-300 transition-all cursor-pointer group"
            >
              <img
                src={cat.image}
                alt={cat.name}
                className="w-20 h-20 object-cover rounded-full mx-auto mb-3 border-2 border-blue-100 group-hover:border-blue-500 transition-colors"
              />
              <h3 className="text-sm font-bold text-blue-950 truncate">
                {cat.name}
              </h3>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}

export default CategoriesHomePage