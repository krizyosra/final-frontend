"use client";

import React, { useState } from "react";
import styles from "./Modal.module.css";

import Login from "../Login/Login";
import Register from "../Register/Register";


function Modal({ isOpen, onClose }) {
  const [isLoginView, setIsLoginView] = useState(true);

  const toggleView = () => setIsLoginView(!isLoginView);

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <div className={styles.closeButton} onClick={onClose}>
          ✖
        </div>
        <h2>{isLoginView ? "Connexion" : "Inscription"}</h2>
        
        {isLoginView ? <Login/>  : <Register/> }

        <p className={styles.switchText}>
          {isLoginView ? "Pas encore de compte ? " : "Déjà un compte ? "}
          <span onClick={toggleView} className={styles.switchLink}>
            {isLoginView ? "S'inscrire" : "Se connecter"}
          </span>
        </p>
      </div>
    </div>
  );
}

export default Modal;
