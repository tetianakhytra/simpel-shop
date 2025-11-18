"use client";
import { useEffect, useState } from "react";
import Button from "./Button";
import BasketProduct from "./BasketProduct";
import { X } from "lucide-react";


const BasketPopUp = ({ isOpen, onClose }) => {
  const [cart, setCart] = useState([]);

  // Load cart on mount
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(savedCart);
  }, []);

  const subtotal = cart.reduce((total, item) => {
    return total + item.price * item.amount;
  }, 0);

  return (
    <div>
      {/* BACKDROP */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
          onClick={onClose}
        />
      )}

      {/* PANEL */}
      <section
        className={`
          fixed top-0 right-0 h-full 
          w-[90%] sm:w-[400px]
          bg-white shadow-xl z-50 p-6 overflow-y-auto
          transition-transform duration-200
          ${isOpen ? "translate-x-0" : "translate-x-full"}
        `}
      >

        {/* CONTENT */}
         <button onClick={onClose} className="flex text-gray-500 hover:text-gray-700 justify-self-end">
            <X size={24} />
          </button>

        <h2 className="font-heading text-xl mb-4">Your Items</h2>

        <div className="flex flex-col gap-4 max-h-[300px] overflow-y-auto">
          {cart.length === 0 && (
            <p className="text-gray-500">Your basket is empty.</p>
          )}

          {cart.map(item => (
            <BasketProduct key={item.id} id={item.id} />
          ))}
        </div>

        <article className="bg-white grid grid-rows-2 mt-6">
          <div className="flex justify-between gap-3">
            <p>SUBTOTAL</p>
            <span></span>
            <p>${subtotal.toFixed(2)}</p>
          </div>
          <Button className="w-fit mt-4 justify-self-center">CHECKOUT</Button>
        </article>

      </section>
    </div>
  );
};

export default BasketPopUp;
