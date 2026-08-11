"use client";

import { useSearchParams, usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

export default function MobileScrollHandler() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const isFirstRender = useRef(true);

  useEffect(() => {
    // Only run on categories page
    if (pathname !== '/categories' && pathname !== '/brands') {
      return;
    }

    // Don't scroll on the initial page load
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    // Small timeout to allow Next.js to finish rendering the new products
    setTimeout(() => {
      if (window.innerWidth < 768) {
        // On mobile: scroll down to the product grid
        const element = document.getElementById("product-grid");
        if (element) {
          const yOffset = -100; // Account for any sticky headers or padding
          const y = element.getBoundingClientRect().top + window.scrollY + yOffset;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
      } else {
        // On desktop: scroll to the top
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
      }
    }, 100);
  }, [searchParams, pathname]);

  return null;
}
