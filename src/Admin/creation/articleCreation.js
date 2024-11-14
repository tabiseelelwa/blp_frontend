import React, { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const Article = () => {
  const lien = "https://fizitech.org";

  const navigate = useNavigate();

  const [categories, setCategorie] = useState([]);

  const [fichier, setFichier] = useState("");
  const [titre, setTitre] = useState("");
  const [cat, setCat] = useState("");
  const [contenu, setContenu] = useState("");

  const enregArticle = (e) => {
    e.preventDefault();

    const formdata = new FormData();
    formdata.append("image", fichier);
    formdata.append("titre", titre);
    formdata.append("categorie", cat);
    formdata.append("contenu", contenu);

    axios
      .post(`${lien}/create-article`, formdata)
      .then((res) => {
        console.log(res.data);
        navigate("/admin");
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    axios
      .get(`${lien}/categories`)
      .then((res) => setCategorie(res.data))
      .catch((err) => console.log(err));
  }, []);

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

  return (
    <div className="element_admin redaction ">
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
            <option value={cat.designCateg} key={i}>
              {cat.designCateg}
            </option>
          ))}
        </select>

        <ReactQuill
          theme="snow"
          className="contenu about"
          modules={module}
          onChange={setContenu}
        />
        <button>Publier</button>
      </form>
    </div>
  );
};

export default Article;
