import React, { useEffect, useState } from "react";
import styles from "./Addpromotions.module.css";
import { toast } from "react-toastify";
import axios from "axios";
function Addpromotion() {
  const [Name, setName] = useState("");
  const [Type, settype] = useState("");
  const [Discountvalue, setdiscount] = useState("");
  const [startdate, setstartdate] = useState("");
  const [enddate, setenddate] = useState("");
  const [cond, setcond] = useState("");
  const [code, setcode] = useState("");
  const [promotions, setpromotions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subcategories, setsubcategories] = useState([]);
  const [brands, setbrands] = useState([]);
  const [products, setproducts] = useState([]);

  const [selectedEntities, setSelectedEntities] = useState([]);
  const [selectpromotion, setselectpromotion] = useState([]);
  const [selectedPromotionId, setSelectedPromotionId] = useState("");
  const [selectedEntityId, setSelectedEntityId] = useState("");

  const handleEntity = (e) => {
    const type = e.target.value;
    setSelectedEntities([]);
  
    switch (type) {
      case "category":
        setSelectedEntities(categories);
        break;
      case "subcategory":
        setSelectedEntities(subcategories);
        break;
      case "brand":
        setSelectedEntities(brands);
        break;
      case "product":
        setSelectedEntities(products);
        break;
      default:
        setSelectedEntities([]);
    }
  };
  
  

  const findidpromotion = (e) => {
    const promotionId = e.target.value;
    const selected = promotions.find((promo) => promo._id === promotionId);
  
    if (selected) {
      setSelectedPromotionId(selected._id); 
      console.log("Promotion sélectionnée :", selected);
    } else {
      console.log("Promotion non trouvée");
    }
  };
  
  const handleAssociationSubmit = async (e) => {
    e.preventDefault();

    let apiUrl = ""; // L'URL de l'API correspondant à l'entité
    let entityKey = ""; // La clé correspondant à l'ID de l'entité
    //let selectedEntityId = "";

    // Définir l'URL de l'API et la clé selon l'entité sélectionnée
    if (selectedEntities === categories) {
      apiUrl = "http://localhost:4000/api/promotion/addpromotionwithcategory";
      entityKey = "categoryId";
      
    } else if (selectedEntities === subcategories) {
      apiUrl =
        "http://localhost:4000/api/promotion/addpromotionwithsubcategories";
      entityKey = "subcategorieId";
    
    } else if (selectedEntities === brands) {
      apiUrl = "http://localhost:4000/api/promotion/addpromotionwithbrand";
      entityKey = "brandId";
      
    } else if (selectedEntities === products) {
      apiUrl = "http://localhost:4000/api/promotion/addpromotionwithproduct";
      entityKey = "productsIds";
      
    }

    console.log(apiUrl, entityKey);
    try {
      const response = await axios.patch(
        `${apiUrl}`,
        {
          promo: selectedPromotionId,
          [entityKey]: selectedEntityId,
        },

        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      console.log(selectedPromotionId, selectedEntityId);

      toast.success(response.data); // Affiche un message de succès
    } catch (error) {
      console.log(error); // Pour déboguer
      toast.error(error); // Affiche un message d'erreur
    }
  };

  const fetchpromotion = async () => {
    try {
      const promotionResponse = await axios.get(
        "http://localhost:4000/api/promotion/get"
      );
      // console.log(promotionResponse);
      setpromotions(promotionResponse.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchcategory = async () => {
    try {
      const categoryresponse = await axios.get(
        "http://localhost:4000/api/category/get"
      );
      setCategories(categoryresponse.data);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchsubcategories = async () => {
    try {
      const subcategoriesresponse = await axios.get(
        "http://localhost:4000/api/subcategory/get"
      );
      setsubcategories(subcategoriesresponse.data);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchbrands = async () => {
    try {
      const brandsresponse = await axios.get(
        "http://localhost:4000/api/brand/getAll"
      );
      setbrands(brandsresponse.data);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchproducts = async () => {
    try {
      const productresponse = await axios.get(
        "http://localhost:4000/api/product/getAll"
      );
      setproducts(productresponse.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:4000/api/promotion/add",
        {
          name: Name,
          type: Type,
          discountValue: Discountvalue,
          dateStart: startdate,
          dateEnd: enddate,
          conditions: cond,
          promoCode: code,
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );

      toast.success(response.data);
      // console.log(response)

      // console.log(response.data)
      //  fetchbrand();
    } catch (error) {
      console.log(error.response.data.msg);
      toast.error(error.response.data.msg);
    }
  };
  useEffect(() => {
    fetchpromotion();
    fetchcategory();
    fetchsubcategories();
    fetchbrands();
    fetchproducts();

    // Récupérez les catégories au chargement du composant
  }, []);

  return (
    <>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Promotion"
          className={styles.input}
          onChange={(e) => setName(e.target.value)}
        />
        <select
          className={styles.select}
          onChange={(e) => settype(e.target.value)}
        >
          <option value="percentage">Pourcentage</option>
          <option value="fixed">fixed</option>
          <option value="codepromo">Code promo</option>
        </select>
        <input
          type="Number"
          placeholder="Discount value"
          className={styles.input}
          onChange={(e) => setdiscount(e.target.value)}
        />
        <input
          type="Date"
          placeholder="Start Date"
          className={styles.input}
          onChange={(e) => setstartdate(e.target.value)}
        />
        <input
          type="Date"
          placeholder="Date End"
          className={styles.input}
          onChange={(e) => setenddate(e.target.value)}
        />
        <input
          type="text"
          placeholder="code promo"
          className={styles.input}
          onChange={(e) => setcode(e.target.value)}
        />
        <input
          type="text"
          placeholder="Condition"
          className={styles.input}
          onChange={(e) => setcond(e.target.value)}
        />

        <button type="submit" className={styles.submitButton}>
          ADD Promotion
        </button>
      </form>

      <br></br>
      <br></br>

      <form className={styles.form} onSubmit={handleAssociationSubmit}>
        <select className={styles.select} onChange={findidpromotion}>
          <option value="">Sélectionnez une promotion</option>
          {promotions.map((promo) => (
            <option key={promo._id} value={promo._id}>
              {promo.name}
            </option>
          ))}
        </select>

        {/* Sélection du type d'entité (Catégories, Sous-catégories, etc.) */}
        <select className={styles.select} onChange={handleEntity}>
          <option value="">Sélectionnez une entité</option>
          <option value="category">Category</option>
          <option value="subcategory">Subcategory</option>
          <option value="brand">Brand</option>
          <option value="product">Product</option>
        </select>

        {/* Liste des entités récupérées dynamiquement */}
        <select
          className={styles.select}
          onChange={(e) => setSelectedEntityId(e.target.value)}
        >
          <option value="">Sélectionnez une entité</option>
          {selectedEntities.map((entity) => (
            <option key={entity._id} value={entity._id}>
              {entity.name}
            </option>
          ))}
        </select>

        <button type="submit" className={styles.submitButton}>
          Associate promotion
        </button>
      </form>
    </>
  );
}

export default Addpromotion;
