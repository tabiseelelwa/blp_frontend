import React, { useState } from "react";
import { useSelector } from "react-redux";
import { isEmpty } from "../Composants/testVide";
import Articles from "./Articles";

const Posts = () => {
  const articles = useSelector((state) => state.articleReducer);

  // PAGINATION
  const [currentPage, setCurrentpage] = useState(1);
  const enregParPage = 6;
  const lastIndex = currentPage * enregParPage;
  const firstIndex = lastIndex - enregParPage;
  !isEmpty(articles) && articles.slice(firstIndex, lastIndex);
  const nbrPage = Math.ceil(
    (!isEmpty(articles) && articles.length) / enregParPage
  );

  return (
    <div>
      <div className="actualites">
        <h3>Actualités</h3>

        <div className="articles">
          {!isEmpty(articles) &&
            articles.map((art, i) => {
              return <Articles article={art} key={i} />;
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
};

export default Posts;
