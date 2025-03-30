import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { A11y, Autoplay } from "swiper/modules";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { listAnnonces } from "../api/articles";
const Swipper = () => {
  const {
    data: annonces = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["articles"],
    queryFn: listAnnonces,
  });

  if (isLoading) return <div>Chargement des données</div>;
  if (isError) return <div>Erreur de chargement</div>;
  return (
    <Swiper
      className="swiper "
      modules={[A11y, Autoplay]}
      spaceBetween={50}
      slidesPerView={1}
      autoplay={{
        delay: 10000,
        disableOnInteraction: false,
      }}
    >
      {Array.isArray(annonces)
        ? annonces.map((annonce, i) => {
            return (
              <SwiperSlide className="swiper-slide">
                <div
                  className="hero"
                  style={{
                    backgroundImage: `url(
                "Img/kkk.jpg")`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                  }}
                >
                  <div className="texte_hero ">
                    <div className="titre">
                      <h1>{annonce.titreArticle}</h1>
                    </div>
                    <Link to={`article/${annonce.idArticle}`}>
                      <button>Lire</button>
                    </Link>
                  </div>
                </div>
              </SwiperSlide>
            );
          })
        : ""}
    </Swiper>
  );
};

export default Swipper;
