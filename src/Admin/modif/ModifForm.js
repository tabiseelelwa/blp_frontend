import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useNavigate, useParams } from "react-router-dom";
import { detailsFormation, modifFormation } from "../../api/formations";

const ModifForm = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { idFormation } = useParams();

  // LES STATES DES ELEMENTS DU FORMULAIRE
  const [intitule, setIntitule] = useState("");
  const [description, setDescription] = useState("");

  //   LES ELEMENTS DU FORMULAIRE
  const value = new FormData();
  value.append("intitule", intitule);
  value.append("description", description);
  // CHARGEMENT DES DONNEES A MODIFIER
  const {
    isLoading,
    isError,
    data: donne,
  } = useQuery({
    queryKey: ["formations", idFormation],
    queryFn: () => detailsFormation(idFormation),
  });

  // L'AFFECTATION DES DONNES AUX ELEMENTS DU FORMULAIRES

  useEffect(() => {
    if (donne) {
      setIntitule(donne.intituleFormation);
      setDescription(donne.descriptFormation);
    }
  }, [donne]);

  const mutationModifFormation = useMutation({
    mutationFn: () => {
      return modifFormation(idFormation, value);
    },
    onSuccess: () => {
      queryClient.invalidateQueries("formations");
      navigate("/admin/formations");
    },
  });

  const modifier = (e) => {
    e.preventDefault();
    mutationModifFormation.mutate(value);
  };

  const module = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline", "strike", { color: [] }, { font: [] }],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
        { script: "sub" },
        { script: "super" },
      ],
      ["link"],
      [{ align: [] }, "blockquote", "code-block"],
    ],
  };

  if (isLoading) return <div>Chargement</div>;
  if (isError) return <div>Erreur de chargement des données....</div>;

  return (
    <div className="">
      <div className="element_admin form ">
        <form onSubmit={modifier} style={{ width: "800px" }}>
          <h3>Création d'une formation</h3>
          <input
            type="text"
            name="Intitule"
            placeholder="Intitulé de la formation"
            value={intitule}
            onChange={(e) => setIntitule(e.target.value)}
          />
          <ReactQuill
            style={{ height: "140px", marginBottom: "2rem" }}
            theme="snow"
            className="contenu"
            modules={module}
            value={description}
            onChange={setDescription}
          />
          <button>Enregistrer</button>
        </form>
      </div>
    </div>
  );
};

export default ModifForm;
