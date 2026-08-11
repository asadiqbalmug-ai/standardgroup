"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";

export default function CategorySort() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("sort", e.target.value);
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <select 
      value={searchParams.get("sort") || "featured"}
      onChange={handleSortChange}
      className="bg-white border border-gray-300 text-sm font-bold text-[#091522] rounded-md px-3 py-2 outline-none focus:border-red-700 w-full sm:w-auto"
    >
      <option value="featured">Featured</option>
      <option value="price_asc">Price: Low to High</option>
      <option value="price_desc">Price: High to Low</option>
      <option value="newest">Newest Arrivals</option>
    </select>
  );
}
