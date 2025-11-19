"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart } from "lucide-react";

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    loadFavorites();
  }, []);

  function loadFavorites() {
    const ids = [];

    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);

      if (key.startsWith("fav-") && localStorage.getItem(key) === "true") {
        const id = key.replace("fav-", "");
        ids.push(id);
      }
    }

    if (ids.length === 0) {
      setFavorites([]);
      return;
    }

    fetchAll(ids);
  }

  async function fetchAll(ids) {
    const products = await Promise.all(
      ids.map(async (id) => {
        const res = await fetch(`https://dummyjson.com/products/${id}`);
        return await res.json();
      })
    );

    setFavorites(products);
  }


  function toggleFavorite(id) {
    localStorage.setItem(`fav-${id}`, "false");


    setFavorites((prev) => prev.filter((p) => p.id !== id));
  }

  if (favorites.length === 0) {
    return (
      <div className="p-10 text-center text-gray-500">
        No favorite products yet.
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-8">Your Favorite Products</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {favorites.map((product) => (
          <div
            key={product.id}
            className="border rounded-xl p-4 bg-white relative hover:shadow-lg transition"
          >
     
            <button
              onClick={() => toggleFavorite(product.id)}
              className="absolute top-3 right-3"
            >
              <Heart size={28} color="black" fill="black" />
            </button>

   
      <Link href={`/products/${product.id}`}>
  <div className="relative w-full h-48 mb-4">
    <Image
      src={product.thumbnail}
      alt={product.title}
      fill
      className="object-contain rounded"
    />
  </div>

  <h2 className="text-xl font-semibold mb-1">{product.title}</h2>
  <p className="text-gray-500 text-sm mb-2">{product.brand}</p>
  <p className="font-bold text-lg">${product.price}</p>
</Link>

          </div>
        ))}
      </div>
    </div>
  );
}
