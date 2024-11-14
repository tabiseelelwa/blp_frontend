import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const [value, setValue] = useState({
    email: "",
    password: "",
  });

  const lien = "https://fizitech.org";

  axios.defaults.withCredentials = true;

  useEffect(() => {
    axios
      .get(`${lien}/connexion`)
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
    axios.post(`${lien}/login`, value).then((res) => {
      if (res.data.Login) {
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
