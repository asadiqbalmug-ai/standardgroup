"use client";

import { useState } from "react";

export default function CategorySelect({ 
  defaultValue = "", 
  categories = [] 
}: { 
  defaultValue?: string,
  categories?: { id?: string, name: string }[] 
}) {
  const isCustomDefault = defaultValue && !categories.find(c => c.name === defaultValue);
  const [isCustom, setIsCustom] = useState(!!isCustomDefault);

  return (
    <div className="space-y-2">
      <select 
        name={isCustom ? "" : "category"} 
        defaultValue={isCustom ? "other" : defaultValue}
        onChange={(e) => setIsCustom(e.target.value === "other")}
        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-[#bf5e42] focus:border-[#bf5e42] text-sm font-medium bg-white"
        required={!isCustom}
      >
        <option value="">Select a category...</option>
        {categories.map(c => (
          <option key={c.id || c.name} value={c.name}>{c.name}</option>
        ))}
        <option value="other">Other (Manual Entry)</option>
      </select>
      
      {isCustom && (
        <input 
          type="text" 
          name="category" 
          defaultValue={isCustomDefault ? defaultValue : ""}
          placeholder="Enter category name..." 
          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-[#bf5e42] focus:border-[#bf5e42] text-sm font-medium"
          required
        />
      )}
    </div>
  );
}
