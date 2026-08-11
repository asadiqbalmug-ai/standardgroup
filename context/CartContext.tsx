"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { CheckCircle2, X } from "lucide-react";
import Link from "next/link";

export type CartItem = {
  id: number;
  name: string;
  price: string; // Stored as a string like "19.50 AED"
  image_url: string;
  quantity: number;
};

type CartContextType = {
  items: CartItem[];
  addToCart: (product: Omit<CartItem, "quantity">, quantity?: number) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
  cartCount: number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [notification, setNotification] = useState<{ visible: boolean; product: Omit<CartItem, "quantity"> | null; id: number }>({
    visible: false,
    product: null,
    id: 0
  });

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem("standardgroup_cart");
    if (savedCart) {
      try {
        setItems(JSON.parse(savedCart));
      } catch (e) {
        console.error("Failed to parse cart from local storage", e);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("standardgroup_cart", JSON.stringify(items));
  }, [items]);

  const addToCart = (product: Omit<CartItem, "quantity">, quantity: number = 1) => {
    setItems((currentItems) => {
      const existingItem = currentItems.find((item) => item.id === product.id);
      if (existingItem) {
        return currentItems.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...currentItems, { ...product, quantity }];
    });

    // Show notification
    const notificationId = Date.now();
    setNotification({ visible: true, product, id: notificationId });
    
    // Auto hide after 4 seconds
    setTimeout(() => {
      setNotification((prev) => (prev.id === notificationId ? { ...prev, visible: false } : prev));
    }, 4000);
  };

  const removeFromCart = (id: number) => {
    setItems((currentItems) => currentItems.filter((item) => item.id !== id));
  };

  const updateQuantity = (id: number, quantity: number) => {
    if (quantity < 1) return;
    setItems((currentItems) =>
      currentItems.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const cartCount = items.reduce((total, item) => total + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{ items, addToCart, removeFromCart, updateQuantity, clearCart, cartCount }}
    >
      {children}
      
      {/* Global Cart Notification Toast */}
      <div 
        className={`fixed bottom-6 right-6 z-[60] transition-all duration-500 transform ${
          notification.visible 
            ? "translate-x-0 opacity-100" 
            : "translate-x-[120%] opacity-0"
        }`}
      >
        {notification.product && (
          <div className="bg-[#091522] border border-[#1a2d40] shadow-2xl rounded-lg p-4 pr-10 flex flex-col gap-3 relative w-[320px]">
            <div className="flex items-center gap-2 mb-1">
              <CheckCircle2 className="w-5 h-5 text-red-600 shrink-0" />
              <span className="text-red-600 font-bold text-sm">Added to your cart</span>
            </div>
            
            <div className="flex gap-3 items-center">
              <div className="w-12 h-12 bg-white rounded-md p-1 shrink-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={notification.product.image_url} alt={notification.product.name} className="w-full h-full object-contain mix-blend-multiply" />
              </div>
              <div className="flex flex-col">
                <span className="text-white font-bold text-[13px] leading-snug line-clamp-2">{notification.product.name}</span>
                <span className="text-gray-400 text-xs mt-1 font-mono">{notification.product.price}</span>
              </div>
            </div>

            <Link href="/cart" onClick={() => setNotification(prev => ({ ...prev, visible: false }))} className="mt-2 w-full bg-red-600 hover:bg-red-700 text-white text-xs font-bold py-2 rounded text-center transition-colors">
              View Cart & Checkout
            </Link>

            <button 
              onClick={() => setNotification(prev => ({ ...prev, visible: false }))}
              className="absolute right-3 top-3 text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
