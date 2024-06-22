import Image from "next/image";
import sectionImage from "../assets/img/png/desktop/section-image-home.png";
import iconArrowRight from "../assets/icons/icon-arrow-right.png";
const Home = () => {
  return (
    <>
      <section id="home" className="section_container">
        <div className="gridProject content">
          <div className="text">
            <h1>Ajude a sua região a ser mais acessível</h1>
            <p>
              Nos ajude a mapear a sua região para futuros investimentos em
              acessibilidade na sua região. Sua colaboração é essencial para
              identificarmos áreas que necessitam de melhorias e promovermos um
              ambiente mais inclusivo para todos.
            </p>
            <button className="button_acess">
              Acessar
              <Image
                src={iconArrowRight}
                width={20}
                height={20}
                alt="Icone de seta para direita"
              />
            </button>
          </div>
          <div className="image">
            <Image
              src={sectionImage}
              width={557}
              height={320}
              alt="imagem com pessoas PCD"
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
