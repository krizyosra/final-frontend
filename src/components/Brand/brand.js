"use client";
import styles from "./Brand.module.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { MdDeleteForever } from "react-icons/md";
import { FaEdit } from "react-icons/fa";

function brand() {
  const [brand, setbrand] = useState(null);
  const [Name, setName] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBrandId, setEditingBrandId] = useState(null); // Pour stocker l'ID
  const [editName, setEditName] = useState(""); // Pour stocker le nom à éditer

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingBrandId(null); // Réinitialiser l'ID de la marque
    setEditName(""); // Réinitialiser le nom
  };

  const fetchbrand = async () => {
    try {
      const brandResponse = await axios.get(
        "http://localhost:4000/api/brand/getAll"
      );

      setbrand(brandResponse.data);
      //console.log(brandResponse.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://final-back-1-nk9y.onrender.com/api/brand/add",
        { name: Name }, // Le corps de la requête
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }, // Les en-têtes
        }
      );

      toast.success(response.data); // Message de succès
      fetchbrand();

      // console.log(response.data)
      //  fetchbrand(); // Rafraîchir la liste des catégories après l'ajout
    } catch (error) {
      // console.log(error.response.data.msg);
      toast.error(error.response.data.msg);
    }
  };

  const deletebrand = async (id) => {
    try {
      const response = await axios.delete(
        `https://final-back-1-nk9y.onrender.com/api/brand/delete/${id}`,

        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }, // Les en-têtes
        }
      );

      toast.success(response.data); // Message de succès
      fetchbrand(); // Rafraîchir la liste des catégories après l'ajout
    } catch (error) {
      console.log(error);
    }
  };

  const editbrand = async (e, id) => {
    e.preventDefault();

    try {
      const response = await axios.patch(
        `https://final-back-1-nk9y.onrender.com/api/brand/update/${id}`,
        { name: editName },

        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }, // Les en-têtes
        }
      );

      toast.success(response.data);
      fetchbrand(); // Met à jour la liste des marques
      closeModal(); // Ferme le modal
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // Récupération des catégories au montage du composant
    fetchbrand();
  }, []);

  return (
    <>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nom du brand"
          className={styles.input}
          onChange={(e) => setName(e.target.value)}
        />

        <button type="submit" className={styles.submitButton}>
          Ajouter
        </button>
      </form>

      <div className={styles.cardCategory}>
        {brand && brand.length > 0 ? (
          brand.map((el) => (
            <div className={styles.card}>
              <p className={styles.cardId}>Name: {el.name}</p>
              <MdDeleteForever onClick={() => deletebrand(el._id)} />
              <FaEdit
                onClick={() => {
                  openModal();
                  setEditingBrandId(el._id);
                  setEditName(el.name);
                }}
              />

              {/* Ajoutez d'autres informations ou éléments ici */}
            </div>
          ))
        ) : (
          <p>Aucune brand trouvée.</p>
        )}
      </div>

      {isModalOpen && (
        <form onSubmit={(e) => editbrand(e, editingBrandId)}>
          <div className={styles.modalOverlay}>
            <div className={styles.modal}>
              <h3>Modifier la catégorie</h3>

              <input
                type="text"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                placeholder="Nom de la catégorie"
              />
              <button type="submit">Edit</button>

              <button onClick={closeModal}>Fermer</button>
            </div>
          </div>
        </form>
      )}
    </>
  );
}

export default brand;
