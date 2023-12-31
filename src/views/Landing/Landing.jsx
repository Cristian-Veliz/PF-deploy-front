import React from "react";
import style from "./Landing.module.css";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import NavBarLanding from "../../components/NavBarLanding/NavBarLanding";
import imgDivanoPublicidad from "../../assets/DivanoPublicidad.jpg";
import imgLanding1 from "../../assets/Landing1.png";
import imgLanding2 from "../../assets/Landing2.jpg";
import imgLanding3 from "../../assets/Landing3.jpg";
import imgLanding4 from "../../assets/Landing4.jpg";
import imgLanding5 from "../../assets/Landing5.jpg";
import imgLanding6 from "../../assets/Landing6.jpg";
import imgLanding7 from "../../assets/Landing7.jpg";
import imgDestacado1 from "../../assets/SillonParis.jpg";
import imgDestacado2 from "../../assets/SillonNepal.jpg";
import imgDestacado3 from "../../assets/SillonDubai.jpg";
import imgDestacado4 from "../../assets/SillaTrafull.jpg";
import imgDestacado5 from "../../assets/CamaBox.jpg";

function Landing() {
  return (
    <div>
      <div className={style.navbar}>
        <NavBarLanding />
      </div>

      <div className={style.landing}>
        <div className={style.imageContainer}>
          <Carousel
            showArrows={false}
            showStatus={false}
            showThumbs={true}
            dynamicHeight={false}
          >
            <div className={style.img}>
              <img src={imgLanding1} alt="Muebles y Accesorios" />
              <h1 className={style.centeredText}>Furniture & Accessories!</h1>
              <h2 className={style.centered}>
                Make your interior, more minimalistic.
              </h2>
            </div>
            <div>
              <img src={imgLanding2} alt="Muebles y Accesorios" />
            </div>
            <div>
              <img src={imgLanding3} alt="Muebles y Accesorios" />
            </div>
            <div>
              <img src={imgLanding4} alt="Muebles y Accesorios" />
            </div>
            <div>
              <img src={imgLanding5} alt="Muebles y Accesorios" />
            </div>
            <div>
              <img src={imgLanding6} alt="Muebles y Accesorios" />
            </div>
            <div>
              <img src={imgLanding7} alt="Muebles y Accesorios" />
            </div>
          </Carousel>
        </div>
      </div>
      <div className={`${style.carousel} ${style.secondCarousel}`}>
        <h1>Our Most Featured Products!</h1>
        <div className={style.productImages}>
          <div>
            <img src={imgDestacado1} alt="Producto 1" />
            <p>Paris Two-Section Armchair 🌟🌟🌟🌟</p>
          </div>
          <div>
            <img src={imgDestacado2} alt="Producto 2" />
            <p>Nepal Linen Individual Armchair 🌟🌟🌟🌟</p>
          </div>
          <div>
            <img src={imgDestacado3} alt="Producto 3" />
            <p>Dubai Three-Section Armchair 🌟🌟🌟🌟🌟</p>
          </div>
          <div>
            <img src={imgDestacado4} alt="Producto 4" />
            <p>Traful Upholstered Chair 🌟🌟🌟🌟</p>
          </div>
          <div>
            <img src={imgDestacado5} alt="Producto 5" />
            <p>Baltico two-seater bed 🌟🌟🌟🌟</p>
          </div>
        </div>
      </div>
      <div>
        <img
          className={style.publicidad}
          src={imgDivanoPublicidad}
          alt="DivanoPublicidad"
        />
      </div>
    </div>
  );
}

export default Landing;
