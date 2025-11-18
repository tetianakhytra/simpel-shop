"use client";

import { useEffect, useState, use } from "react";
import Image from "next/image";
import Button from "@/components/Button";
import { Heart, ArrowLeft } from "lucide-react";

export default function ProductPage({ params }) {
  const { id } = use(params);

  const [product, setProduct] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);


  
  useEffect(() => {
    async function fetchProduct() {
        const res = await fetch(`https://dummyjson.com/products/${id}`);
        const data = await res.json();
        setProduct(data);
    }

    fetchProduct();
  }, [id]);


  
  useEffect(() => {
    const saved = localStorage.getItem(`fav-${id}`);
    if (saved === "true") {
      setIsFavorite(true);
    }
  }, [id]);



  const toggleFavorite = () => {
    const next = !isFavorite;
    setIsFavorite(next);
    localStorage.setItem(`fav-${id}`, next);
  };


  if (!product) {
    return <div className="p-10 text-center">Loading product...</div>;
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">

   <div className="flex items-center justify-between mb-6">
  
  <button
    onClick={() => window.history.back()}
    className="p-2 rounded-full bg-[#FBF7F0] hover:bg-[#F3EFEA] transition">
    <ArrowLeft size={34} />
  </button>


  <button
    onClick={toggleFavorite}  >
    <Heart
      size={34}
      color={isFavorite ? "black" : "black"}
      fill={isFavorite ? "black" : "none"}/>
  </button>
</div>



      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">

  
        <div className="relative w-full h-[400px] bg-white rounded-3xl p-4">
          <Image
            src={product.thumbnail}
            alt={product.title}
            fill
            className="object-contain"
          />
        </div>

      
        <div>
        
          <p className="text-gray-400">{product.brand}</p>

      
          <div className="flex items-start justify-between mb-4">
            <h1 className="font-heading text-3xl font-bold">
              {product.title}
            </h1>

          
          </div>

        
          <div className="flex items-center gap-3 mb-6 font-body">
            <span className="px-3 py-1 border border-gray-300 rounded-full">
              {product.category}
            </span>
            <span className="px-3 py-1 border  border-gray-300 rounded-full capitalize">
              {product.availabilityStatus || "In stock"}
            </span>
            <span className="px-3 py-1 border  border-gray-300 rounded-full flex items-center gap-1">
              ⭐ {product.rating}
            </span>
          </div>

       
          <p className="text-2xl font-bold mb-4">
            ${product.price}
          </p>

    
          <p className="text-gray-600 leading-relaxed mb-6 font-body">
            {product.description}
          </p>


          <Button variant="primary"  className="w-full mt-19">
            ADD TO CART
          </Button>
        </div>
      </div>
    </div>
  );
}
