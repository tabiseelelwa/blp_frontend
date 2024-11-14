import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Posts() {
  const lien = "https://fizitech.org";
  const [article, setArticle] = useState([]);

  useEffect(() => {
    axios
      .get(`${lien}/listArticles`)
      .then((res) => setArticle(res.data))
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // PAGINATION
  const [currentPage, setCurrentpage] = useState(1);

  const enregParPage = 6;
  const lastIndex = currentPage * enregParPage;
  const firstIndex = lastIndex - enregParPage;
  const donnees = article.slice(firstIndex, lastIndex);
  const nbrPage = Math.ceil(article.length / enregParPage);
  return (
    <div>
      <div className="actualites">
        <h3>Actualités</h3>
        <div className="articles">
          {donnees.map((art, i) => {
            return (
              <article key={i}>
                <Link to={`/article/${art.idArticle}`}>
                  <div className="img_article">
                    <img
                      src={`${lien}/images-article/${art.imageArticle}`}
                      alt=""
                    />
                  </div>
                  <div className="texte_article">
                    <h5 className="titre_article">
                      {art.titreArticle.length > 60 ? (
                        <div
                          dangerouslySetInnerHTML={{
                            __html: art.titreArticle.substring(0, 60) + "...",
                          }}
                        />
                      ) : (
                        <divn
                          dangerouslySetInnerHTML={{ __html: art.titreArticle }}
                        />
                      )}
                    </h5>
                    <p className="contenu_article">
                      {art.contenu.length > 120 ? (
                        <div
                          dangerouslySetInnerHTML={{
                            __html: art.contenu.substring(0, 120) + "...",
                          }}
                        />
                      ) : (
                        <div
                          dangerouslySetInnerHTML={{ __html: art.contenu }}
                        />
                      )}
                    </p>
                  </div>
                </Link>
              </article>
            );
          })}
        </div>
      </div>
      <div className="controls_post">
        <button onClick={precedent}>
          {nbrPage <= 1
            ? ""
            : currentPage > 1 && nbrPage > 1
            ? "Précédent "
            : " "}
        </button>
        <span>{nbrPage <= 1 ? " " : currentPage + " sur " + nbrPage}</span>
        <button onClick={suivant}>
          {currentPage >= nbrPage ? " " : " Suivant"}
        </button>
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
}
