"use client";

import React, { useState } from "react";
import style from "./register.module.css";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function Register() {
  const [username, setusername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:4000/api/user/register", {
        email,
        password,
        username,
      })
      .then((res) => router.push("/"))
      .catch((err) => console.log(err));
  };
  return (
    <div>
      <form className={style.formlg} onSubmit={handleSubmit}>
        <label> Username : </label>
        <input
          type="text"
          className={style.inputcolor}
          onChange={(e) => {
            setusername(e.target.value);
          }}
        />
        <label> Email : </label>
        <input
          type="email"
          className={style.inputcolor}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <label> Password : </label>
        <input
          type="password"
          className={style.inputcolor}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <button className={style.btnsend}> Send</button>
      </form>
    </div>
  );
}
