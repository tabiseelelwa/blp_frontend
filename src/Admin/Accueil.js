import React from "react";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { listArticles, supprimArticle } from "../api/articles";

const AccueilAdmin = () => {
  const queryClient = useQueryClient();

  const {
    isLoading,
    data: articles,
    isError,
  } = useQuery({
    queryKey: ["articles"],
    queryFn: listArticles,
  });

  const mutationSupprArticle = useMutation({
    mutationFn: (idArticle) => {
      return supprimArticle(idArticle);
    },
    onError: (err) => {
      console.error(err);
    },
    onSuccess: () => {
      queryClient.invalidateQueries("articles");
    },
  });

  const supprimer = (idArticle) => {
    mutationSupprArticle.mutate(idArticle);
  };

  if (isLoading) return <div>Loading ...</div>;
  if (isError) return <div>Erreur de chargment</div>;

  return (
    <div className="">
      <div className="categories_articles">
        <Link>
          {/* <div className="categorie">
             <div className="icone_categ">
              <FaFile /> 
            </div>
            <div className="details_categ">
              <h6>{300}</h6>
              <p>Articles</p>
            </div>
          </div> */}
        </Link>
      </div>

      <div className="list_articles">
        <div className="en_tete">
          <h6>Articles récents</h6>
          <Link to="/admin/article-creation">Nouveau</Link>
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
              {articles.length === 0 ? (
                <tr>
                  <td
                    colSpan={4}
                    style={{ textAlign: "center", fontWeight: "bolder" }}
                  >
                    Pas d'article disponible
                  </td>
                </tr>
              ) : (
                articles.map((art, i) => {
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
          <div className="controls"></div>
        </div>
      </div>
    </div>
  );
};

export default AccueilAdmin;
