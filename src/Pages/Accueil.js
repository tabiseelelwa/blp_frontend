/* eslint-disable react-hooks/exhaustive-deps */
import { Link } from "react-router-dom";
import { isEmpty } from "../Composants/testVide";
import Articles from "./Articles";
import Contacts from "./Contacts";
import Swipper from "./Swipper";
import { useQuery } from "@tanstack/react-query";
import { listArticles } from "../api/articles";

const Accueil = () => {
  const {
    data: articles,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["articles"],
    queryFn: listArticles,
    refetchOnWindowFocus: true,
  });

  if (isLoading) return <div>Chargement</div>;
  if (error) return <div>Erreur de chargement des données</div>;

  return (
    <div className="Accueil">
      {/* Les annonces */}

      <Swipper />

      <div className="actualites">
        <h3>Nos dernières actualités</h3>

        {/* Les actualités */}

        <div className="articles">
          {!isEmpty(articles) &&
            articles.map((art, i) => {
              return <Articles article={art} key={i} />;
            })}
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
