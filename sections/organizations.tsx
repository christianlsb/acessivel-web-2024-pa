import Image from "next/image";
import sectionImage from "../assets/img/png/section-image-person.png";
import iconArrowRight from "../assets/icons/icon-arrow-right.png";

const Organizations = () => {
  return (
    <>
      <section id="organizations">
        <div className="grid content">
          <div className="text">
            <h2>Organizações de Apoio</h2>
            <p>
              Ao investir em inclusão, estamos construindo um futuro no qual
              cada conquista é uma vitória compartilhada. Cadastre-se abaixo em
              nosso site para receber mais informações e fazer parte desse
              movimento rumo a uma sociedade mais igualitária e inclusiva.
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

export default Organizations;
