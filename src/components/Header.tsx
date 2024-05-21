import Link from "next/link";
import React, { useState } from "react";
import { IoCartOutline } from "react-icons/io5";
import useUserStore from "@/store/login-store";
import Cart from "./Cart";

const Header = () => {
  const isLoggedIn = useUserStore((state) => state.isLoggedIn);
  const username = useUserStore((state) => state.username);
  const logout = useUserStore((state) => state.logout);
  const [showCart, setShowCart] = useState<boolean>(false);
  const handleShowCart = () => {
    setShowCart(true);
  };
  const handleCloseCart = () => {
    setShowCart(false);
  };
  return (
    <div>
      {showCart && <Cart handleCloseCart ={handleCloseCart} />}
      <header className="bg-white">
        <nav
          className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
          aria-label="Global"
        >
          <div className="flex lg:flex-1">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <Link href="/">
                <img
                  className="h-8 w-auto"
                  src="/International_Pokémon_logo.png"
                  alt="Pokémon Logo"
                />
              </Link>
            </a>
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            </button>
          </div>
          <div className="hidden lg:flex lg:gap-x-12">
            <Link
              href="/sets"
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              Sets
            </Link>
          </div>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            {isLoggedIn ? (
              <div className="flex items-center">
                <span className="text-sm font-semibold leading-6 text-gray-900 mr-4">
                  Welcome, {username}!
                </span>
                <button
                  onClick={logout}
                  className="text-sm font-semibold leading-6 text-gray-900"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                className="text-sm font-semibold leading-6 text-gray-900"
              >
                Log in <span aria-hidden="true">&rarr;</span>
              </Link>
            )}
          </div>
          <div className="ml-2 text-lg">
            <button onClick={handleShowCart}>
              <IoCartOutline />
            </button>
          </div>
        </nav>
      </header>
      <hr />
    </div>
  );
};

export default Header;
