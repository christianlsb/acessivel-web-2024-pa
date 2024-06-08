import st from "@/styles/Register.module.css";
import Image from "next/image";
import dog from "@/assets/img/jpg/dog.jpg";
import cn from "classnames";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const formSchema = z.object({
  name: z.string().min(3).max(50),
  lastName: z.string().min(3).max(50),
  email: z.string().email(),
  cpf: z.string().length(11),
  birthDate: z.string(),
  password: z.string().min(6).max(50),
  confirmPassword: z.string().min(6).max(50),
});

const FormRegister = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
  });

  function onSubmit(values: any) {
    console.log(values);
  }
  return (
    <div className={st.container}>
      <div className={cn(st.content)}>
        <div className={st.contentImg}>
          <Image src={dog} width={692} height={610} alt="Imagem do cachorro" />
        </div>
        <div className={st.containerForm}>
          <div className={st.contentForm}>
            <h1>Cadastro</h1>
            <p>O portal que te escuta! Estamos aqui por você.</p>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className={st.fields}>
                <div className={st.field}>
                  <label htmlFor="name">Nome</label>
                  <input id="name" type="text" {...register("name")} />
                  {errors.name && <p>{errors.name.message as string}</p>}
                </div>
                <div className={st.field}>
                  <label htmlFor="lastName">Sobrenome</label>
                  <input type="text" id="lastName" {...register("lastName")} />
                  {errors.lastName && (
                    <p>{errors.lastName.message as string}</p>
                  )}
                </div>
              </div>
              <div className={st.fields}>
                <div className={cn(st.field, st.fieldEmail)}>
                  <label htmlFor="email">Email</label>
                  <input
                    id="email"
                    className={st.email}
                    type="text"
                    {...register("email")}
                  />
                  {errors.email && <p>{errors.email.message as string}</p>}
                </div>
              </div>
              <div className={st.fields}>
                <div className={st.field}>
                  <label htmlFor="cpf">CPF</label>
                  <input id="cpf" type="text" {...register("cpf")} />
                  {errors.cpf && <p>{errors.cpf.message as string}</p>}
                </div>
                <div className={st.field}>
                  <label htmlFor="birthDate">Data de nascimento</label>
                  <input
                    id="birthDate"
                    type="text"
                    {...register("birthDate")}
                  />
                  {errors.birthDate && (
                    <p>{errors.birthDate.message as string}</p>
                  )}
                </div>
              </div>
              <div className={st.fields}>
                <div className={st.field}>
                  <label htmlFor="password">Senha</label>
                  <input
                    id="password"
                    type="password"
                    {...register("password")}
                  />
                  {errors.password && (
                    <p>{errors.password.message as string}</p>
                  )}
                </div>
                <div className={st.field}>
                  <label htmlFor="confirmPassword">Confirmar senha</label>
                  <input
                    id="confirmPassword"
                    type="password"
                    {...register("confirmPassword")}
                  />
                  {errors.confirmPassword && (
                    <p>{errors.confirmPassword.message as string}</p>
                  )}
                </div>
              </div>
              <Button className="bg-primaryBlue w-[320px] mx-auto block rounded-3xl">
                Cadastre-se
              </Button>
            </form>
            <p>Já faz parte? Clique aqui e acesse a sua conta!</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormRegister;
