"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
function Getpanier() {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(savedCart);
  }, []);

  const removeFromCart = (id) => {
    const updatedCart = cartItems.filter((item) => item._id !== id);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setCartItems(updatedCart);
    toast.success("Produit retiré du panier !");
  };

  const confirmOrder = async () => {
    // Calcul du montant total
    let totalAmount = 0;
    for (const item of cartItems) {
      totalAmount += (item.price || 0) * (item.quantity || 1);
    }
   // console.log(cartItems);

    try {
      const response = await axios.post(
        "https://final-back-1-nk9y.onrender.com/api/order/add",

        {
          products: cartItems.map((item) => ({
            namep: item.name,
            descriptionp: item.descriptionp,
            pricep: item.price,
            quantity: item.quantity,
          })),
          totalAmount, // Envoi du montant total calculé
        },

        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      console.log(response);
    } catch (error) {
      console.error("Erreur lors de la confirmation de la commande", error);
    }
  };

  return (
    <div>
      <h2>Mon Panier</h2>
      {cartItems.length === 0 ? (
        <p>Votre panier est vide.</p>
      ) : (
        cartItems.map((item) => (
          <div key={item._id}>
            <h3>{item.name}</h3>
            <p>Prix: {item.price}</p>
            <p>Quantité: {item.quantity}</p>
            <button onClick={() => removeFromCart(item._id)}>Retirer</button>
          </div>
        ))
      )}
      <button onClick={confirmOrder}>confirmer la commande</button>
    </div>
  );
}

export default Getpanier;
