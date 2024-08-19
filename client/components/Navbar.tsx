"use client";

import Link from "next/link";
import { useState } from "react";
import { SlMenu } from "react-icons/sl";
import { MdOutlineClear } from "react-icons/md";

/*
export default function Navbar() {
  const [showMenuIcon, setShowMenuIcon] = useState(false);

  return (
    <div className="flex justify-between items-center p-4 bg-sky-900 text-white text-lg font-normal">
      <div className="">
        <Link href="/">Shopping Cart</Link>
      </div>
      <div className="md:flex md:w-3/6 md:justify-end hidden md:block gap-4">
        <div><Link href="/products">Products</Link></div>
        <div><Link href="/cart">Cart</Link></div>
        <div>
          <Link href="/register">Register/Login</Link>
        </div>
      </div>
      <div className="md:hidden" onClick={() => setShowMenuIcon(!showMenuIcon)}>
        {showMenuIcon ?
          <MdOutlineClear />
          :
          <SlMenu />
        }
      </div>
    </div>
  );
};
*/

export default function Navbar() {
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <nav className="bg-white shadow-md">
      <div className="container p-4 grid grid-cols-3 items-center lg:grid-cols-4">
        {/* Logo or Brand Name */}
        <div className="col-span-2 lg:col-span-1">
          <Link href="/" className="text-lg font-bold">Shopping Cart</Link>
        </div>

        {/* Desktop Menu */}
        <div className="hidden lg:flex col-span-3 justify-end">
          <div className="space-x-6">
            <Link href="/products" className="hover:text-gray-100 transition ease-in-out">Products</Link>
            <Link href="/cart" className="hover:text-gray-700">Cart</Link>
            <Link href="/register" className="hover:text-gray-700">Register/Login</Link>
          </div>
        </div>

        {/* Mobile Menu Icon */}
        <div className="col-span-1 flex justify-end lg:hidden">
          <div onClick={() => setShowSidebar(!showSidebar)} className="cursor-pointer">
            {showSidebar ? <MdOutlineClear size={24} /> : <SlMenu size={24} />}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {showSidebar && (
        <div
          className={`fixed top-0 left-0 w-3/4 h-full bg-white shadow-lg transform ${showSidebar ? 'translate-x-0' : '-translate-x-full'
            } transition-transform duration-300 ease-in-out lg:hidden z-40`}
          onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the sidebar
        >
          <div className="p-4 space-y-4">
            <Link href="/products" className="block" onClick={() => setShowSidebar(false)}>Products</Link>
            <Link href="/cart" className="block" onClick={() => setShowSidebar(false)}>Cart</Link>
            <Link href="/register" className="block" onClick={() => setShowSidebar(false)}>Register/Login</Link>
          </div>
        </div>
      )}

      {showSidebar && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-30 lg:hidden"
          onClick={() => setShowSidebar(false)}
        ></div>
      )}
    </nav>
  );
}
