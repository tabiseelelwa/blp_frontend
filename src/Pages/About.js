import { useQuery } from "@tanstack/react-query";
import React from "react";
import { listAbout } from "../api/about";
// import { useNavigate } from "react-router-dom";
const About = () => {
  // const navigate = useNavigate();
  const {
    isError,
    isLoading,
    data: about,
  } = useQuery({
    queryKey: ["about"],
    queryFn: listAbout,
  });

  if (isError) return <div>Erreur de chargement</div>;
  if (isLoading) return <div>En cours de chargement</div>;
  return (
    <div>
      <div className="head">
        <h3>A propos de FiziTech Academy</h3>
      </div>
      {about.map((a, i) => {
        return (
          <div className="about" key={i}>
            <div className="contenu">
              {/* <div dangerouslySetInnerHTML={{ __html: a.description }} /> */}
            </div>
            <div className="btnAbout">
              {/* <button
                style={{ backgroundColor: "#09236b", color: "#fff" }}
                onClick={() => navigate(`/admin/about_modif/${a.idAbout}`)}
              > 
                Modifier
              </button>
              {/* <button style={{ border: "1px #09236b solid" }}>Ajouter</button> */}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default About;
