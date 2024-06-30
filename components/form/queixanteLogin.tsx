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
import Cookies from "js-cookie";
import { useToast } from "@/components/ui/use-toast";

/* VALIDAÇÃO DOS CAMPOS DO FORMULÁRIO */
const formSchema = z.object({
  email: z
    .string()
    .min(1, "O email é obrigatório")
    .max(100, "Inválido, no máximo 100 letras")
    .email("Email inválido"),
  senha: z
    .string()
    .min(1, "A senha é obrigatória")
    .max(50, "Inválida, no máximo 50 caracteres")
    .refine((campo) => campo.length >= 8, {
      message: "Inválido, no mínimo 8 caracteres",
    }),
});

const QueixanteLogin = () => {
  const router = useRouter();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (values: any) => {
    setError(null);
    setLoading(true);
    try {
      const response = await fetch("/api/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        const { error } = await response.json();
        setLoading(false);
        toast({
          title: "Erro",
          description: "Usuário ou senha inválidos",
          variant: "destructive",
        });
        throw new Error(error);
      }

      const data = await response.json();

      Cookies.set("token", data.token, { expires: 7 });
      toast({
        title: "Sucesso",
        description: "Login efetuado com sucesso!",
        variant: "sucess",
      });
      setTimeout(() => {
        router.push("/home");
      }, 1000);
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <div className={st.container}>
      <div className={cn(st.content)}>
        <div className={st.containerForm}>
          <div className={cn(st.contentForm, 'w-[322px] max-w-full')}>
            <h1>Login</h1>
            <p>O portal que te escuta! Estamos aqui por você.</p>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className={st.fields}>
                <div className={st.field}>
                  <label htmlFor="email">E-mail</label>
                  <span className={st.fieldValidation}>
                    {errors?.email ? (errors.email.message as string) : null}
                  </span>
                  <input id="email" type="text" {...register("email")} />
                </div>
              </div>
              <div className={st.fields}>
                <div className={st.field}>
                  <label htmlFor="senha">Senha</label>
                  <span className={st.fieldValidation}>
                    {errors?.senha ? (errors.senha.message as string) : null}
                  </span>
                  <input id="senha" type="password" {...register("senha")} />
                </div>
              </div>
              {error && <p className={st.error}>{error}</p>}
              <Button
                disabled={loading}
                type="submit"
                className="bg-primaryBlue w-[320px] mx-auto block rounded-3xl"
              >
                {loading ? "Carregando..." : "Entrar"}
              </Button>
            </form>
            <Link href={"/queixante-cadastro"}>
              Já faz parte? Clique aqui e acesse a sua conta!
            </Link>
          </div>
        </div>
        <div className={st.contentImg}>
          <Image src={dog} width={692} height={610} alt="Imagem do cachorro" />
        </div>
      </div>
    </div>
  );
};

export default QueixanteLogin;
