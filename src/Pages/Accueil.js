import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { A11y, Autoplay } from "swiper/modules";
import axios from "axios";

const Accueil = () => {
  const backend = "https://backend.fizitech.org";

  const [article, setArticle] = useState([]);

  useEffect(() => {
    axios
      .get(`${backend}/articles`)
      .then((res) => setArticle(res.data))
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="Accueil">
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
                <h1>
                  Nous sommes disposés à vous satisfaire en termes
                  d'organisation des formations professionnelles de qualité.
                </h1>
              </div>
              <Link to="article/2">
                <button>Lire</button>
              </Link>
            </div>
          </div>
        </SwiperSlide>
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
                <h1>
                  Nous sommes disposés à vous satisfaire en termes
                  d'organisation des formations professionnelles de qualité.
                </h1>
              </div>
              <Link to="article/2">
                <button>Lire</button>
              </Link>
            </div>
          </div>
        </SwiperSlide>
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
                <h1>
                  Nous sommes disposés à vous satisfaire en termes
                  d'organisation des formations professionnelles de qualité.
                </h1>
              </div>
              <Link to="article/2">
                <button>Lire</button>
              </Link>
            </div>
          </div>
        </SwiperSlide>
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
                <h1>
                  Nous sommes disposés à vous satisfaire en termes
                  d'organisation des formations professionnelles de qualité.
                </h1>
              </div>
              <Link to="article/2">
                <button>Lire</button>
              </Link>
            </div>
          </div>
        </SwiperSlide>
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
                <h1>
                  Nous sommes disposés à vous satisfaire en termes
                  d'organisation des formations professionnelles de qualité.
                </h1>
              </div>
              <Link to="details/2">
                <button>Lire</button>
              </Link>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>

      <div className="actualites">
        <h3>Nos dernières actualités</h3>
        <div className="articles">
          {article.map((art, i) => {
            return (
              <article key={i}>
                <Link to={`${backend}/article/${art.idArticle}`}>
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
        <Link to="/posts">
          <button className="button_afficher_tous_articles">
            Toute l'actualité
          </button>
        </Link>
      </div>

      <div className="contact">
        <form className="form_contacts">
          <input type="text" placeholder="Entrez votre nom" />
          <input type="text" placeholder="Entrez votre email" />
          <textarea
            name=""
            id=""
            cols="30"
            rows="3"
            placeholder="Ecrivez-nous votre message, votre conseil par rapport à nos services"
          ></textarea>
          <button>Envoyer</button>
        </form>
      </div>
    </div>
  );
};

export default Accueil;
