"use client";

import { useCart } from "@/context/CartContext";
import { ShoppingCart } from "lucide-react";

export default function AddToCartButton({ product, disabled = false }: { product: any, disabled?: boolean }) {
  const { addToCart } = useCart();

  return (
    <button 
      onClick={() => addToCart(product)}
      disabled={disabled}
      className="w-full md:w-auto bg-[#f6c000] hover:bg-yellow-500 disabled:bg-gray-300 disabled:cursor-not-allowed text-[#091522] disabled:text-gray-500 font-extrabold py-4 px-12 text-lg transition-colors rounded-sm shadow-sm flex items-center justify-center gap-3"
    >
      <ShoppingCart className="w-6 h-6" />
      {disabled ? "Out of Stock" : "Add to Cart"}
    </button>
  );
}
