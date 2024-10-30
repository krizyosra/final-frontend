"use client";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import style from "./Categorie.module.css";
import axios from "axios";
import { MdOutlineFavoriteBorder } from "react-icons/md";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeartCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { SlBasketLoaded } from "react-icons/sl";


function GetOneCategory({ id }) {
  const [products, setproducts] = useState([]);

  const [likedproducts, setlikedproducts] = useState("");
  //const router = useRouter();
  // const { id } = router.query;

  setTimeout(() => {
    axios.get(`http://localhost:4000/api/product/getproductwithcategory?category=${id}`)
    .then((Response)=>setproducts(Response.data))
    .catch((error)=>console.log(error)) 
   
  }, 500);

 
  
  const addlike = async (id) => {
    try {
      const response = await axios.put(
        `http://localhost:4000/api/product/addlike/${id}`
      );

      // await category()
      //console.log(response.data.message);
      toast.success(response.data.message);
      //fetchCategories();
      const liked = products.map((product) =>
        product._id === id ? { ...product, likes: product.likes + 1 } : product
      );
      setproducts(liked);

     // setlikedproducts({ ...likedproducts, [id]: true }); // les crochets [] sont utilisés pour accéder dynamiquement à une clé d'un objet, pas pour créer un tableau. C'est une fonctionnalité de JavaScript appelée computed property names (noms de
    } catch (error) {
    //  console.log(error.response.data.msg);
      toast.error(error.response.data.msg);
    }
  };

  useEffect(() => {
    // fetchproductwithcategory();
   // addlike();
    //  fetchFavorites();
  }, []);

 
  const addTowishlist = async (productId) => {
    try {
      const response = await axios.post(
        "https://final-back-1-nk9y.onrender.com/api/favorite/add",
        {
          productId,
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );

      // await category()
      // console.log(response);
      toast.success(response.data.msg);
    } catch (error) {
      // console.log(error);
      toast.error(error.response.data.msg);
    }
  };


  const addToCart = (product) => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingProduct = savedCart.find(item => item._id === product._id);
    
    if (existingProduct) {
      existingProduct.quantity += 1; // Augmenter la quantité si le produit existe déjà
    } else {
      savedCart.push({ ...product, quantity: 1 }); // Sinon, ajouter le produit avec quantité 1
    }
    
    localStorage.setItem("cart", JSON.stringify(savedCart)); // Mettre à jour le Local Storage
    toast.success("Produit ajouté au panier !");
  };
  return (
    <div className={style.cardprod}>
      {products && products.length > 0 ? (
        products.map((el) => (
          <div className={style.cardone}>
            <img src={el.img} className={style.imgp} />
            <div className={style.contentp}>
              <h3>name:{el.name}</h3>
              <p>description:{el.description}</p>
              <p>price:{el.price}</p>
              <p>likes: {el.likes}</p>
              <div className={style.iconfavlike}>
                <MdOutlineFavoriteBorder
                  className={style.iconfav}
                  title="Add to favorites"
                  style={{ fontSize: "1.5rem" }}
                  onClick={() => addlike(el._id)}
                />
               
                <FontAwesomeIcon
                  icon={faHeartCirclePlus}
                  className={style.iconfav}
                  title="Add to favorites"
                  style={{ fontSize: "1.5rem", cursor: "pointer" }}
                  onClick={() => addTowishlist(el._id)}
                />
                 <SlBasketLoaded className={style.panier} onClick={() => addToCart(el)} title="Add to cart" /> {/* Ajouter l'icône du panier */}



              </div>
            </div>
          </div>
        ))
      ) : (
        <MdOutlineFavoriteBorder/>
      )}
    </div>
  );
}
export default GetOneCategory;
