"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Trash } from 'lucide-react';



const BasketProduct = ({id, onRemove}) => {

  const [product, setProduct] = useState(null);
  const [amount, setAmount] = useState(1);


  {/* fetch produkt info */}
  useEffect(() => {
    async function fetchProduct() {
      try {
        const res = await fetch(`https://dummyjson.com/products/${id}`);
        const data = await res.json();
        setProduct(data);
      } catch (e) {
        console.error("Failed fetching product:", e);
      }
    }

    if (id) fetchProduct();
  }, [id]);


  {/* helper til at indlæse amount fra localStorage */}
  const loadAmountFromCart = () => {
    try {
      const cart = JSON.parse(localStorage.getItem("cart") || "[]");
      const item = cart.find(i => i.id === id);
      if (item) setAmount(item.amount || 1);
    } catch {}
  };


  {/* items in basket (kører ved mount og når id ændres) */}
  useEffect(() => {
    loadAmountFromCart();
  }, [id]);


  {/* Lyt efter opdateringer fra Add To Cart (andre steder i appen) */}
  useEffect(() => {
    const handler = () => loadAmountFromCart();
    const storageHandler = (e) => {
      if (e.key === "cart") loadAmountFromCart();
    };

    window.addEventListener("cartUpdated", handler);
    window.addEventListener("storage", storageHandler);

    return () => {
      window.removeEventListener("cartUpdated", handler);
      window.removeEventListener("storage", storageHandler);
    };
  }, [id]);


  if (!product) { return <p>Loading...</p>; }


  {/* update with localstorage */}
  const updateAmount = (newAmount) => {
    try {
      const cart = JSON.parse(localStorage.getItem("cart") || "[]");

      const next = cart.map(item =>
        item.id === id ? { ...item, amount: newAmount } : item
      );

      localStorage.setItem("cart", JSON.stringify(next));
      window.dispatchEvent(new Event("cartUpdated"));
    } catch (e) {
      console.error("Failed updating amount:", e);
    }
  };


  const increment = () => {
    const next = amount + 1;
    setAmount(next);
    updateAmount(next);
  };

  const decrement = () => {
    const next = Math.max(1, amount - 1);
    setAmount(next);
    updateAmount(next);
  };


  {/* remove/trash button */}
  const fallbackRemove = (removeId) => {
    try {
      const cart = JSON.parse(localStorage.getItem("cart") || "[]");
      const next = cart.filter(item => item.id !== removeId);
      localStorage.setItem("cart", JSON.stringify(next));
      window.dispatchEvent(new Event("cartUpdated"));
    } catch (e) {
      console.error("Failed to remove from cart:", e);
    }
  };

  const handleRemove = () => {
    if (typeof onRemove === "function") {
      onRemove(id);
    } else {
      fallbackRemove(id);
    }
  };


  return ( 
    <article className="grid grid-cols-[1fr_1.5fr] grid-rows-1 justify-center gap-x-3 gap-y-1">
        
        <div className="relative w-full aspect-square bg-white rounded-3xl overflow-hidden shadow-[0_2px_10px_rgba(0,0,0,0.04)] row-start-1 row-end-2 col-start-1 col-end-2">
            <Image src={product.thumbnail} alt={product.title} fill className="object-contain"/>
        </div>

        <section className="grid grid-cols-[auto_auto] grid-rows-[auto_1fr] gap-x-5 gap-y-1">
            <h1 className="font-heading text-1xl font-bold row-start-1 row-end-2 col-start-1 col-end-2">
                {product.title}</h1>
            
            
            <p className="flex flex-row gap-1 text-gray-400 text-[10px]">
                {product.brand}
                <span>|</span>
                {product.category}</p>
            
            <p className="justify-self-end text-sm row-start-1 row-end-2 col-start-2 col-end-3">${product.price}</p>
        </section>

        <section className="grid grid-cols-[auto_auto] col-start-2 col-end-3">
          <div className="flex flex-row gap-3 items-center self-end">
            <button onClick={decrement} className="border rounded-full hover:bg-black/30 w-6.5 h-6 pb-6">-</button>
            <p className="text-sm">{amount}</p>
            <button onClick={increment} className="border rounded-full hover:bg-black/30 w-6.5 h-6 pb-6">+</button>
          </div>

          <button onClick={handleRemove} className="place-self-end">
            <Trash className="fill-black/30 hover:fill-black/70 stroke-black" />
          </button>
        </section>

    </article>
  );
}
 
export default BasketProduct;


{/*BasketProduct komponenten er ikke en page.js og derfor får den ikke params automatisk*/}
