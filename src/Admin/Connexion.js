/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import { authentification, loginConnexion } from "../api/login";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");

  const [value, setValue] = useState({
    email: "",
    password: "",
  });

  axios.defaults.withCredentials = true;

  // Système d'authentification: Vérification d'un utilisateur connecté
  const { data: user, isError } = useQuery({
    queryKey: ["login"],
    queryFn: authentification,
  });

  useEffect(() => {
    if (user) {
      if (user.Login === true) {
        navigate("/admin");
      }
    } else {
      navigate("/login");
    }
  }, [user]);

  if (isError) {
    console.error(user.error);
  }

  const mutationLogin = useMutation({
    mutationFn: (value) => {
      return loginConnexion(value);
    },
    onSuccess: (data) => {
      if (data.Login === true) {
        navigate("/admin");
        setMessage(data.Message);
      } else {
        setMessage(data.Message);
      }
    },
  });

  const connexion = (e) => {
    e.preventDefault();
    mutationLogin.mutate(value);
  };

  return (
    <div className="log">
      <form>
        <h3>Connexion</h3>
        {message ? <div>{message}</div> : ""}
        <input
          type="text"
          placeholder="esubetabiseelelwa@gmail.com"
          name="email"
          onChange={(e) => {
            setValue({ ...value, email: e.target.value });
          }}
        />
        <input
          type="password"
          placeholder="Entrez votre mot de passe"
          name="password"
          onChange={(e) => {
            setValue({ ...value, password: e.target.value });
          }}
        />
        <button onClick={connexion}>Connexion</button>

        <p>
          <Link to="/mdofi-pswd">Mot de passe oublié ?</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
