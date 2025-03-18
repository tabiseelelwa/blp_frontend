import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { A11y, Autoplay } from "swiper/modules";
import { Link } from "react-router-dom";

const Swipper = () => {
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
                Nous sommes disposés à vous satisfaire en termes d'organisation
                des formations professionnelles de qualité.
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
                Nous sommes disposés à vous satisfaire en termes d'organisation
                des formations professionnelles de qualité.
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
                Nous sommes disposés à vous satisfaire en termes d'organisation
                des formations professionnelles de qualité.
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
                Nous sommes disposés à vous satisfaire en termes d'organisation
                des formations professionnelles de qualité.
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
                Nous sommes disposés à vous satisfaire en termes d'organisation
                des formations professionnelles de qualité.
              </h1>
            </div>
            <Link to="details/2">
              <button>Lire</button>
            </Link>
          </div>
        </div>
      </SwiperSlide>
    </Swiper>
  );
};

export default Swipper;
