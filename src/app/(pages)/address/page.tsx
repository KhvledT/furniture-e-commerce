"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ChevronRight, Plus, Trash2 } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { getEstimatedDeliveryDate } from "@/lib/dateUtils";
import {
  getAddresses,
  removeAddress as removeAddressFromStorage,
  initializeDemoData,
  Address,
} from "@/lib/localStorage";
import DemoModal from "@/components/DemoModal";
import PageTransition from "@/components/animations/PageTransition";

export default function AddressPage() {
  const { cart } = useCart();
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [selectedAddressId, setSelectedAddressId] = useState<string>("");
  const [showDemoModal, setShowDemoModal] = useState(false);

  useEffect(() => {
    initializeDemoData();
    const loadedAddresses = getAddresses();
    setAddresses(loadedAddresses);
    if (loadedAddresses.length > 0) {
      setSelectedAddressId(loadedAddresses[0].id);
    }
  }, []);

  const removeAddress = (id: string) => {
    removeAddressFromStorage(id);
    setAddresses(getAddresses());
    if (selectedAddressId === id && addresses.length > 0) {
      setSelectedAddressId(addresses[0].id);
    }
  };

  const calculateSubtotal = () => {
    // This would normally calculate from cart items
    return 319.98;
  };

  const calculateDiscount = () => {
    const subtotal = calculateSubtotal();
    return subtotal >= 150 ? subtotal * 0.1 : 0;
  };

  const calculateTotal = () => {
    return calculateSubtotal() - calculateDiscount();
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-[#2f2f2f] text-white font-sans py-12 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-7xl">
        {/* Breadcrumbs */}
        <div className="flex items-center space-x-2 text-xl font-medium mb-8">
          <span className="text-white">Address</span>
          <ChevronRight className="w-5 h-5 text-zinc-500" />
          <span className="text-zinc-500">Payment</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-16">
          {/* Left Column: Address Selection */}
          <div className="lg:col-span-2 space-y-8">
            {addresses.map((address) => (
              <div
                key={address.id}
                className={`border ${
                  selectedAddressId === address.id
                    ? "border-amber-500 bg-[#3a3a3a]"
                    : "border-zinc-700"
                } p-5 rounded-lg cursor-pointer transition-colors`}
                onClick={() => setSelectedAddressId(address.id)}
              >
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center space-x-3">
                    <span
                      className={`w-4 h-4 rounded-full border-2 ${
                        selectedAddressId === address.id
                          ? "bg-amber-500 border-amber-500"
                          : "bg-zinc-700 border-zinc-500"
                      }`}
                    />
                    <h2 className="text-lg font-semibold text-white">{address.name}</h2>
                    <span
                      className={`text-xs font-medium px-2 py-0.5 rounded-sm ${
                        address.type === "HOME"
                          ? "bg-amber-900 text-amber-300"
                          : address.type === "OFFICE"
                          ? "bg-green-900 text-green-300"
                          : "bg-blue-900 text-blue-300"
                      }`}
                    >
                      {address.type}
                    </span>
                  </div>
                  <div className="flex space-x-4 text-sm">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowDemoModal(true);
                      }}
                      className="text-zinc-300 hover:text-white"
                    >
                      Edit
                    </button>
                    <span className="text-zinc-600">|</span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        removeAddress(address.id);
                      }}
                      className="text-red-500 hover:text-red-400 flex items-center gap-1"
                    >
                      <Trash2 className="w-4 h-4" />
                      Remove
                    </button>
                  </div>
                </div>
                <div className="pl-7 text-zinc-300 space-y-1">
                  <p>{address.address}</p>
                  <p>Contact - {address.contact}</p>
                </div>
              </div>
            ))}

            {/* Add New Address Button */}
            <button
              onClick={() => setShowDemoModal(true)}
              className="flex items-center space-x-2 text-amber-500 hover:text-amber-400 transition-colors"
            >
              <Plus className="w-5 h-5" />
              <span>Add New Address</span>
            </button>

            <hr className="border-t border-zinc-700 mt-12" />
          </div>

          {/* Right Column: Order Summary */}
          <div className="bg-[#2f2f2f] p-6 shadow-lg h-fit border border-white w-full">
            <h2 className="text-xl font-bold mb-6 text-white">Order Summary</h2>

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

            <Link
              href="/payment"
              className="w-full bg-[#F1B345] text-white py-3 px-4 rounded-md hover:bg-amber-500 transition-colors duration-300 text-lg text-center block"
            >
              Continue to Payment
            </Link>
          </div>
        </div>
      </div>

      <DemoModal isOpen={showDemoModal} onClose={() => setShowDemoModal(false)} />
    </div>
    </PageTransition>
  );
}
