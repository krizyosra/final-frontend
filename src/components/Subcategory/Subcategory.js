"use client";
import styles from "./Subcategory.module.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { MdDeleteForever } from "react-icons/md";
import { FaEdit } from "react-icons/fa";

function subcategory() {
  const [subcategoryList, setSubcategoryList] = useState([]); // Stocke la liste des sous-catégories
  const [newSubcategoryName, setNewSubcategoryName] = useState(""); // Stocke le nom de la sous-catégorie à ajouter
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingsubcategoryId, setEditingsubcategoryId] = useState(null); // Pour stocker l'ID
  const [editName, setEditName] = useState(""); // Pour stocker le nom à éditer

  const [editselectedcategory, seteditselectedcategory]= useState("")

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingsubcategoryId(null); // Réinitialiser l'ID de la marque
    setEditName(""); // Réinitialiser le nom
  };

  const editsubcategory = async (e, id) => {
    e.preventDefault();

    try {
      const response = await axios.patch(
        `https://final-back-1-nk9y.onrender.com/api/subcategory/update/${id}`,
        { name: editName , category: editselectedcategory},

        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }, // Les en-têtes
        }
      );

      toast.success(response.data);
      fetchData(); // Met à jour la liste des marques
      closeModal(); // Ferme le modal
    } catch (error) {
      console.log(error);
    }
  };


  const fetchData = async () => {
    try {
      const Response = await axios.get(
        "https://final-back-1-nk9y.onrender.com/api/subcategory/get"
      );

      setSubcategoryList(Response.data);
      //console.log(Response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchCategories = async () => {
    try {
      const categorieResponse = await axios.get(
        "https://final-back-1-nk9y.onrender.com/api/category/get"
      );
      setCategories(categorieResponse.data); // Stockez toutes les catégories dans le state
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddSubcategory = async (e) => {
    e.preventDefault();

    //console.log("Selected Category ID:", selectedCategory);
    try {
      const response = await axios.post(
        "https://final-back-1-nk9y.onrender.com/api/subcategory/add",
        {
          name: newSubcategoryName,
          category: selectedCategory, 
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }, 
        }
      );

      fetchData();
      toast.success(response.data);
    } catch (error) {
      //  console.log(error.response.data.msg);
      toast.error(error.response.data.msg);
    }
  };

  

  const deletesubcategory = async (id) => {
    try {
      const response = await axios.delete(
        `https://final-back-1-nk9y.onrender.com/api/subcategory/delete/${id}`,

        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }, // Les en-têtes
        }
      );

      toast.success(response.data); // Message de succès
      fetchData(); // Rafraîchir la liste des catégories après l'ajout
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
    fetchCategories();
    // Récupérez les catégories au chargement du composant
  }, []);

  return (
    <>
      <form className={styles.form} onSubmit={handleAddSubcategory}>
        <input
          type="text"
          placeholder="Nom du subcategory"
          className={styles.input}
          onChange={(e) => setNewSubcategoryName(e.target.value)}
        />
        <select
          className={styles.select}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">Sélectionnez une catégorie</option>
          {categories.map((category) => (
            <option key={category._id} value={category._id}>
              {category.name}
            </option>
          ))}
        </select>
        <button type="submit" className={styles.submitButton}>
          Ajouter
        </button>
      </form>

      <div className={styles.cardCategory}>
        {subcategoryList && subcategoryList.length > 0 ? (
          subcategoryList.map((el) => (
            <div className={styles.card}>
              <p className={styles.cardId}>Name: {el.name}</p>
              <MdDeleteForever onClick={() => deletesubcategory(el._id)} />
              <FaEdit
                onClick={() => {
                  openModal();
                  setEditingsubcategoryId(el._id);
                  setEditName(el.name);
                }}
              />
            </div>
          ))
        ) : (
          <p>Aucune Subcategory trouvée.</p>
        )}
      </div>

      {isModalOpen && (
        <form onSubmit={(e) => editsubcategory(e, editingsubcategoryId)}>
          <div className={styles.modalOverlay}>
            <div className={styles.modal}>
              <h3>Modifier la sous-categorie</h3>

              <input
                type="text"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                placeholder="Nom de la sous-categorie"
              />
              <select
          className={styles.select}
          onChange={(e) => seteditselectedcategory(e.target.value)}
        >
          <option value="">Sélectionnez une catégorie</option>
          {categories.map((category) => (
            <option key={category._id} value={category._id}>
              {category.name}
            </option>
          ))}
        </select>
              <button type="submit">Edit</button>

              <button onClick={closeModal}>Fermer</button>
            </div>
          </div>
        </form>
      )}
    </>
  );
}

export default subcategory;
