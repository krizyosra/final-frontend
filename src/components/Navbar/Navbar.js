"use client";
import Link from "next/link";
import { FaUser } from "react-icons/fa";
import { FiUser, FiLogOut } from "react-icons/fi";
import { MdFavoriteBorder, MdOutlineFavoriteBorder } from "react-icons/md";
import { BsBasket3 } from "react-icons/bs";
import React, { useState, useEffect } from "react";
import Modal from "@/components/Modal/Modal";
import styles from "./Navbar.module.css";
import { useRouter } from "next/navigation";
import axios from "axios";
import { SiWish } from "react-icons/si";
import { toast } from "react-toastify";
const Navbar = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [categories, setcategories] = useState([]);
  const [wishlistcount, setWishlistcount] = useState([]);

  const [cartItems, setCartItems] = useState([]); // Nouvel état pour le panier
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLogin(token);
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "https://final-back-1-nk9y.onrender.com/api/category/get"
        );
        setcategories(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des catégories", error);
      }
    };

    const savedCart = JSON.parse(localStorage.getItem("cart")) || []; // Charger le panier du Local Storage
    setCartItems(savedCart); // Initialiser l'état du panier

    fetchCategories();
    fetchFavoritesCount();
  }, []);


  const updateCartInLocalStorage = (items) => {
    localStorage.setItem("cart", JSON.stringify(items)); // Mettre à jour le Local Storage
    setCartItems(items); // Mettre à jour l'état du panier
  };

  const addToCart = (product) => {
    const updatedCart = [...cartItems, product]; // Ajouter le produit au panier
    updateCartInLocalStorage(updatedCart);
  };

  // Gérer la déconnexion
  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLogin(false);
    router.push("/"); // Rediriger vers la page d'accueil après déconnexion
  };

  const fetchFavoritesCount = async () => {
    try {
      if (localStorage.getItem("token")) {
        const response = await axios.get(
          "https://final-back-1-nk9y.onrender.com/api/favorite/get",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        // setWishlist(response.data.favorites.products)
        const favorites = response.data.favorites;
        setWishlistcount(favorites ? favorites.products.length : 0);
      }

      ///console.log(favorites ? favorites.products.length : 0);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <Link href="/">MonLogo</Link>
      </div>

      <ul className={styles.navLinks}>
        <li>
          <Link href="/">Shop</Link>
        </li>

        {categories.map((category) => (
          <li>
            <Link href={`/category/${category._id}`}>{category.name}</Link>
          </li>
        ))}
        <li>
          <Link href="/">Promotions</Link>
        </li>

        {isLogin && (
          <li>
            <Link href="/profil">Profil</Link>{" "}
            {/* Lien vers la page de profil */}
          </li>
        )}
      </ul>

      <div className={styles.icons}>
        <div className={styles.loginIcon}>
        <Link href="/cart"> {/* Lien vers la page du panier */}
            <BsBasket3 size={24} color="black" />
            {cartItems.length > 0 && (
              <span className={styles.cartCount}>({cartItems.length})</span>
            )}
          </Link>
        </div>

        <div>
          <Link href="/wishlist">
            <SiWish size={24} color="black" />
            {wishlistcount > 0 && (
              <span className={styles.wishcount}>({wishlistcount})</span>
            )}
          </Link>
        </div>

        {/* Afficher l'icône de connexion ou de déconnexion */}
        <div
          className={styles.loginIcon}
          onClick={isLogin ? handleLogout : () => setIsModalOpen(true)}
        >
          {isLogin ? (
            <FiLogOut size={24} color="black" /> // Icône de déconnexion
          ) : (
            <FiUser size={24} color="black" /> // Icône de connexion
          )}
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </nav>
  );
};

export default Navbar;
