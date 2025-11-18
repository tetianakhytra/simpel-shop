"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Trash } from 'lucide-react';



const BasketProduct = ({id, onRemove}) => {

  const [product, setProduct] = useState(null);
  const [amount, setAmount] = useState(1);

  
  useEffect(() => {
    async function fetchProduct() {
        const res = await fetch(`https://dummyjson.com/products/${id}`);
        const data = await res.json();
        setProduct(data);
    }

    fetchProduct();
  }, [id]);

if (!product) { return <p>Loading...</p>;}

    return ( 
        <article className="grid grid-cols-3 justify-center">
        <Image src={product.thumbnail} alt={product.title} fill className="object-contain"/>

        <section>
            <h1 className="font-heading text-3xl font-bold">{product.title}</h1>
        
            <p className="text-gray-400">{product.brand}</p>

            <p className="text-gray-400">{product.category}</p>

            {/* Amount selector */}
            <div className="flex flex-row">
              <button onClick={() => setAmount(a => Math.max(1, a - 1))}>-</button>
                <p>{amount}</p>
              <button onClick={() => setAmount(a => a + 1)}>+</button>
            </div>

        
            <b>${product.price}</b>

            <button onClick={() => onRemove(id)}>      
                <Trash className="hover:fill-black/30" fill="black" stroke="black"></Trash>
            </button>
            
        </section>
    </article>
     );
}
 
export default BasketProduct;