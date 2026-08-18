"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const savedCart = window.localStorage.getItem("elegance-cart");
      if (savedCart) {
        setItems(JSON.parse(savedCart));
      }
    } catch (error) {
      console.error("Failed to load cart", error);
    } finally {
      setHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem("elegance-cart", JSON.stringify(items));
    } catch (error) {
      console.error("Failed to save cart", error);
    }
  }, [items, hydrated]);

  const addToCart = (product) => {
    const cartProduct = {
      ...product,
      id: product.id ?? product.product_id,
      name: product.name ?? product.product_name,
      price: Number(product.price || 0),
      image: product.image || product.image_url || "/img/dresses.jpg",
    };

    setItems((currentItems) => {
      const existingItem = currentItems.find((item) => item.id === cartProduct.id);

      if (existingItem) {
        return currentItems.map((item) =>
          item.id === cartProduct.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }

      return [...currentItems, { ...cartProduct, quantity: 1 }];
    });

    setIsOpen(true);
  };

  const updateQuantity = (id, quantity) => {
    setItems((currentItems) =>
      currentItems
        .map((item) => (item.id === id ? { ...item, quantity } : item))
        .filter((item) => item.quantity > 0)
    );
  };

  const removeFromCart = (id) => {
    setItems((currentItems) => currentItems.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setItems([]);
  };

  const totalItems = useMemo(
    () => items.reduce((sum, item) => sum + item.quantity, 0),
    [items]
  );

  const subtotal = useMemo(
    () => items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [items]
  );

  return (
    <CartContext.Provider
      value={{
        items,
        isOpen,
        setIsOpen,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        totalItems,
        subtotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used inside a CartProvider");
  }

  return context;
}
