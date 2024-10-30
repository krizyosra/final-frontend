"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import styles from "./Profil.module.css";
import Navbar from "../Navbar/Navbar";
import Mini from "../MiniNavbar/Mini";
import { useRouter } from "next/router";

function Profil() {
  // const router = useRouter();
  //const token = localStorage.getItem("token");

  const [user, setuser] = useState(null);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // if (!token) {
    //
    //  return router.push("/");
    //  }

    const fetchData = async () => {
      try {
        // Récupérer les données utilisateur
        const userResponse = await axios.get("https://final-back-1-nk9y.onrender.com/api/user", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });

        setuser(userResponse.data); // Mettre à jour l'état user
      

        // Récupérer les commandes
        const ordersResponse = await axios.get(
          "https://final-back-1-nk9y.onrender.com/api/order/get",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        setOrders(ordersResponse.data.order); // Mettre à jour l'état des commandes
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []); // Un seul useEffect pour tout gérer

  if (!user) {
    return <div>Loading...</div>;
  }

  if (!orders.length) {
    return <div>Loading orders...</div>;
  }

  return (
    <div className={styles.profilePage}>
      <div className={styles.profileContainer}>
        <div className={styles.cardsContainer}>
          <div className={styles.cardpersonnel}>
            <img
              className={styles.user}
              src="/images/user.png"
              width="52"
              height="52"
            />

            <p>{user.username}</p>
            <p>{user.email}</p>
          </div>

          <div className={styles.cardsav}>
            <p>customer service</p>
            <p></p>
          </div>
          <div className={styles.card1}>
            <p></p>
            <p></p>
          </div>
          <div className={styles.card2}>
            <p></p>
            <p></p>
          </div>
          <div className={styles.cardtechnique}>
            <p></p>
            <p></p>
          </div>
          <div className={styles.cardorders}>
            <img
              className={styles.order}
              src="/images/order.png"
              width="60"
              height="60"
            />

            {orders.map((order) => (
              <div>
                <p>Total: {order.total}</p>
                <p>Status: {order.status}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profil;
