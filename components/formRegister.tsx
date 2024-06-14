import st from "@/styles/Register.module.css";
import Image from "next/image";
import dog from "@/assets/img/jpg/dog.jpg";
import cn from "classnames";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Link from "./link";

/* VALIDAÇÃO DOS CAMPOS DO FORMULÁRIO */
const formSchema = z
  .object({
    name: z
      .string()
      .min(1, "O nome é obrigatório")
      .max(50, "Inválido, no máximo 50 letras")
      .regex(
        /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžæÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u,
        "Nome inválido"
      )
      .refine((campo) => campo.length >= 3, {
        message: "Inválido, no mínimo 3 letras",
      }),
    lastName: z
      .string()
      .min(1, "O sobrenome é obrigatório")
      .max(50, "Inválido, no máximo 50 letras")
      .regex(
        /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžæÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u,
        "Nome inválido"
      )
      .refine((campo) => campo.length >= 3, {
        message: "Inválido, no mínimo 3 letras",
      }),
    email: z
      .string()
      .min(1, "O email é obrigatório")
      .max(100, "Inválido, no máximo 100 letras")
      .email("Email inválido") /* verificação de email existente no bd */
      .refine((campo) => campo.length >= 5, {
        message: "Inválido, no mínimo 5 letras",
      }),
    cpf: z
      .string()
      .min(1, "O CPF é obrigatório")
      .length(
        11,
        "O CPF deve conter 11 números"
      ) /* verificação de cpf existente e se é válido */,
    birthDate: z
      .string()
      .min(1, "A data de nascimento é obrigatória")
      .date("Inválida, formato YYYY-MM-DD"),
    password: z
      .string()
      .min(1, "A senha é obrigatória")
      .max(50, "Inválida, no máximo 50 carateres")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{0,}$/,
        "Senha inválida, ex:: Senha123!"
      )
      .refine((campo) => campo.length >= 8, {
        message: "Inválido, no mínimo 8 caracteres",
      }),
    confirmPassword: z
      .string()
      .min(1, "A senha é obrigatória")
      .max(50, "Inválida, no máximo 50 carateres")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{0,}$/,
        "Senha inválida, ex: Senha123!"
      )
      .refine((campo) => campo.length >= 8, {
        message: "Inválido, no mínimo 8 caracteres",
      }),
  })
  .refine(
    (campos) => {
      return campos.password == campos.confirmPassword;
    },
    {
      message: "As senhas devem ser iguais!",
      path: ["confirmPassword"],
    }
  );

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
        {/* Imagem do Cachorro */}
        <div className={st.contentImg}>
          <Image src={dog} width={692} height={610} alt="Imagem do cachorro" />
        </div>

        {/* Formulário de Cadastro */}
        <div className={st.containerForm}>
          <div className={st.contentForm}>
            <h1>Cadastro</h1>
            <p>O portal que te escuta! Estamos aqui por você.</p>
            {/* Campos */}
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className={st.fields}>
                {/* Nome */}
                <div className={st.field}>
                  <label htmlFor="name">Nome</label>
                  <span className={st.fieldValidation}>
                    {errors?.name ? (errors.name.message as string) : null}
                  </span>
                  <input id="name" type="text" {...register("name")} />
                </div>
                {/* Sobrenome */}
                <div className={st.field}>
                  <label htmlFor="lastName">Sobrenome</label>
                  <span className={st.fieldValidation}>
                    {errors?.lastName ? (errors.lastName.message as string) : null}
                  </span>
                  <input type="text" id="lastName" {...register("lastName")} />
                </div>
              </div>
              <div className={st.fields}>
                {/* Email */}
                <div className={cn(st.field, st.fieldEmail)}>
                  <label htmlFor="email">Email</label>
                  <span className={st.fieldValidation}>
                    {errors?.email ? (errors.email.message as string) : null}
                  </span>
                  <input
                    id="email"
                    className={st.email}
                    type="text"
                    {...register("email")}
                  />
                </div>
              </div>
              <div className={st.fields}>
                {/* CPF */}
                <div className={st.field}>
                  <label htmlFor="cpf">CPF</label>
                  <span className={st.fieldValidation}>
                    {errors?.cpf ? (errors.cpf.message as string) : null}
                  </span>
                  <input id="cpf" type="text" {...register("cpf")} />
                </div>
                {/* Data Nascimento */}
                <div className={st.field}>
                  <label htmlFor="birthDate">Data de nascimento</label>
                  <span className={st.fieldValidation}>
                    {errors?.birthDate ? (errors.birthDate.message as string) : null}
                  </span>
                  <input
                    id="birthDate"
                    type="text"
                    {...register("birthDate")}
                  />
                </div>
              </div>
              <div className={st.fields}>
                {/* Senha */}
                <div className={st.field}>
                  <label htmlFor="password">Senha</label>
                  <span className={st.fieldValidation}>
                    {errors?.password ? (errors.password.message as string) : null}
                  </span>
                  <input
                    id="password"
                    type="password"
                    {...register("password")}
                  />
                </div>
                {/* Confirmar Senha */}
                <div className={st.field}>
                  <label htmlFor="confirmPassword">Confirmar senha</label>
                  <span className={st.fieldValidation}>
                    {errors?.confirmPassword ? (errors.confirmPassword.message as string) : null}
                  </span>
                  <input
                    id="confirmPassword"
                    type="password"
                    {...register("confirmPassword")}
                  />
                </div>
              </div>
              <Button className="bg-primaryBlue w-[320px] mx-auto block rounded-3xl">
                Cadastre-se
              </Button>
            </form>
            <Link href={"/login"}>
              Já faz parte? Clique aqui e acesse a sua conta!
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormRegister;
