"use client";
import styles from "./Categorie.module.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { MdDeleteForever } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { useParams } from "next/navigation";

function Addcategorie({category}) {
    const [Name, setName] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
          const response = await axios.post(
            "https://final-back-1-nk9y.onrender.com/api/category/add",
            { name: Name }, // Le corps de la requête
            {
              headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }, // Les en-têtes
            }
          );
    
          await category()
          toast.success(response.data); // Message de succès
          //fetchCategories(); // Rafraîchir la liste des catégories après l'ajout
        } catch (error) {
          console.log(error.response.data.msg);
          toast.error(error.response.data.msg);
        }
      };
    
   
  return (
    <div>
        <form className={styles.form} onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nom du Category"
          className={styles.input}
          onChange={(e) => setName(e.target.value)}
        />

        <button type="submit" className={styles.submitButton}>
          Ajouter
        </button>
      </form>
      
    </div>
  )
}

export default Addcategorie
