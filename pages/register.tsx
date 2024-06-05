import st from '@/styles/Register.module.css'
import Image from 'next/image'
import dog from '@/assets/img/jpg/dog.jpg'

export default function About(){
    return(
        <div className={st.container}>
            <div className={st.content}>
                <div className={st.contentImg}>
                    <Image src={dog} width={692} height={610} alt='Imagem do cachorro'/>
                </div>
                <div className={st.containerForm}>
                    <div className={st.contentForm}>
                    <h1>Cadastro</h1>
                    <span>O portal que te escuta! Estamos aqui por você.</span>
                    <div className={st.fields}>
                        <div className="field">
                            <label htmlFor="">Nome</label>
                            <input type="text" />
                        </div>
                        <div className="field">
                            <label htmlFor="">Sobrenome</label>
                            <input type="text" />
                        </div>
                    </div>
                    <div className={st.fields}>
                        <div className="field">
                            <label htmlFor="">Email</label>
                            <input type="text" />
                        </div>
                    </div>
                    <div className={st.fields}>
                        <div className="field">
                            <label htmlFor="">CPF</label>
                            <input type="text" />
                        </div>
                        <div className="field">
                            <label htmlFor="">Data de nascimento</label>
                            <input type="text" />
                        </div>
                    </div>
                    <div className={st.fields}>
                        <div className="field">
                            <label htmlFor="">Senha</label>
                            <input type="text" />
                        </div>
                        <div className="field">
                            <label htmlFor="">Confirmar senha</label>
                            <input type="text" />
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    )
}