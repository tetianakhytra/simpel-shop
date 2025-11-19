"use client";
import { useEffect, useState } from "react";
import Button from "./Button";
import BasketProduct from "./BasketProduct";
import { X } from "lucide-react";

const BasketPopUp = ({ isOpen, onClose }) => {
  const [cart, setCart] = useState([]);

  // utility til at loade cart fra localStorage
  const loadCart = () => {
    try {
      const saved = JSON.parse(localStorage.getItem("cart") || "[]");
      setCart(Array.isArray(saved) ? saved : []);
    } catch (e) {
      setCart([]);
    }
  };

  // Load when mounted AND whenever isOpen changes (so opening refreshes)
  useEffect(() => {
    if (isOpen) loadCart();
  }, [isOpen]);

  // Listen for cart updates (same-tab custom event + storage event for cross-tab)
  useEffect(() => {
    const handler = () => loadCart();
    const storageHandler = (e) => {
      if (e.key === "cart") loadCart();
    };

    window.addEventListener("cartUpdated", handler);
    window.addEventListener("storage", storageHandler);

    return () => {
      window.removeEventListener("cartUpdated", handler);
      window.removeEventListener("storage", storageHandler);
    };
  }, []);

  // remove handler som også updates localStorage + state
  const removeFromCart = (id) => {
    const next = cart.filter(item => item.id !== id);
    setCart(next);
    localStorage.setItem("cart", JSON.stringify(next));
    window.dispatchEvent(new Event("cartUpdated")); // notify others
  };

  const subtotal = cart.reduce((total, item) => {
    return total + (item.price || 0) * (item.amount || 1);
  }, 0);

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40" onClick={onClose} />
      )}

      <section className={`grid grid-cols-1 grid-rows-auto gap-3 fixed top-0 right-0 h-full w-[90%] sm:w-[400px] bg-[var(--beige)] shadow-xl z-50 overflow-y-auto transition-transform duration-200 ${isOpen ? "translate-x-0" : "translate-x-full"}`}>
       
        <main className="p-5 max-h-full overflow-y-auto">
        <button onClick={onClose} className="cursor-pointer flex text-gray-500 hover:text-gray-700 justify-self-end">
            <X size={24} />
        </button>

        <h2 className="font-heading text-xl mb-4">Your Items</h2>
      
          <div className="flex flex-col gap-5">
            {cart.length === 0 ? (
              <p className="text-gray-500">Your basket is empty.</p>
            ) : (
              cart.map(item => (
                <BasketProduct key={item.id} id={item.id} onRemove={removeFromCart} />
              ))
            )}
          </div>
        </main>

        <article className="bg-white grid grid-rows-auto gap-5 pt-2 pl-5 pr-5 pb-5 self-end">
            <div className="flex justify-between">
              <p>SUBTOTAL</p>
              <b>${subtotal.toFixed(2)}</b>
            </div>
            <Button className="w-fit justify-self-center">CHECKOUT</Button>
        </article>

      </section>
    </>
  );
};

export default BasketPopUp;
