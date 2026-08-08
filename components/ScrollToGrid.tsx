"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

export default function ScrollToGrid() {
  const searchParams = useSearchParams();

  useEffect(() => {
    // Only auto-scroll on mobile devices when a filter is applied
    if (window.innerWidth < 1024 && searchParams.toString().length > 0) {
      const grid = document.getElementById("product-grid");
      if (grid) {
        // Add a slight delay to allow rendering
        setTimeout(() => {
          grid.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 100);
      }
    }
  }, [searchParams]);

  return null;
}
