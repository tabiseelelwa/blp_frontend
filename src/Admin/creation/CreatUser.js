import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUser } from "../../api/users";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const CreatUser = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [message, setMessage] = useState("");

  const [values, setValues] = useState({
    nom: "",
    postnom: "",
    prenom: "",
    email: "",
  });

  const mutationAjoutUser = useMutation({
    mutationFn: (user) => {
      return createUser(user);
    },
    onError: (err) => {
      setMessage(err.response?.data?.Message || "Une erreur s'est produite");
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries("utilisateur");
      alert(data.Message);
    },
  });

  const enregUser = (e) => {
    e.preventDefault();
    mutationAjoutUser.mutate(values);
    navigate("/admin/list-users");
  };

  return (
    <div className="">
      <div className="element_admin form ">
        <form onSubmit={enregUser}>
          <h3>Création nouvel utilisateur</h3>
          {message ? <div>{message}</div> : ""}
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
