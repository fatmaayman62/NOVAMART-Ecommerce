import React, { useState } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from "@heroui/react";
import { TbActivityHeartbeat } from "react-icons/tb";
import { LiaOpencart } from "react-icons/lia";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";
import useCartStore from "../Store/cartStore";
import useWishListStore from "../Store/wishListStore";
import useTokenStore from "../Store/authTokenStore";

function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const cart = useCartStore((state) => state.cart) || [];
  const wishList = useWishListStore((state) => state.wishList) || [];
  const clearToken = useTokenStore((state) => state?.clearToken);
  const token = useTokenStore((state) => state?.token);
  

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Products", path: "/products" },
    { name: "Brands", path: "/brands" },
    { name: "Categories", path: "/categories" },
  ];

  const menuItems = [
    "Profile",
    "Dashboard",
    "Activity",
    "Analytics",
    "System",
    "Deployments",
    "My Settings",
    "Team Settings",
    "Help & Feedback",
    "Log Out",
  ];

  const handleLogout = () => {
    clearToken();
    navigate("/login");
  };

  return (
    <Navbar
      onMenuOpenChange={setIsMenuOpen}
      maxWidth="full"
      className="bg-transparent shadow-none border-none"
      classNames={{
        wrapper: "px-0",
      }}
    >
      {/* Mobile Menu Toggle */}
      <NavbarContent className="sm:hidden" justify="start">
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="text-blue-500"
        />
      </NavbarContent>

      {/* Brand Logo */}
      <NavbarContent className="sm:pr-3" justify="start">
        <NavbarBrand>
          <Link
            to="/"
            className="flex items-center gap-1 text-2xl font-black text-blue-500 tracking-tight"
          >
            NOVA<span className="text-blue-900 font-bold">MART</span>
          </Link>
        </NavbarBrand>
      </NavbarContent>

      {/* Center Navigation Links (Only show when authenticated) */}
      {token !== "" && (
        <NavbarContent className="hidden sm:flex gap-4" justify="center">
          {navLinks.map((link) => (
            <NavbarItem key={link.name}>
              <NavLink 
                to={link.path}
                className={({ isActive }) =>
                  isActive ? "text-blue-600 font-bold" : "text-gray-600 hover:text-blue-500"
                }
              >
                {link.name}
              </NavLink>
            </NavbarItem>
          ))}
        </NavbarContent>
      )}

      {/* Right Content (Conditional based on Auth State) */}
      <NavbarContent justify="end" className="gap-4">
        {token !== "" ? (
          <>
            {/* Wishlist Icon */}
            <NavbarItem>
              <Link
                to="/wishList"
                className="text-2xl text-sky-500 hover:text-sky-600 transition-colors duration-300 relative"
              >
                {wishList.length > 0 && (
                  <span className="bg-blue-500 text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center absolute -top-1 -right-1 font-bold">
                    {wishList.length}
                  </span>
                )}
                <TbActivityHeartbeat />
              </Link>
            </NavbarItem>

            {/* Cart Icon */}
            <NavbarItem>
              <Link
                to="/cart"
                className="text-2xl text-slate-600 hover:text-slate-800 transition-colors duration-300 relative"
              >
                {cart.length > 0 && (
                  <span className="bg-blue-500 text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center absolute -top-1 -right-1 font-bold">
                    {cart.length}
                  </span>
                )}
                <LiaOpencart />
              </Link>
            </NavbarItem>

            {/* Logout Button */}
            <NavbarItem>
              <button
                onClick={handleLogout}
                className="text-2xl text-rose-500 hover:text-rose-600 transition-colors duration-300 cursor-pointer flex items-center"
              >
                <FiLogOut />
              </button>
            </NavbarItem>
          </>
        ) : (
          <>
            {/* Login Link */}
            <NavbarItem>
              <Link
                to="/login"
                className="text-sm font-semibold text-gray-700 hover:text-blue-600 transition-colors"
              >
                Login
              </Link>
            </NavbarItem>

            {/* Register Link */}
            <NavbarItem>
              <Link
                to="/register"
                className="text-sm font-semibold bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition-colors shadow-sm"
              >
                Register
              </Link>
            </NavbarItem>
          </>
        )}
      </NavbarContent>

      {/* Mobile Dropdown Menu */}
      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              className="w-full"
              color={
                index === 2
                  ? "primary"
                  : index === menuItems.length - 1
                  ? "danger"
                  : "foreground"
              }
              href="#"
              size="lg"
            >
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}

export default NavBar;