/* eslint-disable react-hooks/exhaustive-deps */
import { Link } from "react-router-dom";
import { isEmpty } from "../Composants/testVide";
import Contacts from "./Contacts";
import Swipper from "./Swipper";
import { useQuery } from "@tanstack/react-query";
import { listArticles } from "../api/articles";
import { MoonLoader } from "react-spinners";
import { backend } from "../Composants/backend";

const Accueil = () => {
  const {
    data: articles = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["articles"],
    queryFn: listArticles,
    refetchOnWindowFocus: true,
  });
  console.log(articles);
  if (isLoading)
    return (
      <div className="spinner">
        <MoonLoader size={120} color="#fff" />
      </div>
    );
  if (error) return <div>Erreur de chargement des données</div>;

  return (
    <div className="Accueil">
      {/* Les annonces */}

      <Swipper />

      <div className="actualites">
        <h3>Nos dernières actualités</h3>

        {/* Les actualités */}

        <div className="articles">
          {Array.isArray(articles) ? (
            articles.map((art, i) => {
              return (
                <article key={i}>
                  <Link to={`/article/${art.idArticle}`}>
                    <div className="img_article">
                      <img
                        src={`${backend}/images-article/${art.imageArticle}`}
                        alt=""
                      />
                    </div>
                    <div className="texte_article">
                      <h5 className="titre_article">
                        {art.titreArticle.length > 60
                          ? art.titreArticle.substring(0, 60) + "..."
                          : art.titreArticle}
                      </h5>
                      <div className="contenu_article">
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
                      </div>
                    </div>
                  </Link>
                </article>
              );
            })
          ) : (
            <p>Aucun article disponible</p>
          )}
        </div>

        {/* Affichage de tous les articles */}

        {!isEmpty(articles) && articles.length > 6 ? (
          <Link to="/posts">
            <button className="button_afficher_tous_articles">
              Toute l'actualité
            </button>
          </Link>
        ) : null}
      </div>

      {/* Le formulaire du contact */}

      <Contacts />
    </div>
  );
};

export default Accueil;
