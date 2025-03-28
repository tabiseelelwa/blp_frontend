/* eslint-disable react-hooks/exhaustive-deps */
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { detailsUser, modifUser } from "../../api/users";

const ModifUser = () => {
  const { idUser } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: user } = useQuery({
    queryKey: ["utilisateur", idUser],
    queryFn: () => detailsUser(idUser),
  });

  const [values, setValues] = useState({
    nom: "",
    postnom: "",
    prenom: "",
    email: "",
  });

  useEffect(() => {
    if (user) {
      setValues({
        ...values,
        nom: user.nomUser,
        postnom: user.postnomUser,
        prenom: user.prenomUser,
        email: user.email,
      });
    }
  }, [user]);

  const mutationModifUser = useMutation({
    mutationFn: () => modifUser(idUser, values),
    onSuccess: () => {
      queryClient.invalidateQueries("utilisateur");
    },
  });

  const ModifUser = (e) => {
    e.preventDefault();
    mutationModifUser.mutate(values);
    navigate("/admin/list-users");
  };
  return (
    <div>
      <div className="element_admin form ">
        <form onSubmit={ModifUser}>
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
