"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ChevronRight, Plus, CreditCard, Trash2 } from "lucide-react";
import {
  getPaymentMethods,
  removePaymentMethod as removePaymentFromStorage,
  initializeDemoData,
  PaymentMethod,
  addOrder,
} from "@/lib/localStorage";
import { useCart } from "@/contexts/CartContext";
import { getEstimatedDeliveryDate } from "@/lib/dateUtils";
import DemoModal from "@/components/DemoModal";

export default function PaymentPage() {
  const { cart, clearCart } = useCart();
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
  const [selectedPaymentId, setSelectedPaymentId] = useState<string>("");
  const [showDemoModal, setShowDemoModal] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);

  useEffect(() => {
    initializeDemoData();
    const loadedMethods = getPaymentMethods();
    setPaymentMethods(loadedMethods);
    if (loadedMethods.length > 0) {
      setSelectedPaymentId(loadedMethods[0].id);
    }
  }, []);

  const removePayment = (id: string) => {
    removePaymentFromStorage(id);
    setPaymentMethods(getPaymentMethods());
    if (selectedPaymentId === id && paymentMethods.length > 0) {
      setSelectedPaymentId(paymentMethods[0].id);
    }
  };

  const handleCompleteOrder = () => {
    // Create order
    const order = {
      id: Date.now().toString(),
      orderDate: new Date().toISOString(),
      items: cart,
      total: 288.08,
      shippingAddress: {
        id: "1",
        name: "Huzefa Bagwala",
        type: "HOME" as const,
        address: "1131 Dusty Townline, Jacksonville",
        contact: "(936) 361-0310",
        city: "Jacksonville",
        state: "TX",
        zipCode: "40322",
        country: "United States",
      },
      paymentMethod: getPaymentMethods().find((m) => m.id === selectedPaymentId)!,
      status: "PENDING" as const,
    };

    addOrder(order);
    clearCart();
    setOrderComplete(true);
  };

  const calculateSubtotal = () => {
    return 319.98;
  };

  const calculateDiscount = () => {
    const subtotal = calculateSubtotal();
    return subtotal >= 150 ? subtotal * 0.1 : 0;
  };

  const calculateTotal = () => {
    return calculateSubtotal() - calculateDiscount();
  };

  if (orderComplete) {
    return (
        <div className="min-h-screen bg-[#2f2f2f] text-white font-sans py-12 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-2xl text-center">
          <div className="bg-[#2f2f2f] border border-amber-500 p-8 rounded-lg">
            <h1 className="text-3xl font-bold mb-4 text-amber-400">Order Confirmed!</h1>
            <p className="text-zinc-300 mb-6">
              Thank you for your purchase. Your order has been placed successfully.
            </p>
            <Link
              href="/products"
              className="inline-block bg-[#F1B345] text-black py-3 px-6 rounded-md hover:bg-amber-500 transition-colors duration-300"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
      <div className="min-h-screen bg-[#2f2f2f] text-white font-sans py-12 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-7xl">
        {/* Breadcrumbs */}
        <div className="flex items-center space-x-2 text-xl font-medium mb-12">
          <span className="text-zinc-500">Address</span>
          <ChevronRight className="w-5 h-5 text-zinc-500" />
          <span className="text-white">Payment</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-16">
          {/* Left Column: Payment Method */}
          <div className="lg:col-span-2 space-y-4">
            <h2 className="text-lg font-semibold text-white mb-4">Payment Method</h2>

            {paymentMethods.map((method) => (
              <div
                key={method.id}
                className={`flex items-center justify-between ${
                  selectedPaymentId === method.id
                    ? "bg-[#3a3a3a] border border-amber-500"
                    : "bg-[#3a3a3a] border border-zinc-700"
                } p-4 rounded-lg cursor-pointer transition-colors`}
                onClick={() => setSelectedPaymentId(method.id)}
              >
                <div className="flex items-center space-x-4">
                  <span
                    className={`w-4 h-4 rounded-full border-2 ${
                      selectedPaymentId === method.id
                        ? "bg-amber-500 border-amber-500"
                        : "bg-zinc-700 border-zinc-500"
                    }`}
                  />
                  <CreditCard className="w-8 h-auto" />
                  <span className="text-zinc-300">
                    <span className="text-white">•••• {method.cardNumber}</span>
                    <span className="ml-6">
                      Expires {method.expiryMonth}/{method.expiryYear}
                    </span>
                  </span>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    removePayment(method.id);
                  }}
                  className="text-red-500 hover:text-red-400 text-sm flex items-center gap-1"
                >
                  <Trash2 className="w-4 h-4" />
                  Remove
                </button>
              </div>
            ))}

            {/* Add New Payment Button */}
            <button
              onClick={() => setShowDemoModal(true)}
              className="flex items-center space-x-2 text-amber-500 hover:text-amber-400 transition-colors pt-4"
            >
              <Plus className="w-5 h-5" />
              <span>Add Payment method</span>
            </button>

            <hr className="border-t border-zinc-700 mt-12" />
          </div>

          {/* Right Column: Order Summary */}
          <div className="bg-[#2f2f2f] p-6 shadow-lg h-fit border border-white">
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

            <button
              onClick={handleCompleteOrder}
              className="w-full bg-[#F1B345] text-black font-semibold py-3 px-4 rounded-md hover:bg-amber-500 transition-colors duration-300 text-lg"
            >
              Complete Order
            </button>
          </div>
        </div>
      </div>

      <DemoModal isOpen={showDemoModal} onClose={() => setShowDemoModal(false)} />
    </div>
  );
}
