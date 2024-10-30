'use client'
import React, { useState } from "react";
import styles from "./Login.module.css";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

const Login = () => {
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://final-back-1-nk9y.onrender.com/api/user/login",
        { email: Email, password: Password },
        { headers: { "Content-Type": "application/json" } }
      );

      toast.success(response.data);
      localStorage.setItem("token", response.data.token);
      window.location.reload()
    } catch (err) {
      setError(err.response.data);
      toast.error(error.msg);
    }
  };

  const handleGoogleLogin = async () => {
    signIn("google", { callbackUrl: "/" });
  };

  return (
    <form onSubmit={handleSubmit}>
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
        Connexion
      </button>

      <button
        type="button"
        className={styles.googleButton}
        onClick={handleGoogleLogin}
      >
        Se connecter avec Google
      </button>
    </form>
  );
};

export default Login;
