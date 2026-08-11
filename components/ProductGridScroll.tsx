"use client";

import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

// Global variable to prevent scrolling on the very first render of the app
let hasInitialized = false;

export default function ProductGridScroll() {
  const searchParams = useSearchParams();

  useEffect(() => {
    // Prevent scrolling when the user first lands on the page
    if (!hasInitialized) {
      hasInitialized = true;
      return;
    }

    // When searchParams change, Next.js has finished fetching and rendering the new products!
    // We use a small 50ms timeout just to ensure the DOM has fully painted the new grid.
    const timer = setTimeout(() => {
      if (window.innerWidth < 768) {
        const el = document.getElementById("product-grid");
        if (el) {
          const y = el.getBoundingClientRect().top + window.scrollY - 100;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
      } else {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
      }
    }, 50);

    return () => clearTimeout(timer);
  }, [searchParams]);

  return null;
}
