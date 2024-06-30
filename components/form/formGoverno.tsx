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


/* VALIDAÇÃO DOS CAMPOS DO FORMULÁRIO */
const formSchema = z.object({
  nome: z.string()
      .min(1, "O nome é obrigatório")
      .max(50, "Inválido, no máximo 50 letras")
      .regex(
          /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžæÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u,
          "Nome inválido"
      )
      .refine((campo) => campo.length >= 3, {
        message: "Inválido, no mínimo 3 letras",
      }),
  matricula: z.string()
      .min(1, "A matrícula é obrigatória")
      .max(50, "Inválido, no máximo 50 letras")
      .regex(
          /^[a-zA-Z0-9]+$/u,
          "Matrícula inválida"
      )
      .refine((campo) => campo.length >= 3, {
        message: "Inválido, no mínimo 3 caracteres",
      }),
});

const FormGoverno = () => {
  const { toast } = useToast();
  const router = useRouter();
  const [error, setError] = useState<null | string>(null);
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
      const response = await fetch("/api/post-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        const { error } = await response.json();
        toast({
          title: `Ocorreu um erro ao fazer a solictiação ${error}`,
          description: error,
          variant: "destructive",
        });
        setLoading(false);
        throw new Error(error);
      }
      toast({
        title: "Solicitação enviada com sucesso!",
        variant: "sucess"
      });

    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
      <div className={st.container}>
        <div className={cn(st.content)}>
          <div className={st.contentImg}>
            <Image src={gov} width={692} height={610} alt="Imagem do governo" />
          </div>
          <div className={st.containerForm}>
            <div className={st.contentForm}>
              <h1>Cadastro</h1>
              <p>O portal que te escuta! Estamos aqui por você.</p>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className={st.fields}>
                  <div className={st.field}>
                    <label htmlFor="nome">Nome</label>
                    <span className={st.fieldValidation}>
                    {errors?.nome ? (errors.nome.message as string) : null}
                  </span>
                    <input id="nome" type="text" {...register("nome")} />
                  </div>
                  <div className={st.field}>
                    <label htmlFor="matricula">Matrícula</label>
                    <span className={st.fieldValidation}>
                    {errors?.matricula ? (errors.matricula.message as string) : null}
                  </span>
                    <input
                        type="text"
                        id="matricula"
                        {...register("matricula")}
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
