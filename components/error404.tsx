import st from "@/styles/Error404.module.css";
import errorImage from "../assets/img/png/desktop/section-image-home.png";
import Image from "next/image";

const Error404 = () => {
  return (
    <div className={st.container}>
      <div className={st.section}>
        <h1 className={st.title}>ERRO 404</h1>
        <h1 className={st.title}>Página não encontrada</h1>
        <p className={st.text}>Não encontramos este página.</p>
        <p className={st.text}>Pedimos desculpa pelo incoveniente :(</p>
      </div>
      <Image
        height={300}
        className={st.img}
        src={errorImage}
        alt="Imagem de erro 404 - Página não encontrada"
      />
    </div>
  );
};

export default Error404;
