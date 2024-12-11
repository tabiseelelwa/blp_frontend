import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreatUser = () => {
  const backend = "https://fizitech.org";
  const navigate = useNavigate();
  const [values, setValues] = useState({
    nom: "",
    postnom: "",
    prenom: "",
    email: "",
    motdepasse: "",
  });

  const enregUser = (e) => {
    e.preventDefault();
    axios
      .post(`${backend}/enregUser`, values)
      .then((res) => {
        console.log(res);
        navigate("/admin/list-users");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="">
      <div className="element_admin form ">
        <form onSubmit={enregUser}>
          <h3>Création nouvel utilisateur</h3>
          <input
            type="text"
            placeholder="Entrez le nom"
            onChange={(e) => setValues({ ...values, nom: e.target.value })}
          />
          <input
            type="text"
            placeholder="Entrez le postnom"
            onChange={(e) => setValues({ ...values, postnom: e.target.value })}
          />
          <input
            type="text"
            placeholder="Entrez le prénom"
            onChange={(e) => setValues({ ...values, prenom: e.target.value })}
          />
          <input
            type="text"
            placeholder="Entrez l'adresse email"
            onChange={(e) => setValues({ ...values, email: e.target.value })}
          />
          <button>Enregistrer</button>
        </form>
      </div>
    </div>
  );
};

export default CreatUser;
