"use client";

import { useState } from "react";
import { PREDEFINED_BRANDS } from "@/utils/constants";

export default function BrandSelect({ defaultValue = "" }: { defaultValue?: string }) {
  const isCustomDefault = defaultValue && !PREDEFINED_BRANDS.includes(defaultValue);
  const [isCustom, setIsCustom] = useState(!!isCustomDefault);

  return (
    <div className="space-y-2">
      <select 
        name={isCustom ? "" : "brand"} // If custom is selected, this select won't submit 'brand', the input will.
        defaultValue={isCustom ? "other" : defaultValue}
        onChange={(e) => setIsCustom(e.target.value === "other")}
        className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:ring-yellow-500 focus:border-yellow-500 text-sm font-medium bg-white"
      >
        <option value="">Select a brand...</option>
        {PREDEFINED_BRANDS.map(b => (
          <option key={b} value={b}>{b}</option>
        ))}
        <option value="other">Other (Manual Entry)</option>
      </select>
      
      {isCustom && (
        <input 
          type="text" 
          name="brand" 
          defaultValue={isCustomDefault ? defaultValue : ""}
          placeholder="Enter brand name..." 
          className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:ring-yellow-500 focus:border-yellow-500 text-sm font-medium"
          required
        />
      )}
    </div>
  );
}
