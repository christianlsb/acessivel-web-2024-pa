const isGoverno = true;
const isQueixante = true

export const dashboardLinks = [
  {
    title: "Principal",
    link: "/dashboard/home",
  },
  ...(isGoverno ? [{
    title: "Relatórios",
    link: "/dashboard/gov/relatorios",
  }] : []),

  ...(isQueixante ? [{
    title: "Solicitações",
    link: "/dashboard/solicitacoes",
  }] : []),
  {
    title: "Dados Pessoais",
    link: "/dashboard/perfil",
  },
  {
    title: "Fale conosco",
    link: "/dashboard/fale-conosco",
  },
];
