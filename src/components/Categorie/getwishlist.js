"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import style from "./Categorie.module.css";
import { toast } from "react-toastify";
import { MdDeleteSweep } from "react-icons/md";
function Getwishlist() {
  const [wishlist, setwishlist] = useState([]);

  useEffect(() => {
    fetchwishlist();
    

    //  fetchFavorites();
  }, []);

  const fetchwishlist = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/api/favorite/get",
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      // setWishlist(response.data.favorites.products)

      setwishlist(response.data.favorites.products);
      //console.log(response.data.favorites.products)

      ///console.log(favorites ? favorites.products.length : 0);
    } catch (error) {
      console.error(error);
    }
  };

  const removeFromWishlist = async (id) => {
    //  e.preventDefault();
    try {
      const response = await axios.delete(
        `https://final-back-1-nk9y.onrender.com/api/favorite/delete/${id}`,

        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );

      toast.success(response.data.msg);
      fetchwishlist();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className={style.blocwish}>
        {wishlist && wishlist.length > 0 ? (
          wishlist.map((el) => (
            <div className={style.wishlist}>
              <div className={style.imgwish}>
                <img src={el.img} />
              </div>

              <div className={style.contentwish}>
                <h3>name:{el.name}</h3>
                <p>description:{el.description}</p>
                <p>price:{el.price}</p>
                <p>likes: {el.likes}</p>
              </div>
              <div className= {style.iconlist}>
              <MdDeleteSweep className={style.iconremove}  onClick={() => removeFromWishlist(el._id)} />
               
             </div>
            </div>
          ))
        ) : (
          <p>Wishlist vide.</p>
        )}
      </div>
    </>
  );
}

export default Getwishlist;
