import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { listAbout } from "../api/about";
import { useNavigate } from "react-router-dom";
import { authentification } from "../api/login";
const About = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const {
    isError,
    isLoading,
    data: about,
  } = useQuery({
    queryKey: ["about"],
    queryFn: listAbout,
    refetchOnWindowFocus: true,
  });

  const { data: user } = useQuery({
    queryKey: ["login"],
    queryFn: authentification,
  });

  useEffect(() => {
    if (user) {
      if (user.Login === true) {
        setIsLoggedIn(true);
      }
    }
  }, [user]);

  if (isError) return <div>Erreur de chargement</div>;
  if (isLoading) return <div>En cours de chargement</div>;
  return (
    <div>
      <div className="head">
        <h3>A propos de FiziTech Academy</h3>
      </div>
      {about.map((a, i) => {
        return (
          <div className="About-wraper" key={i}>
            <div className="contenu">
              <div dangerouslySetInnerHTML={{ __html: a.description }} />
            </div>
            {isLoggedIn ? (
              <div className="btnAbout">
                <button
                  style={{ backgroundColor: "#09236b", color: "#fff" }}
                  onClick={() => navigate(`/admin/about_modif/${a.idAbout}`)}
                >
                  Modifier
                </button>
                <button
                  style={{ border: "1px #09236b solid" }}
                  onClick={() => navigate("/admin/about_creat")}
                >
                  Ajouter
                </button>
              </div>
            ) : (
              ""
            )}
          </div>
        );
      })}
    </div>
  );
};

export default About;
