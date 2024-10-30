"use client";
import React, { useEffect, useState } from "react";
import styles from './Admin.module.css'; // Importation des styles CSS
import Product from "../Product/Product"
import Categorie from "../Categorie/Editcategory";
import Brand from "../Brand/brand";
import Subcategory from "../Subcategory/Subcategory";
import Getcategory from "../Categorie/Getcategory";
import Addcategorie from "../Categorie/Addcategorie";
import axios from "axios";
import Addpromotion from "../Promotions/Addpromotions/Addpromotion";
import Associatepromotion from "../Promotions/Associatepromotion/Associatepromotion";
import Getpromotion from "../Promotions/Getpromotions/Getpromotion";
import Deletepromotion from "../Promotions/Deletepromotion/Deletepromotion";
import Editpromotions from "../Promotions/Editpromotions/Editpromotions";

const AdminDashboard = () => {
  const [activeSection, setActiveSection] = useState('dashboard'); // Gérer les sections actives

  const [category, setcategory] = useState([]);
  const [getpromotion, setpromotion] = useState([]);

  const fetchpromotion = async () => {
    try {
      const Response = await axios.get(
        "https://final-back-1-nk9y.onrender.com/api/promotion/get"
      );

      setpromotion(Response.data);
      //console.log(Response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchpromotion();
  }, []);

  const fetchCategories = async () => {
      try {
        const categorieResponse = await axios.get(
          "https://final-back-1-nk9y.onrender.com/api/category/get"
        );
        setcategory(categorieResponse.data); // Stockez toutes les catégories dans le state
        console.log(categorieResponse)
      } catch (error) {
        console.log(error);
      }
    };

    useEffect(() => {
      // Récupération des catégories au montage du composant
       fetchCategories();
    }, []);

  return (
    <div className={styles.adminDashboard}>
      {/* Barre latérale */}
      <nav className={styles.sidebar}>
        <div className={styles.logo}>Admin Panel</div>
        <ul>
          <li className={activeSection === 'dashboard' ? styles.active : ''} onClick={() => setActiveSection('dashboard')}>
            <span>Dashboard</span>
          </li>
          <li className={activeSection === 'products' ? styles.active : ''} onClick={() => setActiveSection('products')}>
            <span>Products</span>
          </li>
          <li className={activeSection === 'categories' ? styles.active : ''} onClick={() => setActiveSection('categories')}>
            <span>Category</span>
          </li>
          <li className={activeSection === 'brands' ? styles.active : ''} onClick={() => setActiveSection('brands')}>
            <span>Brands</span>
          </li>
          <li className={activeSection === 'subcategories' ? styles.active : ''} onClick={() => setActiveSection('subcategories')}>
            <span>SubCategories</span>
          </li>
          <li className={activeSection === 'promotions' ? styles.active : ''} onClick={() => setActiveSection('promotions')}>
            <span>Promotions</span>
          </li>
        </ul>
      </nav>

      {/* Contenu principal */}
      <div className={styles.mainContent}>
        <header className={styles.header}>
          <h2>{activeSection.charAt(0).toUpperCase() + activeSection.slice(1)}</h2>
          <div className={styles.searchBar}>
            <input type="text" placeholder="Rechercher..." />
          </div>
        </header>
        
        {/* Section dynamique */}
        <div className={styles.content}>
          {activeSection === 'dashboard' && <div>Tableau de bord avec statistiques</div>}
          {activeSection === 'products' && <Product  />}
          {activeSection === 'categories' && (
  <>
   <Addcategorie category={fetchCategories}/>
    <Getcategory category={category} fetchCategories={fetchCategories} />
   
  </>
)}
          {activeSection === 'brands' && <Brand/>}
          {activeSection === 'subcategories' && <Subcategory/>}
          {activeSection === 'promotions' &&<> <Addpromotion getpromotion={fetchpromotion}/> <Associatepromotion/> <Getpromotion data={getpromotion} promofetch={fetchpromotion}/> <Editpromotions/> </> }
        </div>
      </div>
    </div>
  );
};



export default AdminDashboard;
