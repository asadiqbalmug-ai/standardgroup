import Link from "next/link";
import { Menu } from "lucide-react";

export default function CategoriesNav() {
  const categories = [
    "Main Building Materials",
    "Cables & Wires",
    "Glues & Adhesives",
    "Paints",
    "Gypsum Board",
    "Tools & Hardware",
    "Fittings",
  ];

  return (
    <div className="bg-[#091522] border-b border-[#1a2d40] py-3 px-4 md:px-8 w-full flex flex-col md:flex-row items-center gap-6">
      <div className="hidden md:flex items-center gap-8 text-[14px] font-bold text-gray-200 overflow-x-auto whitespace-nowrap w-full md:w-auto md:ml-4 no-scrollbar pb-2 md:pb-0">
        {categories.map((category) => (
          <Link key={category} href={`/categories?category=${encodeURIComponent(category)}`} className="hover:text-yellow-400 transition-colors shrink-0">
            {category}
          </Link>
        ))}
      </div>

      <Link href="/categories" className="flex items-center gap-2 font-bold text-sm text-white hover:text-yellow-400 transition-colors bg-[#1a2d40] px-4 py-2 rounded-md shrink-0">
        <Menu className="w-4 h-4" />
        View All Categories
      </Link>
    </div>
  );
}
