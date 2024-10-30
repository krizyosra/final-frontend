"use client";

import React, { useState, useEffect } from "react";
import styles from "./Product.module.css";
import axios from "axios";
import { toast } from "react-toastify";
import { MdDeleteForever } from "react-icons/md";
import { FaEdit } from "react-icons/fa";

function Addproduct() {
  const [Name, setName] = useState("");
  const [Description, setDescription] = useState("");
  const [Price, setPrice] = useState("");
  const [Version, setVersion] = useState("");
  const [selectedsubcategory, setselectedsubcategory] = useState("");
  const [selectedbrand, setselectedbrand] = useState("");
  const [brands, setbrands] = useState([]);
  const [subcategories, setsubcategories] = useState([]);
  const [Image, setImage] = useState(null); // Stocker le fichier image
  const [product, setproduct] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingproductId, setEditingproductId] = useState(null); // Pour stocker l'ID
  const [editName, setEditName] = useState(""); // Pour stocker le nom à éditer
  const [editDescription, setEditDescription] = useState("");
  const [editprice, setEditprice] = useState("");
  const [editversion, setEditversion] = useState("");
  const [editimage, setEditimage] = useState("");
  const [editselectedsubcategory, setEditselectedsubcategory] = useState("");
  const [editselectedbrand, setEditselectedbrand] = useState("");

  // console.log(brands )
  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
    setEditingproductId(null); // Réinitialiser l'ID de la marque
    setEditName(""); // Réinitialiser le nom
  };

  const editproduct = async (e, id) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", editName);
    formData.append("description", editDescription);
    formData.append("price", editprice);
    formData.append("version", editversion);
    formData.append("brandId", editselectedbrand);
    formData.append("subcategoryId", editselectedsubcategory);

    if (editimage) {
      formData.append("file", editimage); // Ajoutez l'image si elle est sélectionnée
    }

    try {
      const response = await axios.patch(
        `http://localhost:4000/api/product/updateproduct/${id}`,
        formData, // Utilisez formData ici
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "multipart/form-data", // Indiquez le type de contenu pour l'envoi de fichiers
          },
        }
      );

      toast.success(response.data.msg); // Assurez-vous que le message est récupéré correctement
      fetchData(); // Met à jour la liste des marques
      closeModal(); // Ferme le modal
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data.msg || "Erreur lors de la mise à jour"); // Affichez une erreur si nécessaire
    }
  };

  const deleteproduct = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:4000/api/product/deleteproduct/${id}`,

        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }, // Les en-têtes
        }
      );

      toast.success(response.data.msg); // Message de succès
      //console.log(response.data)
      fetchData(); // Rafraîchir la liste des catégories après l'ajout
    } catch (error) {
      console.log(error);
    }
  };

  const fetchData = async () => {
    try {
      const Response = await axios.get(
        "http://localhost:4000/api/product/getAll"
      );

      setproduct(Response.data);
      console.log(Response);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchSubcategories = async () => {
    try {
      const Response = await axios.get(
        "http://localhost:4000/api/subcategory/get"
      );
      setsubcategories(Response.data); // Stockez toutes les sous-categories dans le state
     // console.log(setsubcategories);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchBrand = async () => {
    try {
      const Response = await axios.get(
        "http://localhost:4000/api/brand/getAll"
      );
      setbrands(Response.data); // Stockez toutes les sous-categories dans le state
      console.log(setbrands);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Création de l'objet FormData
    const formData = new FormData();
    formData.append("name", Name);
    formData.append("description", Description);
    formData.append("price", Price);
    formData.append("version", Version);
    formData.append("subcategoryId", selectedsubcategory);
    formData.append("brandId", selectedbrand);
    if (Image) {
      formData.append("file", Image); // Nom doit correspondre à celui dans Multer
    }

    try {
      const response = await axios.post(
        "https://final-back-1-nk9y.onrender.com/api/product/add",
        formData,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }, // Les en-têtes
        }
      );

      toast.success(response.data.msg);
      fetchData();
    } catch (error) {
      console.log(error);
      toast.error(error.msg);
    }
  };

  useEffect(() => {
    fetchSubcategories();
    fetchBrand();
    fetchData();
    // Récupérez les catégories au chargement du composant
  }, []);

  return (
    <>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nom du produit"
          onChange={(e) => setName(e.target.value)}
          className={styles.input}
        />
        <input
          type="text"
          placeholder="Description"
          onChange={(e) => setDescription(e.target.value)}
          className={styles.input}
        />
        <input
          type="number"
          placeholder="Prix"
          onChange={(e) => setPrice(e.target.value)}
          className={styles.input}
        />
        <input
          type="text"
          placeholder="Version"
          onChange={(e) => setVersion(e.target.value)}
          className={styles.input}
        />

        <select
          className={styles.select}
          onChange={(e) => setselectedsubcategory(e.target.value)}
        >
          <option value="">Sélectionnez une Sous-categorie</option>
          {subcategories.map((el) => (
            <option key={el._id} value={el._id}>
              {el.name}
            </option>
          ))}
        </select>

        <select
          className={styles.select}
          onChange={(e) => setselectedbrand(e.target.value)}
        >
          <option value="">Sélectionnez une Brand</option>
          {brands.map((el) => (
            <option key={el._id} value={el._id}>
              {el.name}
            </option>
          ))}
        </select>

        {/* Input pour l'image */}
        <input
          type="file"
          onChange={(e) => setImage(e.target.files[0])} // Prend le fichier sélectionné
          className={styles.input}
        />

        <button type="submit" className={styles.submitButton}>
          Ajouter
        </button>
      </form>

      <div className={styles.cardCategory}>
        {product && product.length > 0 ? (
          product.map((el) => (
            <div className={styles.card}>
              <p className={styles.cardTitle}>Product:{el.name}</p>
              <p>Version:{el.Version}</p>
              <p>Prix: {el.price}</p>
              <p>Description: {el.description}</p>
              <img
                src={el.img}
                className={
                  styles.productImage
                } /* Classe CSS pour styliser l'image */
              />
              <MdDeleteForever onClick={() => deleteproduct(el._id)} />
              <FaEdit
                onClick={() => {
                  openModal();
                  setEditingproductId(el._id);
                  setEditName(el.name); // Préremplir le nom
                  setEditDescription(el.description); // Préremplir la description
                  setEditprice(el.price); // Préremplir le prix
                  setEditversion(el.version); // Préremplir la version
                  setEditselectedbrand(el.brandId); // Préremplir la marque si disponible
                  setEditselectedsubcategory(el.subcategoryId); // Préremplir la sous-catégorie si disponible
                }}
              />
            </div>
          ))
        ) : (
          <p>Aucune catégorie trouvée.</p>
        )}
      </div>

      {isModalOpen && (
        <form onSubmit={(e) => editproduct(e, editingproductId)}>
          <div className={styles.modalOverlay}>
            <div className={styles.modal}>
              <h3>Modifier le produit</h3>

              <input
                type="text"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                placeholder="Nom de la sous-categorie"
              />

              <input
                type="text"
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
                placeholder="Description"
              />

              <input
                type="text"
                value={editprice}
                onChange={(e) => setEditprice(e.target.value)}
                placeholder="price"
              />
              <input
                type="text"
                value={editversion}
                onChange={(e) => setEditversion(e.target.value)}
                placeholder="price"
              />

              <select
                className={styles.select}
                onChange={(e) => setEditselectedbrand(e.target.value)}
              >
                <option value="">Sélectionnez une brand</option>
                {brands.map((brand) => (
                  <option key={brand._id} value={brand._id}>
                    {brand.name}
                  </option>
                ))}
              </select>
              <select
                className={styles.select}
                onChange={(e) => setEditselectedsubcategory(e.target.value)}
              >
                <option value="">Sélectionnez une sous-category</option>
                {subcategories.map((subcategorie) => (
                  <option key={subcategorie._id} value={subcategorie._id}>
                    {subcategorie.name}
                  </option>
                ))}
              </select>

              <input
                type="file"
                onChange={(e) => setEditimage(e.target.files[0])} // Prend le fichier sélectionné
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

export default Addproduct;
