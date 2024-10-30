"use client";

import styles from "./Categorie.module.css";
import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

import { FaEdit } from "react-icons/fa";



function Editcategorie({id, fetchcategory}) {
  const [Name, setName] = useState("");
  

  const[toggle,settoggle]=useState(false)


  const editcategorie = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.patch(
        `https://final-back-1-nk9y.onrender.com/api/category/update/${id}`,
        { name: Name },

        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }, // Les en-têtes
        }
      );

      settoggle(false)
      await fetchcategory()
      toast.success(response.data); // Message de succès
      //fetchCategories(); // Rafraîchir la liste des catégories après l'ajout
     
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
     
     
       { toggle? <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <h3>Modifier la catégorie</h3>
            <form onSubmit={editcategorie}>
              <input
                type="text"
                placeholder="Nom de la catégorie"
                onChange={(e) => setName(e.target.value)}
              />
              <button type="submit">Edit </button>
             
            </form>
            <button onClick={()=>settoggle(false)} >Fermer </button>
            {/* Bouton pour fermer le modal */}
          </div>
        </div>: null
      }
      

      
             
              <FaEdit onClick={()=>settoggle(!toggle)} /> 
          
    </>
  );
}

export default Editcategorie;
