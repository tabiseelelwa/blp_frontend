import React from "react";
import { backend } from "../Composants/backend";
import { Link } from "react-router-dom";

const Article = ({ article }) => {
  return (
    <article>
      <Link to={`/article/${article.idArticle}`}>
        <div className="img_article">
          <img
            src={`${backend}/images-article/${article.imageArticle}`}
            alt=""
          />
        </div>
        <div className="texte_article">
          <h5 className="titre_article">
            {article.titreArticle.length > 60
              ? article.titreArticle.substring(0, 60) + "..."
              : article.titreArticle}
          </h5>
          <div className="contenu_article">
            {article.contenu.length > 120 ? (
              <div
                dangerouslySetInnerHTML={{
                  __html: article.contenu.substring(0, 120) + "...",
                }}
              />
            ) : (
              <div dangerouslySetInnerHTML={{ __html: article.contenu }} />
            )}
          </div>
        </div>
      </Link>
    </article>
  );
};

export default Article;
