document.addEventListener("DOMContentLoaded", () => {
  // Referências aos painéis e formulários
  const musicaInicio = document.getElementById("musica-inicio");
  const loginPanel = document.getElementById("login-panel");
  const cadastroPanel = document.getElementById("cadastro-panel");
  const perguntasPanel = document.getElementById("perguntas-panel");

  const formLogin = document.getElementById("formLogin");
  const formCadastro = document.getElementById("formCadastro");
  const formPerguntas = document.getElementById("formPerguntas");

  // Referências aos links de transição
  const linkCadastro = document.getElementById("link-cadastro");
  const linkLogin = document.getElementById("link-login");

  // Botões de voltar
  const voltarBtn = document.getElementById("voltar-btn");
  const voltarBtnCadastro = document.getElementById("voltar-btn-cadastro");
  const voltarBtnPerguntas = document.getElementById("voltar-btn-perguntas");

  // A nova solução para o áudio!
  window.addEventListener("pageshow", (event) => {
    if (musicaInicio) {
      musicaInicio.volume = 0.1;
      // A propriedade 'persisted' indica se a página foi restaurada do cache
      if (event.persisted) {
        musicaInicio
          .play()
          .catch((e) =>
            console.log("Música não pôde ser reproduzida após restauração.")
          );
      } else {
        // Caso contrário, é um carregamento novo
        musicaInicio
          .play()
          .catch((e) =>
            console.log("Música não pôde ser reproduzida no carregamento.")
          );
      }
    }
  });

  // Função para mostrar um painel e esconder os outros
  function showPanel(panelToShow) {
    [loginPanel, cadastroPanel, perguntasPanel].forEach((panel) => {
      panel.classList.remove("active");
    });
    panelToShow.classList.add("active");
  }

  // Gerencia os cliques nos links de transição
  linkCadastro.addEventListener("click", (event) => {
    event.preventDefault();
    showPanel(cadastroPanel);
  });

  linkLogin.addEventListener("click", (event) => {
    event.preventDefault();
    showPanel(loginPanel);
  });

  // Lógica para o formulário de LOGIN
  formLogin.addEventListener("submit", (event) => {
    event.preventDefault();

    // Simulação de login
    // Em um projeto real, aqui você faria uma chamada a uma API
    const email = document.getElementById("login-email").value;
    const senha = document.getElementById("login-senha").value;

    if (email && senha) {
      // Se o login for bem-sucedido, redireciona para o mapa
      alert("Login bem-sucedido! Redirecionando para o mapa.");
      window.location.href = "mapa.html";
    } else {
      alert("Por favor, preencha todos os campos.");
    }
  });

  // Lógica para o formulário de CADASTRO
  formCadastro.addEventListener("submit", (event) => {
    event.preventDefault();

    const nome = document.getElementById("cadastro-nome").value;
    const email = document.getElementById("cadastro-email").value;
    const senha = document.getElementById("cadastro-senha").value;
    const senhaConfirma = document.getElementById(
      "cadastro-senha-confirma"
    ).value;
    const passwordError = document.getElementById("password-error");

    if (senha !== senhaConfirma) {
      passwordError.textContent = "As senhas não coincidem.";
      return;
    } else {
      passwordError.textContent = "";
    }

    // Salva os dados do novo usuário no localStorage
    localStorage.setItem("nomeUsuario", nome);
    localStorage.setItem("email", email);
    localStorage.setItem("senha", senha);

    // Oculta o formulário de cadastro e mostra o de perguntas
    showPanel(perguntasPanel);
  });

  // Lógica para o formulário de PERGUNTAS
  formPerguntas.addEventListener("submit", (event) => {
    event.preventDefault();
    const respostaTempo = formPerguntas.tempo.value;
    let guardiao;
    switch (respostaTempo) {
      case "atividades físicas":
        guardiao = "Flora";
        break;
      case "estudar":
        guardiao = "Mentis";
        break;
      case "organizar":
        guardiao = "Ordus";
        break;
      case "auto-cuidado":
        guardiao = "Lumen";
        break;
      case "tecnologia":
        guardiao = "Lux";
        break;
      case "finanças":
        guardiao = "Lucros";
        break;
    }

    localStorage.setItem("guardiao", guardiao);

    // Redireciona para a tela de apresentação do guardião
    window.location.href = "guardioes.html";
  });

  // Lógica para os botões de voltar
  if (voltarBtn)
    voltarBtn.addEventListener(
      "click",
      () => (window.location.href = "index.html")
    );
  if (voltarBtnCadastro)
    voltarBtnCadastro.addEventListener(
      "click",
      () => (window.location.href = "index.html")
    );
  if (voltarBtnPerguntas)
    voltarBtnPerguntas.addEventListener(
      "click",
      () => (window.location.href = "index.html")
    );
});
