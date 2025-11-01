"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import menuIcon from "@/assets/icons/menu.svg";
import searchIcon from "@/assets/icons/search.svg";
import cartIcon from "@/assets/icons/shopping-cart.svg";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";
import { X, Heart } from "lucide-react";

// Dynamic import for DemoModal - only loads when needed
const DemoModal = dynamic(() => import("@/components/DemoModal"), {
  ssr: false,
});

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showDemoModal, setShowDemoModal] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const { cartCount } = useCart();
  const { wishlist } = useWishlist();
  
  const handleDemoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowDemoModal(true);
  };

  return (
    <>
      <nav className="sticky top-0 left-0 right-0 w-full bg-[#2f2f2f] text-[#fff] border-b border-white z-10">
        <div className="flex items-center justify-between w-full max-w-7xl mx-auto px-[25px]">
          {/* Logo */}
          <div
            className="text-[22px] font-[700] py-[22px]"
            style={{ fontFamily: "var(--font-cambay)" }}
          >
            Cozy
          </div>

          {/* Links (desktop only) */}
          <ul className="hidden md:flex space-x-[40px] py-[22px]">
            <li>
              <Link
                href="/"
                className={`${pathname === '/' ? 'text-[#f1b345]' : 'hover:text-[#f1b345]'} transition text-[12px] leading-[16px] tracking-normal`}
                style={{ fontFamily: "var(--font-inter)" }}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="#"
                onClick={handleDemoClick}
                className="hover:text-[#f1b345] transition text-[12px] leading-[16px] tracking-normal"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                Category
              </Link>
            </li>
            <li>
              <Link
                href="/products"
                className={`${pathname === '/products' || pathname.startsWith('/products/') ? 'text-[#f1b345]' : 'hover:text-[#f1b345]'} transition text-[12px] leading-[16px] tracking-normal`}
                style={{ fontFamily: "var(--font-inter)" }}
              >
                Products
              </Link>
            </li>
            <li>
              <Link
                href="#"
                onClick={handleDemoClick}
                className="hover:text-[#f1b345] transition text-[12px] leading-[16px] tracking-normal"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                CONTACT
              </Link>
            </li>
          </ul>

          {/* Right icons */}
          <div className="flex items-stretch space-x-3">
            {/* Toggle button (mobile only) */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 hover:text-[#f1b345] transition"
              aria-label="Menu"
            >
              <Image src={menuIcon} alt="Menu" width={20} height={20} />
            </button>

            {/* Search */}
            <button
              aria-label="search"
              onClick={handleDemoClick}
              className="hover:text-[#f1b345] transition pr-[10px] py-[22px]"
            >
              <Image src={searchIcon} alt="Search" width={20} height={20} />
            </button>

            {/* Wishlist */}
            <div className="flex items-center border-[#D1D1D8] pr-[10px] relative">
              <button
                aria-label="wishlist"
                className="hover:text-[#f1b345] transition relative"
                onClick={() => router.push('/wishlist')}
              >
                <Heart className="w-5 h-5" />
                {wishlist.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-[#f1b345] text-[#2f2f2f] text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {wishlist.length}
                  </span>
                )}
              </button>
            </div>

            {/* Cart */}
            <div className="flex items-center pl-[34px] border-l border-[#D1D1D8] relative">
              <button
                aria-label="cart"
                className="hover:text-[#f1b345] transition relative"
                onClick={() => router.push('/cart')}
              >
                <Image src={cartIcon} alt="Cart" width={20} height={20} />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-[#f1b345] text-[#2f2f2f] text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu - Modern Slide-in */}
      <div
        className={`fixed inset-0 z-50 md:hidden transition-transform duration-300 ease-in-out ${
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/50"
          onClick={() => setMobileMenuOpen(false)}
        />
        
        {/* Slide-in menu */}
        <div className="absolute right-0 top-0 h-full w-80 bg-[#2f2f2f] shadow-2xl">
          <div className="flex items-center justify-between p-6 border-b border-gray-800">
            <h2 className="text-xl font-bold text-white">Menu</h2>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="text-zinc-400 hover:text-white transition"
              aria-label="Close menu"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          
          <nav className="flex flex-col p-6 space-y-4">
            <Link
              href="/"
              className={`${pathname === '/' ? 'text-[#f1b345]' : 'text-white'} hover:text-[#f1b345] transition text-lg font-medium`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setMobileMenuOpen(false);
                setShowDemoModal(true);
              }}
              className="text-white hover:text-[#f1b345] transition text-lg font-medium"
            >
              Category
            </Link>
            <Link
              href="/products"
              className={`${pathname === '/products' || pathname.startsWith('/products/') ? 'text-[#f1b345]' : 'text-white'} hover:text-[#f1b345] transition text-lg font-medium`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Products
            </Link>
            <Link
              href="/wishlist"
              className={`${pathname === '/wishlist' ? 'text-[#f1b345]' : 'text-white'} hover:text-[#f1b345] transition text-lg font-medium`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Wishlist
            </Link>
            <Link
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setMobileMenuOpen(false);
                setShowDemoModal(true);
              }}
              className="text-white hover:text-[#f1b345] transition text-lg font-medium"
            >
              CONTACT
            </Link>
          </nav>
        </div>
      </div>

      {/* Demo Modal */}
      <DemoModal isOpen={showDemoModal} onClose={() => setShowDemoModal(false)} />
    </>
  );
}
