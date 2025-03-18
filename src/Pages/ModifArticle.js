/* eslint-disable react-hooks/exhaustive-deps */
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useNavigate, useParams } from "react-router-dom";
import { detailsArticle, modifArticle } from "../api/articles";

const ModifArticle = () => {
  const { idArticle } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const {
    data: article,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["articles", idArticle],
    queryFn: () => detailsArticle(idArticle),
  });

  const [titre, setTitre] = useState("");
  const [categorie, setCategorie] = useState("");
  const [contenu, setContenu] = useState("");

  const values = new FormData();
  values.append("titre", titre);
  values.append("categorie", categorie);
  values.append("contenu", contenu);

  useEffect(() => {
    if (article) {
      setTitre(article.titreArticle);
      setContenu(article.contenu);
    }
  }, [article]);

  const mutationModifArticle = useMutation({
    mutationFn: () => {
      return modifArticle(idArticle, values);
    },
    onSuccess: () => {
      queryClient.invalidateQueries("articles");
      navigate("/admin");
    },
  });

  const modifier = (e) => {
    e.preventDefault();

    mutationModifArticle.mutate(values);
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

  if (isLoading) return <div>Chargement en cours...</div>;
  if (isError) return <div>Erreur de chargement des données...</div>;

  return (
    <div className="element_admin redaction">
      <form onSubmit={modifier}>
        <h3>Modification de l'article</h3>
        <input
          type="text"
          placeholder="Le titre de l'article"
          name="titre"
          onChange={(e) => setTitre(e.target.value)}
          value={titre}
        />

        <ReactQuill
          theme="snow"
          className="contenu"
          modules={module}
          value={contenu}
          onChange={setContenu}
        />
        <select
          id=""
          name="categorie"
          onChange={(e) => setCategorie(e.target.value)}
          value={values.categorie}
        >
          <option>-- Choisir la catégorie de votre article --</option>
          {/* {categories.map((cat, i) => (
            <option value={cat.designCateg} key={i}>
              {cat.designCateg}
            </option>
          ))} */}
        </select>
        <button>Soumettre</button>
      </form>
    </div>
  );
};

export default ModifArticle;
