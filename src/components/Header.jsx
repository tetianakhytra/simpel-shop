"use client";
import { useState } from "react";
import Link from "next/link";
import { Search, Heart, ShoppingBasket } from "lucide-react";
import BasketPopUp from "./BasketPopUp";

const Header = () => {
const [isOpen, setIsOpen] = useState(false);


    return ( 
         <>
        <article className='bg-[var(--green)] grid grid-cols-[1fr_auto_1fr] p-5'>
            <div>{/*empty for layout*/}</div>
          
            <nav className='text-white text-xl flex justify-center gap-[5vw] md:gap-[20vw] lg:gap-[25vw]'>
                <Link href="/">
                    <h2 className="cursor-pointer hover:text-[var(--yellow)]">Home</h2>
                </Link>                
              
                <Link href="/products">
                    <h2 className="cursor-pointer hover:text-[var(--yellow)]">Products</h2>
                </Link>
            </nav>
          
            <section className='cursor-pointer flex justify-self-end items-center gap-[1.5vw] pr-[2vw] text-black'>
                <Search className="hover:text-black/30" />
               
                <Heart className="hover:fill-black/30" fill="black" stroke="black" />
                
                <div className="grid grid-cols-1 grid-rows-1">
                    <ShoppingBasket  onClick={() => setIsOpen(true)} className="hover:text-black/30 col-span-full row-span-full" />
                <figure className='rounded-full w-4 h-4 bg-[var(--yellow)] flex items-center justify-center justify-self-end text-black text-[8px] col-start-1 col-end-2 row-start-1 row-end-2 translate-y-[-8px] translate-x-[8px]'>0</figure>            
                </div>
            </section>
        </article>

              <BasketPopUp isOpen={isOpen} onClose={() => setIsOpen(false)} />

         </>
     );
}
 
export default Header;