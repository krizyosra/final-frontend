"use client";

import styles from "./Categorie.module.css";

import axios from "axios";
import { toast } from "react-toastify";
import { MdDeleteForever } from "react-icons/md";
import React, { useEffect, useState } from "react";

function Deletecategory({ id, category }) {
  const deletecategorie = async () => {
    try {
      const response = await axios.delete(
        `https://final-back-1-nk9y.onrender.com/api/category/delete/${id}`,

        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }, // Les en-têtes
        }
      );

      await category();
      toast.success(response.data); // Message de succès
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <MdDeleteForever onClick={() => deletecategorie()} />
    </>
  );
}

export default Deletecategory;
