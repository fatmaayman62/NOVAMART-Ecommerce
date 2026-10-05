import React, { useEffect, useState } from "react";
import axios from "axios";
import useCartStore from "../Store/cartStore";
import toast from "react-hot-toast";
import useTokenStore from "../Store/authTokenStore";
import HeaderHomePage from "../Components/HeaderHomePage";
import CategoriesHomePage from "../Components/CategoriesHomePage";
import ProductsHomePage from "../Components/ProductsHomePage";
import BrandsHomePage from "../Components/BrandsHomePage";

function Home() {
  const tokenAuth = useTokenStore((state) => state.token);

  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const addToCart = useCartStore((state) => state.addToCart);
  const cart = useCartStore((state) => state.cart);

  async function add(product) {
    const res = await addToCart(product._id, tokenAuth);

    if (res === "success") {
      toast.success("Product added to cart");
    }
  }

  // Fetch all home data on mount
  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        const [catRes, brandRes, prodRes] = await Promise.all([
          axios.get("https://ecommerce.routemisr.com/api/v1/categories"),
          axios.get("https://ecommerce.routemisr.com/api/v1/brands"),
          axios.get("https://ecommerce.routemisr.com/api/v1/products"),
        ]);

        setCategories(catRes.data.data || []);
        setBrands(brandRes.data.data || []);
        setProducts(prodRes.data.data || []);
      } catch (error) {
        console.error("Error fetching home data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHomeData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh] text-blue-500 font-semibold text-lg">
        Loading Home Page...
      </div>
    );
  }

  return (
    <div className="py-8 font-sans space-y-12">
      {/* HERO BANNER */}
      <HeaderHomePage />

      {/* CATEGORIES SECTION */}
      <CategoriesHomePage categories={categories} />

      {/* FEATURED BRANDS SECTION */}
      <BrandsHomePage brands={brands} />

      {/* PRODUCTS SECTION */}
      <ProductsHomePage cart={cart} products={products} />
    </div>
  );
}

export default Home;
