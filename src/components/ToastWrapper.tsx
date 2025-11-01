"use client";

import { useToast } from "@/contexts/ToastContext";
import ToastContainer from "@/components/notifications/ToastContainer";

export default function ToastWrapper({ children }: { children: React.ReactNode }) {
  const { toasts, removeToast } = useToast();
  return (
    <>
      {children}
      <ToastContainer toasts={toasts} onRemoveToast={removeToast} />
    </>
  );
}

