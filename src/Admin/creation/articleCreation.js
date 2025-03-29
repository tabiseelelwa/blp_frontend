/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createArticle } from "../../api/articles";
import { listCategories } from "../../api/categories";
import { MoonLoader } from "react-spinners";

const Article = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [fichier, setFichier] = useState("");
  const [titre, setTitre] = useState("");
  const [categorie, setCat] = useState("");
  const [contenu, setContenu] = useState("");

  const values = new FormData();
  values.append("image", fichier);
  values.append("titre", titre);
  values.append("contenu", contenu);
  values.append("categorie", categorie);

  const mutationArticle = useMutation({
    mutationFn: (article) => {
      return createArticle(article);
    },

    onError: (err) => {
      console.error(err);
    },

    onSuccess: () => {
      queryClient.invalidateQueries("articles");
      console.log("Enregistrement effectué avec succès...!");
    },
  });
  const enregArticle = (e) => {
    e.preventDefault();
    mutationArticle.mutate(values);
    navigate("/admin");
  };

  // chargement des catégories
  const {
    data: categories,
    isLoading: chargement,
    isError: erreur,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: () => listCategories(),
  });

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

  if (chargement)
    return (
      <div className="spinner">
        <MoonLoader size={120} color="#fff" />
      </div>
    );
  if (erreur) return <div>Erreur de chargement</div>;
  return (
    <div className="redaction">
      <form onSubmit={enregArticle}>
        <h3>Création nouvel article</h3>
        <input type="file" onChange={(e) => setFichier(e.target.files[0])} />
        <input
          type="text"
          placeholder="Entrez le titre de l'article"
          onChange={(e) => setTitre(e.target.value)}
        />
        <select onChange={(e) => setCat(e.target.value)}>
          <option>-- Choisir une catégorie --</option>
          {categories.map((cat, i) => (
            <option value={cat.nomCategorie} key={i}>
              {cat.nomCategorie}
            </option>
          ))}
        </select>

        <ReactQuill
          theme="snow"
          className="contenu about"
          modules={module}
          value={contenu}
          onChange={setContenu}
        />
        <button>Publier</button>
      </form>
    </div>
  );
};

export default Article;
