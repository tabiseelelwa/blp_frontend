import axios from "axios";
import React, { useEffect, useState } from "react";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useNavigate, useParams } from "react-router-dom";

const ModifArticle = () => {
  const backend = "https://backend.fizitech.org";

  const { idArticle } = useParams();
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);

  const [titre, setTitre] = useState("");
  const [cat, setCat] = useState("");
  const [contenu, setContenu] = useState("");

  const [values, setValues] = useState({
    titre: "",
    categorie: "",
    contenu: "",
  });

  useEffect(() => {
    axios
      .get(`${backend}/post/${idArticle}`)
      .then(
        (ti) => setTitre(ti.data[0].titreArticle),
        (ca) => setCat(ca.data[0].Categorie),
        (cont) => setContenu(cont.data[0].contenu)
      )
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    axios
      .get(`${backend}/categories`)
      .then((res) => setCategories(res.data))
      .catch((err) => console.log(err));
  }, []);

  const modifier = (e) => {
    e.preventDefault();

    axios
      .put(`${backend}/modifArticle/${idArticle}`, values)
      .then((res) => {
        console.log(res);
        navigate("/admin");
      })
      .catch((err) => console.log(err));
  };
  // const module = {
  //   toolbar: [
  //     [{ header: [1, 2, 3, false] }],
  //     ["bold", "italic", "underline", "strike", { color: [] }, { font: [] }],
  //     [
  //       { list: "ordered" },
  //       { list: "bullet" },
  //       { indent: "-1" },
  //       { indent: "+1" },
  //       { script: "sub" },
  //       { script: "super" },
  //     ],
  //     ["link"],
  //     [{ align: [] }, "blockquote", "code-block"],
  //   ],
  // };

  return (
    <div className="element_admin redaction">
      <form onSubmit={modifier}>
        <h3>Modification de l'article</h3>
        <input
          type="text"
          placeholder="Le titre de l'article"
          onChange={(e) => setValues({ ...values, titre: e.target.value })}
          value={values.titre}
        />

        <ReactQuill
          theme="snow"
          className="contenu"
          modules={module}
          value={values.contenu}
          onChange={values.contenu}
        />
        <select
          id=""
          onChange={(e) => setValues({ ...values, categorie: e.target.value })}
          value={values.categ}
        >
          <option>-- Choisir la catégorie de votre article --</option>
          {categories.map((cat, i) => (
            <option value={cat.designCateg} key={i}>
              {cat.designCateg}
            </option>
          ))}
        </select>
        <button>Soumettre</button>
      </form>
    </div>
  );
};

export default ModifArticle;
