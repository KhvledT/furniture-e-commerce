"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Plus, Minus, Trash2 } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { getProductById } from "@/lib/products";
import { getEstimatedDeliveryDate } from "@/lib/dateUtils";
import PageTransition from "@/components/animations/PageTransition";

export default function CartPage() {
  const { cart, updateQuantity, removeItem } = useCart();
  const [cartItems, setCartItems] = useState<Array<{
    product: any;
    quantity: number;
    color?: string;
  }>>([]);

  useEffect(() => {
    const items = cart.map((item) => {
      const product = getProductById(item.productId);
      return {
        product,
        quantity: item.quantity,
        color: item.selectedColor,
      };
    }).filter((item) => item.product !== undefined);

    setCartItems(items);
  }, [cart]);

  const handleQuantityChange = (productId: string, newQuantity: number, color?: string) => {
    if (newQuantity <= 0) {
      removeItem(productId, color);
    } else {
      updateQuantity(productId, newQuantity, color);
    }
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => {
      return total + (item.product.price * item.quantity);
    }, 0);
  };

  const calculateDiscount = () => {
    const subtotal = calculateSubtotal();
    return subtotal >= 150 ? subtotal * 0.1 : 0;
  };

  const calculateTotal = () => {
    return calculateSubtotal() - calculateDiscount();
  };

  if (cartItems.length === 0) {
    return (
      <PageTransition>
        <div className="min-h-screen bg-[#2f2f2f] text-white font-sans py-12 px-4 sm:px-6 lg:px-8">
          <div className="container mx-auto max-w-7xl">
            <h1 className="text-xl font-semibold mb-8 text-zinc-300">Cart</h1>
            <div className="text-center py-16">
              <p className="text-2xl mb-4 text-zinc-400">Your cart is empty</p>
              <Link
                href="/products"
                className="inline-block bg-[#F1B345] text-black py-3 px-6 rounded-md hover:bg-amber-500 transition-colors duration-300"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <div className="min-h-screen bg-[#2f2f2f] text-white font-sans py-12 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-7xl">
        <h1 className="text-xl font-semibold mb-8 text-zinc-300">
          Cart <span className="font-normal">{cart.length} ITEMS</span>
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            {cartItems.map((item) => (
              <div
                key={`${item.product.id}-${item.color || 'default'}`}
                className="flex items-start justify-between bg-[#2f2f2f] p-4 rounded-lg shadow-sm"
              >
                <div className="flex items-center space-x-4">
                  <div className="shrink-0 w-24 h-24 bg-[#2f2f2f] rounded-md flex items-center justify-center p-2">
                    <Image
                      src={item.product.images[0]}
                      alt={item.product.name}
                      width={96}
                      height={96}
                      className="object-contain"
                    />
                  </div>
                  <div>
                    <h2 className="text-lg font-medium text-white">{item.product.name}</h2>
                    {item.color && (
                      <p className="text-sm text-zinc-400">Color: {item.color}</p>
                    )}
                    <div className="flex items-center mt-3 space-x-2">
                      <button
                        onClick={() =>
                          handleQuantityChange(item.product.id, item.quantity - 1, item.color)
                        }
                        className="text-zinc-300 hover:text-white"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="bg-zinc-600 text-white text-xs px-3 py-1 rounded">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          handleQuantityChange(item.product.id, item.quantity + 1, item.color)
                        }
                        className="text-zinc-300 hover:text-white"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => removeItem(item.product.id, item.color)}
                        className="text-red-400 text-sm ml-4 hover:text-red-300 flex items-center gap-1"
                      >
                        <Trash2 className="w-4 h-4" />
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
                <p className="text-lg font-semibold text-white">
                  ${(item.product.price * item.quantity).toFixed(2)}
                </p>
              </div>
            ))}

            {/* Discount Banner */}
            <div className="bg-[#F1B34561] text-white p-4 rounded-lg text-sm flex items-center shadow-sm">
              <span className="font-bold pr-2 text-2xl">%</span> 10% Instant Discount with
              Federal Bank Debit Cards on a min spend of $150. TCA
            </div>
          </div>

          {/* Right Column: Order Summary */}
          <div className="bg-[#2f2f2f] p-6 shadow-lg h-fit border border-white">
            <h2 className="text-xl font-bold mb-6">Order Summary</h2>

            <div className="space-y-3 border-b border-zinc-600 pb-4 mb-4">
              <div className="flex justify-between">
                <span className="text-zinc-300">Price</span>
                <span className="text-white">${calculateSubtotal().toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-300">Discount</span>
                <span className="text-green-400">
                  -${calculateDiscount().toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-300">Shipping</span>
                <span className="text-amber-400">Free</span>
              </div>
            </div>

            <div className="flex justify-between font-bold text-lg mb-6">
              <span className="text-white">TOTAL</span>
              <span className="text-white">${calculateTotal().toFixed(2)}</span>
            </div>

            <p className="text-sm text-zinc-400 mb-4">
              Estimated Delivery by <span className="text-white">{getEstimatedDeliveryDate()}</span>
            </p>

            <div className="relative mb-6">
              <input
                type="text"
                placeholder="Coupon Code"
                className="w-full p-3 pr-12 bg-zinc-600 border border-zinc-500 rounded-md text-white placeholder-zinc-400 focus:outline-none focus:ring-1 focus:ring-amber-400"
              />
              <button className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white">
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            <Link
              href="/address"
              className="w-full bg-[#F1B345] text-white py-3 px-4 rounded-md hover:bg-amber-500 transition-colors duration-300 text-lg text-center block"
            >
              Proceed to Checkout
            </Link>
          </div>
        </div>
      </div>
    </div>
    </PageTransition>
  );
}
