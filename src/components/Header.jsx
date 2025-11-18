import Link from "next/link";
import { Search, Heart, ShoppingBasket } from "lucide-react";





const Header = () => {
    return ( 
        <article className='bg-[var(--green)] grid grid-cols-[1fr_auto_1fr] p-3'>
            <div></div>
            <nav className='text-white flex justify-center gap-[5vw] md:gap-[20vw] lg:gap-[25vw]'>
                <Link href="/">
                    <h2 className="cursor-pointer hover:text-[var(--yellow)]">Home</h2>
                </Link>                
                <Link href="/products">
                    <h2 className="cursor-pointer hover:text-[var(--yellow)]">Products</h2>
                </Link>
            </nav>
            <section className='cursor-pointer flex justify-self-end items-center gap-3 pr-[2vw] md:pr-[4vw] lg:pr-[5vw] text-black'>
                <Search className="hover:text-black/30" />
                <Heart className="hover:fill-black/30" fill="black" stroke="black" />
                <ShoppingBasket className="hover:text-black/30" />
                <div className='cursor-pointer rounded-full w-5 h-5 bg-[var(--yellow)] flex items-center justify-center text-black text-xs'>0</div>
            </section>
        </article>
     );
}
 
export default Header;