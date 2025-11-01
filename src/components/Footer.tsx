"use client";
import Image from "next/image";
import { Mail } from "lucide-react";
export default function Footer() {
  return (
    <footer className="relative bg-[#2f2f2f] text-[#e6e6e6] before:content-[''] before:absolute before:top-0 before:left-1/2 before:-translate-x-1/2 before:w-[90%] before:h-[1px] before:bg-white/20">
      <div className="max-w-[1200px] mx-auto px-6 py-7">
        <div className="grid grid-cols-2 gap-8 lg:grid-cols-[1.6fr_1fr_1fr_1fr_1.2fr]">
          {/* Brand */}
          <div className="space-y-3">
            <h3 className="text-xl font-semibold">cozy</h3>
            <p className="text-[#bfbfbf] max-w-[220px] leading-relaxed text-sm">
              Crafting spaces that speak your style.
            </p>
            <p className="text-[#bfbfbf] text-xs">Sawojajar Malang, Indonesia</p>
            <p className="text-[#bfbfbf] text-xs">+6289 456 3455</p>
          </div>

          {/* Category */}
          <div>
            <h4 className="text-lg font-semibold mb-3">Category</h4>
            <ul className="space-y-2 text-[#bfbfbf] text-sm">
              <li>Wardrobe</li>
              <li>Tables</li>
              <li>Lamp</li>
              <li>Sofa</li>
              <li>Buffet</li>
            </ul>
          </div>

          {/* Account */}
          <div>
            <h4 className="text-lg font-semibold mb-3">Account</h4>
            <ul className="space-y-2 text-[#bfbfbf] text-sm">
              <li>My Account</li>
              <li>Checkout</li>
              <li>My Cart</li>
              <li>My Catalog</li>
            </ul>
          </div>

          {/* Stay Connected */}
          <div>
            <h4 className="text-lg font-semibold mb-3">Stay Connected</h4>
            <ul className="space-y-2 text-[#bfbfbf] text-sm">
              <li>Facebook</li>
              <li>Instagram</li>
              <li>Twitter</li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="pt-1 col-span-2 lg:col-span-1">
            <h4 className="text-lg font-semibold mb-3">Stay Updated</h4>
            <form
              action="#"
              className="flex flex-col sm:flex-row gap-2"
              onSubmit={(e) => {
                e.preventDefault();
              }}
            >
              <input
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 bg-[#444444] placeholder:text-[#9b9b9b] text-[#e6e6e6] rounded-md outline-none text-sm"
              />
              <button
                type="submit"
                aria-label="Subscribe"
                className="px-4 py-3 rounded-md bg-[#d9a233]"
              >
                <Mail className="w-6 h-6 text-[#2f2f2f] font-bold" />
              </button>
            </form>
          </div>
        </div>

        {/* Footer bottom */}
        <div className="mt-8 pt-7 border-t border-white/10 text-center text-sm text-[#bfbfbf]">
          <p>© 2025 Cozy. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

