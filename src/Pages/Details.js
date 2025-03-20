/* eslint-disable react-hooks/exhaustive-deps */
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useParams } from "react-router-dom";
import { detailsArticle } from "../api/articles";
import { backend } from "../Composants/backend";

const Details = () => {
  const { idArticle } = useParams();

  const {
    data: article,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["articles"],
    queryFn: () => detailsArticle(idArticle),
  });

  if (isLoading) return <div>Chargement</div>;
  if (error) return <div>Erreur de chargement des données</div>;

  return (
    <div className="Details">
      <div className="contenu">
        <img src={`${backend}/images-article/${article.imageArticle}`} alt="" />
        <h3>{article.titreArticle}</h3>
        <div dangerouslySetInnerHTML={{ __html: article.contenu }} />
      </div>
      <div className="user">
        <img src="../Img/LOGO2FZT.png" alt="" />
        <div className="info">
          <span>
            Rédigé par <strong>{article.User}</strong>, le{" "}
            {article.dateCreation}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Details;
