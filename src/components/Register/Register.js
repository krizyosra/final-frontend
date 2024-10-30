
'use client'
import React, { useState } from "react";
import styles from "./Register.module.css";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const Register = () => {
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [Username, setUsername] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://final-back-1-nk9y.onrender.com/api/user/register",
        {
          email: Email,
          password: Password,
          username: Username,
        },
        { headers: { "Content-Type": "application/json" } }
      );

      toast.success(response.data);
      localStorage.setItem("token", response.data.token);
      router.push("/profil");
    } catch (err) {
      setError(err.response.data);
      toast.error(err.response.data);
    
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Nom"
        className={styles.input}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="email"
        placeholder="Email"
        className={styles.input}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Mot de passe"
        className={styles.input}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit" className={styles.submitButton}>
        S'inscrire
      </button>
    </form>
  );
};

export default Register;
