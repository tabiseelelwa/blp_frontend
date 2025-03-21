/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { backend } from "../Composants/backend";

const Login = () => {
  const navigate = useNavigate();
  const [value, setValue] = useState({
    email: "",
    password: "",
  });

  axios.defaults.withCredentials = true;

  useEffect(() => {
    axios
      .get(`${backend}/api/authentification`)
      .then((res) => {
        if (res.data.valid) {
          navigate("/admin");
        } else {
          navigate("/login");
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const connexion = (e) => {
    e.preventDefault();
    axios.post(`${backend}/api/login`, value).then((res) => {
      if (res.data.Login) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("role", res.data.result[0].role);
        localStorage.setItem("nomUser", res.data.result[0].nomUser);
        navigate("/admin");
        console.log(`"Vous êtes connecté !!"`);
      } else {
        alert("Mot de passe incorrect");
      }
    });
  };
  return (
    <div className="log">
      <form>
        <h3>Connexion</h3>
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
