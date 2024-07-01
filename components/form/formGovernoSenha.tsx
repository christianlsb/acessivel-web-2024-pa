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
import Link from "../link";
import { useToast } from "@/components/ui/use-toast";
// @ts-ignore-next-line

/* VALIDAÇÃO DOS CAMPOS DO FORMULÁRIO */
const formSchema = z
  .object({
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

  const onSubmit = async (values: any) => {
    setError(null);
    setLoading(true);
    try {
      const response = await fetch("http://localhost:2424/queixante/post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const responseEmail = await fetch("/api/post-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: values.email, nome: values.nome }),
      });

      if (!response.ok || !responseEmail.ok) {
        toast({
          title: "Erro ao solicitar cadastro!",
          variant: "destructive",
        });
        throw new Error("Erro ao solicitar cadastro");
      }
      toast({
        title: "Sua conta foi solicitada com sucesso!",
        variant: "sucess",
      });
      setTimeout(() => {
        router.push("/governo-solicitacao-cadastro");
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
          <Image src={gov} width={692} height={610} alt="Imagem do cachorro" />
        </div>
        {/* Formulário de Cadastro */}
        <div className={st.containerForm}>
          <div className={st.contentForm}>
            <h1>Cadstro </h1>
            <p>O portal que te escuta! Estamos aqui por você.</p>
            {/* Campos */}
            <form onSubmit={handleSubmit(onSubmit)}>
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
                {/* Senha */}
                <div className={st.field}>
                  <label htmlFor="senha">Senha</label>
                  <span className={st.fieldValidation}>
                    {errors?.senha ? (errors.senha.message as string) : null}
                  </span>
                  <input id="senha" type="text" {...register("senha")} />
                </div>
                {/* Confirmar senha */}
                <div className={st.field}>
                  <label htmlFor="confirmPassword">Confirmar senha</label>
                  <span className={st.fieldValidation}>
                    {errors?.confirmPassword
                      ? (errors.confirmPassword.message as string)
                      : null}
                  </span>
                  <input
                    type="text"
                    id="confirmPassword"
                    {...register("confirmPassword")}
                  />
                </div>
              </div>

              <div className="flex gap-5">
                <Button
                  type="button"
                  className="bg-primaryBlue w-[320px] mx-auto block rounded-3xl"
                >
                  <Link href={"/"}>Cancelar</Link>
                </Button>
                <Button
                  disabled={loading}
                  className="bg-primaryBlue w-[320px] mx-auto block rounded-3xl"
                >
                  {loading ? "Carregando..." : "Solicitar Cadastro"}
                </Button>
              </div>
            </form>
            {error && <p className={st.error}>{error}</p>}
            <Link className="mt-5" href={"/governo-login"}>
              Já faz parte? Clique aqui e acesse a sua conta!
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormGoverno;
