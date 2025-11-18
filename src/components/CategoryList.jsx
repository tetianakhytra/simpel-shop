"use client";

import { useEffect, useState } from "react";

export default function CategoryList({ selected, onSelect }) {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    async function getCategories() {
      try {
        const res = await fetch("https://dummyjson.com/products/categories");
        const data = await res.json();
        setCategories(data);
      } catch (error) {
        console.error("Failed to load categories:", error);
      }
    }
    getCategories();
  }, []);

  return (
    <div className="flex gap-3 flex-wrap mb-6">

      {/* ALL button */}
      <button
        onClick={() => onSelect("all")}
        className={`
          px-4 py-1.5 rounded-full text-sm font-medium transition capitalize
          ${
            selected === "all"
              ? "bg-white text-black border-2 border-[#F5BD19] shadow-sm"
              : "bg-[#FBF7F0] text-gray-600 border border-[#94855a] hover:bg-[#F3EFEA]"
          }
        `}
      >
        All
      </button>

      {/* Dynamic category tags */}
      {categories.map((cat, index) => {
        const name =
          typeof cat === "string"
            ? cat
            : cat?.slug || cat?.name || `category-${index}`;

        return (
          <button
            key={name}
            onClick={() => onSelect(name)}
            className={`
              px-4 py-1.5 rounded-full text-sm font-medium transition capitalize
              ${
                selected === name
                  ? "bg-white text-black border-2 border-[#F5BD19] shadow-sm"
                  : "bg-[#FBF7F0] text-gray-700 border border-[#d7b44b] hover:bg-[#F3EFEA]"
              }
            `}
          >
            {name}
          </button>
        );
      })}
    </div>
  );
}
