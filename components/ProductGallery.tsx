"use client";

import { useState } from "react";

export default function ProductGallery({ primaryImage, additionalImages = [], productName }: { primaryImage: string, additionalImages?: string[], productName: string }) {
  const allImages = [primaryImage, ...additionalImages].filter(Boolean);
  const [selectedImage, setSelectedImage] = useState(allImages[0]);

  return (
    <div className="flex flex-col gap-4">
      {/* Main Image */}
      <div className="p-8 md:p-12 flex items-center justify-center bg-[#f8f9fa] border border-gray-100 min-h-[300px] md:min-h-[400px] rounded-xl overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img 
          src={selectedImage} 
          alt={productName}
          className="w-full h-auto max-h-[500px] object-contain mix-blend-multiply transition-all duration-300"
        />
      </div>

      {/* Thumbnails */}
      {allImages.length > 1 && (
        <div className="flex items-center gap-3 overflow-x-auto pb-2">
          {allImages.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedImage(img)}
              className={`w-20 h-20 shrink-0 bg-[#f8f9fa] border-2 rounded-md overflow-hidden flex items-center justify-center transition-all ${
                selectedImage === img ? 'border-[#091522] shadow-sm' : 'border-gray-100 hover:border-gray-300'
              }`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                src={img} 
                alt={`${productName} thumbnail ${idx + 1}`}
                className="w-full h-full object-cover mix-blend-multiply"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
