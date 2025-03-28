import { Link } from "react-router-dom";
import { backend } from "../Composants/backend";
import { isEmpty } from "../Composants/testVide";
import { useQuery } from "@tanstack/react-query";
import { listFormations } from "../api/formations";
import { MoonLoader } from "react-spinners";
const Formations = () => {
  const {
    data: formations,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["formations"],
    queryFn: listFormations,
  });

  if (isLoading)
    return (
      <div className="spinner">
        <MoonLoader size={120} color="#fff" />
      </div>
    );
  if (error) return <div>Erreur de chargement des données</div>;

  return (
    <div className="formation">
      <div className="head">
        <h3>Nos formations</h3>
      </div>
      <div className="formations">
        {!isEmpty(formations) &&
          formations.map((form, i) => {
            return (
              <article key={i}>
                <Link to={`/detailsform/${form.idFormation}`}>
                  <div className="image_categ_formation">
                    <img
                      src={`${backend}/images-formation/${form.imageFormation}`}
                      alt=""
                    />
                  </div>
                  <div className="categorie_formation">
                    <h6>{form.intituleFormation}</h6>
                  </div>
                  <div className="texte_formation">
                    <div>
                      {form.descriptFormation.length > 50 ? (
                        <div
                          dangerouslySetInnerHTML={{
                            __html:
                              form.descriptFormation.substring(0, 50) + "...",
                          }}
                        />
                      ) : (
                        <div
                          dangerouslySetInnerHTML={{
                            __html: form.descriptFormation,
                          }}
                        />
                      )}
                    </div>
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
