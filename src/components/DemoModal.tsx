"use client";

import { X } from "lucide-react";

interface DemoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function DemoModal({ isOpen, onClose }: DemoModalProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative bg-[#2F2F2F] border border-amber-500 rounded-lg p-8 max-w-md w-full mx-4 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-zinc-400 hover:text-white transition-colors"
          aria-label="Close modal"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">
            Demo Version
          </h2>
          <p className="text-zinc-300 mb-6">
            This feature is not available in the demo version. It will be fully
            functional in the final release.
          </p>
          <button
            onClick={onClose}
            className="bg-[#F1B345] hover:bg-amber-500 text-black font-semibold py-2 px-6 rounded-md transition-colors duration-300"
          >
            Got it
          </button>
        </div>
      </div>
    </div>
  );
}

