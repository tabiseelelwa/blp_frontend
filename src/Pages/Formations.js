import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const Formations = () => {
  const backend = "https://fizitech.org";
  const [formations, setFormations] = useState([]);
  useEffect(() => {
    axios
      .get(`${backend}/formations`)
      .then((res) => {
        setFormations(res.data);
      })
      .catch((err) => console.log(err));
  });
  return (
    <div className="formation">
      <div className="head">
        <h3>Nos formations</h3>
      </div>
      <div className="formations">
        {formations.map((form, i) => {
          return (
            <article key={i}>
              <Link to={`/detailsform/${form.idFormation}`}>
                <div className="image_categ_formation">
                  <img
                    src={`${backend}/images-formations/${form.imageFormation}`}
                    alt=""
                  />
                </div>
                <div className="categorie_formation">
                  <h6>{form.intituleFormation}</h6>
                </div>
                <div className="texte_formation">
                  <p>
                    {form.descriptFormation.length > 60 ? (
                      <div
                        dangerouslySetInnerHTML={{
                          __html:
                            form.descriptFormation.substring(0, 60) + "...",
                        }}
                      />
                    ) : (
                      <div
                        dangerouslySetInnerHTML={{
                          __html: form.descriptFormation,
                        }}
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
  );
};

export default Formations;
