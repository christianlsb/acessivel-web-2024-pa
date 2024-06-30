const Footer = () => {
  return (
    <footer>
      <div className="gridProject">
          <nav className={"flex justify-between items-center px-4 py-10"}>
              <ul className='text-center'>
                  <li className={"text-white text-center text-2xl"}>Queixante</li>
                  <li className={"text-white text-center"}>Entrar</li>
                  <li className={"text-white text-center"}>Cadastrar</li>
              </ul>
              <ul>
                  <li className={"text-white text-center text-2xl"}>Governo</li>
                  <li className={"text-white text-center"}>Entrar</li>
                  <li className={"text-white text-center"}>Solicitar conta</li>
              </ul>
              <ul>
                  <li className={"text-white text-center"}>
                    Acessar dashboard
                  </li>
              </ul>
          </nav>
      </div>
    </footer>
  );
};

export default Footer;
