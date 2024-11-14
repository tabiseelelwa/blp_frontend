import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const ModifUser = () => {
  const { idUser } = useParams();
  const navigate = useNavigate();
  const lien = "https://fizitech.org";
  const [values, setValues] = useState({
    nom: "",
    postnom: "",
    prenom: "",
    email: "",
  });

  useEffect(() => {
    axios
      .get(`${lien}/user/${idUser}`)
      .then((res) => {
        setValues({
          ...values,
          nom: res.data[0].nomUser,
          postnom: res.data[0].postnomUser,
          prenom: res.data[0].prenomUser,
          email: res.data[0].email,
        });
      })
      .catch((err) => console.log(err));
  }, []);

  const modifUser = (e) => {
    e.preventDefault();
    axios
      .put(`${lien}/modifUser/${idUser}`, values)
      .then((res) => {
        console.log(res);
        navigate("/admin/list-users");
      })
      .catch((err) => console.log(err));
  };
  return (
    <div>
      <div className="element_admin form ">
        <form onSubmit={modifUser}>
          <h3>Modifier l'utilisateur</h3>
          <input
            type="text"
            placeholder="Entrez le nom"
            onChange={(e) => setValues({ ...values, nom: e.target.value })}
            value={values.nom}
          />
          <input
            type="text"
            placeholder="Entrez le postnom"
            onChange={(e) => setValues({ ...values, postnom: e.target.value })}
            value={values.postnom}
          />
          <input
            type="text"
            placeholder="Entrez le prénom"
            onChange={(e) => setValues({ ...values, prenom: e.target.value })}
            value={values.prenom}
          />
          <input
            type="text"
            placeholder="Entrez l'adresse email"
            onChange={(e) => setValues({ ...values, email: e.target.value })}
            value={values.email}
          />
          <button>Mettre à jour</button>
        </form>
      </div>
    </div>
  );
};

export default ModifUser;
