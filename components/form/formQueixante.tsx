import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/router";
import st from "@/styles/Register.module.css";
import Image from "next/image";
import dog from "@/assets/img/jpg/dog.jpg";
import cn from "classnames";
import { Button } from "@/components/ui/button";
import Link from "../link";
import { useToast } from "@/components/ui/use-toast";
// @ts-ignore-next-line
import InputMask from "react-input-mask";
import { validate } from 'gerador-validador-cpf';

/* VALIDAÇÃO DOS CAMPOS DO FORMULÁRIO */
const formSchema = z
    .object({
      nome: z
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
      sobrenome: z
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
          .email("Email inválido")
          .refine((campo) => campo.length >= 5, {
            message: "Inválido, no mínimo 5 letras",
          }),
      cpf: z
          .string()
          .min(1, "O CPF é obrigatório")
          .length(14, "O CPF deve conter 11 números")
          .refine((cpf) => {
            const isValid = validate(cpf.replace(/[^\d]/g, ''));
            return isValid;
          }, "CPF inválido"),
      dataNascimento: z
          .string()
          .min(1, "A data de nascimento é obrigatória")
          .regex(
              /^\d{2}\/\d{2}\/\d{4}$/,
              "Data de nascimento inválida, use o formato DD/MM/AAAA"
          ),
      senha: z
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
    .refine((campos) => campos.senha === campos.confirmPassword, {
      message: "As senhas devem ser iguais!",
      path: ["confirmPassword"],
    });

const FormQueixante = () => {
  const { toast } = useToast();
  const router = useRouter();
  const [error, setError] = useState<null>();
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
  });

  const formatDateString = (dateStr: any) => {
    const [day, month, year] = dateStr.split("/");
    return `${year}-${month}-${day}`;
  };

  const onSubmit = async (values: any) => {
    setError(null);
    setLoading(true);

    const formattedValues = {
      ...values,
      dataNascimento: formatDateString(values.dataNascimento),
    };

    try {
      const response = await fetch("http://localhost:2424/queixante/post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formattedValues),
      });

      if (!response.ok) {
        const { error } = await response.json();
        toast({
          title: "Erro ao criar conta",
          description: error,
          variant: "destructive",
        });
        setLoading(false);
        throw new Error(error);
      }
      toast({
        title: "Sua conta foi criada com sucesso!",
        description: "Use suas credenciais para acessar o portal.",
        variant: "sucess",
      });
      setTimeout(() => {
        router.push("/login");
      }, 2000);
    } catch (error: any) {
      setError(error.message);
    }
  };

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
                    <label htmlFor="nome">Nome</label>
                    <span className={st.fieldValidation}>
                    {errors?.nome ? (errors.nome.message as string) : null}
                  </span>
                    <input id="nome" type="text" {...register("nome")} />
                  </div>
                  {/* Sobrenome */}
                  <div className={st.field}>
                    <label htmlFor="sobrenome">Sobrenome</label>
                    <span className={st.fieldValidation}>
                    {errors?.sobrenome
                        ? (errors.sobrenome.message as string)
                        : null}
                  </span>
                    <input
                        type="text"
                        id="sobrenome"
                        {...register("sobrenome")}
                    />
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
                  <div className={st.field}>
                    <label htmlFor="cpf">CPF</label>
                    <span className={st.fieldValidation}>
                    {errors?.cpf ? (errors.cpf.message as string) : null}
                  </span>
                    <InputMask
                        mask={"999.999.999-99"}
                        alwaysShowMask={false}
                        maskPlaceholder=""
                        id="cpf"
                        type="text"
                        {...register("cpf")}
                    />
                  </div>
                  <div className={st.field}>
                    <label htmlFor="dataNascimento">Data de nascimento</label>
                    <span className={st.fieldValidation}>
                    {errors?.dataNascimento
                        ? (errors.dataNascimento.message as string)
                        : null}
                  </span>
                    <InputMask
                        mask={"99/99/9999"}
                        id="dataNascimento"
                        type="text"
                        {...register("dataNascimento")}
                    />
                  </div>
                </div>
                <div className={st.fields}>
                  {/* Senha */}
                  <div className={st.field}>
                    <label htmlFor="senha">Senha</label>
                    <span className={st.fieldValidation}>
                    {errors?.senha ? (errors.senha.message as string) : null}
                  </span>
                    <input id="senha" type="password" {...register("senha")} />
                  </div>
                  {/* Confirmar Senha */}
                  <div className={st.field}>
                    <label htmlFor="confirmPassword">Confirmar senha</label>
                    <span className={st.fieldValidation}>
                    {errors?.confirmPassword
                        ? (errors.confirmPassword.message as string)
                        : null}
                  </span>
                    <input
                        id="confirmPassword"
                        type="password"
                        {...register("confirmPassword")}
                    />
                  </div>
                </div>
                <Button
                    disabled={loading}
                    className="bg-primaryBlue w-[320px] mx-auto block rounded-3xl"
                >
                  {loading ? "Carregando..." : "Cadastrar"}
                </Button>
              </form>
              {error && <p className={st.error}>{error}</p>}
              <Link href={"/login"}>
                Já faz parte? Clique aqui e acesse a sua conta!
              </Link>
            </div>
          </div>
        </div>
      </div>
  );
};

export default FormQueixante;
