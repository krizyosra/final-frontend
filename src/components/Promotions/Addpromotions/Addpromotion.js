import React, { useState } from "react";
import styles from "./Addpromotions.module.css"; // Assurez-vous que le nom du fichier correspond



import axios from "axios";
import { toast } from "react-toastify";
import Associatepromotion from "../Associatepromotion/Associatepromotion";

function Addpromotion({getpromotion}) {
  const [Name, setName] = useState("");
  const [Type, settype] = useState("");
  const [Discountvalue, setdiscount] = useState("");
  const [startdate, setstartdate] = useState("");
  const [enddate, setenddate] = useState("");
  const [cond, setcond] = useState("");
  const [code, setcode] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://final-back-1-nk9y.onrender.com/api/promotion/add",
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

      await getpromotion()
      toast.success(response.data);
      setName("");
      setcode("");
      setcond("");
      setdiscount("");
      setenddate("");
      setstartdate("");
      settype("");
      // console.log(response)
      // console.log(response.data)
    } catch (error) {
      //console.log(error.response.data.msg)
      toast.error(error.response.data.msg);
    }

   
  };
  return (
    <>
      <form className={styles.form} onSubmit={handleSubmit}>
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
          ADD Promotion
        </button>
      </form>

      <br></br><br></br>

      
    </>
  );
}

export default Addpromotion;
