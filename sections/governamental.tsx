import Image from "next/image";
import iconArrowRight from "@/assets/icons/icon-arrow-right.png";
import sectionImage from "@/assets/img/jpg/gov.jpg";
import Link from "@/components/link";

const Governamental = () => {
    return (
        <section id="gov" className="section_container">
            <div className="gridProject content">
                <div className="text">
                    <h2>Conta governamental</h2>
                    <p>
                        Se você representa uma instituição oficial ou organização governamental, solicite sua conta governamental agora para acessar recursos exclusivos e informações disponíveis.
                        ambiente mais inclusivo para todos.
                    </p>
                    <Link href={"/governo-cadastro"} className="button_acess">
                        Solicitar
                        <Image
                            src={iconArrowRight}
                            width={20}
                            height={20}
                            alt="Icone de seta para direita"
                        />
                    </Link>
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
    )
}

export default Governamental