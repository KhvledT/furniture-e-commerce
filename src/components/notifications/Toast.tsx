"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Check, AlertCircle, Info, Heart, ShoppingCart } from "lucide-react";

export type ToastType = "success" | "error" | "info" | "wishlist" | "cart";

interface ToastProps {
  id: string;
  message: string;
  type: ToastType;
  onClose: () => void;
}

const icons = {
  success: Check,
  error: AlertCircle,
  info: Info,
  wishlist: Heart,
  cart: ShoppingCart,
};

const colors = {
  success: "bg-green-500",
  error: "bg-red-500",
  info: "bg-blue-500",
  wishlist: "bg-pink-500",
  cart: "bg-amber-500",
};

export default function Toast({ id, message, type, onClose }: ToastProps) {
  const Icon = icons[type];
  const color = colors[type];

  return (
    <motion.div
      initial={{ opacity: 0, y: -50, x: 100 }}
      animate={{ opacity: 1, y: 0, x: 0 }}
      exit={{ opacity: 0, x: 100, transition: { duration: 0.2 } }}
      className="pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5"
    >
      <div className="p-4">
        <div className="flex items-start">
          <div className={`flex-shrink-0 rounded-full ${color} p-1`}>
            <Icon className="h-5 w-5 text-white" />
          </div>
          <div className="ml-3 w-0 flex-1 pt-0.5">
            <p className="text-sm font-medium text-gray-900">{message}</p>
          </div>
          <div className="ml-4 flex flex-shrink-0">
            <button
              onClick={onClose}
              className="inline-flex rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

