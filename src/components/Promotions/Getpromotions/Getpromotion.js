import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import styles from "./Getpromotion.module.css";
import Deletepromotion from "../Deletepromotion/Deletepromotion";
import Editpromotions from "../Editpromotions/Editpromotions";

function Getpromotion({ data, promofetch }) {
  console.log(data);
  return (
    <div className={styles.cardCategory}>
      {data && data.length > 0 ? (
        data.map((el) => (
          <div className={styles.card}>
            <p className={styles.cardId}>Name: {el.name}</p>
            <p className={styles.cardId}>Type: {el.type}</p>
            <p className={styles.cardId}>Discount value: {el.discountValue}</p>
            <p className={styles.cardId}>
              Date Start: {new Date(el.dateStart).toLocaleDateString()}
            </p>
            <p className={styles.cardId}>
              Date End: {new Date(el.dateEnd).toLocaleDateString()}
            </p>
            <div className={styles.statusContainer}>
              <p className={styles.cardId}>Status:</p>
              <div
                className={`${styles.statusCircle} ${
                  el.isActive ? styles.active : styles.inactive
                }`}
              ></div>
            </div>
            <Editpromotions id={el._id} fetchpromo={promofetch} />
            <Deletepromotion id={el._id} fetchpromo={promofetch} />

           
          </div>
        ))
      ) : (
        <p>Aucune Subcategory trouvée.</p>
      )}
    </div>
  );
}

export default Getpromotion;
