import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaUserAlt, FaEye, FaEdit, FaTrash, FaCamera } from "react-icons/fa";
import { Link } from "react-router-dom";

const AccueilAdmin = () => {
  const [article, setArticle] = useState([]);
  const [nombre, setNobre] = useState();
  const lien = "https://fizitech.org";
  useEffect(() => {
    axios
      .get(`${lien}/nombre_articles`)
      .then((res) => setNobre(res.data))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    axios
      .get(`${lien}/listArticles`)
      .then((res) => setArticle(res.data))
      .catch((err) => console.log(err));
  }, []);

  const supprimer = (idArticle) => {
    axios
      .delete(`${lien}/supprArticle/` + idArticle)
      .then((res) => {
        console.log(res);
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };

  // FILTRES
  const categFilstre = [...new Set(article.map((val) => val.Categorie))];

  const filtres = (cat) => {
    const newItems = article.filter((newVal) => newVal.Categorie === cat);
    setArticle(newItems);
  };

  function ButtonsFiltres() {
    return (
      <div className="cat">
        {categFilstre.map((val, i) => (
          <button onClick={() => filtres(val)} key={i}>
            {val}
          </button>
        ))}
        <button onClick={() => window.location.reload()}>
          Tous les utilisateurs
        </button>
      </div>
    );
  }

  // PAGINATION
  const [currentPage, setCurrentpage] = useState(1);

  const enregParPage = 5;
  const lastIndex = currentPage * enregParPage;
  const firstIndex = lastIndex - enregParPage;
  const donnees = article.slice(firstIndex, lastIndex);
  const nbrPage = Math.ceil(article.length / enregParPage);

  return (
    <div className="">
      <div className="categories_articles">
        <Link>
          <div className="categorie">
            <div className="icone_categ">
              <FaUserAlt />
            </div>
            <div className="details_categ">
              <p>Articles</p>
              <h6>{nombre}</h6>
            </div>
          </div>
        </Link>
      </div>

      <div className="list_articles">
        <div className="en_tete">
          <h6>Articles récents</h6>
          <ButtonsFiltres />
          <Link to="article-creation">Nouveau</Link>
        </div>
        <div className="corps">
          <table className="table table borderless">
            <thead>
              <tr>
                <th>Titre</th>
                <th>Catégorie</th>
                <th>Auteur</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {donnees.length === 0 ? (
                <tr>
                  <td
                    colSpan={4}
                    style={{ textAlign: "center", fontWeight: "bolder" }}
                  >
                    Pas d'article disponible
                  </td>
                </tr>
              ) : (
                donnees.map((art, i) => {
                  return (
                    <tr key={i}>
                      <td className="titre">
                        {art.titreArticle.length > 70
                          ? art.titreArticle.substring(0, 70) + "..."
                          : art.titreArticle}
                      </td>
                      <td className="categ_article"> {art.Categorie} </td>
                      <td className="auteur">
                        <small>{art.User}</small>
                      </td>
                      <td className="actions_articles">
                        <Link to={`details-admin/${art.idArticle}`}>
                          <FaEye style={{ color: "gray" }} />
                        </Link>
                        <Link to={`photo-article/${art.idArticle}`}>
                          <FaCamera style={{ color: "blue" }} />
                        </Link>
                        <Link to={`modif-article/${art.idArticle}`}>
                          <FaEdit style={{ color: "blue" }} />
                        </Link>
                        <div onClick={() => supprimer(art.idArticle)}>
                          <FaTrash style={{ color: "red" }} />
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>

          {/* LES BOUTONS DE PAGINATION */}
          <div className="controls">
            <button onClick={precedent}>
              {nbrPage <= 1
                ? ""
                : currentPage > 1 && nbrPage > 1
                ? "Précédent"
                : ""}
            </button>
            <span>{nbrPage <= 1 ? "" : currentPage + " sur " + nbrPage}</span>
            <button onClick={suivant}>
              {currentPage >= nbrPage ? "" : "Suivant"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  function precedent() {
    if (currentPage !== 1) {
      setCurrentpage(currentPage - 1);
    }
  }

  function suivant() {
    if (currentPage !== nbrPage) {
      setCurrentpage(currentPage + 1);
    }
  }
};

export default AccueilAdmin;
