"use client";
import styles from "./Categorie.module.css";
import React, { useEffect, useState } from "react";

import Deletecategory from "./Deletecategory";
import Editcategorie from "./Editcategory";
function Getcategory({category, fetchCategories}) {
   
    
  return (

   
      <div className={styles.cardCategory}>
        {category && category.length > 0 ? (
          category.map((el) => (
            <div className={styles.card}>
              <p className={styles.cardTitle}>{el.name}</p>
             <Deletecategory id={el._id} category={fetchCategories}/>
             <Editcategorie id={el._id} fetchcategory={fetchCategories}/>
             
            </div>
          ))
        ) : (
          <p>Aucune catégorie trouvée.</p>
        )}
      </div>
  
  )
}

export default Getcategory
