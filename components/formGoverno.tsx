import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/router";
import st from "@/styles/Register.module.css";
import Image from "next/image";
import gov from "@/assets/img/jpg/gov.jpg";
import cn from "classnames";
import { Button } from "@/components/ui/button";
import Link from "./link";
import { useToast } from "@/components/ui/use-toast";

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
    matricula: z
      .number()
      .min(8, "Inválido, no minimo 8 numeros")
      .max(8, "Inválido, no máximo 8 numeros"),
    email: z
      .string()
      .min(1, "O email é obrigatório")
      .max(100, "Inválido, no máximo 100 letras")
      .email("Email inválido")
      .refine((campo) => campo.length >= 5, {
        message: "Inválido, no mínimo 5 letras",
      }),
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

const FormGoverno = () => {
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

  const formatDateString = (dateStr: string) => {
    const [day, month, year] = dateStr.split("/");
    return `${year}-${month}-${day}`;
  };

  const onSubmit = async (values: any) => {
    setError(null);
    setLoading(true);

    const formattedValues = {
      ...values,
      data_nascimento: formatDateString(values.data_nascimento),
    };

    try {
      const response = await fetch("/api/user", {
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
        {/* Imagem do gov */}
        <div className={st.contentImg}>
          <Image src={gov} width={692} height={610} alt="Imagem do cachorro" />
        </div>
        {/* Formulário de Cadastro */}
        <div className={st.containerForm}>
          <div className={st.contentForm}>
            <h1>Cadastro Governamental</h1>
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
                  <input required id="nome" type="text" {...register("nome")} />
                </div>
                {/* Matricula */}
                <div className={st.field}>
                  <label htmlFor="matricula">Matricula</label>
                  <span className={st.fieldValidation}>
                    {errors?.matricula
                      ? (errors.matricula.message as string)
                      : null}
                  </span>
                  <input
                    required
                    type="number"
                    id="matricula"
                    {...register("matricula")}
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
                    required
                    id="email"
                    className={st.email}
                    type="text"
                    {...register("email")}
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
                  <input required id="senha" type="password" {...register("senha")} />
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
                    required
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
            <Link href={"/governo-login"}>
              Já faz parte? Clique aqui e acesse a sua conta!
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormGoverno;
