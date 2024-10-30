import React, { useState } from "react";
import { FaEdit } from "react-icons/fa";
import styles from "./Editpromotions.module.css";
import axios from "axios";
import { toast } from "react-toastify";

function Editpromotions({id, fetchpromo}) {
  const [Name, setName] = useState("");
  const [Type, settype] = useState("");
  const [Discountvalue, setdiscount] = useState("");
  const [startdate, setstartdate] = useState("");
  const [enddate, setenddate] = useState("");
  const [cond, setcond] = useState("");
  const [code, setcode] = useState("");

  const [toggle, settoggle] = useState(false);

  const editcategorie = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.patch(
        `https://final-back-1-nk9y.onrender.com/api/promotion/update/${id}`,
        {
          name: Name,
          type: Type,
          discountValue: Discountvalue,
          dateStart: startdate,
          dateEnd: enddate,
          conditions: cond,
          promoCode: code
        },

        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }, // Les en-têtes
        }
      );

      settoggle(false);
      await fetchpromo();
    // console.log(response)     
      toast.success(response.data.msg); // Message de succès
      //fetchCategories(); // Rafraîchir la liste des catégories après l'ajout
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {toggle ? (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <h3>Modifier la catégorie</h3>
            <form className={styles.form} onSubmit={editcategorie}>
        <input
          type="text"
          value={Name}
          placeholder="Promotion"
          className={styles.input}
          onChange={(e) => setName(e.target.value)}
        />
        <select
          className={styles.select}
          value={Type}
          onChange={(e) => settype(e.target.value)}
        >
          <option value="percentage">Pourcentage</option>
          <option value="fixed">fixed</option>
          <option value="codepromo">Code promo</option>
        </select>
        <input
          type="Number"
          value={Discountvalue}
          placeholder="Discount value"
          className={styles.input}
          onChange={(e) => setdiscount(e.target.value)}
        />
        <input
          type="Date"
          value={startdate}
          placeholder="Start Date"
          className={styles.input}
          onChange={(e) => setstartdate(e.target.value)}
        />
        <input
          type="Date"
          value={enddate}
          placeholder="Date End"
          className={styles.input}
          onChange={(e) => setenddate(e.target.value)}
        />
        <input
          type="text"
          value={code}
          placeholder="code promo"
          className={styles.input}
          onChange={(e) => setcode(e.target.value)}
        />
        <input
          type="text"
          value={cond}
          placeholder="Condition"
          className={styles.input}
          onChange={(e) => setcond(e.target.value)}
        />

        <button type="submit" className={styles.submitButton}>
          Edit
        </button>
      </form>
            <button onClick={() => settoggle(false)}>Fermer </button>
            {/* Bouton pour fermer le modal */}
          </div>
        </div>
      ) : null}

      <FaEdit onClick={() => settoggle(!toggle)} />
    </>
  );
}

export default Editpromotions;
