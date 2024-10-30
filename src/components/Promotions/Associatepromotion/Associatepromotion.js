import React, { useEffect, useState } from "react";
import style from "./Associatepromotion.module.css";
import axios from "axios";
import { toast } from "react-toastify";
function Associatepromotion() {
  const [promotions, setpromotions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subcategories, setsubcategories] = useState([]);
  const [brands, setbrands] = useState([]);
  const [products, setproducts] = useState([]);
  const [selectedEntities, setSelectedEntities] = useState([]);
  const [selectpromotion, setselectpromotion] = useState("");
  const [selectdetails, setselectdetails] = useState("");

  const handleEntity = (e) => {
    e.preventDefault();
    const type = e.target.value;
  
    
    if (type === "category") {
      setSelectedEntities(categories);
    } else if (type === "subcategory") {
      setSelectedEntities(subcategories);
    } else if (type === "brand") {
      setSelectedEntities(brands);
    } else if (type === "product") {
      setSelectedEntities(products);
    } else {
      setSelectedEntities([]); // Réinitialise si aucune entité n'est sélectionnée
    }
  };
  

  const fetchpromotion = async () => {
    try {
      const promotionResponse = await axios.get(
        "https://final-back-1-nk9y.onrender.com/api/promotion/get"
      );

      setpromotions(promotionResponse.data);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchcategory = async () => {
    try {
      const categoryresponse = await axios.get(
        "https://final-back-1-nk9y.onrender.com/api/category/get"
      );
      setCategories(categoryresponse.data);
      //console.log(categoryresponse)
    } catch (error) {
      console.log(error);
    }
  };
  const fetchsubcategories = async () => {
    try {
      const subcategoriesresponse = await axios.get(
        "https://final-back-1-nk9y.onrender.com/api/subcategory/get"
      );
      setsubcategories(subcategoriesresponse.data);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchbrands = async () => {
    try {
      const brandsresponse = await axios.get(
        "https://final-back-1-nk9y.onrender.com/api/brand/getAll"
      );
      setbrands(brandsresponse.data);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchproducts = async () => {
    try {
      const productresponse = await axios.get(
        "https://final-back-1-nk9y.onrender.com/api/product/getAll"
      );
      setproducts(productresponse.data);
    } catch (error) {
      console.log(error);
    }
  };

  const idpromotion = async (e) => {
    e.preventDefault();
    const promotionId = e.target.value;
    const selected = promotions.find((promo) => promo._id === promotionId);
    console.log(selected._id);
    setselectpromotion(selected._id);
  };

  const selectentitiesId = async (e) => {
    const entityId = e.target.value;
    const selected = selectedEntities.find((el) => el._id === entityId);
    setselectdetails(selected._id);
    console.log(selected._id);
  };

  const Associatepromotion = async (e) => {
   // console.log("ok")
    e.preventDefault();
    let apiUrl = ""; // L'URL de l'API correspondant à l'entité
    let entityKey = ""; // La clé correspondant à l'ID de l'entité
    if (selectedEntities === categories) {
      apiUrl = "https://final-back-1-nk9y.onrender.com/api/promotion/addpromotionwithcategory";
      entityKey = "categoryId";
    } else if (selectedEntities === subcategories) {
      apiUrl =
        "https://final-back-1-nk9y.onrender.com/api/promotion/addpromotionwithsubcategories";
      entityKey = "subcategorieId";
    } else if (selectedEntities === brands) {
      apiUrl = "https://final-back-1-nk9y.onrender.com/api/promotion/addpromotionwithbrand";
      entityKey = "brandId";
    } else if (selectedEntities === products) {
      apiUrl = "https://final-back-1-nk9y.onrender.com/api/promotion/addpromotionwithproduct";
      entityKey = "productsIds";
    }

   // console.log(apiUrl, entityKey);

    try {
       // console.log(selectpromotion, selectdetails);
      const response = await axios.patch(
        `${apiUrl}`,
        {
          promo: selectpromotion,
          [entityKey]: selectdetails,
        },

        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );

      toast.success(response.data)
       

     // toast.success(response); // Affiche un message de succès
      console.log(response);
    } catch (error) {
      toast.error(error.response.data.msg)
    }
  };

  

  useEffect(() => {
    fetchpromotion();
    fetchcategory();
    fetchsubcategories();
    fetchbrands();
    fetchproducts();
  }, []);

  return (
    <>
      <form className={style.form} onSubmit={Associatepromotion}>
        <select className={style.select} onChange={idpromotion}>
          <option value="">Sélectionnez une promotion</option>
          {promotions.map((promo) => (
            <option key={promo._id} value={promo._id}>
              {promo.name}
            </option>
          ))}
        </select>

        <select className={style.select} onChange={handleEntity}>
          <option value="">Sélectionnez une entité</option>
          <option value="category">Category</option>
          <option value="subcategory">Subcategory</option>
          <option value="brand">Brand</option>
          <option value="product">Product</option>
        </select>

        <select className={style.select} onChange={selectentitiesId}>
          <option value="">Sélectionnez une entité</option>
          {selectedEntities.map((el) => (
            <option value={el._id}>{el.name}</option>
          ))}
        </select>

        <button type="submit" className={style.submitButton}>
          Associate promotion
        </button>
      </form>
    </>
  );
}

export default Associatepromotion;
