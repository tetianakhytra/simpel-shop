"use client";

import { useState } from "react";
import CategoryList from "@/components/CategoryList";
import ProductList from "@/components/ProductList";

export default function ProductsPage() {
  const [category, setCategory] = useState("all");

  return (
    <div className="px-8 py-12">
      <h1 className="font-heading text-4xl mb-6">Products</h1>


      <CategoryList selected={category} onSelect={setCategory} />


      <ProductList category={category} />
    </div>
  );
}
