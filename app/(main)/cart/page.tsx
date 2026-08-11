"use client";

import { useCart } from "@/context/CartContext";
import { Trash2, Plus, Minus } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, clearCart } = useCart();
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch since we use localStorage
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const totalAmount = items.reduce((total, item) => {
    return total + parseFloat(item.price) * item.quantity;
  }, 0);

  const handleCheckout = () => {
    const phoneNumber = "971555599508";
    const header = "Hello Standard Group,\n\nI would like to inquire about the following materials:\n\n";
    
    const itemList = items.map((item, index) => {
      return `${index + 1}. ${item.quantity}x ${item.name} (${item.price})`;
    }).join("\n");
    
    const footer = `\n\nTotal Estimated Value: ${totalAmount.toFixed(2)} AED\n\nPlease provide a formal quote. Thank you!`;
    
    const message = encodeURIComponent(header + itemList + footer);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
    
    window.open(whatsappUrl, "_blank");
  };

  if (items.length === 0) {
    return (
      <main className="w-full min-h-[60vh] bg-gray-50 flex flex-col items-center justify-center p-8">
        <div className="bg-white p-12 rounded-xl shadow-sm text-center max-w-md w-full border border-gray-100">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg viewBox="0 0 24 24" className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <h1 className="text-2xl font-extrabold text-[#091522] mb-3">Your cart is empty</h1>
          <p className="text-gray-500 mb-8">Looks like you haven't added any products to your inquiry yet.</p>
          <Link href="/categories" className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-md transition-colors w-full inline-block">
            Start Browsing
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="w-full min-h-screen bg-gray-50 py-12 px-4 md:px-12">
      <div className="max-w-[1200px] mx-auto">
        <h1 className="text-3xl md:text-4xl font-extrabold text-[#091522] mb-8">Review Your Inquiry</h1>
        
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Cart Items List */}
          <div className="flex-1 flex flex-col gap-4">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="hidden md:grid grid-cols-12 gap-4 p-4 border-b border-gray-100 bg-gray-50/50 text-sm font-bold text-gray-500 uppercase tracking-wider">
                <div className="col-span-5">Product</div>
                <div className="col-span-2 text-center">Price</div>
                <div className="col-span-3 text-center">Quantity</div>
                <div className="col-span-2 text-center">Remove</div>
              </div>
              
              <div className="flex flex-col divide-y divide-gray-100">
                {items.map((item) => (
                  <div key={item.id} className="p-4 md:p-6 grid grid-cols-1 md:grid-cols-12 gap-4 items-center relative">
                    
                    {/* Product Info */}
                    <div className="col-span-1 md:col-span-5 flex items-center gap-4">
                      <div className="w-20 h-20 md:w-24 md:h-24 bg-gray-50 rounded-lg overflow-hidden shrink-0 border border-gray-100">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={item.image_url} alt={item.name} className="w-full h-full object-contain p-2 mix-blend-multiply" />
                      </div>
                      <div className="flex flex-col">
                        <Link href={`/product/${item.id}`} className="font-bold text-[#091522] hover:text-red-700 transition-colors text-sm md:text-base leading-tight mb-1">
                          {item.name}
                        </Link>
                        <span className="text-xs text-gray-500 md:hidden">{item.price}</span>
                      </div>
                    </div>

                    {/* Price (Desktop) */}
                    <div className="hidden md:block col-span-2 text-center font-bold text-[#1a365d]">
                      {item.price}
                    </div>

                    {/* Quantity Controls */}
                    <div className="col-span-1 md:col-span-3 flex justify-start md:justify-center">
                      <div className="flex items-center border border-gray-200 rounded-md bg-white">
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-10 h-10 flex items-center justify-center text-gray-500 hover:text-[#091522] hover:bg-gray-50 transition-colors"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-12 text-center font-bold text-[#091522] text-sm">
                          {item.quantity}
                        </span>
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-10 h-10 flex items-center justify-center text-gray-500 hover:text-[#091522] hover:bg-gray-50 transition-colors"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Remove Button */}
                    <div className="absolute top-4 right-4 md:relative md:top-0 md:right-0 md:col-span-2 flex justify-end md:justify-center">
                      <button 
                        onClick={() => removeFromCart(item.id)}
                        className="text-gray-400 hover:text-red-500 transition-colors p-2"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>

                  </div>
                ))}
              </div>
            </div>
            
            <div className="flex justify-between items-center px-2">
              <Link href="/categories" className="text-[#091522] font-bold text-sm hover:text-red-700 transition-colors flex items-center gap-2">
                &larr; Continue Shopping
              </Link>
              <button 
                onClick={clearCart}
                className="text-gray-500 font-medium text-sm hover:text-red-500 transition-colors"
              >
                Clear Cart
              </button>
            </div>
          </div>

          {/* Order Summary */}
          <div className="w-full lg:w-[380px] shrink-0">
            <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6 md:p-8 sticky top-24">
              <h2 className="text-xl font-extrabold text-[#091522] mb-6">Order Summary</h2>
              
              <div className="flex flex-col gap-4 text-sm mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal ({items.length} items)</span>
                  <span className="font-bold text-[#091522]">{totalAmount.toFixed(2)} AED</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>VAT (5%)</span>
                  <span className="font-bold text-[#091522]">{(totalAmount * 0.05).toFixed(2)} AED</span>
                </div>
                <div className="flex justify-between text-gray-600 pb-4 border-b border-gray-100">
                  <span>Delivery</span>
                  <span className="text-xs text-gray-500 italic">Calculated upon inquiry</span>
                </div>
                <div className="flex justify-between items-center pt-2">
                  <span className="text-base font-bold text-[#091522]">Estimated Total</span>
                  <span className="text-xl font-extrabold text-[#1a365d]">{(totalAmount * 1.05).toFixed(2)} AED</span>
                </div>
              </div>

              <button 
                onClick={handleCheckout}
                className="w-full bg-[#25D366] hover:bg-[#1ebd5a] text-white font-extrabold py-4 rounded-md transition-colors flex items-center justify-center gap-2 shadow-sm shadow-[#25D366]/20 mb-4"
              >
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.888-.788-1.487-1.761-1.66-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
                </svg>
                Send Inquiry via WhatsApp
              </button>
              
              <p className="text-xs text-gray-500 text-center leading-relaxed">
                By sending this inquiry, our sales team will review your requested materials and reply shortly with an official quotation.
              </p>
            </div>
          </div>
          
        </div>
      </div>
    </main>
  );
}
