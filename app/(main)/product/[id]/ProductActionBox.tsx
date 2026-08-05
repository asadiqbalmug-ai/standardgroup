"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { ShoppingCart, Truck, ShieldCheck, Lock, Phone, MessageCircle } from "lucide-react";

export default function ProductActionBox({ product }: { product: any }) {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  const increment = () => setQuantity(q => q + 1);
  const decrement = () => setQuantity(q => q > 1 ? q - 1 : 1);

  const handleAddToCart = () => {
    // We add the product multiple times or handle quantity inside the cart context.
    // For now, we simulate quantity by calling addToCart multiple times.
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      
      {/* Warning Box */}
      <div className="bg-[#fff7d6] text-[#8a6d3b] p-4 text-xs font-semibold leading-relaxed rounded-sm border border-[#faebcc]">
        Due to global supply and market conditions, product prices may change without notice. Our team will approach you to confirm pricing for your order.<br/>
        Thank you for your understanding.
      </div>

      {/* Quantity & Add to Cart */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
        {/* Quantity Selector */}
        <div className="flex items-center border-2 border-[#091522] rounded-sm overflow-hidden h-[42px] w-[140px]">
          <button onClick={decrement} className="flex-1 hover:bg-gray-100 font-extrabold text-[#091522] h-full flex items-center justify-center">-</button>
          <div className="w-[50px] text-center font-extrabold text-white bg-[#091522] h-full flex items-center justify-center text-sm">{quantity}</div>
          <button onClick={increment} className="flex-1 hover:bg-gray-100 font-extrabold text-[#091522] h-full flex items-center justify-center">+</button>
        </div>

        {/* Add to Cart Button */}
        <button 
          onClick={handleAddToCart}
          className="bg-[#f6c000] hover:bg-yellow-500 text-[#091522] font-extrabold px-8 h-[42px] flex items-center justify-center gap-2 transition-colors rounded-sm shadow-sm"
        >
          <ShoppingCart className="w-5 h-5" />
          Add to cart
        </button>
      </div>

      {/* WhatsApp Box */}
      <div className="bg-[#f2f2f2] p-4 rounded-sm flex items-center gap-4 border border-gray-200">
        <div className="w-10 h-10 bg-[#25D366] rounded flex items-center justify-center shrink-0">
          <MessageCircle className="w-6 h-6 text-white" />
        </div>
        <div className="flex flex-col">
          <span className="text-[11px] font-extrabold text-[#091522]">Get Bulk pricing through whatsapp .</span>
          <a href={`https://wa.me/971555599508?text=${encodeURIComponent(`Hi, I'm interested in bulk pricing for ${product.name} (SKU: ${product.sku}).`)}`} target="_blank" rel="noreferrer" className="text-[11px] font-bold text-gray-600 hover:text-[#091522]">+971 55 559 9508</a>
        </div>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-2 py-4 border-y border-gray-200">
        <div className="flex items-center gap-3 text-[11px] font-extrabold text-[#091522]">
          <div className="w-6 h-6 bg-[#091522] rounded flex items-center justify-center">
            <Truck className="w-3 h-3 text-white" />
          </div>
          Fast Delivery
        </div>
        <div className="flex items-center gap-3 text-[11px] font-extrabold text-[#091522]">
          <div className="w-6 h-6 bg-[#091522] rounded flex items-center justify-center">
            <ShieldCheck className="w-3 h-3 text-white" />
          </div>
          100% Original Products
        </div>
        <div className="flex items-center gap-3 text-[11px] font-extrabold text-[#091522]">
          <div className="w-6 h-6 bg-[#091522] rounded flex items-center justify-center">
            <Lock className="w-3 h-3 text-white" />
          </div>
          Secure Payment Transaction
        </div>
        <div className="flex items-center gap-3 text-[11px] font-extrabold text-[#091522]">
          <div className="w-6 h-6 bg-[#091522] rounded flex items-center justify-center">
            <Phone className="w-3 h-3 text-white" />
          </div>
          Hotline : +971 55 559 9508
        </div>
      </div>

      {/* Table details */}
      <div className="flex flex-col gap-2 py-4">
        <div className="flex items-start text-[11px]">
          <span className="w-32 font-extrabold text-[#091522] uppercase">SKU</span>
          <span className="text-gray-600 font-bold">{product.sku}</span>
        </div>
        <div className="flex items-start text-[11px]">
          <span className="w-32 font-extrabold text-[#091522] uppercase">Categories</span>
          <span className="text-gray-600 font-bold">{product.category}</span>
        </div>
      </div>
    </div>
  );
}
