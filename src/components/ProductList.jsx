"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Button from "@/components/Button";
import { Heart } from "lucide-react";

export default function ProductList({ category }) {
  const [products, setProducts] = useState([]);
  const [limit, setLimit] = useState(12);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [favoriteIds, setFavoriteIds] = useState([]);

  // LOAD FAVORITES
  useEffect(() => {
    const ids = [];

    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);

      if (key.startsWith("fav-") && localStorage.getItem(key) === "true") {
        const id = key.replace("fav-", "");
        ids.push(id);
      }
    }

    setFavoriteIds(ids);
  }, []);

  // TOGGLE FAVORITE
  function toggleFavorite(id) {
    const isFav = favoriteIds.includes(String(id));

    if (isFav) {
      localStorage.setItem(`fav-${id}`, "false");
      setFavoriteIds((prev) => prev.filter((x) => x !== String(id)));
    } else {
      localStorage.setItem(`fav-${id}`, "true");
      setFavoriteIds((prev) => [...prev, String(id)]);
    }
  }

  // NORMAL PRODUCT LOAD
  useEffect(() => {
    if (searchTerm.length > 0) return;

    async function fetchProducts() {
      setLoading(true);
      try {
        const url =
          category && category !== "all"
            ? `https://dummyjson.com/products/category/${category}?limit=${limit}`
            : `https://dummyjson.com/products?limit=${limit}`;

        const res = await fetch(url);
        const data = await res.json();
        setProducts(data.products || []);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, [category, limit, searchTerm]);

  // SEARCH PRODUCTS
  useEffect(() => {
    if (searchTerm.length === 0) return;

    async function fetchSearch() {
      setLoading(true);
      try {
        const url = `https://dummyjson.com/products/search?q=${searchTerm}`;
        const res = await fetch(url);
        const data = await res.json();
        setProducts(data.products || []);
      } catch (error) {
        console.error("Search failed:", error);
      } finally {
        setLoading(false);
      }
    }

    const timeout = setTimeout(fetchSearch, 300);
    return () => clearTimeout(timeout);
  }, [searchTerm]);

  return (
    <div>
      {/* SEARCH BAR */}
      <div className="mb-6">
        <input
          id="search-input"
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-xl 
          focus:border-[#63817F] focus:ring-1 focus:ring-[#63817F] focus:outline-none"
        />
      </div>

      {/* PRODUCT GRID */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product.id} className="relative">

            {/* ❤️ FAVORITE BUTTON */}
            <button
              onClick={(e) => {
                e.preventDefault(); // stop navigation
                toggleFavorite(product.id);
              }}
              className="absolute top-3 right-3 z-20 p-1"
            >
              <Heart
                size={28}
                className="transition-all duration-200"
                stroke="black"
                fill={favoriteIds.includes(String(product.id)) ? "black" : "none"}
              />
            </button>

            {/* PRODUCT CARD */}
            <Link
              href={`/products/${product.id}`}
              className="bg-white rounded-3xl shadow p-4 hover:scale-[1.02] transition-transform block"
            >
              <div className="relative w-full h-40 rounded-2xl overflow-hidden">
                <Image
                  src={product.thumbnail}
                  alt={product.title}
                  fill
                  className="object-contain bg-white rounded-xl"
                />
              </div>

              <h2 className="font-heading text-base mt-3">{product.title}</h2>
              <p className="text-sm text-gray-600">{product.brand}</p>
              <p className="text-sm text-gray-500">{product.category}</p>
              <p className="text-lg font-semibold mt-2">${product.price}</p>
            </Link>
          </div>
        ))}
      </div>

      {/* LOAD MORE */}
      {searchTerm.length === 0 && (
        <div className="flex justify-center mt-10 mb-20">
          <Button
            variant="secondary"
            onClick={() => setLimit((prev) => prev + 8)}
            disabled={loading}
          >
            {loading ? "Loading..." : "Load more"}
          </Button>
        </div>
      )}
    </div>
  );
}
